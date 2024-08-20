export default {
	expo: {
		name: 'Places',
		slug: 'Places',
		version: '1.0.0',
		orientation: 'portrait',
		scheme: 'myapp',
		userInterfaceStyle: 'automatic',
		platforms: ['ios', 'android', 'web'],
		splash: {
			image: './assets/splash.png',
			resizeMode: 'cover',
			backgroundColor: '#ffffff',
		},
		icon: './assets/icon.png',
		ios: {
			supportsTablet: true,
			bundleIdentifier: 'com.places.app',
		},
		android: {
			package: 'com.places.app',
			versionCode: 1,
			adaptiveIcon: {
				foregroundImage: './assets/adaptive-icon.png',
				backgroundColor: '#ffffff',
			},
			config: {
				googleMaps: {
					apiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
				},
			},
			permissions: ['ACCESS_COARSE_LOCATION', 'ACCESS_FINE_LOCATION', 'INTERNET'],
		},
		web: {
			bundler: 'metro',
			favicon: './assets/favicon.png',
			output: 'static',
		},
		plugins: ['expo-router'],
		experiments: {
			typedRoutes: true,
		},
		extra: {
			router: {
				origin: false,
			},
			eas: {
				projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
			},
		},
	},
}
