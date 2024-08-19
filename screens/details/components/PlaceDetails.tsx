import { AddressInfo, DistanceInfo, ThemedText } from '@/components'
import { AntDesign, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons'
import { PlaceProvider, usePlace } from '../context/PlaceContext'
import { StyleSheet, View } from 'react-native'

import { Colors } from '@/constant'
import ThemedImage from '@/components/settings/ThemedImage'
import globalStyles from '@/styles'

export default function PlaceDetails({ place }: { place: PlaceObject }) {
	return (
		<PlaceProvider value={place}>
			<View style={styles.container}>
				<View style={globalStyles.horizontalAlignment}>
					<LocationInfo
						locality={place.location.locality as string}
						region={place.location.region as string}
					/>
					<CategoryInfo />
				</View>

				<View style={globalStyles.horizontalAlignment}>
					<AddressInfo address={place.location.address as string} />
					<DistanceInfo distance={place.distance} status={place.closed_bucket} />
				</View>

				<Features />

				<ScheduleInfo />

				<View style={styles.separator} />
			</View>
		</PlaceProvider>
	)
}

function LocationInfo({ locality, region }: { locality: string; region: string }) {
	const getLocationText = () => {
		if (!locality && !region) return 'Location not available'
		if (locality && region) return `${locality}, ${region}`
		return locality || region
	}

	return (
		<View>
			<View style={[globalStyles.horizontalAlignment, { justifyContent: 'flex-start' }]}>
				<FontAwesome6 name="city" size={12} color={Colors.darkGray} />
				<ThemedText dark>Location</ThemedText>
			</View>

			<ThemedText type="sm">{getLocationText()}</ThemedText>
		</View>
	)
}

function CategoryInfo() {
	const { categories } = usePlace()
	const icon = `${categories[0].icon.prefix}88${categories[0].icon.suffix}`

	return (
		<View>
			<View style={[globalStyles.horizontalAlignment, { justifyContent: 'flex-end' }]}>
				<ThemedImage source={{ uri: icon }} height={16} width={16} style={styles.categoryIcon} />
				<ThemedText dark>Category</ThemedText>
			</View>

			<ThemedText type="sm" style={{ textAlign: 'right' }}>
				{categories[0].name || 'Category not available'}
			</ThemedText>
		</View>
	)
}

function Features() {
	return (
		<View style={styles.featuresContainer}>
			<View style={globalStyles.horizontalAlignment}>
				<PaymentInfo />

				<MealInfo />
			</View>

			<View style={globalStyles.horizontalAlignment}>
				<RatingInfo />
				<PriceInfo />
			</View>

			<View style={globalStyles.horizontalAlignment}>
				<SocialInfo />
				<AmenitiesInfo />
			</View>
		</View>
	)
}

function PaymentInfo() {
	const place = usePlace()

	const acceptsCreditCards = () => {
		const cardInfo = place.features?.payment?.credit_cards
		const amex = cardInfo?.amex
		const mastercard = cardInfo?.master_card
		const visa = cardInfo?.visa
		const discover = cardInfo?.discover
		const unionPay = cardInfo?.union_pay
		const acceptedCards = []

		if (!cardInfo || !cardInfo.accepts_credit_cards) {
			return 'Credit/Debit card service not available'
		}

		if (amex) acceptedCards.push('Amex')
		if (mastercard) acceptedCards.push('Mastercard')
		if (visa) acceptedCards.push('Visa')
		if (discover) acceptedCards.push('Discover')
		if (unionPay) acceptedCards.push('UnionPay')

		return acceptedCards.length > 0 ? acceptedCards.join(', ') : 'Card type not specified'
	}

	return (
		<View>
			<View style={[globalStyles.horizontalAlignment, { justifyContent: 'flex-start', gap: 5 }]}>
				<AntDesign name="creditcard" size={12} color={Colors.darkGray} />
				<ThemedText dark>Accepted Cards</ThemedText>
			</View>

			<ThemedText type="sm">{acceptsCreditCards()}</ThemedText>
		</View>
	)
}

function MealInfo() {
	const { features } = usePlace()

	const checkAvailableMealType = () => {
		const mealInfo = features?.food_and_drink?.meals
		const breakfast = mealInfo?.breakfast
		const brunch = mealInfo?.brunch
		const lunch = mealInfo?.lunch
		const dinner = mealInfo?.dinner
		const availableMeals = []

		if (!mealInfo || !features?.food_and_drink) {
			return 'Meal info not available'
		}

		if (breakfast) availableMeals.push('Breakfast')
		if (brunch) availableMeals.push('Brunch')
		if (lunch) availableMeals.push('Lunch')
		if (dinner) availableMeals.push('Dinner')

		return availableMeals.length > 0 ? availableMeals.join(', ') : 'Meal type not specified'
	}

	return (
		<View>
			<View style={[globalStyles.horizontalAlignment, { justifyContent: 'flex-end' }]}>
				<MaterialCommunityIcons name="food-fork-drink" size={12} color={Colors.darkGray} />

				<ThemedText style={{ textAlign: 'right' }} dark>
					Meals
				</ThemedText>
			</View>

			<ThemedText type="sm">{checkAvailableMealType()}</ThemedText>
		</View>
	)
}

function RatingInfo() {
	const { rating } = usePlace()

	const getRating = (rating: number) => {
		const normalizedRating = Math.min(Math.max(rating, 0.0), 10.0)
		const starRating = normalizedRating / 2
		const roundedStarRating = Math.round(starRating * 2) / 2

		return roundedStarRating
	}

	const getStars = (stars: number) => {
		const fullStars = Math.floor(stars)
		const emptyStars = 5 - fullStars

		const starIcons = [...Array(fullStars).fill('★'), ...Array(emptyStars).fill('✩')]

		return starIcons.join('')
	}

	const displayRating = (rating: number) => {
		if (rating) return `${getStars(getRating(rating))} ${getRating(rating).toFixed(1)}`
		return 'Rating not available'
	}

	return (
		<View>
			<ThemedText dark>Rating</ThemedText>

			<ThemedText type="sm">{displayRating(rating as number)}</ThemedText>
		</View>
	)
}

function PriceInfo() {
	const { price } = usePlace()

	const displayPrice = () => {
		const smallIcons = 4 - price!

		if (!price) {
			return 'Price details not available'
		}

		const icons = [...Array(price).fill('＄'), ...Array(smallIcons).fill('﹩')]

		return icons.join('')
	}

	return (
		<View>
			<ThemedText style={{ textAlign: 'right' }} dark>
				Price
			</ThemedText>

			<ThemedText type="sm">{displayPrice()}</ThemedText>
		</View>
	)
}

function SocialInfo() {
	const { social_media, website } = usePlace()

	return (
		<View style={{ gap: 5 }}>
			<ThemedText dark>Social</ThemedText>

			<ThemedText type="sm">
				<FontAwesome6 name="instagram" size={10} color={Colors.darkGray} />{' '}
				{social_media?.instagram || 'Not available'}
			</ThemedText>

			<ThemedText type="sm">
				<FontAwesome6 name="x-twitter" size={10} color={Colors.darkGray} />{' '}
				{social_media?.twitter || 'Not available'}
			</ThemedText>

			<ThemedText type="sm">
				<MaterialCommunityIcons name="web" size={10} color={Colors.darkGray} />{' '}
				{website || 'Not available'}
			</ThemedText>
		</View>
	)
}

function AmenitiesInfo() {
	const { features } = usePlace()

	return (
		<View style={styles.amenitiesInfo}>
			<ThemedText dark>Amenities</ThemedText>

			<ThemedText type="sm" style={styles.amenitiesText}>
				{features?.amenities?.atm ? 'ATM: Yes' : 'ATM: No'}
			</ThemedText>

			<ThemedText type="sm" style={styles.amenitiesText}>
				{features?.amenities?.parking ? 'Parking: Yes' : 'Parking: No'}
			</ThemedText>

			<ThemedText type="sm" style={styles.amenitiesText}>
				{features?.amenities?.wifi ? 'Wi-Fi: Yes' : 'Wi-Fi: No'}
			</ThemedText>
		</View>
	)
}

function ScheduleInfo() {
	const { hours } = usePlace()

	const formatTime = (time: string) => {
		const hour = parseInt(time.slice(0, 2), 10)
		const minute = time.slice(2)

		const suffix = hour >= 12 ? 'PM' : 'AM'
		const hour12 = hour % 12 || 12

		return `${hour12}:${minute} ${suffix}`
	}

	const displaySchedule = () => {
		const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

		const schedule = hours?.regular?.map(({ day, open, close }, index) => {
			const isLastElement = index === (hours?.regular?.length as number) - 1

			return (
				<View key={day} style={[styles.scheduleRow, { borderBottomWidth: isLastElement ? 0 : 1 }]}>
					<ThemedText type="sm" style={styles.flex} dark>
						{days[day - 1]}
					</ThemedText>

					<ThemedText type="sm">
						{formatTime(open)} - {formatTime(close)}
					</ThemedText>
				</View>
			)
		})

		return schedule
	}

	return (
		<View>
			<ThemedText style={{ marginBottom: 5 }} dark>
				Schedule
			</ThemedText>

			{hours?.regular ? (
				<View style={styles.scheduleTable}>{displaySchedule()}</View>
			) : (
				<ThemedText type="sm">No schedule available</ThemedText>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	flex: {
		flex: 1,
	},
	container: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		gap: 10,
	},
	categoryIcon: {
		backgroundColor: Colors.darkGray,
		borderRadius: 50,
	},
	separator: {
		width: '100%',
		borderBottomColor: Colors.gray,
		borderBottomWidth: 0.5,
	},
	featuresContainer: {
		gap: 10,
	},
	amenitiesInfo: {
		gap: 5,
	},
	amenitiesText: {
		textAlign: 'right',
	},
	scheduleTable: {
		borderWidth: 1,
		borderColor: Colors.gray,
		borderRadius: 10,
		overflow: 'hidden',
	},
	scheduleRow: {
		flexDirection: 'row',
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: Colors.gray,
	},
})
