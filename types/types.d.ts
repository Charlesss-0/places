interface PlaceObject {
	fsq_id: string
	categories: [
		{
			id: number
			name: string
			short_name: string
			plural_name: string
			icon: {
				prefix: string
				suffix: string
			}
		}
	]
	closed_bucket: string
	distance: number
	features?: {
		payment?: {
			credit_cards: {
				accepts_credit_cards?: boolean
				amex?: boolean
				visa?: boolean
				master_card?: boolean
				discover?: boolean
				union_pay?: boolean
			}
			digital_wallet?: {
				accepts_nfc: boolean
			}
		}
		food_and_drink?: {
			alcohol?: {
				beer?: boolean
				byo?: boolean
				cocktails?: boolean
				full_bar?: boolean
				wine?: boolean
				bar_service?: boolean
			}
			meals?: {
				breakfast?: boolean
				brunch?: boolean
				lunch?: boolean
				dinner?: boolean
				happy_hour?: boolean
				dessert?: boolean
				bar_snacks?: boolean
			}
		}
		services?: {
			delivery?: boolean
			dine_in?: {
				reservations?: boolean
				groups_only_reservations?: boolean
				essential_reservations?: boolean
			}
		}
		amenities?: {
			restroom?: boolean
			jukebox?: boolean
			live_music?: boolean
			music?: boolean
			tvs?: boolean
			atm?: boolean
			coat_check?: boolean
			wheelchair_accessible?: boolean
			private_room?: boolean
			outdoor_seating?: boolean
			parking?: {
				parking?: boolean
				public_lot?: boolan
				private_lot?: boolean
				street_parking?: boolean
				valet_parking?: boolean
			}
			wifi?: string
			sit_down_dining?: boolean
		}
		attributes?: {
			business_meeting?: string
			clean?: string
			crowded?: string
			dates_popular?: string
			dressy?: string
			families_popular?: string
			good_for_dogs?: string
			groups_popular?: string
			noisy?: string
			quick_bite?: string
			service_quality?: string
			trendy?: string
			value_for_money?: string
		}
	}
	geocodes: {
		main: {
			latitude: number
			longitude: number
		}
	}
	hours: {
		display?: string
		is_local_holiday: boolean
		open_now: boolean
		regular?: {
			close: string
			day: number
			open: string
		}[]
	}
	location: {
		address?: string
		country?: string
		cross_street?: string
		formatted_address?: string
		locality?: string
		region?: string
	}
	name: string
	photos: {
		id: string
		created_at: string
		prefix: string
		suffix: string
		width: number
		height: number
		classifications?: string[]
	}[]
	popularity: number
	price?: number
	rating?: number
	social_media?: {
		twitter?: string
		instagram?: string
	}
	tips?: {
		created_at: string
		text: string
	}[]
	website?: string
}

interface PhotoObject {
	id: string
	created_at: string
	prefix: string
	suffix: string
	width: number
	height: number
	classifications?: string[]
}

interface ReviewObject {
	id: string
	created_at: string
	text: string
	photo?: {
		id: string
		created_at: string
		prefix: string
		suffix: string
		width: number
		height: number
		classifications?: string[]
	}
}
