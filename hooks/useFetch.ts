import { AppDispatch, RootState, appSlice, placesSlice } from '@/redux'
import { useCallback, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Alert } from 'react-native'
import { placesApi } from '@/api'

interface FetchParams {
	query: string
	pathName: string
	nextFetch: boolean
}

export default function useFetch() {
	const dispatch = useDispatch<AppDispatch>()
	const { setHomeData, setResultsData } = placesSlice.actions
	const { setHasNext } = appSlice.actions
	const { locationCoords } = useSelector((state: RootState) => state.user)

	const fetchPlaces = useCallback(
		async ({ query, pathName, nextFetch = false }: FetchParams): Promise<void> => {
			try {
				if (!locationCoords) {
					Alert.alert('Please enable location services')
					return
				}

				const params = {
					query,
					locationCoords,
					nextFetch,
				}

				const { places, hasNextPage } = await placesApi.fetchPlaces(params)

				if (pathName === '/') {
					dispatch(setHomeData(places))
				} else if (pathName === 'results') {
					dispatch(setResultsData(places))
				}

				dispatch(setHasNext(hasNextPage))
			} catch (error: any) {
				Alert.alert(error.message)
			}
		},
		[dispatch, locationCoords]
	)

	return { fetchPlaces }
}
