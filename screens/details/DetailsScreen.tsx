import { Alert, Linking, Platform, Pressable, StatusBar } from 'react-native'
import Animated, {
	SharedValue,
	interpolateColor,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue,
} from 'react-native-reanimated'
import { ImageListView, MapView, PlaceDetails, PlaceReviews } from './components'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import { AntDesign } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import { RootState } from '@/redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedText } from '@/components'
import { useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

export default function DetailsScreen() {
	const navigation = useNavigation()
	const { id, name } = useLocalSearchParams()
	const { data } = useSelector((state: RootState) => state.data)
	const currentItem = data.find(item => id === item.fsq_id)

	const scrollY = useSharedValue(0)
	const scrollHandler = useAnimatedScrollHandler(event => {
		scrollY.value = event.contentOffset.y
	})

	useEffect(() => {
		navigation.setOptions({
			header: () => <NavigationHeader scrollY={scrollY} title={name} />,
		})
	}, [scrollY, name, navigation])

	if (!currentItem) {
		return <ThemedText dark>Could not load place</ThemedText>
	}

	return (
		<SafeAreaView style={styles.container}>
			<Animated.ScrollView
				onScroll={scrollHandler}
				showsVerticalScrollIndicator={false}
				scrollEventThrottle={16}
			>
				<ImageListView />

				<PlaceDetails place={currentItem} />

				<MapView place={currentItem} />

				<PlaceReviews />
			</Animated.ScrollView>

			<NavigationButton
				latitude={currentItem.geocodes.main.latitude}
				longitude={currentItem.geocodes.main.longitude}
			/>
		</SafeAreaView>
	)
}

function NavigationHeader({
	scrollY,
	title,
}: {
	scrollY: SharedValue<number>
	title: string | string[]
}) {
	const navigation = useNavigation()
	const AnimatedAntDesign = Animated.createAnimatedComponent(AntDesign)

	const animatedHeaderStyle = useAnimatedStyle(() => {
		return {
			backgroundColor: interpolateColor(scrollY.value, [0, 200], ['transparent', Colors.white]),
		}
	})

	const animatedTitleStyle = useAnimatedStyle(() => {
		const color = interpolateColor(scrollY.value, [0, 200], [Colors.lightGray, Colors.darkGray])

		return {
			color,
		}
	})

	return (
		<Animated.View style={[styles.header, animatedHeaderStyle]}>
			<Pressable onPress={() => navigation.goBack()}>
				<AnimatedAntDesign
					name="arrowleft"
					size={24}
					color={animatedTitleStyle.color}
					style={animatedTitleStyle}
				/>
			</Pressable>

			<ThemedText
				style={[animatedTitleStyle, { fontWeight: '500', flex: 1, paddingLeft: 20 }]}
				type="md"
			>
				{title}
			</ThemedText>
		</Animated.View>
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
		<View style={styles.navigationButtonContainer}>
			<TouchableOpacity
				style={styles.navigationButton}
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
	header: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
		position: 'absolute',
		top: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
		left: 0,
		right: 0,
		zIndex: 100,
	},
	headerTitle: {
		fontWeight: '500',
		fontSize: 16,
	},
	navigationButtonContainer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		padding: 15,
		paddingVertical: 10,
		paddingHorizontal: 10,
	},
	navigationButton: {
		backgroundColor: Colors.darkGray,
		paddingVertical: 13,
		borderRadius: 50,
		justifyContent: 'center',
		alignItems: 'center',
	},
})
