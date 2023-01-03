import { mutationRequest, queryRequest } from 'pkg/util/graphql'
import { toast } from 'react-toastify'

// constant
// api function
export const bbcgoodfoodCrawlerRunAPI = async (url: string) => {
	const { data, message } = await queryRequest(`bbcgoodfoodCrawlerRun(url:"${url}")`)
	if (data === null) {
		toast.error(message)
		return
	}
	return JSON.parse(data.bbcgoodfoodCrawlerRun)
}
export const updateCookRecipeAPI = async (id: string, name: string, ingredientList: string[], methodList: string[]) => {
	const ingredientListString = JSON.stringify(ingredientList)
	const methodListString = JSON.stringify(methodList)
	const { data, message } = await mutationRequest(
		`updateCookRecipe(
			filter:{_id:"${id}"}
			record:{name:"${name}" ingredientList:${ingredientListString} methodList:${methodListString}}
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
	toast.success('update Recipe success')
	// 	queryClient.invalidateQueries(COOK_RECIPE_LIST_QUERY_KEY)
}
