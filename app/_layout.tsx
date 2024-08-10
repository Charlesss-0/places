import { AppStateManager, StoreProvider } from '@/hoc'

import { Stack } from 'expo-router'

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
