import { Animated, Image, StyleSheet, View } from 'react-native'

import { AntDesign } from '@expo/vector-icons'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import ThemedText from '@/components/utils/ThemedText'
import { usePlaces } from '@/hooks'

interface PlacesProps {
	scrollY: any
	top: number
}

export default function Places({ scrollY, top }: PlacesProps) {
	const { places } = usePlaces()

	return (
		<Animated.FlatList
			style={styles.container}
			contentContainerStyle={[styles.listContentContainer, { paddingTop: top }]}
			showsVerticalScrollIndicator={false}
			onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
				useNativeDriver: true,
			})}
			data={places}
			keyExtractor={item => item.fsq_id}
			renderItem={({ item }) => (
				<View style={styles.listContent}>
					<View
						style={{
							height: 150,
							borderRadius: 10,
							backgroundColor: '#cfcfcf',
							overflow: 'hidden',
							position: 'relative',
						}}
					>
						<Image
							// source={{ uri: item.categories[0].icon.prefix + item.categories[0].icon.suffix }}
							source={{
								uri: 'https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
							}}
							style={{
								flex: 1,
							}}
						/>
						<View
							style={{
								position: 'absolute',
								bottom: 10,
								right: 10,
								borderRadius: 50,
								padding: 5,
								justifyContent: 'center',
								alignContent: 'center',
								backgroundColor: '#efefef',
							}}
						>
							<AntDesign
								name="hearto"
								size={20}
								color="#2f2f2f"
								style={{
									textAlign: 'center',
								}}
							/>
						</View>
					</View>

					<View style={styles.footerTextContainer}>
						<ThemedText style={{ flex: 1 }} dark numberOfLines={2} ellipsizeMode="tail">
							{item.name}
						</ThemedText>
						<ThemedText style={{}} dark>
							{item.categories[0].name}
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

						{item.distance ? (
							<View
								style={[
									{
										flex: 1,
										gap: 5,
										flexDirection: 'row',
										alignItems: 'center',
										justifyContent: 'flex-end',
									},
								]}
							>
								<FontAwesome6 name="location-dot" size={12} color="#2f2f2f" />
								<ThemedText type="sm">{item.distance} mts</ThemedText>

								<View
									style={{
										height: 10,
										borderLeftWidth: 1,
										borderColor: '#7f7f7f',
									}}
								></View>

								{item.closed_bucket.includes('Open') ? (
									<ThemedText type="sm">Open</ThemedText>
								) : item.closed_bucket.includes('Closed') ? (
									<ThemedText type="sm">Closed</ThemedText>
								) : (
									<ThemedText type="sm">Unsure</ThemedText>
								)}
							</View>
						) : (
							<ThemedText type="sm">Distance not available</ThemedText>
						)}
					</View>
				</View>
			)}
		/>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
	},
	listContentContainer: {
		paddingBottom: 20,
		gap: 30,
	},
	listContent: {
		gap: 10,
	},
	footerTextContainer: {
		gap: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
})
