import { Image, type ImageSourcePropType, StyleSheet } from 'react-native'

interface ThemedImageProps {
	source: ImageSourcePropType
}

export default function ThemedImage({ source }: ThemedImageProps) {
	return <Image source={source} style={styles.image} />
}

const styles = StyleSheet.create({
	image: {
		flex: 1,
		width: '100%',
	},
})
