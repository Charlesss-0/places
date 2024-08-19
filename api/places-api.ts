import apiClient from './api-client'

interface FetchParams {
	query: string
	locationCoords: {
		latitude: number
		longitude: number
	}
	nextFetch: boolean
}

class PlacesApi {
	private places: PlaceObject[] = []
	private photos: PhotoObject[] = []
	private reviews: ReviewObject[] = []

	constructor() {
		this.fetchPlaces = this.fetchPlaces.bind(this)
	}

	public async fetchPlaces({
		query,
		locationCoords,
		nextFetch = false,
	}: FetchParams): Promise<{ places: PlaceObject[]; hasNextPage: boolean }> {
		try {
			const response = await apiClient.instance.get('/search', {
				params: {
					query,
					lat: locationCoords.latitude,
					lon: locationCoords.longitude,
					next: nextFetch.toString(),
				},
			})

			const { places, hasNextPage } = response.data

			this.places = nextFetch ? [...this.places, ...places] : places

			return { places: this.places, hasNextPage }
		} catch (error) {
			throw new Error(`Unable to fetch places: ${error}`)
		}
	}

	public async fetchPhotos(fsq_id: string): Promise<{ photos: PhotoObject[] }> {
		try {
			const response = await apiClient.instance.get('/photos/test', {
				params: {
					id: fsq_id,
				},
			})

			const { photos } = response.data

			this.photos = photos

			return { photos: this.photos }
		} catch (error: any) {
			throw new Error(`Unable to fetch photos: ${error.message}`)
		}
	}

	public async fetchReviews(fsq_id: string): Promise<{ reviews: ReviewObject[] }> {
		try {
			const response = await apiClient.instance.get('/reviews', {
				params: {
					id: fsq_id,
				},
			})

			const { reviews } = response.data

			this.reviews = reviews

			return { reviews: this.reviews }
		} catch (error: any) {
			throw new Error(`Unable to fetch reviews: ${error.message}`)
		}
	}
}

export default new PlacesApi()
