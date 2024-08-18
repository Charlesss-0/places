import {
	type ImageSourcePropType,
	StyleSheet,
	TouchableOpacity,
	type TouchableOpacityProps,
} from 'react-native'

import { Colors } from '@/constant'
import ThemedImage from '../settings/ThemedImage'
import { images } from '@/assets/images'

interface PressableThumbnailProps extends TouchableOpacityProps {
	source: ImageSourcePropType
	onPress: () => Promise<void> | void
}

export default function PressableThumbnail({ source, onPress, style }: PressableThumbnailProps) {
	const isEmptySource = (): boolean => {
		if (typeof source === 'number') {
			// if it's a number, assume it's a valid local image reference
			return false
		} else if (source && typeof source === 'object') {
			// if it's an object, check if the URI exists
			return !source.uri
		}
		// if it doesn't match the above condition, it's considered empty
		return true
	}

	return (
		<TouchableOpacity style={[styles.imageContainer, style]} onPress={onPress} activeOpacity={0.8}>
			{!isEmptySource() ? <ThemedImage source={source} /> : <ThemedImage source={images.place} />}
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	imageContainer: {
		backgroundColor: Colors.lightGray,
		overflow: 'hidden',
	},
})
