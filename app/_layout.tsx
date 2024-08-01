import { Stack } from 'expo-router'
import StoreProvider from './storeProvider'

export default function RootLayout() {
	return (
		<StoreProvider>
			<Stack>
				<Stack.Screen
					name="index"
					options={{
						headerShown: false,
					}}
				/>
			</Stack>
		</StoreProvider>
	)
}
