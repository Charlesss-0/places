import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface Place {
	fsq_id: string
	name: string
	distance: number
	categories: {
		name: string
	}
	closed_bucket: string
	location: {
		address: string
	}
	photos: string[] | []
}

interface PlaceState {
	places: Place[] | []
	query: string
	category: string
}

const initialState: PlaceState = {
	places: [],
	query: '',
	category: 'Food',
}

const placesSlice = createSlice({
	name: 'places',
	initialState,
	reducers: {
		setPlacesData: (state, action: PayloadAction<PlaceState['places']>) => {
			state.places = action.payload
		},
		appendPlacesData: (state, action: PayloadAction<PlaceState['places']>) => {
			state.places = [...state.places, ...action.payload]
		},
		clearPlacesData: state => {
			state.places = []
		},
		setQuery: (state, action: PayloadAction<PlaceState['query']>) => {
			state.query = action.payload
		},
		setCategory: (state, action: PayloadAction<PlaceState['category']>) => {
			state.category = action.payload
		},
	},
})

export { placesSlice }
