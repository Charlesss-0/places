import {
	ActivityIndicator,
	Alert,
	FlatList,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native'
import { AddressInfo, DistanceInfo, PressableThumbnail, ThemedImage } from '@/components'
import { AppDispatch, RootState, dataSlice } from '@/redux'
import { useDispatch, useSelector } from 'react-redux'

import { Colors } from '@/constant/Colors'
import { Ionicons } from '@expo/vector-icons'
import ThemedText from '@/components/settings/ThemedText'
import globalStyles from '@/styles'
import { images } from '@/assets/images'
import { placesApi } from '@/api'
import { router } from 'expo-router'
import { useFetch } from '@/hooks'

export default function DataList() {
	const { data, hasNext } = useSelector((state: RootState) => state.data)

	return (
		data.length > 0 && (
			<FlatList
				data={data}
				keyExtractor={({ fsq_id }) => fsq_id}
				renderItem={({ item }) => (
					<View style={styles.listItem}>
						<Thumbnail item={item} />

						<CardInfo place={item} />
					</View>
				)}
				style={styles.container}
				contentContainerStyle={[styles.listContentContainer, { paddingBottom: hasNext ? 20 : 0 }]}
				showsVerticalScrollIndicator={false}
				ListFooterComponent={() => <LoadMoreBtn shouldLoadMore={hasNext} />}
			/>
		)
	)
}

function Thumbnail({ item }: { item: PlaceObject }) {
	const dispatch = useDispatch<AppDispatch>()
	const { setReviews, clearReviews } = dataSlice.actions
	const photos = item.photos.map(photo => `${photo.prefix}original${photo.suffix}`)

	const handlePress = async () => {
		dispatch(clearReviews())

		router.push({ pathname: '/details', params: { id: item.fsq_id, name: item.name } })

		const { reviews } = await placesApi.fetchReviews(item.fsq_id)

		if (reviews) {
			dispatch(setReviews(reviews))
		}
	}

	return photos.length > 0 ? (
		<PressableThumbnail
			source={{ uri: photos[0] }}
			onPress={handlePress}
			style={styles.thumbnail}
		/>
	) : (
		<PressableThumbnail source={images.place} onPress={handlePress} style={styles.thumbnail} />
	)
}

function CardInfo({ place }: { place: PlaceObject }) {
	return (
		<View style={{ gap: 5 }}>
			<View style={globalStyles.horizontalAlignment}>
				<PlaceName place={place} />

				<CategoryInfo place={place} />
			</View>

			<View style={globalStyles.horizontalAlignment}>
				<AddressInfo address={place.location.address as string} />

				<DistanceInfo distance={place.distance} status={place.closed_bucket} />
			</View>
		</View>
	)
}

function PlaceName({ place }: { place: PlaceObject }) {
	return (
		<View style={[styles.cardTextSection, { justifyContent: 'flex-start' }]}>
			<View style={[globalStyles.horizontalAlignment, { justifyContent: 'flex-start' }]}>
				<Ionicons name="home" size={12} color={Colors.darkGray} />
				<ThemedText dark>Name</ThemedText>
			</View>

			<ThemedText type="sm">{place.name}</ThemedText>
		</View>
	)
}

function CategoryInfo({ place }: { place: PlaceObject }) {
	const icon = `${place.categories[0].icon.prefix}88${place.categories[0].icon.suffix}`

	return (
		<View>
			<View style={[globalStyles.horizontalAlignment, { justifyContent: 'flex-end' }]}>
				<ThemedImage source={{ uri: icon }} height={16} width={16} style={styles.categoryIcon} />
				<ThemedText dark>Category</ThemedText>
			</View>

			<ThemedText type="sm" style={{ textAlign: 'right' }}>
				{place.categories[0].name || 'Category not available'}
			</ThemedText>
		</View>
	)
}

function LoadMoreBtn({ shouldLoadMore }: { shouldLoadMore: boolean }) {
	const { fetchPlaces } = useFetch()
	const { query, category } = useSelector((state: RootState) => state.data)
	const { loading } = useSelector((state: RootState) => state.app)
	const currentQuery = query ? query : category

	const handleLoadMore = async () => {
		try {
			await fetchPlaces({ query: currentQuery, nextFetch: true })
		} catch (error) {
			Alert.alert(`Error loading more places: ${error}`)
		}
	}

	return loading ? (
		<ActivityIndicator size="large" color={Colors.darkGray} />
	) : shouldLoadMore ? (
		<TouchableOpacity
			style={{
				padding: 10,
				borderRadius: 10,
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: Colors.lightGray,
			}}
			onPress={handleLoadMore}
			activeOpacity={0.8}
		>
			<ThemedText>Load More</ThemedText>
		</TouchableOpacity>
	) : null
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
	},
	listContentContainer: {
		gap: 30,
	},
	listItem: {
		gap: 10,
	},
	thumbnail: {
		height: 180,
		borderRadius: 10,
		backgroundColor: Colors.lightGray,
		overflow: 'hidden',
	},
	cardTextSection: {
		flex: 1,
		justifyContent: 'flex-end',
		alignSelf: 'flex-start',
	},
	categoryIcon: {
		backgroundColor: Colors.darkGray,
		borderRadius: 50,
	},
})
