import { ActionType } from '../actions/userActions'
import { Reducer } from 'redux'

export interface UIState {
	loading: boolean
	errors: {
		[key: string]: string
	}
}
const initialState: UIState = {
	loading: false,
	errors: {},
}

const uiReducer: Reducer<UIState> = (state = initialState, action) => {
	switch (action.type) {
		case ActionType.SET_ERRORS:
			return {
				...state,
				loading: false,
				errors: action.payload,
			}
		case ActionType.CLEAR_ERRORS:
			return {
				...state,
				loading: false,
				errors: {},
			}
		case ActionType.LOADING_UI:
			return {
				...state,
				loading: true,
			}
		default:
			return state
	}
}

export default uiReducer
