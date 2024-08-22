import { StyleSheet, View } from 'react-native'

import { Colors } from '@/constants'
import { RootState } from '@/redux'
import ThemedImage from '@/components/settings/ThemedImage'
import { ThemedText } from '@/components'
import { useSelector } from 'react-redux'

export default function PlaceReviews() {
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
		<View style={styles.container}>
			<ThemedText type="md" dark>
				Reviews
			</ThemedText>

			{reviews.length > 0 ? (
				reviews.map(review => (
					<View key={review.id} style={styles.reviewContainer}>
						<ThemedText numberOfLines={0} dark>
							{review.text}
						</ThemedText>

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
				))
			) : (
				<ThemedText>No reviews</ThemedText>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 5,
		paddingHorizontal: 20,
		paddingBottom: 60,
	},
	reviewContainer: {
		backgroundColor: Colors.lightGray,
		padding: 10,
		borderRadius: 10,
		gap: 5,
	},
})
