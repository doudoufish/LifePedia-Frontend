import { strToJSON } from 'pkg/util/convert'
import { mutationRequest, queryRequest } from 'pkg/util/graphql'
import { toast } from 'react-toastify'

// constant
export const COOK_RECIPE_LIST_QUERY_KEY = 'cookRecipeList'
// api function
export const cookRecipeListAPI = async (userId: string) => {
	const { data, message } = await queryRequest(
		`cookRecipeList(filter:{userId:"${userId}"}){_id userId name url platform ingredientList methodList foodPhotoLink isPicked otherInfo updatedAt createdAt}`
	)
	if (data === null) {
		toast.error(message)
		return
	}
	const list = data.cookRecipeList.map((item: any) => {
		return { ...item, otherInfo: strToJSON(item.otherInfo) }
	})
	return list
}
export const switchPickAPI = async (id: string, wantToPick: boolean, queryClient: any) => {
	const { data, message } = await mutationRequest(
		`updateCookRecipe(
			filter:{_id:"${id}"}
			record:{isPicked:${wantToPick}}
		){record{_id userId name url platform ingredientList methodList foodPhotoLink isPicked otherInfo updatedAt createdAt}}`
	)
	if (data === null) {
		toast.error(message)
		return
	}
	const isSuccess = data.updateCookRecipe
	if (!isSuccess) {
		toast.error('something went wrong')
		return
	}
	toast.success(wantToPick ? 'pick success' : 'unpick success')
	queryClient.invalidateQueries(COOK_RECIPE_LIST_QUERY_KEY)
}
export const deleteCookRecipeAPI = async (id: string, queryClient: any) => {
	const { data, message } = await mutationRequest(
		`deleteCookRecipe(filter:{_id:"${id}"}){record{_id userId name url platform ingredientList methodList foodPhotoLink isPicked otherInfo updatedAt createdAt}}`
	)
	if (data === null) {
		toast.error(message)
		return
	}
	queryClient.invalidateQueries(COOK_RECIPE_LIST_QUERY_KEY)
	toast.success('delete success')
}
