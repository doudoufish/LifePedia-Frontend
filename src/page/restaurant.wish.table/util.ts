import { strToJSON } from 'pkg/util/convert'
import { mutationRequest, queryRequest } from 'pkg/util/graphql'
import { toast } from 'react-toastify'
import { RESTAURANT_FAVORITE_LIST_QUERY_KEY } from 'store/restaurant.favorite/util'
import { RESTAURANT_WISH_LIST_QUERY_KEY } from 'store/restaurant.wish/util'

// constant
// api function
export const restaurantWishListAPI = async (userId: string) => {
	const { data, message } = await queryRequest(
		`restaurantWishList(filter:{userId:"${userId}"}){_id userId name address location {type coordinates} phoneNumber otherInfo updatedAt createdAt}`
	)
	if (data === null) {
		toast.error(message)
		return
	}
	const list = data.restaurantWishList.map((item: any) => {
		return { ...item, otherInfo: strToJSON(item.otherInfo) }
	})
	return list
}
export const deleteRestaurantWishAPI = async (id: string, queryClient: any) => {
	const { data, message } = await mutationRequest(
		`deleteRestaurantWish(filter:{_id:"${id}"}){record{_id userId name address location {coordinates} phoneNumber otherInfo updatedAt createdAt}}`
	)
	if (data === null) {
		toast.error(message)
		return
	}
	queryClient.invalidateQueries(RESTAURANT_WISH_LIST_QUERY_KEY)
	toast.success('delete success')
}
export const addRestaurantToFavoriteAPI = async (id: string, queryClient: any) => {
	const res1 = await mutationRequest(
		`addRestaurantToFavorite(id:"${id}"){_id userId name address location {coordinates} phoneNumber otherInfo updatedAt createdAt}`
	)
	if (res1.data === null) {
		toast.error(res1.message)
		return
	}
	const res2 = await mutationRequest(
		`deleteRestaurantWish(filter:{_id:"${id}"}){record{_id userId name address location {coordinates} phoneNumber otherInfo updatedAt createdAt}}`
	)
	if (res2.data === null) {
		toast.error(res2.message)
		return
	}
	queryClient.invalidateQueries(RESTAURANT_WISH_LIST_QUERY_KEY)
	queryClient.invalidateQueries(RESTAURANT_FAVORITE_LIST_QUERY_KEY)
	toast.success('move to favorite success')
}
