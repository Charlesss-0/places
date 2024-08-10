import { FlatList, Image, StyleSheet, View } from 'react-native'

import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import LoadMoreBtn from '../ui/LoadMoreBtn'
import { RootState } from '@/redux'
import ThemedText from '@/components/settings/ThemedText'
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
						<View style={styles.listItems}>
							<View style={styles.thumbnailContainer}>
								{item.photos?.length > 0 ? (
									<Image
										source={{ uri: item.photos[0] }}
										style={{
											flex: 1,
										}}
									/>
								) : (
									<Image
										source={{
											uri: 'https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
										}}
										style={{
											flex: 1,
										}}
									/>
								)}
							</View>

							<View style={styles.footerTextContainer}>
								<ThemedText style={{ flex: 1 }} dark numberOfLines={2} ellipsizeMode="tail">
									{item.name}
								</ThemedText>
								<ThemedText style={{}} dark>
									{item.categories.name}
								</ThemedText>
							</View>

							<View style={styles.footerTextContainer}>
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
											<FontAwesome6 name="location-dot" size={12} color="#2f2f2f" />
											<ThemedText type="sm">{item.distance} mts</ThemedText>

											<View
												style={{
													height: 10,
													borderLeftWidth: 1,
													borderColor: '#7f7f7f',
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
	},
	listContentContainer: {
		gap: 30,
	},
	listItems: {
		gap: 10,
	},
	thumbnailContainer: {
		height: 180,
		borderRadius: 10,
		backgroundColor: '#cfcfcf',
		overflow: 'hidden',
	},
	footerTextContainer: {
		gap: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
})
