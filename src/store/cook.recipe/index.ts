import { strToJSON } from 'pkg/util/convert'
import { queryRequest } from 'pkg/util/graphql'
import { toast } from 'react-toastify'
import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { CookRecipePlatformEnum, CookRecipeStateType } from './util'

// primary type and initial state
export interface CookRecipeStoreStateType {
	cookRecipe: CookRecipeStateType
	cookRecipeList: CookRecipeStateType[]
}
const initialStoreState: CookRecipeStoreStateType = {
	cookRecipe: {
		_id: '',
		createdAt: '',
		updatedAt: '',
		userId: '',
		name: '',
		url: '',
		platform: CookRecipePlatformEnum.BBC_GOOD_FOOD,
		ingredientList: [],
		methodList: [],
		foodPhotoLink: '',
		isPicked: false,
		otherInfo: {},
	},
	cookRecipeList: [],
}
// store
const slice = () => initialStoreState
const name = 'lifepedia-cook-recipe-store'
export const useCookRecipeStore = create(devtools(persist(slice, { name }), { name }))
// selector
export const cookRecipeSelector = (state: CookRecipeStoreStateType) => state
// state function
export const setCookRecipeState = async (cookRecipe: CookRecipeStateType) => {
	const oldState: CookRecipeStoreStateType = useCookRecipeStore.getState()
	useCookRecipeStore.setState({ ...oldState, cookRecipe })
}
export const resetCookRecipeState = async () => useCookRecipeStore.setState(initialStoreState)
export const setCookRecipeListState = async (cookRecipeList: CookRecipeStateType[]) => {
	const oldState: CookRecipeStoreStateType = useCookRecipeStore.getState()
	useCookRecipeStore.setState({ ...oldState, cookRecipeList })
}
// helper state function
export const refreshCookRecipeState = async () => {
	const oldState: CookRecipeStoreStateType = useCookRecipeStore.getState()
	const cookRecipeId = oldState.cookRecipe._id
	if (cookRecipeId === '') return
	const { data, message } = await queryRequest(
		`cookRecipe(filter:{_id:"${cookRecipeId}"}){_id userId name url platform ingredientList methodList foodPhotoLink isPicked otherInfo updatedAt createdAt}`
	)
	if (data === null) {
		toast.error(message)
		return
	}
	const { cookRecipe } = data
	cookRecipe.otherInfo = strToJSON(cookRecipe.otherInfo)
	useCookRecipeStore.setState({ ...oldState, cookRecipe })
}
