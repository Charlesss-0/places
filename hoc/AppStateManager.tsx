import React, { useEffect, useRef, useState } from 'react'
import { useFetchPlaces, useLocationPermission } from '@/hooks'

import { RootState } from '@/lib/redux'
import { useSelector } from 'react-redux'

export default function AppStateManager({ children }: { children: React.ReactNode }) {
	const { locationPermission, locationCoords } = useSelector((state: RootState) => state.user)
	const { requestLocationPermission, getLocation } = useLocationPermission()
	const { fetchPlaces } = useFetchPlaces()
	const hasFetched = useRef(false)

	useEffect(() => {
		const getCurrentLocation = async () => {
			if (!locationPermission) {
				const permission = await requestLocationPermission()
				if (!permission) return
			}

			await getLocation()
		}
		getCurrentLocation()
	}, [locationPermission])

	useEffect(() => {
		const fetchData = async () => {
			if (locationCoords && !hasFetched.current) {
				hasFetched.current = true
				console.log('Fetching places data')

				try {
					await fetchPlaces('food', locationCoords, false)
				} catch (error) {
					console.log('Unable to retrieve data:', error)
				}
			}
		}
		fetchData()
	}, [locationCoords])

	return <>{children}</>
}
