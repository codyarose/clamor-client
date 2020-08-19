import { createSlice, Dispatch, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { loadingUI, clearErrors, setErrors } from './ui'

export const getUserData = createAsyncThunk('user/getUserData', async () => {
	const user = await axios.get('/user', { headers: { Authorization: localStorage.getItem('FBIdToken') } })
	return user.data
})

export const loginUser = createAsyncThunk(
	'user/loginUser',
	async (userData: { email: string; password: string }, { dispatch }) => {
		dispatch(loadingUI())
		try {
			const login = await axios.post('/login', { ...userData })
			setAuthHeader(login.data.token)
			dispatch(getUserData())
			dispatch(clearErrors())
		} catch (error) {
			dispatch(setErrors(error.response.data))
		}
	},
)

export const signupUser = createAsyncThunk(
	'user/signupUser',
	async (newUserData: { email: string; password: string; confirmPassword: string; handle: string }, { dispatch }) => {
		dispatch(loadingUI())
		try {
			const signup = await axios.post('/signup', { ...newUserData })
			setAuthHeader(signup.data.token)
			dispatch(getUserData())
			dispatch(clearErrors())
		} catch (error) {
			dispatch(setErrors(error.response.data))
		}
	},
)

interface Credentials {
	createdAt: Date
	imageUrl: string
	email: string
	userId: string
	handle: string
	bio: string
	website: string
	location: string
}

interface Like {
	userHandle: string
	postId: string
}

export interface UserState {
	authenticated: boolean
	loading: boolean
	credentials: Partial<Credentials>
	likes: Like[]
	notifications: any[]
	error: {}
}

const initialState: UserState = {
	authenticated: false,
	loading: false,
	credentials: {},
	likes: [],
	notifications: [],
	error: {},
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUnauthed: () => initialState,
		setUser: (state, action) => {
			const { credentials, likes, notifications } = action.payload
			state.authenticated = true
			state.loading = false
			state.credentials = credentials
			state.likes = likes
			state.notifications = notifications
		},
		loadingUser: (state) => {
			state.loading = true
		},
		addToLikes: (state, action) => {
			state.likes.push({
				userHandle: state.credentials.handle || '',
				postId: action.payload.postId,
			})
		},
		removeFromLikes: (state, action) => {
			state.likes = state.likes.filter((like) => like.postId !== action.payload.postId)
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getUserData.pending, (state) => {
			state.loading = true
		})
		builder.addCase(getUserData.fulfilled, (state, { payload }) => {
			const { credentials, likes, notifications } = payload
			state.authenticated = true
			state.loading = false
			state.credentials = credentials
			state.likes = likes
			state.notifications = notifications
		})
		builder.addCase(getUserData.rejected, (state, { error }) => {
			state.error = error
		})
	},
})

export const { setUnauthed, setUser, loadingUser, addToLikes, removeFromLikes } = userSlice.actions

export default userSlice.reducer

export const logoutUser = () => (dispatch: Dispatch) => {
	localStorage.removeItem('FBIdToken')
	delete axios.defaults.headers.common['Authorization']
	dispatch(setUnauthed())
}

export const uploadImage = (formData: FormData) => async (dispatch: Dispatch) => {
	try {
		dispatch(loadingUser())
		await axios.post('/user/image', formData)

		dispatch(loadingUser())
		const user = await axios.get('/user', { headers: { Authorization: localStorage.getItem('FBIdToken') } })
		dispatch(setUser(user.data))
	} catch (error) {
		dispatch(setErrors(error.response.data))
	}
}

export const editUserDetails = (userDetails: unknown) => async (dispatch: Dispatch) => {
	try {
		dispatch(loadingUser())
		await axios.post('/user', userDetails)

		dispatch(loadingUser())
		const user = await axios.get('/user', { headers: { Authorization: localStorage.getItem('FBIdToken') } })
		dispatch(setUser(user.data))
	} catch (error) {
		dispatch(setErrors(error.response.data))
	}
}

const setAuthHeader = (token: string) => {
	const FBIdToken = `Bearer ${token}`
	localStorage.setItem('FBIdToken', FBIdToken)
	axios.defaults.headers.common['Authorization'] = FBIdToken
}
