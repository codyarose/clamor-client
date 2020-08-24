import React, { FC, useState, ChangeEvent, FormEvent, useEffect } from 'react'
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
import { clearError } from '../redux/modules/errors'

const AddPost: FC = () => {
	const errors = useSelector((state: RootState) => state.errors)
	const { posts, loading } = useSelector((state: RootState) => state.data)
	const dispatch = useDispatch()

	const [open, setOpen] = useState<boolean>(false)
	const [formData, setFormData] = useState({
		body: '',
	})

	const toggleOpen = () => {
		setOpen(!open)
		dispatch(clearError('addPost'))
	}

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
	}

	useEffect(() => {
		setOpen(false)
	}, [posts])

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
							error={!!errors.addPost.body}
							helperText={errors.addPost.body}
							onChange={handleInputChange}
							fullWidth
						/>
						<StyledSubmitButton
							type="submit"
							variant="contained"
							color="primary"
							disabled={loading}
						>
							{loading ? (
								<CircularProgress color="inherit" size={24} />
							) : (
								'Submit'
							)}
						</StyledSubmitButton>
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

const StyledSubmitButton = styled(FormElements.Submit)`
	align-self: flex-end;
`

const StyledTitle = styled(DialogTitle)`
	&& {
		padding: 0 1.5rem;
	}
`
