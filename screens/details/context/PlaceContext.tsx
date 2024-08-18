import React, { createContext, useContext } from 'react'

const PlaceContext = createContext<PlaceObject | null>(null)

export function PlaceProvider({
	children,
	value,
}: {
	children: React.ReactNode
	value: PlaceObject
}) {
	return <PlaceContext.Provider value={value}>{children}</PlaceContext.Provider>
}

export function usePlace() {
	const context = useContext(PlaceContext)

	if (!context) {
		throw new Error('usePlace must be used withing a PlaceProvider')
	}

	return context
}
