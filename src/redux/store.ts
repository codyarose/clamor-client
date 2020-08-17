import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import userReducer from './modules/user'
import uiReducer from './modules/ui'

const reducer = combineReducers({
	user: userReducer,
	ui: uiReducer,
})

const store = configureStore({
	reducer,
})

export type RootState = ReturnType<typeof reducer>

export default store
