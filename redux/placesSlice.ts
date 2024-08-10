import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface PlaceState {
	homePageData: Places[] | []
	resultsPageData: Places[] | []
	query: string
	category: string
}

const initialState: PlaceState = {
	homePageData: [],
	resultsPageData: [],
	query: '',
	category: 'Food',
}

const placesSlice = createSlice({
	name: 'places',
	initialState,
	reducers: {
		setHomeData: (state, action: PayloadAction<PlaceState['homePageData']>) => {
			state.homePageData = action.payload
		},
		setResultsData: (state, action: PayloadAction<PlaceState['resultsPageData']>) => {
			state.resultsPageData = action.payload
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
