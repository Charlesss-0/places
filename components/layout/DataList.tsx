import { ActivityIndicator, Alert, FlatList, Pressable, StyleSheet, View } from 'react-native'
import { FontAwesome6, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { RootState, dataSlice } from '@/redux'
import { useDispatch, useSelector } from 'react-redux'

import { Colors } from '@/constant/Colors'
import PressableThumbnail from '../ui/PressableThumbnail'
import ThemedImage from '../settings/ThemedImage'
import ThemedText from '@/components/settings/ThemedText'
import globalStyles from '@/styles'
import { placesApi } from '@/api'
import { router } from 'expo-router'
import { useFetch } from '@/hooks'

export default function DataList() {
	const { data, hasNext } = useSelector((state: RootState) => state.data)

	return (
		<>
			{data.length > 0 && (
				<FlatList
					data={data}
					keyExtractor={({ fsq_id }) => fsq_id}
					renderItem={({ item }) => (
						<View style={styles.listItem}>
							<Thumbnail item={item} />
							<FooterText item={item} />
						</View>
					)}
					style={styles.container}
					contentContainerStyle={[styles.listContentContainer, { paddingBottom: hasNext ? 20 : 0 }]}
					showsVerticalScrollIndicator={false}
					ListFooterComponent={() => <LoadMoreBtn shouldLoadMore={hasNext} />}
				/>
			)}
		</>
	)
}

function Thumbnail({ item }: { item: PlaceObject }) {
	const dispatch = useDispatch()
	const { setReviews, clearReviews } = dataSlice.actions

	const handlePress = async () => {
		dispatch(clearReviews())

		router.push({ pathname: '/details', params: { id: item.fsq_id, name: item.name } })

		const { reviews } = await placesApi.fetchReviews(item.fsq_id)

		if (reviews) {
			dispatch(setReviews(reviews))
		}
	}

	return <PressableThumbnail place={item} onPress={handlePress} style={styles.thumbnail} />
}

function FooterText({ item }: { item: PlaceObject }) {
	return (
		<View style={{ gap: 5 }}>
			<View style={globalStyles.horizontalAlignment}>
				<View style={[styles.cardTextSection, { justifyContent: 'flex-start' }]}>
					<Ionicons name="home" size={12} color={Colors.darkGray} />

					<ThemedText dark>{item.name}</ThemedText>
				</View>

				<View style={styles.cardTextSection}>
					<ThemedText dark>{item.categories[0].name}</ThemedText>

					<ThemedImage
						source={{
							uri: `${item.categories[0].icon.prefix}88${item.categories[0].icon.suffix}`,
						}}
						height={20}
						width={20}
						style={{
							backgroundColor: Colors.darkGray,
							borderRadius: 50,
						}}
					/>
				</View>
			</View>

			<View style={globalStyles.horizontalAlignment}>
				<View style={[styles.cardTextSection, { justifyContent: 'flex-start' }]}>
					<FontAwesome6 name="location-dot" size={12} color={Colors.darkGray} />

					{item.location.address ? (
						<ThemedText type="sm" flex={1}>
							{item.location.address}
						</ThemedText>
					) : (
						<ThemedText type="sm">Address not available</ThemedText>
					)}
				</View>

				<View style={styles.cardTextSection}>
					{item.distance ? (
						<>
							<Ionicons name="map-outline" size={12} color="#1c6e8c" />

							<ThemedText type="sm" style={{ color: '#1c6e8c' }}>
								{item.distance} mts
							</ThemedText>

							<View
								style={{
									height: 10,
									borderLeftWidth: 1,
									borderColor: '#1c6e8c',
								}}
							></View>
						</>
					) : (
						<ThemedText type="sm">Distance not available</ThemedText>
					)}

					{item.hours.open_now ? (
						<ThemedText type="sm" style={{ color: '#1c6e8c' }}>
							Open
						</ThemedText>
					) : (
						<ThemedText type="sm" style={{ color: '#1c6e8c' }}>
							Closed
						</ThemedText>
					)}
				</View>
			</View>
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

	return (
		<>
			{loading ? (
				<ActivityIndicator size="large" color={Colors.darkGray} />
			) : shouldLoadMore ? (
				<Pressable
					style={{
						padding: 10,
						borderRadius: 10,
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: Colors.lightGray,
					}}
					onPress={handleLoadMore}
				>
					<ThemedText>Load More</ThemedText>
				</Pressable>
			) : null}
		</>
	)
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
		gap: 5,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
		alignSelf: 'flex-start',
	},
})
