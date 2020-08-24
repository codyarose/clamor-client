import styled from 'styled-components'

import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

interface FormProps {
	readonly flexFlow?: 'row' | 'column'
}

const Form = styled.form<FormProps>`
	display: flex;
	flex-flow: ${({ flexFlow }) => (flexFlow ? flexFlow : 'row')};
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
	/*  */
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
