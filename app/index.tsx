import { FlatList, StyleSheet, Text, View } from 'react-native'

import { StatusBar } from 'expo-status-bar'
import { useServerData } from '@/hooks'

export default function Home() {
	const { places } = useServerData()

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Nearby Restaurants</Text>

			{places && (
				<FlatList
					data={places}
					renderItem={({ item, index }) => (
						<View key={index} style={styles.listItem}>
							<Text style={styles.listText}>{item.name}</Text>
							<Text style={[styles.listText, { fontSize: 10 }]}>{item.categories[0].name}</Text>
						</View>
					)}
					style={styles.listContainer}
					contentContainerStyle={styles.listContentContainer}
					showsVerticalScrollIndicator={false}
				/>
			)}

			<StatusBar style="light" />
		</View>
	)
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontSize: 18,
		fontWeight: '600',
		margin: 5,
	},
	listContainer: {
		width: '100%',
	},
	listContentContainer: {
		paddingBottom: 20,
		gap: 20,
		padding: 10,
	},
	listItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 10,
		backgroundColor: '#2f2f2f',
		borderRadius: 10,
	},
	listText: {
		color: '#efefef',
	},
})
