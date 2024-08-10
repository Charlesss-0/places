import { DataList, Header } from '@/components'
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native'

export default function Home() {
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
		backgroundColor: '#ffffff',
		marginTop: StatusBar.currentHeight,
	},
})
