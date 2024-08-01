import { appSlice } from './appSlice'
import { categoriesSlice } from './categoriesSlice'
import { combineReducers } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
	app: appSlice.reducer,
	category: categoriesSlice.reducer,
})

export default rootReducer
