import { Animated, ScrollView, StyleSheet, View } from 'react-native'
import React, { SetStateAction, useState } from 'react'

import Categories from './Categories'
import SearchSection from './SearchSection'
import ThemedText from '../utils/ThemedText'

interface DynamicHeaderProps {
	scrollY: Animated.Value
	headerHeight: number
	setHeaderHight: React.Dispatch<SetStateAction<number>>
}

export default function DynamicHeader({
	scrollY,
	headerHeight,
	setHeaderHight,
}: DynamicHeaderProps) {
	const [categoriesHeight, setCategoriesHeight] = useState(0)

	const translateY = scrollY.interpolate({
		inputRange: [0, headerHeight],
		outputRange: [0, -headerHeight],
		extrapolate: 'clamp',
	})

	return (
		<View style={{ height: categoriesHeight, position: 'relative' }}>
			<Animated.View
				style={[{ transform: [{ translateY }] }]}
				onLayout={event => {
					const { height } = event.nativeEvent.layout
					setHeaderHight(height)
				}}
			>
				<ThemedText type="lg" style={styles.title}>
					Good Afternoon
				</ThemedText>

				<SearchSection />

				<Animated.View
					style={{
						position: 'absolute',
						top: headerHeight,
						left: 0,
						right: 0,
						zIndex: 10,
					}}
					onLayout={event => {
						const { height } = event.nativeEvent.layout
						setCategoriesHeight(height)
					}}
				>
					<Categories />
				</Animated.View>
			</Animated.View>
		</View>
	)
}

const styles = StyleSheet.create({
	header: {},
	title: {
		fontSize: 20,
		marginVertical: 10,
		marginHorizontal: 20,
	},
	categoriesContainer: {
		backgroundColor: 'white',
		zIndex: 99,
		paddingTop: 10,
	},
})
