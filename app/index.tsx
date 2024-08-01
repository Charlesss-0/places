import { Animated, StatusBar as RNStatusBar, SafeAreaView, StyleSheet } from 'react-native'
import { DynamicHeader, Places } from '@/components'

import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'

export default function Home() {
	const scrollY = new Animated.Value(0)
	const [headerHeight, setHeaderHight] = useState(0)
	const [categoriesHeight, setCategoriesHeight] = useState(0)

	return (
		<SafeAreaView style={[styles.container, { marginTop: RNStatusBar.currentHeight }]}>
			<DynamicHeader
				scrollY={scrollY}
				headerHeight={headerHeight}
				setHeaderHight={setHeaderHight}
				categoriesHeight={categoriesHeight}
				setCategoriesHeight={setCategoriesHeight}
			/>

			<Places scrollY={scrollY} top={headerHeight + categoriesHeight} />

			<StatusBar backgroundColor="#ffffff" style="dark" />
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff',
	},
})
