import React, { useState, ChangeEvent, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress'

import { signupUser } from '../redux/modules/user'
import { RootState } from '../redux/store'
import FormElements from '../components/common/FormElements'
import { useSelector, useDispatch } from 'react-redux'

export const Signup = () => {
	const { loading, errors } = useSelector((state: RootState) => state.ui)
	const dispatch = useDispatch()

	const [formState, setFormState] = useState({
		email: '',
		password: '',
		confirmPassword: '',
		handle: '',
	})

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		dispatch(signupUser(formState))
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
				<StyledForm
					noValidate
					onSubmit={handleSubmit}
					flexFlow="column"
				>
					<StyledTextInput
						id="email"
						name="email"
						type="email"
						label="Email"
						value={formState.email}
						onChange={handleChange}
						helperText={errors.email}
						error={!!errors.email}
					/>
					<StyledTextInput
						id="handle"
						name="handle"
						type="text"
						label="Username"
						value={formState.handle}
						onChange={handleChange}
						helperText={errors.handle}
						error={!!errors.handle}
					/>
					<StyledTextInput
						id="password"
						name="password"
						type="password"
						label="Password"
						value={formState.password}
						onChange={handleChange}
						helperText={errors.password}
						error={!!errors.password}
					/>
					<StyledTextInput
						id="confirmPassword"
						name="confirmPassword"
						type="password"
						label="Confirm password"
						value={formState.confirmPassword}
						onChange={handleChange}
						helperText={errors.confirmPassword}
						error={!!errors.confirmPassword}
					/>
					{errors.general && (
						<FormElements.ErrorText variant="body2">
							{errors.general}
						</FormElements.ErrorText>
					)}
					<StyledSubmit
						variant="contained"
						color="primary"
						type="submit"
						size="large"
						disabled={loading}
					>
						{loading ? (
							<CircularProgress color="inherit" size={24} />
						) : (
							'Sign up'
						)}
					</StyledSubmit>
					<StyledSmall>
						Already have an account? Log in{' '}
						<Link to="/login">here</Link>
					</StyledSmall>
				</StyledForm>
			</div>
		</div>
	)
}

const StyledForm = styled(FormElements.Form)`
	margin: 0 auto;
	max-width: 600px;
`

const StyledTextInput = styled(FormElements.TextInput)`
	&& {
		margin-bottom: 1rem;
		&:last-of-type {
			margin-bottom: 2rem;
		}
	}
`

const StyledSubmit = styled(FormElements.Submit)`
	&& {
		padding: 0.5rem;
	}
`

const StyledSmall = styled.small`
	text-align: center;
	padding: 2rem 1rem;
`
