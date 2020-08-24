import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import userReducer from './modules/user'
import dataReducer from './modules/data'
import errorsReducer from './modules/errors'

const reducer = combineReducers({
	user: userReducer,
	data: dataReducer,
	errors: errorsReducer,
})

const store = configureStore({
	reducer,
})

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof reducer>

export default store
