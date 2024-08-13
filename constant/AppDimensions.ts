import { Dimensions } from 'react-native'

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('screen')

const AppDimensions = {
	width: viewportWidth,
	height: viewportHeight,
}

export { AppDimensions }
