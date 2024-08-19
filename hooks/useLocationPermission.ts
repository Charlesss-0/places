import * as Location from 'expo-location'

import { AppDispatch, userSlice } from '@/redux'

import { Alert } from 'react-native'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'

export default function useLocationPermission() {
	const dispatch = useDispatch<AppDispatch>()
	const { setLocationCoords, setLocationPermission } = userSlice.actions

	const requestLocationPermission = useCallback(async () => {
		let { status } = await Location.requestForegroundPermissionsAsync()

		if (status !== 'granted') {
			Alert.alert('Permission to access location was denied. Please enable it in the settings.')
			return
		}

		dispatch(setLocationPermission(true))
		return true
	}, [])

	const getLocation = useCallback(async () => {
		try {
			let location = await Location.getCurrentPositionAsync({
				accuracy: Location.Accuracy.High,
			})
			dispatch(
				setLocationCoords({
					latitude: location.coords.latitude,
					longitude: location.coords.longitude,
				})
			)
		} catch (error: any) {
			Alert.alert(`Error getting location: ${error.message}`)
		}
	}, [])

	return { requestLocationPermission, getLocation }
}
