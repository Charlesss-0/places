import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface DataState {
	data: PlaceObject[]
	photos: PhotoObject[]
	reviews: ReviewObject[]
	hasNext: boolean
	query: string
	category: string
	fetching: 'fetching' | 'ready'
}

const initialState: DataState = {
	data: [],
	photos: [],
	reviews: [],
	hasNext: false,
	query: '',
	category: 'Food',
	fetching: 'fetching',
}

const dataSlice = createSlice({
	name: 'data',
	initialState,
	reducers: {
		setData: (state, action: PayloadAction<DataState['data']>) => {
			state.data = action.payload
		},
		clearData: state => {
			state.data = []
		},
		setReviews: (state, action: PayloadAction<DataState['reviews']>) => {
			state.reviews = action.payload
		},
		clearReviews: state => {
			state.reviews = []
		},
		setPhotos: (state, action: PayloadAction<DataState['photos']>) => {
			state.photos = action.payload
		},
		clearPhotos: state => {
			state.photos = []
		},
		setHasNext: (state, action: PayloadAction<DataState['hasNext']>) => {
			state.hasNext = action.payload
		},
		setQuery: (state, action: PayloadAction<DataState['query']>) => {
			state.query = action.payload
		},
		setCategory: (state, action: PayloadAction<DataState['category']>) => {
			state.category = action.payload
		},
		setFetching: (state, action: PayloadAction<DataState['fetching']>) => {
			state.fetching = action.payload
		},
	},
})

export { dataSlice }
