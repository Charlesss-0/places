import { Alert, Linking } from 'react-native'
import { ImageListView, MapView, PlaceDetails, PlaceReviews } from './components'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useLocalSearchParams, useNavigation } from 'expo-router'

import { Colors } from '@/constant/Colors'
import React from 'react'
import { RootState } from '@/redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedText } from '@/components'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export default function DetailsScreen() {
	const navigation = useNavigation()
	const { id, name } = useLocalSearchParams()
	const { data } = useSelector((state: RootState) => state.data)
	const currentItem = data.find(item => id === item.fsq_id)

	useEffect(() => {
		navigation.setOptions({
			title: name,
			headerShadowVisible: false,

			headerTransparent: true,
			headerTitleStyle: styles.headerTitle,
			headerTintColor: Colors.lightGray,
		})
	}, [])

	if (!currentItem) {
		return null
	}

	return (
		<SafeAreaView style={styles.container}>
			<ImageListView />

			<ScrollView showsVerticalScrollIndicator={false}>
				<PlaceDetails place={currentItem} />

				<MapView place={currentItem} />

				<PlaceReviews />
			</ScrollView>

			<NavigationButton
				latitude={currentItem.geocodes.main.latitude}
				longitude={currentItem.geocodes.main.longitude}
			/>
		</SafeAreaView>
	)
}

function NavigationButton({ latitude, longitude }: { latitude: number; longitude: number }) {
	const openNavigationApp = async () => {
		const wazeUrl = `waze://?ll=${latitude},${longitude}&navigate=yes`
		const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`

		try {
			const response = await Linking.canOpenURL(wazeUrl)

			if (!response) {
				return await Linking.openURL(googleMapsUrl)
			}

			return await Linking.openURL(wazeUrl)
		} catch (error: any) {
			Alert.alert(`Unable to open navigation app: ${error.message}`)
		}
	}

	return (
		<View
			style={{
				position: 'absolute',
				bottom: 0,
				left: 0,
				right: 0,
				padding: 15,
				paddingVertical: 10,
				paddingHorizontal: 10,
			}}
		>
			<TouchableOpacity
				style={{
					backgroundColor: Colors.darkGray,
					paddingVertical: 13,
					borderRadius: 50,
					justifyContent: 'center',
					alignItems: 'center',
				}}
				activeOpacity={0.9}
				onPress={openNavigationApp}
			>
				<ThemedText style={{ fontWeight: '500' }} light>
					Start Trip
				</ThemedText>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
	},
	headerTitle: {
		fontWeight: '500',
		fontSize: 16,
	},
})
