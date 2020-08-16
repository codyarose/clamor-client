import axios from 'axios'
import { Dispatch, Action } from 'redux'
import { History, LocationState } from 'history'

export enum ActionType {
	SET_AUTHENTICATED,
	SET_UNAUTHENTICATED,
	SET_USER,
	LOADING_USER,
	LOADING_UI,
	CLEAR_ERRORS,
	SET_ERRORS,
}

export const loginUser = (userData: { email: string; password: string }, history: History<LocationState>) => async (
	dispatch: Dispatch,
) => {
	dispatch({ type: ActionType.LOADING_UI })
	try {
		const login = await axios.post('/login', { ...userData })
		setAuthHeader(login.data.token)

		dispatch({ type: ActionType.LOADING_USER })
		const user = await axios.get('/user')
		dispatch({
			type: ActionType.SET_USER,
			payload: user.data,
		})

		dispatch({ type: ActionType.CLEAR_ERRORS })
		history.push('/')
	} catch (error) {
		dispatch({
			type: ActionType.SET_ERRORS,
			payload: error.response.data,
		})
	}
}

export const signupUser = (newUserData: { email: string; password: string }, history: History<LocationState>) => async (
	dispatch: Dispatch<Action<ActionType>>,
) => {
	dispatch({ type: ActionType.LOADING_UI })
	try {
		const signup = await axios.post('/signup', { ...newUserData })
		setAuthHeader(signup.data.token)

		dispatch({ type: ActionType.LOADING_USER })
		const user = await axios.get('/user')
		dispatch({
			type: ActionType.SET_USER,
			payload: user.data,
		})

		dispatch({ type: ActionType.CLEAR_ERRORS })
		history.push('/')
	} catch (error) {
		dispatch({
			type: ActionType.SET_ERRORS,
			payload: error.response.data,
		})
	}
}

export const logoutUser = () => (dispatch: Dispatch) => {
	localStorage.removeItem('FBIdToken')
	delete axios.defaults.headers.common['Authorization']
	dispatch({ type: ActionType.SET_UNAUTHENTICATED })
}

export const getUserData = () => async (dispatch: Dispatch) => {
	try {
		dispatch({ type: ActionType.LOADING_USER })
		const user = await axios.get('/user', { headers: { Authorization: localStorage.getItem('FBIdToken') } })
		console.log('ran')
		dispatch({
			type: ActionType.SET_USER,
			payload: user.data,
		})
	} catch (error) {
		dispatch({
			type: ActionType.SET_ERRORS,
			payload: error.response.data,
		})
	}
}

const setAuthHeader = (token: string) => {
	const FBIdToken = `Bearer ${token}`
	localStorage.setItem('FBIdToken', FBIdToken)
	axios.defaults.headers.common['Authorization'] = FBIdToken
}
