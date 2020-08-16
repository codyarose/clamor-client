import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'

import Post from '../components/Post'
import Profile from '../components/Profile'

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

	interface PostDetails {
		body: string
		createdAt: Date
		userImage: string
		userHandle: string
		postId: string
		likeCount: number
		commentCount: number
	}

	return (
		<Grid container spacing={2}>
			<Grid item sm={8} xs={12}>
				{posts ? posts.map((post: PostDetails) => <Post key={post.postId} post={post} />) : <p>Loading...</p>}
			</Grid>
			<Grid item sm={4} xs={12}>
				<Profile />
			</Grid>
		</Grid>
	)
}
