import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Grid from '@material-ui/core/Grid'

import Post from '../components/Post'
import Profile from '../components/Profile'
import { RootState } from '../redux/store'
import { getPosts } from '../redux/modules/data'

export const Home = () => {
	const { posts, loading } = useSelector((state: RootState) => state.data)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getPosts())
	}, [dispatch])

	return (
		<Grid container spacing={2}>
			<Grid item sm={8} xs={12}>
				{!loading ? posts.map((post) => <Post key={post.postId} post={post} />) : <p>Loading...</p>}
			</Grid>
			<Grid item sm={4} xs={12}>
				<Profile />
			</Grid>
		</Grid>
	)
}
