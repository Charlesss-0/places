import axios, { type AxiosInstance } from 'axios'

const apiUrl = process.env.EXPO_PUBLIC_API_URL as string
// const apiUrlDev = process.env.EXPO_PUBLIC_API_URL_DEV as string

class ApiClient {
	private client: AxiosInstance

	constructor(baseURL: string) {
		this.client = axios.create({ baseURL })
	}

	get instance() {
		return this.client
	}
}

export default new ApiClient(apiUrl)
