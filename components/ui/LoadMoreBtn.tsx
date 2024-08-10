import { ActivityIndicator, Alert, Pressable } from 'react-native'

import { RootState } from '@/redux'
import ThemedText from '../settings/ThemedText'
import { useFetch } from '@/hooks'
import { useSelector } from 'react-redux'

export default function LoadMoreBtn({ shouldLoadMore }: { shouldLoadMore: boolean }) {
	const { fetchPlaces } = useFetch()
	const { query, category } = useSelector((state: RootState) => state.data)
	const { loading } = useSelector((state: RootState) => state.app)
	const currentQuery = query ? query : category

	const handleLoadMore = async () => {
		try {
			await fetchPlaces({ query: currentQuery, nextFetch: true })
		} catch (error) {
			Alert.alert(`Error loading more places: ${error}`)
		}
	}

	return (
		<>
			{loading ? (
				<ActivityIndicator size="large" color="#2f2f2f" />
			) : shouldLoadMore ? (
				<Pressable
					style={{
						padding: 10,
						borderRadius: 10,
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: '#efefef',
					}}
					onPress={handleLoadMore}
				>
					<ThemedText>Load More</ThemedText>
				</Pressable>
			) : null}
		</>
	)
}
