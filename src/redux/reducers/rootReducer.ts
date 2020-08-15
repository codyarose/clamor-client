import { combineReducers } from 'redux'

import userReducer from './userReducer'
import uiReducer from './uiReducer'

const rootReducer = combineReducers({
	user: userReducer,
	ui: uiReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
