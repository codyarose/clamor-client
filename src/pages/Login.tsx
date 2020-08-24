import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useSelector, useDispatch } from 'react-redux'
import Typography from '@material-ui/core/Typography'

import { loginUser } from '../redux/modules/user'
import { RootState } from '../redux/store'
import FormElements from '../components/common/FormElements'
import Button from '@material-ui/core/Button'
import { clearError } from '../redux/modules/errors'

export const Login = () => {
	const { loading } = useSelector((state: RootState) => state.user)
	const errors = useSelector((state: RootState) => state.errors)
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

	const history = useHistory()
	useEffect(() => {
		return history.listen(() => dispatch(clearError('login')))
	}, [history, dispatch])

	return (
		<StyledLogin>
			<StyledTitleContainer>
				<StyledTitle variant="h1">Clamor&#8253;</StyledTitle>
			</StyledTitleContainer>
			<StyledFormContainer>
				<StyledForm noValidate onSubmit={handleSubmit}>
					<StyledTextInput
						id="email"
						name="email"
						type="email"
						label="Email"
						value={formState.email}
						onChange={handleChange}
						variant="filled"
						helperText={errors.login.email}
						error={!!errors.login.email}
					/>
					<StyledTextInput
						id="password"
						name="password"
						type="password"
						label="Password"
						value={formState.password}
						onChange={handleChange}
						variant="filled"
						helperText={errors.login.password}
						error={!!errors.login.password}
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

const StyledTextInput = styled(FormElements.TextInput)`
	&& {
		margin-right: 1rem;
	}
`
