import { appSlice } from './appSlice'
import { combineReducers } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
	app: appSlice.reducer,
})

export default rootReducer
