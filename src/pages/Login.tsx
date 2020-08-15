import React, { useState, ChangeEvent, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { History, LocationState } from 'history'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useSelector, useDispatch } from 'react-redux'

import { loginUser } from '../redux/actions/userActions'
import { RootState } from '../redux/reducers/rootReducer'
import FormElements from '../components/common/FormElements'

export const Login = (props: { history: History<LocationState> }) => {
	const { loading, errors } = useSelector((state: RootState) => state.ui)
	const dispatch = useDispatch()

	const [formState, setFormState] = useState({
		email: '',
		password: '',
	})

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		dispatch(loginUser(formState, props.history))
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormState({ ...formState, [name]: value })
	}

	return (
		<div>
			<div>
				<FormElements.Title variant="h3" component="h1">
					Login
				</FormElements.Title>
				<FormElements.Form noValidate onSubmit={handleSubmit}>
					<FormElements.TextInput
						id="email"
						name="email"
						type="email"
						label="Email"
						value={formState.email}
						onChange={handleChange}
						fullWidth={true}
						helperText={errors.email}
						error={!!errors.email}
					/>
					<FormElements.TextInput
						id="password"
						name="password"
						type="password"
						label="Password"
						value={formState.password}
						onChange={handleChange}
						fullWidth={true}
						helperText={errors.password}
						error={!!errors.password}
					/>
					{errors.general && (
						<FormElements.ErrorText variant="body2">{errors.general}</FormElements.ErrorText>
					)}
					<FormElements.Submit variant="contained" color="primary" type="submit" disabled={loading}>
						{loading ? <CircularProgress color="inherit" size={24} /> : 'Login'}
					</FormElements.Submit>
					<small>
						Don't have an account? Sign up <Link to="/signup">here</Link>
					</small>
				</FormElements.Form>
			</div>
		</div>
	)
}
