import { Animated, StatusBar as RNStatusBar, SafeAreaView, StyleSheet, View } from 'react-native'
import { DynamicHeader, PlacesList } from '@/components'

import { RootState } from '@/lib/redux'
import { StatusBar } from 'expo-status-bar'
import { useSelector } from 'react-redux'
import { useState } from 'react'

export default function Home() {
	const scrollY = new Animated.Value(0)
	const [headerHeight, setHeaderHight] = useState(0)
	const [categoriesHeight, setCategoriesHeight] = useState(0)
	const { homePageData } = useSelector((state: RootState) => state.places)

	return (
		<View style={[styles.container, { marginTop: RNStatusBar.currentHeight }]}>
			<DynamicHeader
				scrollY={scrollY}
				headerHeight={headerHeight}
				setHeaderHight={setHeaderHight}
				categoriesHeight={categoriesHeight}
				setCategoriesHeight={setCategoriesHeight}
			/>

			<PlacesList data={homePageData} scrollY={scrollY} top={headerHeight + categoriesHeight} />

			<StatusBar backgroundColor="#ffffff" style="dark" />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff',
	},
})
