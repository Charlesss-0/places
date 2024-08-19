import {
	type ImageSourcePropType,
	StyleSheet,
	TouchableOpacity,
	type TouchableOpacityProps,
} from 'react-native'

import { Colors } from '@/constant'
import ThemedImage from '../settings/ThemedImage'

interface PressableThumbnailProps extends TouchableOpacityProps {
	source: ImageSourcePropType
	onPress: () => Promise<void> | void
}

export default function PressableThumbnail({ source, onPress, style }: PressableThumbnailProps) {
	return (
		<TouchableOpacity style={[styles.imageContainer, style]} onPress={onPress} activeOpacity={0.8}>
			<ThemedImage source={source} />
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	imageContainer: {
		backgroundColor: Colors.lightGray,
		overflow: 'hidden',
	},
})
