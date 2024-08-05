import { AppDispatch, RootState, placesSlice } from '@/lib/redux'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import ThemedText from '@/components/utils/ThemedText'
import { categories } from '@/data'
import { useFetchPlaces } from '@/hooks'

export default function Categories() {
	const dispatch = useDispatch<AppDispatch>()
	const { fetchPlaces } = useFetchPlaces()
	const { locationCoords } = useSelector((state: RootState) => state.user)
	const { setCategory } = placesSlice.actions
	const { category } = useSelector((state: RootState) => state.places)

	return (
		<View style={styles.container}>
			{categories.map((item, index) => (
				<TouchableOpacity
					key={index}
					onPress={async () => {
						dispatch(setCategory(item))
						await fetchPlaces(item, locationCoords, false)
					}}
				>
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
