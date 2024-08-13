import { AppDispatch, RootState, appSlice, dataSlice } from '@/redux'
import { useDispatch, useSelector } from 'react-redux'

import { Alert } from 'react-native'
import { placesApi } from '@/api'
import { useCallback } from 'react'

interface FetchParams {
	query: string
	nextFetch: boolean
}

export default function useFetch() {
	const dispatch = useDispatch<AppDispatch>()
	const { locationCoords } = useSelector((state: RootState) => state.user)
	const { setData, setHasNext } = dataSlice.actions
	const { setLoading } = appSlice.actions

	const fetchPlaces = useCallback(
		async ({ query, nextFetch = false }: FetchParams): Promise<void> => {
			dispatch(setLoading(true))

			if (!locationCoords) {
				Alert.alert('Please enable location services')
				return
			}

			try {
				const { places, hasNextPage } = await placesApi.fetchPlaces({
					query: query,
					locationCoords,
					nextFetch: nextFetch,
				})

				dispatch(setData(places))
				dispatch(setHasNext(hasNextPage))
			} catch (error: any) {
				Alert.alert(error.message)
			} finally {
				dispatch(setLoading(false))
			}
		},
		[dispatch, locationCoords]
	)

	return { fetchPlaces }
}
