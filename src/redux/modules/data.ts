import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { addToLikes, removeFromLikes } from './user'
import { setErrors, loadingUI, clearErrors, stopLoadingUI } from './ui'

export const getAllPosts = createAsyncThunk(
	'data/getAllPosts',
	async (_, { dispatch }) => {
		try {
			const posts = await axios.get('/posts')
			return posts.data
		} catch (error) {
			dispatch(setErrors(error.response.data))
		}
	},
)

export const getPost = createAsyncThunk(
	'data/getPost',
	async (postId: string, { dispatch }) => {
		try {
			dispatch(loadingUI())
			const post = await axios.get(`/post/${postId}`)
			dispatch(stopLoadingUI())
			return post.data
		} catch (error) {
			dispatch(setErrors(error.response.data))
		}
	},
)

interface ToggleLikeProps {
	postId: string
	alreadyLiked: boolean
}

export const toggleLike = createAsyncThunk(
	'data/toggleLike',
	async ({ postId, alreadyLiked }: ToggleLikeProps, { dispatch }) => {
		try {
			const post = await axios.get(
				`/post/${postId}/${alreadyLiked ? 'unlike' : 'like'}`,
			)
			alreadyLiked
				? dispatch(removeFromLikes(post.data))
				: dispatch(addToLikes(post.data))
			return post.data
		} catch (error) {
			dispatch(setErrors(error.response.data))
		}
	},
)

export const deletePost = createAsyncThunk(
	'data/deletePost',
	async (postId: string, { dispatch }) => {
		try {
			await axios.delete(`/post/${postId}`)
			return postId
		} catch (error) {
			dispatch(setErrors(error.response.data))
		}
	},
)

export const addPost = createAsyncThunk(
	'data/addPost',
	async (newPost: { body: string }, { dispatch }) => {
		try {
			dispatch(loadingUI())
			const post = await axios.post('/post', newPost)
			dispatch(clearErrors())
			dispatch(getAllPosts())
			return post.data
		} catch (error) {
			dispatch(setErrors(error.response.data))
		}
	},
)

export interface DataState {
	posts: any[]
	post: {
		body: string
		createdAt?: Date
		likeCount: number
		commentCount: number
		userImage: string
		userHandle: string
	}
	loading: boolean
}

const initialState: DataState = {
	posts: [],
	post: {
		body: '',
		likeCount: 0,
		commentCount: 0,
		userImage: '',
		userHandle: '',
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
		builder.addCase(addPost.fulfilled, (state, { payload }) => {
			payload && state.posts.push(payload)
		})
		builder.addCase(getPost.fulfilled, (state, { payload }) => {
			state.post = payload
		})
	},
})

export default dataSlice.reducer
