import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import ChatIcon from '@material-ui/icons/Chat'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'

import TooltipButton from './common/TooltipButton'
import PostDetails from './PostDetails'
import DeletePost from './DeletePost'
import { RootState } from '../redux/store'
import { likePost, unlikePost } from '../redux/modules/data'

interface Post {
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

const Post = ({ post: { body, createdAt, userImage, userHandle, postId, likeCount, commentCount } }: Post) => {
	dayjs.extend(relativeTime)
	const {
		likes,
		authenticated,
		credentials: { handle },
	} = useSelector((state: RootState) => state.user)
	const dispatch = useDispatch()

	const [liked, setLiked] = useState(false)

	useEffect(() => {
		likes && likes.find((like) => like.postId === postId) ? setLiked(true) : setLiked(false)
	}, [likes, postId])
	const handleLikePost = () => {
		dispatch(likePost(postId))
		setLiked(true)
	}
	const handleUnlikePost = () => {
		dispatch(unlikePost(postId))
		setLiked(false)
	}

	const likeButton = !authenticated ? (
		<TooltipButton title="Like">
			<Link to="/login">
				<FavoriteBorderIcon />
			</Link>
		</TooltipButton>
	) : liked ? (
		<TooltipButton title="Unlike" onClick={handleUnlikePost}>
			<FavoriteIcon color="primary" />
		</TooltipButton>
	) : (
		<TooltipButton title="Like" onClick={handleLikePost}>
			<FavoriteBorderIcon color="primary" />
		</TooltipButton>
	)

	return (
		<>
			{body && (
				<StyledCard>
					<StyledImage image={userImage} title="Profile image" />
					<StyledContent>
						<StyledHandle variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">
							{userHandle}
						</StyledHandle>
						{authenticated && userHandle === handle && <StyledDeletePost postId={postId} />}
						<Typography variant="body2" color="textSecondary">
							{dayjs(createdAt).fromNow()}
						</Typography>
						<Typography variant="body1">{body}</Typography>

						{likeButton}
						<span>{likeCount} likes</span>
						<TooltipButton title="Comments">
							<ChatIcon color="primary" />
						</TooltipButton>
						<span>{commentCount} comments</span>
					</StyledContent>
					{postId && <PostDetails postId={postId} />}
				</StyledCard>
			)}
		</>
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
	position: relative;
	width: 100%;
	&& {
		padding: 1.5rem;
	}
`

const StyledDeletePost = styled(DeletePost)`
	position: absolute;
	right: 0;
	bottom: 0;
`
