import axios from 'axios'
import { Dispatch } from 'redux'
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
		console.log(login.data)
		const FBIdToken = `Bearer ${login.data.token}`
		localStorage.setItem('FBIdToken', FBIdToken)
		axios.defaults.headers.common['Authorization'] = FBIdToken

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
