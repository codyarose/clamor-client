import React, { useState, useEffect, FC } from 'react'
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

import TooltipButton from './common/TooltipButton'
import ToggleLikeButton from './common/ToggleLikeButton'
import PostDetails from './PostDetails'
import DeletePost from './DeletePost'
import { RootState } from '../redux/store'
import { toggleLike, PostProps } from '../redux/modules/data'

const Post: FC<{ post: PostProps }> = ({
	post: {
		body,
		createdAt,
		userImage,
		userHandle,
		postId,
		likeCount,
		commentCount,
	},
}) => {
	dayjs.extend(relativeTime)
	const {
		likes,
		authenticated,
		credentials: { handle },
	} = useSelector((state: RootState) => state.user)
	const dispatch = useDispatch()

	const [alreadyLiked, setAlreadyLiked] = useState(false)

	useEffect(() => {
		likes && likes.find((like) => like.postId === postId)
			? setAlreadyLiked(true)
			: setAlreadyLiked(false)
	}, [likes, postId])

	const handleToggleLike = () => {
		dispatch(toggleLike({ postId, alreadyLiked }))
		setAlreadyLiked(!alreadyLiked)
	}

	return (
		<>
			{body && (
				<StyledCard>
					<StyledImage image={userImage} title="Profile image" />
					<StyledContent>
						<StyledHandle
							variant="h5"
							component={Link}
							to={`/users/${userHandle}`}
							color="primary"
						>
							{userHandle}
						</StyledHandle>
						{authenticated && userHandle === handle && (
							<StyledDeletePost postId={postId} />
						)}
						<Typography variant="body2" color="textSecondary">
							{dayjs(createdAt).fromNow()}
						</Typography>
						<Typography variant="body1">{body}</Typography>

						<ToggleLikeButton
							authenticated={authenticated}
							likeStatus={alreadyLiked}
							likeHandler={handleToggleLike}
						/>
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
