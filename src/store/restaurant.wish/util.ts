// constant and secondary type
export const RESTAURANT_WISH_LIST_QUERY_KEY = 'restaurantWishList'
export interface ViewStateType {
	latitude: number
	longitude: number
	zoom: number
	bearing?: number
	pitch?: number
}
export interface RestaurantWishStateType {
	_id: string
	createdAt: string
	updatedAt: string
	userId: string
	name: string
	address: string
	location: {
		type: string
		coordinates: number[]
	}
	phoneNumber: string
	otherInfo: any
}
// helper function
