import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { RestaurantWishStateType, ViewStateType } from './util'

// primary type and initial state
export interface RestaurantWishStoreStateType {
	viewState: ViewStateType
	restaurantWish: RestaurantWishStateType
	restaurantWishList: RestaurantWishStateType[]
}
const initialStoreState: RestaurantWishStoreStateType = {
	viewState: { longitude: -98.9658, latitude: 39.6012, zoom: 3, bearing: 0, pitch: 0 },
	restaurantWish: {
		_id: '',
		createdAt: '',
		updatedAt: '',
		userId: '',
		name: '',
		address: '',
		location: { type: 'Point', coordinates: [0, 0] },
		phoneNumber: '',
		otherInfo: {},
	},
	restaurantWishList: [],
}
// store
const slice = () => initialStoreState
const name = 'lifepedia-restaurant-wish-store'
export const useRestaurantWishStore = create(devtools(persist(slice, { name }), { name }))
// selector
export const restaurantWishSelector = (state: RestaurantWishStoreStateType) => state
// state function
export const setViewState = async (viewState: ViewStateType) => {
	const oldState: RestaurantWishStoreStateType = useRestaurantWishStore.getState()
	useRestaurantWishStore.setState({ ...oldState, viewState })
}
export const resetViewState = async () => {
	const oldState: RestaurantWishStoreStateType = useRestaurantWishStore.getState()
	useRestaurantWishStore.setState({ ...oldState, viewState: initialStoreState.viewState })
}
export const setRestaurantWishState = async (restaurantWish: RestaurantWishStateType) => {
	const oldState: RestaurantWishStoreStateType = useRestaurantWishStore.getState()
	useRestaurantWishStore.setState({ ...oldState, restaurantWish })
}
export const resetRestaurantWishState = async () => useRestaurantWishStore.setState(initialStoreState)
export const setRestaurantWishListState = async (restaurantWishList: RestaurantWishStateType[]) => {
	const oldState: RestaurantWishStoreStateType = useRestaurantWishStore.getState()
	useRestaurantWishStore.setState({ ...oldState, restaurantWishList })
}
// helper state function
