import _ from 'lodash'
import { strToJSON } from 'pkg/util/convert'
import { mutationRequest, queryRequest } from 'pkg/util/graphql'
import { toast } from 'react-toastify'
import { RESTAURANT_FAVORITE_LIST_QUERY_KEY } from 'store/restaurant.favorite/util'

// constant
export const FILE_DIR = 'restaurant_favorite'
// api function
export const deletePhoto = async (filePath: string) => mutationRequest(`deleteFileFromCloudflareR2(filePath:"${filePath}")`)
export const restaurantFavoriteListAPI = async (userId: string) => {
	const { data, message } = await queryRequest(
		`restaurantFavoriteList(filter:{userId:"${userId}"}){_id userId name address location {type coordinates} phoneNumber menuPhotoType note otherInfo updatedAt createdAt}`
	)
	if (data === null) {
		toast.error(message)
		return
	}
	const list = data.restaurantFavoriteList.map((item: any) => {
		return { ...item, otherInfo: strToJSON(item.otherInfo) }
	})
	return list
}
export const deleteRestaurantFavoriteAPI = async (id: string, photoType: string, queryClient: any) => {
	const { data, message } = await mutationRequest(
		`deleteRestaurantFavorite(filter:{_id:"${id}"}){record{_id userId name address location {coordinates} phoneNumber menuPhotoType note otherInfo updatedAt createdAt}}`
	)
	if (data === null) {
		toast.error(message)
		return
	}
	if (!_.isEmpty(photoType)) await deletePhoto(`${FILE_DIR}/${id}.${photoType}`)
	queryClient.invalidateQueries(RESTAURANT_FAVORITE_LIST_QUERY_KEY)
	toast.success('delete success')
}
