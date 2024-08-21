import { ActivityIndicator, Alert, StyleSheet, TouchableOpacity, View } from 'react-native'
import { AddressInfo, DistanceInfo, PressableThumbnail, ThemedImage } from '@/components'
import Animated, { SharedValue, useAnimatedScrollHandler } from 'react-native-reanimated'
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

export default function DataList({
	scrollY,
	paddingTop,
}: {
	scrollY: SharedValue<number>
	paddingTop: number
}) {
	const { data, hasNext } = useSelector((state: RootState) => state.data)
	const { query, category } = useSelector((state: RootState) => state.data)
	const currentQuery = query ? query : category

	const scrollHandler = useAnimatedScrollHandler(event => {
		scrollY.value = event.contentOffset.y
	})

	return data.length > 0 ? (
		<Animated.FlatList
			data={data}
			keyExtractor={({ fsq_id }) => fsq_id}
			renderItem={({ item }) => (
				<View style={styles.listItem}>
					<Thumbnail item={item} />

					<CardInfo place={item} />
				</View>
			)}
			style={[styles.container, { paddingTop }]}
			contentContainerStyle={[styles.listContentContainer, { paddingBottom: hasNext ? 20 : 0 }]}
			showsVerticalScrollIndicator={false}
			ListFooterComponent={() => <LoadMoreBtn shouldLoadMore={hasNext} />}
			onScroll={scrollHandler}
		/>
	) : (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<ThemedText dark>No results found for {currentQuery}</ThemedText>
		</View>
	)
}

function Thumbnail({ item }: { item: PlaceObject }) {
	const dispatch = useDispatch<AppDispatch>()
	const { setReviews, clearReviews, setPhotos, clearPhotos, setFetching } = dataSlice.actions
	const photos = item.photos.map(photo => `${photo.prefix}original${photo.suffix}`)

	const handlePress = async () => {
		dispatch(clearPhotos())
		dispatch(clearReviews())

		try {
			dispatch(setFetching('fetching'))

			router.push({ pathname: '/details', params: { id: item.fsq_id, name: item.name } })

			const { reviews } = await placesApi.fetchReviews(item.fsq_id)
			const { photos } = await placesApi.fetchPhotos(item.fsq_id)

			if (reviews) dispatch(setReviews(reviews))
			if (photos) dispatch(setPhotos(photos))
		} catch (error: any) {
			Alert.alert(`Error fetching data: ${error.message}`)
		} finally {
			dispatch(setFetching('ready'))
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
