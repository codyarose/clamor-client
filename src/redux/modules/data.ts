import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { addToLikes, removeFromLikes } from './user'
import { setError, clearError } from './errors'
import { AppDispatch } from '../store'

export const getAllPosts = createAsyncThunk<
	PostProps[],
	void,
	{ dispatch: AppDispatch }
>('data/getAllPosts', async (_, { dispatch }) => {
	try {
		const posts = await axios.get('/posts')
		return posts.data
	} catch (error) {
		dispatch(setError('general', error.response.data))
	}
})

export const getPost = createAsyncThunk<
	PostProps,
	string,
	{ dispatch: AppDispatch }
>('data/getPost', async (postId, { dispatch }) => {
	try {
		const post = await axios.get(`/post/${postId}`)
		return post.data
	} catch (error) {
		dispatch(setError('general', error.response.data))
	}
})

interface ToggleLikeProps {
	postId: string
	alreadyLiked: boolean
}

export const toggleLike = createAsyncThunk<
	PostProps,
	ToggleLikeProps,
	{ dispatch: AppDispatch }
>('data/toggleLike', async ({ postId, alreadyLiked }, { dispatch }) => {
	try {
		const post = await axios.get(
			`/post/${postId}/${alreadyLiked ? 'unlike' : 'like'}`,
		)
		alreadyLiked
			? dispatch(removeFromLikes(post.data))
			: dispatch(addToLikes(post.data))
		return post.data
	} catch (error) {
		dispatch(setError('general', error.response.data))
	}
})

export const deletePost = createAsyncThunk<
	unknown,
	string,
	{ dispatch: AppDispatch }
>('data/deletePost', async (postId, { dispatch }) => {
	try {
		await axios.delete(`/post/${postId}`)
		return postId
	} catch (error) {
		dispatch(setError('general', error.response.data))
	}
})

export const addPost = createAsyncThunk<
	PostProps,
	{ body: string },
	{ dispatch: AppDispatch }
>('data/addPost', async (newPost, { dispatch }) => {
	try {
		const post = await axios.post('/post', newPost)
		newPost.body.trim() !== '' && dispatch(getAllPosts())
		dispatch(clearError('addPost'))
		return post.data
	} catch (error) {
		dispatch(setError('addPost', error.response.data))
	}
})

export interface Comment {
	body: string
	createdAt: Date | string
	userImage: string
	userHandle: string
}

export interface PostProps {
	body: string
	postId: string
	createdAt: Date | string
	likeCount: number
	commentCount: number
	userImage: string
	userHandle: string
	comments: Comment[]
}

export interface DataState {
	posts: PostProps[]
	post: PostProps
	loading: boolean
}

const initialState: DataState = {
	posts: [],
	post: {
		body: '',
		postId: '',
		createdAt: new Date().toISOString(),
		likeCount: 0,
		commentCount: 0,
		userImage: '',
		userHandle: '',
		comments: [],
	},
	loading: false,
}

const dataSlice = createSlice({
	name: 'data',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getAllPosts.pending, (state) => {
			state.loading = true
		})
		builder.addCase(getAllPosts.fulfilled, (state, { payload }) => {
			state.posts = payload
			state.loading = false
		})
		builder.addCase(getAllPosts.rejected, (state) => {
			state.loading = false
		})
		builder.addCase(getPost.pending, (state) => {
			state.post = initialState.post
		})
		builder.addCase(getPost.fulfilled, (state, { payload }) => {
			state.post = payload
			state.loading = false
		})
		builder.addCase(getPost.rejected, (state) => {
			state.loading = false
		})
		builder.addCase(toggleLike.fulfilled, (state, { payload }) => {
			const index = state.posts.findIndex(
				(post) => post.postId === payload.postId,
			)
			state.posts[index].likeCount = payload.likeCount
		})
		builder.addCase(deletePost.fulfilled, (state, { payload }) => {
			const index = state.posts.findIndex(
				(post) => post.postId === payload,
			)
			state.posts.splice(index, 1)
		})
		builder.addCase(addPost.pending, (state, { payload }) => {
			payload && (state.loading = true)
		})
		builder.addCase(addPost.fulfilled, (state, { payload }) => {
			payload && state.posts.push(payload)
			state.loading = false
		})
		builder.addCase(addPost.rejected, (state) => {
			state.loading = false
		})
	},
})

export default dataSlice.reducer
