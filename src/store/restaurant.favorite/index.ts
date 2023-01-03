import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { RestaurantFavoriteStateType, ViewStateType } from './util'

// primary type and initial state
export interface RestaurantFavoriteStoreStateType {
	viewState: ViewStateType
	restaurantFavorite: RestaurantFavoriteStateType
	restaurantFavoriteList: RestaurantFavoriteStateType[]
}
const initialStoreState: RestaurantFavoriteStoreStateType = {
	viewState: { longitude: -98.9658, latitude: 39.6012, zoom: 3, bearing: 0, pitch: 0 },
	restaurantFavorite: {
		_id: '',
		createdAt: '',
		updatedAt: '',
		userId: '',
		name: '',
		address: '',
		location: { type: 'Point', coordinates: [0, 0] },
		phoneNumber: '',
		menuPhotoType: '',
		note: '',
		otherInfo: {},
	},
	restaurantFavoriteList: [],
}
// store
const slice = () => initialStoreState
const name = 'lifepedia-restaurant-favorite-store'
export const useRestaurantFavoriteStore = create(devtools(persist(slice, { name }), { name }))
// selector
export const restaurantFavoriteSelector = (state: RestaurantFavoriteStoreStateType) => state
// state function
export const setViewState = async (viewState: ViewStateType) => {
	const oldState: RestaurantFavoriteStoreStateType = useRestaurantFavoriteStore.getState()
	useRestaurantFavoriteStore.setState({ ...oldState, viewState })
}
export const resetViewState = async () => {
	const oldState: RestaurantFavoriteStoreStateType = useRestaurantFavoriteStore.getState()
	useRestaurantFavoriteStore.setState({ ...oldState, viewState: initialStoreState.viewState })
}
export const setRestaurantFavoriteState = async (restaurantFavorite: RestaurantFavoriteStateType) => {
	const oldState: RestaurantFavoriteStoreStateType = useRestaurantFavoriteStore.getState()
	useRestaurantFavoriteStore.setState({ ...oldState, restaurantFavorite })
}
export const resetRestaurantFavoriteState = async () => useRestaurantFavoriteStore.setState(initialStoreState)
export const setRestaurantFavoriteListState = async (restaurantFavoriteList: RestaurantFavoriteStateType[]) => {
	const oldState: RestaurantFavoriteStoreStateType = useRestaurantFavoriteStore.getState()
	useRestaurantFavoriteStore.setState({ ...oldState, restaurantFavoriteList })
}
// helper state function
