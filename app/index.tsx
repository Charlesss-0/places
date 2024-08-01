import { Animated, StatusBar as RNStatusBar, SafeAreaView, StyleSheet } from 'react-native'
import { DynamicHeader, Places } from '@/components'

import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'

export default function Home() {
	const scrollY = new Animated.Value(0)
	const [headerHeight, setHeaderHight] = useState(0)

	return (
		<SafeAreaView style={[styles.container, { marginTop: RNStatusBar.currentHeight }]}>
			<DynamicHeader
				scrollY={scrollY}
				headerHeight={headerHeight}
				setHeaderHight={setHeaderHight}
			/>

			<Places scrollY={scrollY} top={headerHeight} />

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
