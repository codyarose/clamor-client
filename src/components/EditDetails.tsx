import React, { useState, ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { editUserDetails } from '../redux/modules/user'
import { RootState } from '../redux/store'
import TooltipButton from './common/TooltipButton'

import EditIcon from '@material-ui/icons/Edit'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

const shallowEqual = (
	obj1: { [key: string]: string },
	obj2: { [key: string]: string },
) => {
	const keys1 = Object.keys(obj1)
	const keys2 = Object.keys(obj2)

	if (keys1.length !== keys2.length) return false

	for (const key of keys1) {
		if (obj1[key] !== obj2[key]) return false
	}

	return true
}

const EditDetails = () => {
	const { credentials } = useSelector((state: RootState) => state.user)
	const dispatch = useDispatch()

	const [details, setDetails] = useState({
		bio: credentials.bio || '',
		website: credentials.website || '',
		location: credentials.location || '',
	})

	const [open, setOpen] = useState(false)

	const toggleDialog = () => {
		setOpen(!open)
	}

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setDetails({ ...details, [name]: value })
	}

	const handleSubmit = () => {
		const originalValues = {
			bio: credentials.bio || '',
			website: credentials.website || '',
			location: credentials.location || '',
		}
		!shallowEqual(details, originalValues) &&
			dispatch(editUserDetails({ ...details }))
		toggleDialog()
	}

	return (
		<>
			<TooltipButton
				title="Edit details"
				placement="top"
				onClick={toggleDialog}
			>
				<EditIcon />
			</TooltipButton>
			<Dialog open={open} onClose={toggleDialog} fullWidth maxWidth="sm">
				<DialogTitle>Edit your details</DialogTitle>
				<DialogContent>
					<form>
						<TextField
							name="bio"
							type="text"
							label="Bio"
							multiline
							rows="3"
							value={details.bio}
							onChange={handleInputChange}
							fullWidth
						/>
						<TextField
							name="website"
							type="text"
							label="Website"
							value={details.website}
							onChange={handleInputChange}
							fullWidth
						/>
						<TextField
							name="location"
							type="text"
							label="Location"
							value={details.location}
							onChange={handleInputChange}
							fullWidth
						/>
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={toggleDialog} color="primary">
						Cancel
					</Button>
					<Button onClick={handleSubmit} color="primary">
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default EditDetails
