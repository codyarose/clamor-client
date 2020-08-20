import React, { FC, useState, ChangeEvent, FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'
import CircularProgress from '@material-ui/core/CircularProgress'

import { RootState } from '../redux/store'
import { addPost } from '../redux/modules/data'
import TooltipButton from './common/TooltipButton'
import FormElements from '../components/common/FormElements'

const AddPost: FC = () => {
	const { loading, errors } = useSelector((state: RootState) => state.ui)
	const dispatch = useDispatch()

	const [open, setOpen] = useState<boolean>(false)
	const [formData, setFormData] = useState({
		body: '',
	})

	const toggleOpen = () => setOpen(!open)

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData({
			...formData,
			[name]: value,
		})
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		dispatch(addPost(formData))
		!loading && setOpen(false)
	}

	return (
		<>
			<TooltipButton title="Create a post" onClick={toggleOpen}>
				<AddIcon />
			</TooltipButton>
			<Dialog open={open} onClose={toggleOpen} fullWidth maxWidth="sm">
				<StyledCloseButton title="Close" onClick={toggleOpen}>
					<CloseIcon />
				</StyledCloseButton>
				<StyledTitle>Add a new post</StyledTitle>
				<DialogContent>
					<FormElements.Form onSubmit={handleSubmit}>
						<FormElements.TextInput
							name="body"
							type="text"
							label="Type something here..."
							multiline
							rows="2"
							error={!!errors.body}
							helperText={errors.body}
							onChange={handleInputChange}
							fullWidth
						/>
						<FormElements.Submit type="submit" variant="contained" color="primary" disabled={loading}>
							{loading ? <CircularProgress color="inherit" size={24} /> : 'Submit'}
						</FormElements.Submit>
					</FormElements.Form>
				</DialogContent>
			</Dialog>
		</>
	)
}

export default AddPost

const StyledCloseButton = styled(TooltipButton)`
	align-self: flex-end;
`

const StyledTitle = styled(DialogTitle)`
	&& {
		padding: 0 1.5rem;
	}
`
