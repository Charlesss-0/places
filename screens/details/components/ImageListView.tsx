import { FlatList, Modal, StyleSheet, View } from 'react-native'

import { AppDimensions } from '@/constant'
import ImageViewer from 'react-native-image-zoom-viewer'
import { PressableThumbnail } from '@/components'
import ThemedImage from '@/components/settings/ThemedImage'
import { images } from '@/assets/images'
import { useState } from 'react'

export default function ImageListView({ place }: { place: PlaceObject }) {
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [selectedImageIndex, setSelectedImageIndex] = useState(0)
	const photos: string[] = place.photos.map(photo => `${photo.prefix}original${photo.suffix}`)

	const handleImagePress = (index: number) => {
		setSelectedImageIndex(index)
		setIsModalVisible(true)
	}

	return (
		<View style={styles.imageListViewContainer}>
			<FlatList
				data={photos}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item, index }) => (
					<PressableThumbnail
						source={{ uri: item }}
						onPress={() => handleImagePress(index)}
						style={styles.imageWrapper}
					/>
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
			>
				<View style={styles.imageViewer}>
					<ImageViewer
						style={styles.fullscreenImage}
						imageUrls={photos.map(uri => ({ url: uri }))}
						index={selectedImageIndex}
						onCancel={() => setIsModalVisible(false)}
						enableSwipeDown={true}
						backgroundColor="transparent"
					/>
				</View>
			</Modal>
		</View>
	)
}

const styles = StyleSheet.create({
	imageListViewContainer: {
		height: 250,
	},
	imageWrapper: {
		flex: 1,
		width: AppDimensions.width,
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
