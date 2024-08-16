import { Image, ImageProps, StyleSheet } from 'react-native'

import { Colors } from '@/constant'

export default function ThemedImage({ ...rest }: ImageProps) {
	return <Image style={styles.image} {...rest} />
}

const styles = StyleSheet.create({
	image: {
		flex: 1,
		width: '100%',
		backgroundColor: Colors.gray,
	},
})
