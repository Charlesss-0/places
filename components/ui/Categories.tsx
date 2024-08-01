import { StyleSheet, Text, View } from 'react-native'

import { categories } from '@/data'

export default function Categories() {
	return (
		<View style={styles.container}>
			{categories.map((item, index) => (
				<Text
					key={index}
					style={[styles.text, item === 'Food' ? { backgroundColor: '#efefef' } : {}]}
				>
					{item}
				</Text>
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
	},
	text: {
		fontSize: 13,
		fontWeight: '400',
		color: '#777777',
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderRadius: 6,
	},
})
