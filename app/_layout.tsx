import { AppStateManager, StoreProvider } from '@/hoc'

import { Stack } from 'expo-router'
import { StatusBar } from 'react-native'
import { useEffect } from 'react'

export default function RootLayout() {
	useEffect(() => {
		StatusBar.setBarStyle('dark-content')
		StatusBar.setBackgroundColor('#ffffff')
	}, [])

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
