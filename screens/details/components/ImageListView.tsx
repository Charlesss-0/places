import { ActivityIndicator, FlatList, Modal, StyleSheet, View, ViewProps } from 'react-native'
import { AppDimensions, Colors } from '@/constants'
import { PressableThumbnail, ThemedImage } from '@/components'

import Animated from 'react-native-reanimated'
import ImageViewer from 'react-native-image-zoom-viewer'
import { RootState } from '@/redux'
import { images } from '@/assets/images'
import { useSelector } from 'react-redux'
import { useState } from 'react'

export default function ImageListView() {
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [selectedImageIndex, setSelectedImageIndex] = useState(0)
	const { photos, fetching } = useSelector((state: RootState) => state.data)
	const formattedPhotos: string[] = photos?.map(photo => `${photo.prefix}original${photo.suffix}`)

	const handleImagePress = (index: number) => {
		setSelectedImageIndex(index)
		setIsModalVisible(true)
	}

	if (fetching === 'fetching' && !photos.length) {
		return (
			<View
				style={[
					styles.imageListViewContainer,
					{ justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.lightGray },
				]}
			>
				<ActivityIndicator size="large" color={Colors.darkGray} />
			</View>
		)
	}

	return (
		<Animated.View style={styles.imageListViewContainer}>
			<FlatList
				data={formattedPhotos}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item, index }) => (
					<Animated.View style={[styles.imageWrapper]}>
						<PressableThumbnail
							source={{ uri: item }}
							onPress={() => handleImagePress(index)}
							style={styles.imageWrapper}
						/>
					</Animated.View>
				)}
				ListEmptyComponent={
					<ThemedImage source={images.place} style={[styles.imageWrapper, { height: '100%' }]} />
				}
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
				animationType="fade"
			>
				<View style={styles.imageViewer}>
					<ImageViewer
						style={styles.fullscreenImage}
						imageUrls={formattedPhotos.map(uri => ({ url: uri }))}
						index={selectedImageIndex}
						onCancel={() => setIsModalVisible(false)}
						enableSwipeDown={true}
						backgroundColor="transparent"
					/>
				</View>
			</Modal>
		</Animated.View>
	)
}

const styles = StyleSheet.create({
	imageListViewContainer: {
		height: 250,
	},
	loadingContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.darkGray,
	},
	imageWrapper: {
		flex: 1,
		width: AppDimensions.width,
		backgroundColor: Colors.lightGray,
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 10,
	},
	imageViewer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#00000099',
	},
	fullscreenImage: {
		width: '100%',
	},
})
