import { Stack } from 'expo-router'

export default function RootLayout() {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					headerStyle: {
						backgroundColor: '#000',
					},
					headerTintColor: '#efefef',
					headerTitle: 'Home',
				}}
			/>
		</Stack>
	)
}
