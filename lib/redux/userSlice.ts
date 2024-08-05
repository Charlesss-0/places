import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface UserState {
	locationPermission: boolean
	locationCoords: {
		latitude: number
		longitude: number
	} | null
}

const initialState: UserState = {
	locationPermission: false,
	locationCoords: null,
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setLocationPermission: (state, action: PayloadAction<UserState['locationPermission']>) => {
			state.locationPermission = action.payload
		},
		setLocationCoords: (state, action: PayloadAction<UserState['locationCoords']>) => {
			state.locationCoords = action.payload
		},
	},
})

export { userSlice }
