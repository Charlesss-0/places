import AppStateManager from '@/hoc/AppStateManager'
import { Stack } from 'expo-router'
import StoreProvider from './storeProvider'

export default function RootLayout() {
	return (
		<StoreProvider>
			<AppStateManager>
				<Stack>
					<Stack.Screen
						name="index"
						options={{
							headerShown: false,
						}}
					/>
				</Stack>
			</AppStateManager>
		</StoreProvider>
	)
}
