import { AppDispatch, RootState } from '@/lib/redux'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import ThemedText from '@/components/utils/ThemedText'
import { categories } from '@/data'
import { categoriesSlice } from '@/lib/redux'

export default function Categories() {
	const dispatch = useDispatch<AppDispatch>()
	const { setCategory } = categoriesSlice.actions
	const { category } = useSelector((state: RootState) => state.category)

	return (
		<View style={styles.container}>
			{categories.map((item, index) => (
				<TouchableOpacity key={index} onPress={() => dispatch(setCategory(item))}>
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
