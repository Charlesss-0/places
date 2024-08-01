import { PayloadAction, createSlice } from '@reduxjs/toolkit'

declare global {
	interface CategoriesState {
		category: 'Food' | 'Coffee' | 'Shopping' | 'Fun' | 'Nightlife'
	}
}

const initialState: CategoriesState = {
	category: 'Food',
}

const categoriesSlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {
		setCategory: (state, action: PayloadAction<CategoriesState['category']>) => {
			state.category = action.payload
		},
	},
})

export { categoriesSlice }
