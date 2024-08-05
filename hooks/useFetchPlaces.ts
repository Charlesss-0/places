import { AppDispatch, RootState, appSlice, placesSlice } from '@/lib/redux'
import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import axios from 'axios'

export default function useFetchPlaces() {
	const dispatch = useDispatch<AppDispatch>()
	const { setPlacesData, appendPlacesData } = placesSlice.actions
	const { setHasNext } = appSlice.actions

	const fetchPlaces = useCallback(
		async (
			query: string,
			locationCoords: {
				latitude: number
				longitude: number
			} | null,
			nextFetch: boolean = false
		) => {
			try {
				if (!locationCoords) {
					console.log('Location not found!')
					return
				}

				const response = await axios.get('http://192.168.1.15:3000/places/search', {
					params: {
						query,
						lat: locationCoords.latitude,
						lon: locationCoords.longitude,
						next: nextFetch.toString(),
					},
				})

				const { places: placesData, hasNextPage } = response.data

				dispatch(nextFetch ? appendPlacesData(placesData) : setPlacesData(placesData))

				dispatch(!hasNextPage ? setHasNext(false) : setHasNext(true))
			} catch (error) {
				console.error('Error fetching data:', error)
			}
		},
		[dispatch]
	)

	return { fetchPlaces }
}
