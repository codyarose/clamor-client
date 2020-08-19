import React, { useState, FC } from 'react'
import { useDispatch } from 'react-redux'

import DeleteIcon from '@material-ui/icons/DeleteOutline'

import TooltipButton from './common/TooltipButton'
import { deletePost } from '../redux/modules/data'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

interface Props {
	postId: string
	className?: string
}

const DeletePost: FC<Props> = ({ postId, className }) => {
	const dispatch = useDispatch()

	const [open, setOpen] = useState<boolean>(false)

	const toggleOpen = () => {
		setOpen(!open)
	}

	const handleDeletePost = () => {
		dispatch(deletePost(postId))
		setOpen(false)
	}

	return (
		<div className={className}>
			<TooltipButton title="Delete post" onClick={toggleOpen}>
				<DeleteIcon color="secondary" />
			</TooltipButton>
			<Dialog open={open} onClose={toggleOpen} fullWidth maxWidth="sm">
				<DialogTitle>Are you sure you want to delete this post?</DialogTitle>
				<DialogActions>
					<Button onClick={toggleOpen} color="primary">
						Cancel
					</Button>
					<Button onClick={handleDeletePost} color="secondary">
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

export default DeletePost
