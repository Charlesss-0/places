import { FlatList, Modal, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'

import { AppDimensions } from '@/constant'
import { Colors } from '@/constant/Colors'
import ImageViewer from 'react-native-image-zoom-viewer'
import { RootState } from '@/redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import ThemedImage from '@/components/settings/ThemedImage'
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
		return
	}

	return (
		<SafeAreaView style={styles.container}>
			<ImageListView item={currentItem} />
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
