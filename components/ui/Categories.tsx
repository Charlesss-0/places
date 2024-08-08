import { AppDispatch, RootState, placesSlice } from '@/lib/redux'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import ThemedText from '@/components/settings/ThemedText'
import { categories } from '@/data'
import { useFetch } from '@/hooks'

export default function Categories() {
	const dispatch = useDispatch<AppDispatch>()
	const { fetchPlaces } = useFetch()
	const { setCategory } = placesSlice.actions
	const { category } = useSelector((state: RootState) => state.places)

	const handlePress = async (item: string) => {
		dispatch(setCategory(item))

		const params = {
			query: item,
			pathName: '/',
			nextFetch: false,
		}

		await fetchPlaces(params)
	}

	return (
		<View style={styles.container}>
			{categories.map((item, index) => (
				<TouchableOpacity key={index} onPress={() => handlePress(item)}>
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
