import { resetCommonState } from './common'
import { refreshCookRecipeState, resetCookRecipeState } from './cook.recipe'
import { resetRestaurantFavoriteState } from './restaurant.favorite'
import { resetRestaurantWishState } from './restaurant.wish'
import { refreshUserState, resetUserState } from './user'

export const refreshObjectStateWhenRefreshPage = async () => {
	await refreshUserState()
	await refreshCookRecipeState()
}
export const resetObjectStateWhenLogout = async () => {
	await resetUserState()
	await resetRestaurantWishState()
	await resetRestaurantFavoriteState()
	await resetCookRecipeState()
	await resetCommonState()
}
