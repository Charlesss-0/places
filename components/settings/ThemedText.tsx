import { Colors } from '@/constant/Colors'
import { Text, type TextProps, StyleSheet } from 'react-native'

interface ThemedTextProps extends TextProps {
	light?: boolean
	dark?: boolean
	type?: 'default' | 'xl' | 'lg' | 'md' | 'sm' | 'link'
}

export default function ThemedText({
	style,
	light,
	dark,
	type = 'default',
	...rest
}: ThemedTextProps) {
	const color = light ? Colors.light.lightGray : dark ? Colors.light.darkGray : Colors.light.gray

	return (
		<Text
			style={[
				{ color },
				type === 'default' ? styles.default : undefined,
				type === 'xl' ? styles.xl : undefined,
				type === 'lg' ? styles.lg : undefined,
				type === 'md' ? styles.md : undefined,
				type === 'sm' ? styles.sm : undefined,
				type === 'link' ? styles.link : undefined,
				style,
			]}
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
