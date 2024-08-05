import { AppDispatch, RootState, placesSlice } from '@/lib/redux'
import { StyleSheet, TextInput, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import Feather from '@expo/vector-icons/Feather'

export default function SearchSection() {
	const dispatch = useDispatch<AppDispatch>()
	const { setQuery } = placesSlice.actions
	const { query } = useSelector((state: RootState) => state.places)

	return (
		<View style={styles.container}>
			<View style={styles.searchContainer}>
				<Feather name="search" size={20} />
				<TextInput
					style={styles.input}
					placeholder="Search"
					placeholderTextColor="#777777"
					value={query}
					onChangeText={e => dispatch(setQuery(e))}
				/>
			</View>

			<View style={styles.controlsContainer}>
				<Feather name="sliders" color="#efefef" size={20} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 5,
		paddingHorizontal: 20,
		gap: 20,
		flexDirection: 'row',
		alignItems: 'center',
	},
	searchContainer: {
		flex: 1,
		paddingVertical: 5,
		paddingLeft: 8,
		gap: 10,
		borderRadius: 10,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#efefef',
	},
	input: {
		flex: 1,
	},
	controlsContainer: {
		borderRadius: 10,
		padding: 9,
		backgroundColor: '#2f2f2f',
		justifyContent: 'center',
		alignItems: 'center',
	},
})
