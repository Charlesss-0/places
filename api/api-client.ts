import axios, { type AxiosInstance } from 'axios'

const apiUrl = process.env.EXPO_PUBLIC_API_URL as string
const apiKey = process.env.EXPO_PUBLIC_API_KEY as string

class ApiClient {
	private client: AxiosInstance

	constructor(baseURL: string) {
		this.client = axios.create({
			baseURL,
			headers: {
				'x-api-key': apiKey,
			},
		})
	}

	get instance() {
		return this.client
	}
}

export default new ApiClient(apiUrl)
