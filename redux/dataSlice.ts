import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface DataState {
	data: Places[]
	hasNext: boolean
	query: string
	category: string
}

const initialState: DataState = {
	data: [],
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
