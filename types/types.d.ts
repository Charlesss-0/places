interface Places {
	fsq_id: string
	categories: {
		name: string
		icon: {
			prefix: string
			suffix: string
		}
	}
	closed_bucket: string
	distance: number
	location: {
		address: string | null
		country: string
		locality: string
		region: string
	}
	name: string
	photos: string[]
}
