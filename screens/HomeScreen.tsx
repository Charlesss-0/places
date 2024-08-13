import { DataList, Header } from '@/components'

import { Colors } from '@/constant/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native'

export default function HomeScreen() {
	return (
		<SafeAreaView style={styles.container}>
			<Header />
			<DataList />
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.light.background,
	},
})
