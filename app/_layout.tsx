import { AppStateManager, StoreProvider } from '@/hoc'

import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

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
