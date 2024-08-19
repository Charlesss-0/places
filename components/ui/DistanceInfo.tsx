import { StyleSheet, View } from 'react-native'

import { Colors } from '@/constant'
import { Ionicons } from '@expo/vector-icons'
import ThemedText from '../settings/ThemedText'
import globalStyles from '@/styles'

export default function DistanceInfo({ distance, status }: { distance: number; status: string }) {
	const formatDistance = () => {
		if (distance >= 1000) {
			return (distance / 1000).toFixed(2) + ' km'
		}

		return distance.toString() + ' mts'
	}

	const getStatusText = () => {
		if (status.includes('Open')) return 'Open'
		if (status.includes('Closed')) return 'Closed'
		return 'Unsure'
	}

	return (
		<View style={[styles.flex, { alignSelf: 'flex-start' }]}>
			<View style={[globalStyles.horizontalAlignment, styles.distanceInfo]}>
				<Ionicons name="map-outline" size={12} color={Colors.darkGray} />
				<ThemedText dark>Distance</ThemedText>
			</View>

			<View style={[globalStyles.horizontalAlignment, styles.distanceInfo]}>
				<ThemedText type="sm">{formatDistance()}</ThemedText>

				<View style={styles.divider} />

				<ThemedText type="sm">{getStatusText()}</ThemedText>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	flex: {
		flex: 1,
	},
	distanceInfo: {
		justifyContent: 'flex-end',
	},
	divider: {
		height: 10,
		borderLeftWidth: 1,
		borderColor: Colors.gray,
	},
})
