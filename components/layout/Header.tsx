import { StyleSheet, View } from 'react-native'
import { useEffect, useState } from 'react'

import Categories from './Categories'
import SearchSection from './SearchSection'
import ThemedText from '../settings/ThemedText'

export default function DynamicHeader() {
	const [greeting, setGreeting] = useState('')

	useEffect(() => {
		const currentHour = new Date().getHours()

		if (currentHour >= 5 && currentHour < 12) {
			setGreeting('Good Morning ⛅️')
		} else if (currentHour >= 12 && currentHour < 17) {
			setGreeting('Good Afternoon ☀️')
		} else if (currentHour >= 17 && currentHour < 21) {
			setGreeting('Good Evening 🌇')
		} else {
			setGreeting('Good Night 🎑')
		}
	}, [])

	return (
		<View style={styles.headerContainer}>
			<ThemedText type="xl" style={styles.title} dark>
				{greeting}
			</ThemedText>

			<SearchSection />

			<Categories />
		</View>
	)
}

const styles = StyleSheet.create({
	headerContainer: {
		zIndex: 10,
		backgroundColor: '#fff',
	},
	title: {
		fontSize: 20,
		marginVertical: 10,
		marginHorizontal: 20,
	},
})
