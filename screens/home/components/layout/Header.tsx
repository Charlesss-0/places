import Animated, { SharedValue, interpolate, useAnimatedStyle } from 'react-native-reanimated'
import React, { useEffect, useState } from 'react'

import Categories from './Categories'
import { Colors } from '@/constant/Colors'
import SearchSection from './SearchSection'
import { StyleSheet } from 'react-native'
import ThemedText from '@/components/settings/ThemedText'

interface HeaderProps {
	scrollY: SharedValue<number>
	setHeaderHeight: React.Dispatch<React.SetStateAction<number>>
	statusBarHeight: number
}

export default function Header({ scrollY, setHeaderHeight, statusBarHeight }: HeaderProps) {
	const [greeting, setGreeting] = useState('')

	useEffect(() => {
		const currentHour = new Date().getHours()

		if (currentHour >= 5 && currentHour < 12) {
			setGreeting('Good Morning')
		} else if (currentHour >= 12 && currentHour < 17) {
			setGreeting('Good Afternoon')
		} else if (currentHour >= 17 && currentHour < 21) {
			setGreeting('Good Evening')
		} else {
			setGreeting('Good Night')
		}
	}, [])

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateY: interpolate(scrollY.value, [0, 200], [0, -100], 'clamp') }],
		}
	})

	return (
		<Animated.View
			style={[styles.headerContainer, animatedStyle, { top: statusBarHeight }]}
			onLayout={event => {
				setHeaderHeight(event.nativeEvent.layout.height)
			}}
		>
			<ThemedText type="xl" style={styles.title} dark>
				{greeting}
			</ThemedText>

			<SearchSection />

			<Categories />
		</Animated.View>
	)
}

const styles = StyleSheet.create({
	headerContainer: {
		zIndex: 10,
		backgroundColor: Colors.white,
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
	},
	title: {
		marginVertical: 10,
		marginHorizontal: 20,
	},
})
