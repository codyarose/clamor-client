import styled from 'styled-components'

import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const Form = styled.form`
	display: flex;
	/* flex-flow: column;
	align-items: center;
	text-align: center; */
`

const Title = styled(Typography)`
	&& {
		margin-bottom: 1rem;
		text-align: center;
	}
` as typeof Typography

const TextInput = styled(TextField)`
	&& {
		margin-right: 1rem;
		&:last-of-type {
			/* margin-bottom: 1.5rem; */
		}
	}
`

const ErrorText = styled(Typography)`
	&& {
		color: red;
		padding-bottom: 1rem;
	}
`

const Submit = styled(Button)`
	&& {
		font-weight: 700;
		padding: 0 1em;
		/* margin-bottom: 1rem; */
	}
`

export default {
	Form,
	Title,
	TextInput,
	ErrorText,
	Submit,
}
