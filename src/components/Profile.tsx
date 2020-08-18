import React, { FC, ChangeEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import dayjs from 'dayjs'

import { RootState } from '../redux/store'
import { uploadImage } from '../redux/modules/user'

import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import MuiLink from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'
import EditIcon from '@material-ui/icons/Edit'
import Tooltip from '@material-ui/core/Tooltip'

const Profile: FC = () => {
	const {
		credentials: { handle, createdAt, imageUrl, bio, website, location },
		loading,
		authenticated,
	} = useSelector((state: RootState) => state.user)
	const dispatch = useDispatch()

	const handleImageChange = (e: ChangeEvent) => {
		const image = (e.target as HTMLInputElement).files![0]
		const formData = new FormData()
		formData.append('image', image, image.name)
		dispatch(uploadImage(formData))
	}

	const handleChangeImage = () => {
		const fileInput = document.getElementById('imageInput')
		fileInput?.click()
	}

	const profileLayout = (
		<StyledPaper>
			<StyledProfile>
				<StyledImageContainer>
					<StyledImageWrapper>
						<StyledProfileImage className="profile-image" src={imageUrl} alt="Profile" />
					</StyledImageWrapper>
					<input type="file" id="imageInput" onChange={handleImageChange} hidden />
					<Tooltip title="Change picture" placement="top">
						<IconButton onClick={handleChangeImage}>
							<EditIcon color="primary" />
						</IconButton>
					</Tooltip>
				</StyledImageContainer>
				<hr />
				<StyledProfileDetails>
					<MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
						@{handle}
					</MuiLink>
					<hr />
					{bio && <Typography variant="body2">{bio}</Typography>}
					<hr />
					{location && (
						<>
							<LocationOn color="primary">
								<span>{location}</span>
								<hr />
							</LocationOn>
						</>
					)}
					{website && (
						<>
							<LinkIcon color="primary" />
							<a href={website} target="_blank" rel="noopener noreferrer">
								{website}
							</a>
							<hr />
						</>
					)}
					<CalendarToday color="primary" />
					<span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
				</StyledProfileDetails>
			</StyledProfile>
		</StyledPaper>
	)

	const noProfileLayout = (
		<StyledPaper>
			<Typography variant="body2" align="center">
				No profile found
			</Typography>
			<StyledButtons>
				<Button variant="contained" color="primary" component={Link} to="/login">
					Login
				</Button>
				<Button variant="contained" color="secondary" component={Link} to="/signup">
					Signup
				</Button>
			</StyledButtons>
		</StyledPaper>
	)

	return !loading ? authenticated ? profileLayout : noProfileLayout : <p>Loading...</p>
}

export default Profile

const StyledPaper = styled(Paper)`
	padding: 20px;
`

const StyledProfile = styled.div`
	display: flex;
	flex-flow: column;
	align-items: center;
	hr {
		border: none;
		margin: 0 0 10px;
	}
`

const StyledImageContainer = styled.div`
	position: relative;
	width: 100%;
	max-width: 200px;
	button {
		position: absolute;
		bottom: 0;
		right: 0;
	}
`

const StyledImageWrapper = styled.div`
	position: relative;
	width: 100%;
	height: 0;
	padding-top: 100%;
	border-radius: 50%;
	overflow: hidden;
`

const StyledProfileImage = styled.img`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	object-fit: cover;
`

const StyledProfileDetails = styled.div`
	text-align: center;
	span,
	svg {
		vertical-align: middle;
	}
	svg {
		margin-right: 0.5rem;
	}
`

const StyledButtons = styled.div`
	text-align: center;
	a {
		margin: 20px 10px;
	}
`
