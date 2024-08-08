interface Places {
	fsq_id: string
	name: string
	distance: number
	categories: {
		name: string
	}
	closed_bucket: string
	location: {
		address: string
	}
	photos: string[] | []
}
