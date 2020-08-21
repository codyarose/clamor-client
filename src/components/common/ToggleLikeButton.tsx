import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'

import TooltipButton from './TooltipButton'

interface Props {
	authenticated: boolean
	likeStatus: boolean
	likeHandler: () => void
}

const ToggleLikeButton: FC<Props> = ({ authenticated, likeStatus, likeHandler }) => {
	return (
		<>
			{!authenticated ? (
				<Link to="/login">
					<TooltipButton title="Like">
						<FavoriteBorderIcon />
					</TooltipButton>
				</Link>
			) : likeStatus ? (
				<TooltipButton title="Unlike" onClick={likeHandler}>
					<FavoriteIcon color="secondary" />
				</TooltipButton>
			) : (
				<TooltipButton title="Like" onClick={likeHandler}>
					<FavoriteBorderIcon color="primary" />
				</TooltipButton>
			)}
		</>
	)
}

export default ToggleLikeButton
