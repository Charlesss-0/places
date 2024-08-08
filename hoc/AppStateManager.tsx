import React, { useEffect, useRef } from 'react'
import { useFetch, useLocationPermission } from '@/hooks'

import { RootState } from '@/lib/redux'
import { useSelector } from 'react-redux'

export default function AppStateManager({ children }: { children: React.ReactNode }) {
	const { requestLocationPermission, getLocation } = useLocationPermission()
	const { locationPermission, locationCoords } = useSelector((state: RootState) => state.user)
	const { fetchPlaces } = useFetch()
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

				const params = {
					query: 'food',
					pathName: '/',
					nextFetch: false,
				}

				await fetchPlaces(params)
			}
		}
		fetchData()
	}, [locationCoords])

	return <>{children}</>
}
