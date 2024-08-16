import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native'

import { Colors } from '@/constant'
import ThemedImage from '../settings/ThemedImage'
import { images } from '@/assets/images'

interface PressableThumbnailProps extends TouchableOpacityProps {
	place: PlaceObject
	onPress: () => Promise<void> | void
}

export default function PressableThumbnail({ style, place, onPress }: PressableThumbnailProps) {
	const uri =
		place.photos.length > 0 ? `${place.photos[0].prefix}original${place.photos[0].suffix}` : ''

	return (
		<TouchableOpacity style={[styles.imageContainer, style]} onPress={onPress} activeOpacity={0.8}>
			{place.photos?.length > 0 ? (
				<ThemedImage source={{ uri: uri }} />
			) : (
				<ThemedImage source={images.place} />
			)}
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	imageContainer: {
		backgroundColor: Colors.lightGray,
		overflow: 'hidden',
	},
})
