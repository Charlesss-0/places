import {
	ActivityIndicator,
	Alert,
	FlatList,
	Pressable,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native'

import { Colors } from '@/constant/Colors'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { RootState } from '@/redux'
import ThemedImage from '../settings/ThemedImage'
import ThemedText from '@/components/settings/ThemedText'
import { images } from '@/assets/images'
import { router } from 'expo-router'
import { useFetch } from '@/hooks'
import { useSelector } from 'react-redux'

export default function DataList() {
	const { data, hasNext } = useSelector((state: RootState) => state.data)

	return (
		<>
			{data && (
				<FlatList
					data={data}
					keyExtractor={({ fsq_id }) => fsq_id}
					renderItem={({ item }) => (
						<View style={styles.listItem}>
							<PressableThumbnail item={item} />

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

function PressableThumbnail({ item }: { item: Places }) {
	const handlePress = () => {
		router.push({ pathname: '/details', params: { id: item.fsq_id, name: item.name } })
	}

	return (
		<TouchableOpacity style={styles.pressableThumbnail} onPress={handlePress} activeOpacity={0.8}>
			{item.photos?.length > 0 ? (
				<ThemedImage source={{ uri: item.photos[0] }} />
			) : (
				<ThemedImage source={images.place} />
			)}
		</TouchableOpacity>
	)
}

function FooterText({ item }: { item: Places }) {
	return (
		<View style={styles.footerTextContainer}>
			<View style={styles.footerText}>
				<ThemedText style={{ flex: 1 }} dark numberOfLines={2} ellipsizeMode="tail">
					{item.name}
				</ThemedText>

				<ThemedText dark>{item.categories.name}</ThemedText>
			</View>

			<View style={styles.footerText}>
				{item.location.address ? (
					<ThemedText type="sm" style={{ flex: 2 }} numberOfLines={2} ellipsizeMode="tail">
						{item.location.address}
					</ThemedText>
				) : (
					<ThemedText type="sm">Address not available</ThemedText>
				)}

				<View
					style={[
						{
							flex: 1,
							gap: 5,
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'flex-end',
							alignSelf: 'flex-start',
						},
					]}
				>
					{item.distance ? (
						<>
							<FontAwesome6 name="location-dot" size={12} color={Colors.light.text} />
							<ThemedText type="sm">{item.distance} mts</ThemedText>

							<View
								style={{
									height: 10,
									borderLeftWidth: 1,
									borderColor: Colors.light.gray,
								}}
							></View>
						</>
					) : (
						<ThemedText type="sm">Distance not available</ThemedText>
					)}
					{item.closed_bucket.includes('Open') ? (
						<ThemedText type="sm">Open</ThemedText>
					) : item.closed_bucket.includes('Closed') ? (
						<ThemedText type="sm">Closed</ThemedText>
					) : (
						<ThemedText type="sm">Unsure</ThemedText>
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
				<ActivityIndicator size="large" color={Colors.light.darkGray} />
			) : shouldLoadMore ? (
				<Pressable
					style={{
						padding: 10,
						borderRadius: 10,
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: Colors.light.lightGray,
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
	pressableThumbnail: {
		height: 180,
		borderRadius: 10,
		backgroundColor: Colors.light.lightGray,
		overflow: 'hidden',
	},
	footerTextContainer: {
		gap: 5,
	},
	footerText: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
})
