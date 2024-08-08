import { Animated, StyleSheet, View } from 'react-native'
import { PlacesList, SearchSection } from '@/components'

import { RootState } from '@/lib/redux'
import { useEffect } from 'react'
import { useNavigation } from 'expo-router'
import { useSelector } from 'react-redux'

export default function Results() {
	const navigation = useNavigation()
	const scrollY = new Animated.Value(0)
	const { query, resultsPageData } = useSelector((state: RootState) => state.places)

	useEffect(() => {
		navigation.setOptions({
			title: query ? `Results for "${query}"` : '',
			headerShadowVisible: false,
			headerTitleStyle: {
				fontWeight: '400',
				fontSize: 18,
			},
		})
	}, [navigation, query])

	return (
		<View style={styles.container}>
			<View style={[styles.searchSection]}>
				<SearchSection />
			</View>

			<PlacesList data={resultsPageData} scrollY={scrollY} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff',
	},
	searchSection: {
		paddingTop: 5,
		paddingBottom: 15,
		backgroundColor: '#ffffff',
	},
})
