import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'

import Post from '../components/Post'

export const Home = () => {
	const [posts, setPosts] = useState([])
	useEffect(() => {
		const getPosts = async () => {
			try {
				const allPosts = await axios.get('/posts')
				setPosts(allPosts.data)
			} catch (error) {
				console.error(error)
			}
		}

		getPosts()
	}, [])

	return (
		<Grid container spacing={2}>
			<Grid item sm={8} xs={12}>
				{posts ? posts.map((post, index) => <Post key={index} post={post} />) : <p>Loading...</p>}
			</Grid>
			<Grid item sm={4} xs={12}>
				<p>Profile</p>
			</Grid>
		</Grid>
	)
}
