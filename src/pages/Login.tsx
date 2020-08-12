import React, { useState, ChangeEvent, FormEvent } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { History, LocationState } from 'history'
import CircularProgress from '@material-ui/core/CircularProgress'

import FormElements from '../components/common/FormElements'

export const Login = (props: { history: History<LocationState> }) => {
	const [formState, setFormState] = useState({
		email: '',
		password: '',
	})
	const [loading, setloading] = useState(false)
	const [errors, setErrors] = useState({
		email: '',
		password: '',
		general: '',
	})

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			setloading(true)

			const login = await axios.post('/login', { ...formState })
			console.log(login.data)
			localStorage.setItem('FBIdToken', `Bearer ${login.data.token}`)

			setloading(false)

			props.history.push('/')
		} catch (error) {
			setErrors(error.response.data)
			setloading(false)
		}
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
