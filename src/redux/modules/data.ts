import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { addToLikes, removeFromLikes } from './user'
import { setErrors, loadingUI, clearErrors } from './ui'

export const getPosts = createAsyncThunk('data/getPosts', async (_, { dispatch }) => {
	try {
		const posts = await axios.get('/posts')
		return posts.data
	} catch (error) {
		dispatch(setErrors(error.response.data))
	}
})

export const likePost = createAsyncThunk('data/likePost', async (postId: string, { dispatch }) => {
	try {
		const post = await axios.get(`/post/${postId}/like`)
		dispatch(addToLikes(post.data))
		return post.data
	} catch (error) {
		dispatch(setErrors(error.response.data))
	}
})

export const unlikePost = createAsyncThunk('data/unlikePost', async (postId: string, { dispatch }) => {
	try {
		const post = await axios.get(`/post/${postId}/unlike`)
		dispatch(removeFromLikes(post.data))
		return post.data
	} catch (error) {
		dispatch(setErrors(error.response.data))
	}
})

export const deletePost = createAsyncThunk('data/deletePost', async (postId: string, { dispatch }) => {
	try {
		await axios.delete(`/post/${postId}`)
		return postId
	} catch (error) {
		dispatch(setErrors(error.response.data))
	}
})

export const addPost = createAsyncThunk('data/addPost', async (newPost: { body: string }, { dispatch }) => {
	try {
		dispatch(loadingUI())
		const post = await axios.post('/post', newPost)
		dispatch(clearErrors())
		dispatch(getPosts())
		return post.data
	} catch (error) {
		dispatch(setErrors(error.response.data))
	}
})

export interface DataState {
	posts: any[]
	post: unknown
	loading: boolean
}

const initialState: DataState = {
	posts: [],
	post: {},
	loading: false,
}

const dataSlice = createSlice({
	name: 'data',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getPosts.pending, (state) => {
			state.loading = true
		})
		builder.addCase(getPosts.fulfilled, (state, { payload }) => {
			state.posts = payload
			state.loading = false
		})
		builder.addCase(likePost.fulfilled, (state, { payload }) => {
			const index = state.posts.findIndex((post) => post.postId === payload.postId)
			state.posts[index] = payload
		})
		builder.addCase(unlikePost.fulfilled, (state, { payload }) => {
			const index = state.posts.findIndex((post) => post.postId === payload.postId)
			state.posts[index] = payload
		})
		builder.addCase(deletePost.fulfilled, (state, { payload }) => {
			const index = state.posts.findIndex((post) => post.postId === payload)
			state.posts.splice(index, 1)
		})
		builder.addCase(addPost.fulfilled, (state, { payload }) => {
			payload && state.posts.push(payload)
		})
	},
})

export default dataSlice.reducer
