import { appSlice } from './appSlice'
import { configureStore } from '@reduxjs/toolkit'
import { dataSlice } from './dataSlice'
import { userSlice } from './userSlice'

export const createAppStore = () => {
	const store = configureStore({
		reducer: {
			app: appSlice.reducer,
			data: dataSlice.reducer,
			user: userSlice.reducer,
		},
	})

	return store
}

export type AppStore = ReturnType<typeof createAppStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
