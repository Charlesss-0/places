import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface AppState {
	loading: boolean
}

const initialState: AppState = {
	loading: false,
}

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setLoading: (state, action: PayloadAction<AppState['loading']>) => {
			state.loading = action.payload
		},
	},
})

export { appSlice }
