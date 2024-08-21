import { Colors } from '@/constant/Colors'
import { type TextProps, StyleSheet } from 'react-native'
import Animated from 'react-native-reanimated'

interface ThemedTextProps extends TextProps {
	light?: boolean
	dark?: boolean
	type?: 'default' | 'xl' | 'lg' | 'md' | 'sm' | 'link'
	flex?: number
}

export default function ThemedText({
	light,
	dark,
	type = 'default',
	flex,
	style,
	...rest
}: ThemedTextProps) {
	const color = light ? Colors.lightGray : dark ? Colors.darkGray : Colors.gray

	return (
		<Animated.Text
			style={[
				{ color, flex },
				type === 'default' ? styles.default : undefined,
				type === 'xl' ? styles.xl : undefined,
				type === 'lg' ? styles.lg : undefined,
				type === 'md' ? styles.md : undefined,
				type === 'sm' ? styles.sm : undefined,
				type === 'link' ? styles.link : undefined,
				style,
			]}
			numberOfLines={2}
			ellipsizeMode="tail"
			{...rest}
		/>
	)
}

const styles = StyleSheet.create({
	xl: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	lg: {
		fontSize: 18,
	},
	md: {
		fontSize: 16,
	},
	sm: {
		fontSize: 11,
	},
	default: {
		fontSize: 14,
	},
	link: {
		fontSize: 14,
		color: '#0a7ea4',
	},
})
