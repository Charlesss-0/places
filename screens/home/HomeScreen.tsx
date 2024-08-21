import { DataList, Header } from '@/screens/home/components'
import { StatusBar, StyleSheet, View } from 'react-native'

import { Colors } from '@/constant/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSharedValue } from 'react-native-reanimated'
import { useState } from 'react'

export default function HomeScreen() {
	const scrollY = useSharedValue(0)
	const [headerHeight, setHeaderHeight] = useState<number>(0)

	return (
		<SafeAreaView style={styles.container}>
			<Header
				scrollY={scrollY}
				setHeaderHeight={setHeaderHeight}
				statusBarHeight={StatusBar.currentHeight!}
			/>

			<DataList scrollY={scrollY} paddingTop={headerHeight} />
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
	},
})
