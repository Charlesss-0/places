import { appSlice } from './appSlice'
import { configureStore } from '@reduxjs/toolkit'
import { placesSlice } from './placesSlice'
import { userSlice } from './userSlice'

export const createAppStore = () => {
	const store = configureStore({
		reducer: {
			app: appSlice.reducer,
			user: userSlice.reducer,
			places: placesSlice.reducer,
		},
	})

	return store
}

export type AppStore = ReturnType<typeof createAppStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
