import { strToJSON } from 'pkg/util/convert'
import { mutationRequest, queryRequest } from 'pkg/util/graphql'
import { toast } from 'react-toastify'

// constant
export const COLLECTION_SHOP_QUERY_KEY = 'collectionShopList'
// api function
export const collectionShopListAPI = async (userId: string) => {
	const { data, message } = await queryRequest(
		`collectionShopList(filter:{userId:"${userId}"}){_id userId name platform url typeList productLink detail note otherInfo updatedAt createdAt}`
	)
	if (data === null) {
		toast.error(message)
		return []
	}
	const list = data.collectionShopList.map((item: any) => {
		return { ...item, otherInfo: strToJSON(item.otherInfo) }
	})
	return list
}
export const deleteCollectionShopAPI = async (id: string, queryClient: any) => {
	const { data, message } = await mutationRequest(
		`deleteCollectionShop(filter:{_id:"${id}"}){record{_id userId name platform url typeList productLink detail note otherInfo updatedAt createdAt}}`
	)
	if (data === null) {
		toast.error(message)
		return
	}
	queryClient.invalidateQueries(COLLECTION_SHOP_QUERY_KEY)
	toast.success('delete success')
}
