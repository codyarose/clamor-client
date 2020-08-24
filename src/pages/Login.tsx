import React, { useState, ChangeEvent, FormEvent } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useSelector, useDispatch } from 'react-redux'
import Typography from '@material-ui/core/Typography'

import { loginUser } from '../redux/modules/user'
import { RootState } from '../redux/store'
import FormElements from '../components/common/FormElements'
import Button from '@material-ui/core/Button'

export const Login = () => {
	// const { errors } = useSelector((state: RootState) => state.ui)
	const { loading, errors } = useSelector((state: RootState) => state.user)
	const dispatch = useDispatch()

	const [formState, setFormState] = useState({
		email: '',
		password: '',
	})

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		dispatch(loginUser(formState))
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormState({ ...formState, [name]: value })
	}

	return (
		<StyledLogin>
			<StyledTitleContainer>
				<StyledTitle variant="h1">Clamor</StyledTitle>
			</StyledTitleContainer>
			<StyledFormContainer>
				<StyledForm noValidate onSubmit={handleSubmit}>
					<FormElements.TextInput
						id="email"
						name="email"
						type="email"
						label="Email"
						value={formState.email}
						onChange={handleChange}
						variant="filled"
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
						variant="filled"
						helperText={errors.password}
						error={!!errors.password}
					/>
					{errors.general && (
						<FormElements.ErrorText variant="body2">
							{errors.general}
						</FormElements.ErrorText>
					)}
					<FormElements.Submit
						variant="outlined"
						color="primary"
						type="submit"
						disabled={loading}
					>
						{loading ? (
							<CircularProgress color="inherit" size={24} />
						) : (
							'Log in'
						)}
					</FormElements.Submit>
				</StyledForm>
				<StyledSignupContainer>
					<Typography variant="h5" component="span">
						or
					</Typography>
					<Button
						component={Link}
						to="/signup"
						variant="contained"
						color="primary"
						fullWidth
						size="large"
					>
						Signup
					</Button>
				</StyledSignupContainer>
			</StyledFormContainer>
		</StyledLogin>
	)
}

const StyledLogin = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 100vh;
	& > * {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 1rem;
	}
`

const StyledTitleContainer = styled.div`
	background-color: rgb(113, 201, 248);
`

const StyledTitle = styled(Typography)`
	color: #fff;
	&& {
		font-family: inherit;
		font-weight: 400;
	}
`

const StyledFormContainer = styled.div`
	/* margin-bottom: 2rem; */
`

const StyledForm = styled(FormElements.Form)`
	margin-bottom: 2rem;
`

const StyledSignupContainer = styled.div`
	text-align: center;
	& > span {
		display: inline-block;
		margin-bottom: 2rem;
	}
`
