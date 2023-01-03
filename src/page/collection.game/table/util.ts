import { strToJSON } from 'pkg/util/convert'
import { mutationRequest, queryRequest } from 'pkg/util/graphql'
import { toast } from 'react-toastify'

// constant
export const COLLECTION_GAME_QUERY_KEY = 'collectionGameList'
// api function
export const collectionGameListAPI = async (userId: string) => {
	const { data, message } = await queryRequest(
		`collectionGameList(filter:{userId:"${userId}"}){_id userId name platform url typeList mediaLink detail otherInfo updatedAt createdAt}`
	)
	if (data === null) {
		toast.error(message)
		return []
	}
	const list = data.collectionGameList.map((item: any) => {
		return { ...item, otherInfo: strToJSON(item.otherInfo) }
	})
	return list
}
export const deleteCollectionGameAPI = async (id: string, queryClient: any) => {
	const { data, message } = await mutationRequest(
		`deleteCollectionGame(filter:{_id:"${id}"}){record{_id userId name platform url typeList mediaLink detail otherInfo updatedAt createdAt}}`
	)
	if (data === null) {
		toast.error(message)
		return
	}
	queryClient.invalidateQueries(COLLECTION_GAME_QUERY_KEY)
	toast.success('delete success')
}
