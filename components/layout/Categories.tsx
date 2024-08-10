import { Alert, Pressable, StyleSheet, View } from 'react-native'
import { AppDispatch, RootState, dataSlice } from '@/redux'
import { useDispatch, useSelector } from 'react-redux'

import ThemedText from '@/components/settings/ThemedText'
import { categories } from '@/data'
import { useFetch } from '@/hooks'

export default function Categories() {
	const dispatch = useDispatch<AppDispatch>()
	const { fetchPlaces } = useFetch()
	const { clearData, setCategory } = dataSlice.actions
	const { category } = useSelector((state: RootState) => state.data)

	const handlePress = async (item: string) => {
		dispatch(clearData())

		dispatch(setCategory(item))

		try {
			await fetchPlaces({ query: item, nextFetch: false })
		} catch (error) {
			Alert.alert(`Error finding places for category: ${item}`)
		}
	}

	return (
		<View style={styles.container}>
			{categories.map((item, index) => (
				<Pressable key={index} onPress={() => handlePress(item)}>
					<ThemedText key={index} style={[styles.text, category === item && styles.selectedText]}>
						{item}
					</ThemedText>
				</Pressable>
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
