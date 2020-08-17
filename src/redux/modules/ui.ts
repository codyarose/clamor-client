import { createSlice } from '@reduxjs/toolkit'

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

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		setErrors: (state, action) => {
			state.loading = false
			state.errors = action.payload
		},
		clearErrors: () => initialState,
		loadingUI: (state) => {
			state.loading = true
		},
	},
})

export const { setErrors, clearErrors, loadingUI } = uiSlice.actions

export default uiSlice.reducer
