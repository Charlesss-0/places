import {
	Alert,
	Animated,
	FlatList,
	Modal,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View,
	ViewProps,
} from 'react-native'
import { FontAwesome6, Ionicons } from '@expo/vector-icons'
import React, { useEffect, useRef, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'

import { AppDimensions } from '@/constant'
import { Colors } from '@/constant/Colors'
import ImageViewer from 'react-native-image-zoom-viewer'
import { RootState } from '@/redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import ThemedImage from '@/components/settings/ThemedImage'
import { ThemedText } from '@/components'
import { images } from '@/assets/images'
import { useSelector } from 'react-redux'

export default function DetailsScreen() {
	const navigation = useNavigation()
	const { id, name } = useLocalSearchParams()
	const { data } = useSelector((state: RootState) => state.data)
	const currentItem = data.find(item => id === item.fsq_id)

	useEffect(() => {
		navigation.setOptions({
			title: name,
			headerShadowVisible: false,
			headerTransparent: true,
			headerTitleStyle: styles.headerTitle,
			headerTintColor: Colors.light.lightGray,
		})
	}, [])

	if (!currentItem) {
		return null
	}

	return (
		<SafeAreaView style={styles.container}>
			<ImageListView item={currentItem} />
			<ScrollView showsVerticalScrollIndicator={false}>
				<PlaceDetails place={currentItem} />
				<PlaceReviews />
			</ScrollView>
			<FooterButton />
		</SafeAreaView>
	)
}

function ImageListView({ item }: { item: Places }) {
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [selectedImageIndex, setSelectedImageIndex] = useState(0)
	const imagesForZoom = item?.photos.map(uri => ({ url: uri }))

	const handleImagePress = (index: number) => {
		setSelectedImageIndex(index)
		setIsModalVisible(true)
	}

	return (
		<View style={styles.imageListContainer}>
			{item ? (
				<>
					<FlatList
						data={item.photos}
						keyExtractor={(item, index) => index.toString()}
						renderItem={({ item, index }) => (
							<TouchableOpacity
								style={styles.imageWrapper}
								activeOpacity={0.9}
								onPress={() => handleImagePress(index)}
							>
								<ThemedImage source={{ uri: item }} />
							</TouchableOpacity>
						)}
						showsHorizontalScrollIndicator={false}
						snapToAlignment="center"
						snapToInterval={AppDimensions.width}
						decelerationRate="fast"
						pagingEnabled
						horizontal
					/>

					<Modal
						visible={isModalVisible}
						transparent={true}
						onRequestClose={() => setIsModalVisible(false)}
					>
						<View style={styles.modalContent}>
							<ImageViewer
								style={styles.fullscreenImage}
								imageUrls={imagesForZoom}
								index={selectedImageIndex}
								onCancel={() => setIsModalVisible(false)}
								enableSwipeDown={true}
								backgroundColor="transparent"
							/>
						</View>
					</Modal>
				</>
			) : (
				<ThemedImage source={images.place} />
			)}
		</View>
	)
}

function PlaceDetails({ place }: { place: Places }) {
	return (
		<View
			style={{
				paddingVertical: 10,
				paddingHorizontal: 20,
				gap: 10,
			}}
		>
			<ThemedView>
				<ThemedText dark>
					{place.location.locality}, {place.location.region}
				</ThemedText>

				<ThemedView
					style={{
						gap: 10,
					}}
				>
					<ThemedText dark>{place.categories.name}</ThemedText>

					<ThemedImage
						source={{ uri: `${place.categories.icon.prefix}120${place.categories.icon.suffix}` }}
						height={20}
						width={20}
						style={{
							backgroundColor: Colors.light.darkGray,
							borderWidth: 2,
							borderRadius: 50,
						}}
					/>
				</ThemedView>
			</ThemedView>

			<ThemedView>
				<ThemedView
					style={{
						flex: 1,
						gap: 5,
						justifyContent: 'flex-start',
					}}
				>
					<Ionicons name="map-outline" size={12} color={Colors.light.text} />

					{place.location.address ? (
						<ThemedText type="sm" style={{ flex: 1 }} numberOfLines={2} ellipsizeMode="tail">
							{place.location.address}
						</ThemedText>
					) : (
						<ThemedText type="sm">Address not available</ThemedText>
					)}
				</ThemedView>

				<ThemedView
					style={{
						flex: 1,
						gap: 5,
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'flex-end',
						alignSelf: 'flex-start',
					}}
				>
					<FontAwesome6 name="location-dot" size={12} color={Colors.light.text} />

					<ThemedText type="sm">{place.distance} mts</ThemedText>

					<View
						style={{
							height: 10,
							borderLeftWidth: 1,
							borderColor: Colors.light.gray,
						}}
					></View>

					{place.closed_bucket.includes('Open') ? (
						<ThemedText type="sm">Open</ThemedText>
					) : place.closed_bucket.includes('Closed') ? (
						<ThemedText type="sm">Closed</ThemedText>
					) : (
						<ThemedText type="sm">Unsure</ThemedText>
					)}
				</ThemedView>
			</ThemedView>

			<View
				style={{
					margin: 'auto',
					marginTop: 10,
					width: '100%',
					borderBottomWidth: 0.5,
					borderBottomColor: Colors.light.gray,
				}}
			></View>
		</View>
	)
}

function PlaceReviews() {
	const { reviews } = useSelector((state: RootState) => state.data)

	const formatDate = (date: string) => {
		const newDate = new Date(date)

		return new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		}).format(newDate)
	}

	return (
		<View
			style={{
				flex: 1,
				gap: 5,
				paddingHorizontal: 20,
				paddingBottom: 60,
			}}
		>
			<ThemedText type="md" dark>
				Reviews
			</ThemedText>

			{reviews.length ? (
				<>
					{reviews.map(review => (
						<View
							key={review.id}
							style={{
								backgroundColor: Colors.light.lightGray,
								padding: 10,
								borderRadius: 10,
								gap: 5,
							}}
						>
							<ThemedText dark>{review.text}</ThemedText>

							{review.photo && (
								<ThemedImage
									source={{ uri: `${review.photo.prefix}original${review.photo.suffix}` }}
									height={150}
									style={{ borderRadius: 5 }}
								/>
							)}

							<ThemedText type="sm" style={{ textAlign: 'right' }}>
								{formatDate(review.created_at)}
							</ThemedText>
						</View>
					))}
				</>
			) : (
				<ThemedText>No reviews</ThemedText>
			)}

			{/* <FlatList
				data={reviews}
				keyExtractor={item => item.id}
				renderItem={({ item }) => (
					<View
						style={{
							backgroundColor: Colors.light.lightGray,
							padding: 10,
							borderRadius: 10,
							gap: 5,
						}}
					>
						<ThemedText dark>{item.text}</ThemedText>

						{item.photo ? (
							<ThemedImage
								source={{ uri: `${item.photo.prefix}original${item.photo.suffix}` }}
								height={150}
								style={{ borderRadius: 5 }}
							/>
						) : null}

						<ThemedText type="sm" style={{ textAlign: 'right' }}>
							{formatDate(item.created_at)}
						</ThemedText>
					</View>
				)}
				contentContainerStyle={{
					gap: 5,
				}}
				showsVerticalScrollIndicator={false}
			/> */}
		</View>
	)
}

function FooterButton() {
	return (
		<View
			style={{
				position: 'absolute',
				bottom: 0,
				left: 0,
				right: 0,
				paddingVertical: 10,
				paddingHorizontal: 15,
			}}
		>
			<TouchableOpacity
				style={{
					backgroundColor: Colors.light.darkGray,
					paddingVertical: 10,
					borderRadius: 10,
					justifyContent: 'center',
					alignItems: 'center',
				}}
				activeOpacity={0.9}
			>
				<ThemedText style={{ fontWeight: '500' }} light>
					Start Trip
				</ThemedText>
			</TouchableOpacity>
		</View>
	)
}

interface ThemedViewProps extends ViewProps {
	children: React.ReactNode
}

function ThemedView({ style, children }: ThemedViewProps) {
	return (
		<View
			style={[
				{
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
				},
				style,
			]}
		>
			{children}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.light.background,
	},
	headerTitle: {
		fontWeight: '500',
		fontSize: 16,
	},
	imageListContainer: {
		height: 250,
	},
	imageWrapper: {
		flex: 1,
		width: AppDimensions.width,
	},
	modalContent: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#00000099',
	},
	fullscreenImage: {
		width: '100%',
	},
})
