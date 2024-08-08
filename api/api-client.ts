import axios, { type AxiosInstance } from 'axios'

class ApiClient {
	private client: AxiosInstance

	constructor(baseURL: string) {
		this.client = axios.create({ baseURL })
	}

	get instance() {
		return this.client
	}
}

export default new ApiClient('http://192.168.1.15:3000')
