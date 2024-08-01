import { StyleSheet, TouchableOpacity, View } from 'react-native'

import ThemedText from '@/components/utils/ThemedText'
import { categories } from '@/data'
import { useState } from 'react'

export default function Categories() {
	const [categoryItem, setCategoryItem] = useState<string>('Food')

	return (
		<View style={styles.container}>
			{categories.map((item, index) => (
				<TouchableOpacity key={index} onPress={() => setCategoryItem(item)}>
					<ThemedText
						key={index}
						style={[styles.text, categoryItem === item && styles.selectedText]}
					>
						{item}
					</ThemedText>
				</TouchableOpacity>
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		top: 0,
		padding: 20,
		flexDirection: 'row',
		justifyContent: 'space-around',
		zIndex: 10,
	},
	text: {
		fontWeight: '400',
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderRadius: 6,
	},
	selectedText: {
		backgroundColor: '#efefef',
	},
})
