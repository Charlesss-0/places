import Map, { Marker } from 'react-native-maps'

import { View } from 'react-native'

export default function MapView({ place }: { place: PlaceObject }) {
	const region = {
		latitude: place.geocodes.main.latitude,
		longitude: place.geocodes.main.longitude,
		latitudeDelta: 0.01,
		longitudeDelta: 0.01,
	}

	return (
		<View
			style={{
				height: 200,
				marginBottom: 20,
				marginHorizontal: 20,
				borderRadius: 10,
				overflow: 'hidden',
			}}
		>
			<Map
				style={{ height: '100%', width: '100%' }}
				region={region}
				mapType="hybrid"
				showsUserLocation
				loadingEnabled
			>
				<Marker
					coordinate={{
						latitude: region.latitude,
						longitude: region.longitude,
					}}
					title={place.name}
					description={place.categories[0].name}
				/>
			</Map>
		</View>
	)
}
