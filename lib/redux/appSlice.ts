import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface AppState {
	hasNext: boolean
}

const initialState: AppState = {
	hasNext: false,
}

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setHasNext: (state, action: PayloadAction<AppState['hasNext']>) => {
			state.hasNext = action.payload
		},
	},
})

export { appSlice }
