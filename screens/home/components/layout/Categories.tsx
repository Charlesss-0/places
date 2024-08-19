import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native'
import { AppDispatch, RootState, dataSlice } from '@/redux'
import { useDispatch, useSelector } from 'react-redux'

import { Colors } from '@/constant/Colors'
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
				<TouchableOpacity key={index} onPress={() => handlePress(item)} activeOpacity={0.5}>
					<ThemedText key={index} style={[styles.text, category === item && styles.selectedText]}>
						{item}
					</ThemedText>
				</TouchableOpacity>
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
		flexDirection: 'row',
		justifyContent: 'space-around',
		zIndex: 10,
	},
	text: {
		fontWeight: '400',
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderRadius: 5,
	},
	selectedText: {
		backgroundColor: Colors.lightGray,
	},
})
