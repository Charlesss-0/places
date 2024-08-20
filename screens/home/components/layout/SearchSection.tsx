import { Alert, StyleSheet, TextInput, View } from 'react-native'
import { AppDispatch, RootState, dataSlice } from '@/redux'
import { useDispatch, useSelector } from 'react-redux'

import { Colors } from '@/constant/Colors'
import Feather from '@expo/vector-icons/Feather'
import { useFetch } from '@/hooks'
import { useRef } from 'react'

export default function SearchSection() {
	const dispatch = useDispatch<AppDispatch>()
	const { clearData, setQuery } = dataSlice.actions
	const { query } = useSelector((state: RootState) => state.data)
	const { locationCoords } = useSelector((state: RootState) => state.user)
	const { fetchPlaces } = useFetch()
	const prevQuery = useRef('')

	const handleSearch = async () => {
		if (!locationCoords) {
			Alert.alert('Please enable location services')
			return
		}

		if (!query) {
			Alert.alert('Please enter a value')
			return
		}

		if (prevQuery.current === query) {
			Alert.alert('Please enter another value')
			return
		}

		dispatch(clearData())

		try {
			await fetchPlaces({ query: query, nextFetch: false })

			prevQuery.current = query
		} catch (error) {
			Alert.alert(`Unable to load results for ${query}`)
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.searchContainer}>
				<Feather name="search" size={20} />

				<TextInput
					style={styles.input}
					placeholder="Search"
					placeholderTextColor={Colors.gray}
					value={query}
					onChangeText={e => dispatch(setQuery(e))}
					onSubmitEditing={handleSearch}
				/>
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
		backgroundColor: Colors.lightGray,
	},
	input: {
		flex: 1,
	},
})
