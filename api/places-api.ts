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
	private places: Places[] = []
	private reviews = []

	constructor() {
		this.fetchPlaces = this.fetchPlaces.bind(this)
	}

	public async fetchPlaces({
		query,
		locationCoords,
		nextFetch = false,
	}: FetchParams): Promise<{ places: Places[]; hasNextPage: boolean }> {
		try {
			const response = await apiClient.instance.get('/test', {
				params: {
					query,
					lat: locationCoords.latitude,
					lon: locationCoords.longitude,
					next: nextFetch.toString(),
				},
				headers: {
					'x-api-key': process.env.EXPO_PUBLIC_API_KEY as string,
				},
			})

			const { places, hasNextPage } = response.data

			// this.places = nextFetch ? [...this.places, ...places] : places
			this.places = response.data

			return { places: this.places, hasNextPage }
		} catch (error) {
			throw new Error(`Unable to fetch places: ${error}`)
		}
	}

	public async fetchReviews(id: string) {
		try {
			const response = await apiClient.instance.get('/reviews', {
				params: {
					id: id,
				},
				headers: {
					'x-api-key': process.env.EXPO_PUBLIC_API_KEY as string,
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
