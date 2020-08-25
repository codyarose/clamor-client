import React, { FC, Fragment, useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux'
import { getPost } from '../redux/modules/data'
import { RootState } from '../redux/store'

interface Props {
	open: boolean
	postId: string
}

const Comments: FC<Props> = ({ open, postId }) => {
	const { post } = useSelector((state: RootState) => state.data)
	const dispatch = useDispatch()
	const [commentList, setCommentList] = useState<any[]>([])

	useEffect(() => {
		open && dispatch(getPost(postId))
		post.comments && setCommentList(post.comments)
		console.log(post.comments)
	}, [open, dispatch, postId])

	return (
		<>
			{open && (
				<Grid container>
					{commentList.map((comment) => {
						const {
							body,
							createdAt,
							userImage,
							userHandle,
						} = comment
						return (
							<Fragment key={createdAt.toString()}>
								<div>
									<div>
										<img src={userImage} alt={userHandle} />
									</div>
									<div>
										<Typography
											component={Link}
											to={`/users/${userHandle}`}
											color="primary"
											variant="h5"
										>
											{userHandle}
										</Typography>
										<Typography
											variant="body2"
											color="textSecondary"
										>
											{dayjs(createdAt).format(
												'h:mm a , MMMM DD YYYY',
											)}
										</Typography>
										<br />
										<Typography variant="body1">
											{body}
										</Typography>
									</div>
								</div>
							</Fragment>
						)
					})}
				</Grid>
			)}
		</>
	)
}

export default Comments
