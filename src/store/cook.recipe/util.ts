// constant and secondary type
export enum CookRecipePlatformEnum {
	BBC_GOOD_FOOD = 'BBC Good Food',
}
export interface CookRecipeStateType {
	_id: string
	createdAt: string
	updatedAt: string
	userId: string
	name: string
	url: string
	platform: CookRecipePlatformEnum
	ingredientList: string[]
	methodList: string[]
	foodPhotoLink: string
	isPicked: boolean
	otherInfo: any
}
// helper function
