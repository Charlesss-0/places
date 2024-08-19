import { StyleSheet, View } from 'react-native'

import { Colors } from '@/constant'
import { FontAwesome6 } from '@expo/vector-icons'
import ThemedText from '../settings/ThemedText'
import globalStyles from '@/styles'

export default function AddressInfo({ address }: { address: string }) {
	return (
		<View style={styles.flex}>
			<View style={[globalStyles.horizontalAlignment, styles.addressInfo]}>
				<FontAwesome6 name="location-dot" size={12} color={Colors.darkGray} />
				<ThemedText dark>Address</ThemedText>
			</View>

			<ThemedText type="sm" numberOfLines={2} ellipsizeMode="tail">
				{address || 'Address not available'}
			</ThemedText>
		</View>
	)
}

const styles = StyleSheet.create({
	flex: {
		flex: 1,
	},
	addressInfo: {
		justifyContent: 'flex-start',
	},
})
