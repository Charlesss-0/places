import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './slices'

export const createAppStore = () => {
	const store = configureStore({
		reducer: rootReducer,
	})

	return store
}

export type AppStore = ReturnType<typeof createAppStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
