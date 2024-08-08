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

	constructor() {
		this.fetchPlaces = this.fetchPlaces.bind(this)
	}

	public async fetchPlaces({
		query,
		locationCoords,
		nextFetch = false,
	}: FetchParams): Promise<{ places: Places[]; hasNextPage: boolean }> {
		try {
			const response = await apiClient.instance.get('/places/search', {
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
}

export default new PlacesApi()
