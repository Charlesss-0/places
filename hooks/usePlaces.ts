import { useEffect, useState } from 'react'

import axios from 'axios'

export default function usePlaces() {
	const [places, setPlaces] = useState(null)
	const [ws, setWs] = useState<WebSocket | null>(null)

	useEffect(() => {
		const fetchInitialData = async () => {
			try {
				const response = await axios.get('http://192.168.183.220:3000/places')
				const data = response.data

				const results = data.results
				setPlaces(results)
			} catch (error) {
				console.error('Error fetching data:', error)
			}
		}
		fetchInitialData()

		const connectWebSocket = () => {
			const socket = new WebSocket('ws://192.168.183.220:3000')

			socket.onopen = () => {
				console.log('Connected to WebSocket server')
			}

			socket.onmessage = event => {
				const data = JSON.parse(event.data)

				const results = data.results
				setPlaces(results)
			}

			socket.onclose = e => {
				console.log(`WebSocket closed: ${e.reason}. Reconnecting...`)
				setTimeout(connectWebSocket, 100)
			}

			setWs(socket)
		}
		connectWebSocket()

		return () => {
			if (ws) {
				ws.close()
			}
		}
	}, [])

	return { places }
}
