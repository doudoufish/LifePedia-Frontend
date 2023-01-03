import { strToJSON } from 'pkg/util/convert'
import { mutationRequest, queryRequest } from 'pkg/util/graphql'
import { toast } from 'react-toastify'

// constant
export const COLLECTION_STUDY_QUERY_KEY = 'collectionStudyList'
// api function
export const collectionStudyListAPI = async (userId: string) => {
	const { data, message } = await queryRequest(
		`collectionStudyList(filter:{userId:"${userId}"}){_id userId title url platform categoryList detail otherInfo updatedAt createdAt}`
	)
	if (data === null) {
		toast.error(message)
		return []
	}
	const list = data.collectionStudyList.map((item: any) => {
		return { ...item, otherInfo: strToJSON(item.otherInfo) }
	})
	return list
}
export const deleteCollectionStudyAPI = async (id: string, queryClient: any) => {
	const { data, message } = await mutationRequest(
		`deleteCollectionStudy(filter:{_id:"${id}"}){record{_id userId title url platform categoryList detail otherInfo updatedAt createdAt}}`
	)
	if (data === null) {
		toast.error(message)
		return
	}
	queryClient.invalidateQueries(COLLECTION_STUDY_QUERY_KEY)
	toast.success('delete success')
}
