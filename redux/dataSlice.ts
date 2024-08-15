import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface PlaceReviews {
	id: string
	text: string
	created_at: string
	photo: {
		id: string
		prefix: string
		suffix: string
	}
}

interface DataState {
	data: Places[]
	reviews: PlaceReviews[]
	hasNext: boolean
	query: string
	category: string
}

const initialState: DataState = {
	data: [],
	reviews: [],
	hasNext: false,
	query: '',
	category: 'Food',
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
		setHasNext: (state, action: PayloadAction<DataState['hasNext']>) => {
			state.hasNext = action.payload
		},
		setQuery: (state, action: PayloadAction<DataState['query']>) => {
			state.query = action.payload
		},
		setCategory: (state, action: PayloadAction<DataState['category']>) => {
			state.category = action.payload
		},
	},
})

export { dataSlice }
