// constant and secondary type
export const RESTAURANT_FAVORITE_LIST_QUERY_KEY = 'restaurantFavoriteList'
export interface ViewStateType {
	latitude: number
	longitude: number
	zoom: number
	bearing?: number
	pitch?: number
}
export interface RestaurantFavoriteStateType {
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
	menuPhotoType: string
	note: string
	otherInfo: any
}
// helper function
