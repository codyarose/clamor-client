import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ErrorsState {
	general: string
	login: {
		email: string
		password: string
	}
	signup: {
		email: string
		handle: string
		password: string
		confirmPassword: string
	}
	uploadImage: string
}

const initialState: ErrorsState = {
	general: '',
	login: {
		email: '',
		password: '',
	},
	signup: {
		email: '',
		handle: '',
		password: '',
		confirmPassword: '',
	},
	uploadImage: '',
}

function hasKey<O>(obj: O, key: keyof any): key is keyof O {
	return key in obj
}

const errorsSlice = createSlice({
	name: 'errors',
	initialState,
	reducers: {
		setError: {
			reducer: (state, action: PayloadAction<unknown>) => {
				const { component, error }: any = action.payload
				if (hasKey(state, component)) {
					state[component] = error
				}
			},
			prepare: (component: string, error: ErrorsState) => ({
				payload: { component, error },
			}),
		},
		clearError: (state, { payload }) => {
			switch (payload) {
				case 'login':
					state.login = initialState.login
					break
				case 'signup':
					state.signup = initialState.signup
					break
				case 'uploadImage':
					state.uploadImage = initialState.uploadImage
					break
				default:
					break
			}
		},
	},
})

export const { setError, clearError } = errorsSlice.actions

export default errorsSlice.reducer
