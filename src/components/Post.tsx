import React from 'react'
import styled from 'styled-components'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'

interface PostDetails {
	post: {
		body: string
		createdAt: Date
		userImage: string
		userHandle: string
		postId: string
		likeCount: number
		commentCount: number
	}
}

const Post = ({ post: { body, createdAt, userImage, userHandle } }: PostDetails) => {
	return (
		<StyledCard>
			<StyledImage image={userImage} title="Profile image" />
			<StyledContent>
				<StyledHandle variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">
					{userHandle}
				</StyledHandle>
				<Typography variant="body2" color="textSecondary">
					{createdAt}
				</Typography>
				<Typography variant="body1">{body}</Typography>
			</StyledContent>
		</StyledCard>
	)
}

export default Post

const StyledHandle = styled((props) => <Typography {...props} />)`
	text-decoration: none;
`

const StyledCard = styled(Card)`
	display: flex;
	margin-bottom: 20px;
`

const StyledImage = styled((props) => <CardMedia {...props} />)`
	min-width: 200px;
`

const StyledContent = styled(CardContent)`
	&& {
		padding: 1.5rem;
	}
`
