import { ActionType } from '../actions/userActions'
import { Reducer } from 'redux'

interface Credentials {
	createdAt: Date
	imageUrl: string
	email: string
	userId: string
	handle: string
}

export interface UserState {
	authenticated: boolean
	credentials: Partial<Credentials>
	likes: any[]
	notifications: any[]
}

const initialState: UserState = {
	authenticated: false,
	credentials: {},
	likes: [],
	notifications: [],
}

const userReducer: Reducer<UserState> = (state = initialState, action) => {
	switch (action.type) {
		case ActionType.SET_AUTHENTICATED:
			return {
				...state,
				authenticated: true,
			}
		case ActionType.SET_UNAUTHENTICATED:
			return initialState
		case ActionType.SET_USER:
			return {
				authenticated: true,
				...action.payload,
			}
		default:
			return state
	}
}

export default userReducer
