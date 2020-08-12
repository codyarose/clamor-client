import React, { useState, ChangeEvent, FormEvent } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { History, LocationState } from 'history'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

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

			const postLogin = await axios.post('/login', { ...formState })
			console.log(postLogin.data)

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
				<StyledTitle variant="h3" component="h1">
					Login
				</StyledTitle>
				<StyledForm noValidate onSubmit={handleSubmit}>
					<StyledTextField
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
					<StyledTextField
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
					{errors.general && <StyledCustomError variant="body2">{errors.general}</StyledCustomError>}
					<Button variant="contained" color="primary" type="submit">
						Login
					</Button>
					{loading && <p>Loading...</p>}
					<small>
						Don't have an account? Sign up <Link to="/signup">here</Link>
					</small>
				</StyledForm>
			</div>
		</div>
	)
}

const StyledForm = styled.form`
	display: flex;
	flex-flow: column;
	align-items: center;
	text-align: center;
`

const StyledTitle = styled((props) => <Typography {...props} />)`
	&& {
		margin-bottom: 1rem;
		text-align: center;
	}
`

const StyledTextField = styled((props) => <TextField {...props} />)`
	&& {
		margin-bottom: 1rem;
		&:last-of-type {
			margin-bottom: 1.5rem;
		}
	}
`

const StyledCustomError = styled((props) => <Typography {...props} />)`
	&& {
		color: red;
		padding-bottom: 1rem;
	}
`
