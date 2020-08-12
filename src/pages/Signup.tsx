import React, { useState, ChangeEvent, FormEvent } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { History, LocationState } from 'history'
import CircularProgress from '@material-ui/core/CircularProgress'

import FormElements from '../components/common/FormElements'

export const Signup = (props: { history: History<LocationState> }) => {
	const [formState, setFormState] = useState({
		email: '',
		password: '',
		confirmPassword: '',
		handle: '',
	})
	const [loading, setloading] = useState(false)
	const [errors, setErrors] = useState({
		email: '',
		password: '',
		confirmPassword: '',
		general: '',
		handle: '',
	})

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			setloading(true)

			const signup = await axios.post('/signup', { ...formState })
			console.log(signup.data)
			localStorage.setItem('FBIdToken', `Bearer ${signup.data.token}`)
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
					Create an account
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
						id="handle"
						name="handle"
						type="text"
						label="Username"
						value={formState.handle}
						onChange={handleChange}
						fullWidth={true}
						helperText={errors.handle}
						error={!!errors.handle}
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
					<FormElements.TextInput
						id="confirmPassword"
						name="confirmPassword"
						type="password"
						label="Confirm password"
						value={formState.confirmPassword}
						onChange={handleChange}
						fullWidth={true}
						helperText={errors.confirmPassword}
						error={!!errors.confirmPassword}
					/>
					{errors.general && (
						<FormElements.ErrorText variant="body2">{errors.general}</FormElements.ErrorText>
					)}
					<FormElements.Submit variant="contained" color="primary" type="submit" disabled={loading}>
						{loading ? <CircularProgress color="inherit" size={24} /> : 'Sign up'}
					</FormElements.Submit>
					<small>
						Already have an account? Log in <Link to="/login">here</Link>
					</small>
				</FormElements.Form>
			</div>
		</div>
	)
}
