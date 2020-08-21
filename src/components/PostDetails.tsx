import React, { FC, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import dayjs from 'dayjs'

import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import UnfoldMore from '@material-ui/icons/UnfoldMore'
import CloseIcon from '@material-ui/icons/Close'

import { getPost } from '../redux/modules/data'
import { RootState } from '../redux/store'
import TooltipButton from './common/TooltipButton'

interface Props {
	postId: string
}

const PostDetails: FC<Props> = ({ postId }) => {
	const {
		post: { body, createdAt, userImage, userHandle },
	} = useSelector((state: RootState) => state.data)
	const { loading } = useSelector((state: RootState) => state.ui)
	const dispatch = useDispatch()

	const [open, setOpen] = useState(false)

	const toggleOpen = () => {
		setOpen(!open)
	}

	useEffect(() => {
		open === true && dispatch(getPost(postId))
	}, [dispatch, postId, open])

	return (
		<>
			<StyledExpandButton title="View post" onClick={toggleOpen}>
				<UnfoldMore color="primary" />
			</StyledExpandButton>
			<StyledDialog open={open} onClose={toggleOpen} fullWidth maxWidth="sm">
				<TooltipButton title="Close" onClick={toggleOpen}>
					<CloseIcon />
				</TooltipButton>
				<StyledDialogContent>
					{loading ? (
						<StyledCircularProgressContainer>
							<CircularProgress size={100} />
						</StyledCircularProgressContainer>
					) : (
						<Grid container spacing={2}>
							<Grid item sm={5}>
								<StyledProfileImgContainer>
									<StyledProfileImg src={userImage} alt={userHandle} />
								</StyledProfileImgContainer>
							</Grid>
							<Grid item sm={7}>
								<Typography component={Link} to={`/users/${userHandle}`} color="primary" variant="h5">
									{userHandle}
								</Typography>
								<StyledHR />
								<Typography variant="body2" color="textSecondary">
									{dayjs(createdAt).format('h:mm a, MMM DD YYYY')}
								</Typography>
								<StyledHR />
								{body && <Typography variant="body1">{body}</Typography>}
							</Grid>
						</Grid>
					)}
				</StyledDialogContent>
			</StyledDialog>
		</>
	)
}

export default PostDetails

const StyledExpandButton = styled(TooltipButton)`
	align-self: flex-end;
`

const StyledDialog = styled(Dialog)`
	.MuiDialog-paperScrollPaper {
		flex-direction: row-reverse;
		align-items: flex-start;
		padding: 20px;
	}
`

const StyledDialogContent = styled(DialogContent)`
	position: relative;
	min-height: 200px;
`

const StyledCircularProgressContainer = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform-origin: 50% 50%;
	transform: translate(-50%, -50%);
`

const StyledHR = styled.hr`
	border: none;
	margin: 0 4px;
`

const StyledProfileImgContainer = styled.div`
	width: 200px;
	height: 200px;
	border-radius: 50%;
	overflow: hidden;
`

const StyledProfileImg = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`
