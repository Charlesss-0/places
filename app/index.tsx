import { Animated, SafeAreaView, StatusBar, StyleSheet } from 'react-native'
import { DynamicHeader, PlacesList } from '@/components'

import { RootState } from '@/redux'
import { useSelector } from 'react-redux'
import { useState } from 'react'

export default function Home() {
	const scrollY = new Animated.Value(0)
	const [headerHeight, setHeaderHight] = useState(0)
	const [categoriesHeight, setCategoriesHeight] = useState(0)
	const { homePageData } = useSelector((state: RootState) => state.places)

	return (
		<SafeAreaView style={[styles.container, { marginTop: StatusBar.currentHeight }]}>
			<StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

			<DynamicHeader
				scrollY={scrollY}
				headerHeight={headerHeight}
				setHeaderHight={setHeaderHight}
				categoriesHeight={categoriesHeight}
				setCategoriesHeight={setCategoriesHeight}
			/>

			<PlacesList data={homePageData} scrollY={scrollY} top={headerHeight + categoriesHeight} />
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff',
	},
})
