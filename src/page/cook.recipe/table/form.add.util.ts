import { yupResolver } from '@hookform/resolvers/yup'
import _ from 'lodash'
import { mutationRequest } from 'pkg/util/graphql'
import { toast } from 'react-toastify'
import { CookRecipePlatformEnum } from 'store/cook.recipe/util'
import * as Yup from 'yup'
import 'yup-phone'
import { COOK_RECIPE_LIST_QUERY_KEY } from './util'

// constant and form type
export interface FieldType {
	url: string
}
export enum FieldName {
	URL = 'url',
}
const schema = Yup.object({
	[FieldName.URL]: Yup.string().url().required(),
})
export const getFormConfig = (): any => ({
	mode: 'onChange',
	resolver: yupResolver(schema),
	defaultValues: {
		[FieldName.URL]: '',
	},
})
// api function
export const addCookRecipeAPI = async (v: FieldType, userId: string, queryClient: any, onClose: () => void) => {
	try {
		await schema.validate(v)
	} catch (error: any) {
		toast.error(error.message)
		return
	}
	const { data, message } = await mutationRequest(
		`addCookRecipe(userId:"${userId}" url:"${v[FieldName.URL]}" platform:"${CookRecipePlatformEnum.BBC_GOOD_FOOD}"
		){_id userId name url platform ingredientList methodList foodPhotoLink isPicked otherInfo updatedAt createdAt}`
	)
	if (data === null) {
		toast.error(message)
		return
	}
	const recipe = data.addCookRecipe
	if (_.isEmpty(recipe.ingredientList) && _.isEmpty(recipe.methodList)) {
		toast.warn('add recipe success but no ingredients and methods')
	} else {
		toast.success('add recipe success with initial ingredients and methods information')
	}
	queryClient.invalidateQueries(COOK_RECIPE_LIST_QUERY_KEY)
	onClose()
}
