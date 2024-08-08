import { Animated, StyleSheet } from 'react-native'
import React, { SetStateAction } from 'react'

import Categories from './Categories'
import SearchSection from './SearchSection'
import ThemedText from '../settings/ThemedText'

interface DynamicHeaderProps {
	scrollY: Animated.Value
	headerHeight: number
	setHeaderHight: React.Dispatch<SetStateAction<number>>
	categoriesHeight: number
	setCategoriesHeight: React.Dispatch<SetStateAction<number>>
}

export default function DynamicHeader({
	scrollY,
	headerHeight,
	setHeaderHight,
	categoriesHeight,
	setCategoriesHeight,
}: DynamicHeaderProps) {
	const translateY = scrollY.interpolate({
		inputRange: [0, categoriesHeight],
		outputRange: [0, -headerHeight],
		extrapolate: 'clamp',
	})

	return (
		<Animated.View style={[styles.headerContainer, { transform: [{ translateY }] }]}>
			<Animated.View
				onLayout={event => {
					const { height } = event.nativeEvent.layout
					setHeaderHight(height)
				}}
			>
				<ThemedText type="xl" style={styles.title} dark>
					Good Evening
				</ThemedText>

				<SearchSection />
			</Animated.View>

			<Animated.View
				onLayout={event => {
					const { height } = event.nativeEvent.layout
					setCategoriesHeight(height)
				}}
			>
				<Categories />
			</Animated.View>
		</Animated.View>
	)
}

const styles = StyleSheet.create({
	headerContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		zIndex: 10,
		backgroundColor: '#fff',
	},
	title: {
		fontSize: 20,
		marginVertical: 10,
		marginHorizontal: 20,
	},
})
