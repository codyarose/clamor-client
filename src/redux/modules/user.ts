import { createSlice, Dispatch } from '@reduxjs/toolkit'
import { History, LocationState } from 'history'
import axios from 'axios'

import { loadingUI, clearErrors, setErrors } from './ui'

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

export interface UserState {
	authenticated: boolean
	loading: boolean
	credentials: Partial<Credentials>
	likes: any[]
	notifications: any[]
}

const initialState: UserState = {
	authenticated: false,
	loading: false,
	credentials: {},
	likes: [],
	notifications: [],
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setAuthed: (state) => {
			state.authenticated = true
		},
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
	},
})

export const { setAuthed, setUnauthed, setUser, loadingUser } = userSlice.actions

export default userSlice.reducer

export const loginUser = (userData: { email: string; password: string }, history: History<LocationState>) => async (
	dispatch: Dispatch,
) => {
	dispatch(loadingUI())
	try {
		const login = await axios.post('/login', { ...userData })
		setAuthHeader(login.data.token)
		dispatch(loadingUser())
		const user = await axios.get('/user')
		dispatch(setUser(user.data))
		dispatch(clearErrors())
		history.push('/')
	} catch (error) {
		dispatch(setErrors(error.response.data))
	}
}

export const signupUser = (
	newUserData: { email: string; password: string; confirmPassword: string; handle: string },
	history: History<LocationState>,
) => async (dispatch: Dispatch) => {
	dispatch(loadingUI())
	try {
		const signup = await axios.post('/signup', { ...newUserData })
		setAuthHeader(signup.data.token)
		dispatch(loadingUser())
		const user = await axios.get('/user')
		dispatch(setUser(user.data))
		dispatch(clearErrors())
		history.push('/')
	} catch (error) {
		dispatch(setErrors(error.response.data))
	}
}

export const logoutUser = () => (dispatch: Dispatch) => {
	localStorage.removeItem('FBIdToken')
	delete axios.defaults.headers.common['Authorization']
	dispatch(setUnauthed())
}

export const getUserData = () => async (dispatch: Dispatch) => {
	try {
		dispatch(loadingUser())
		const user = await axios.get('/user', { headers: { Authorization: localStorage.getItem('FBIdToken') } })
		dispatch(setUser(user.data))
	} catch (error) {
		dispatch(setErrors(error.response.data))
	}
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

const setAuthHeader = (token: string) => {
	const FBIdToken = `Bearer ${token}`
	localStorage.setItem('FBIdToken', FBIdToken)
	axios.defaults.headers.common['Authorization'] = FBIdToken
}
