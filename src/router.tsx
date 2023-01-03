import { PageWrapper } from 'pkg/component/page'
import { ROUTE } from 'pkg/route'
import { lazy } from 'react'
import { useQuery } from 'react-query'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import type { UserStoreStateType } from 'store/user'
import { useUserStore } from 'store/user'
import { checkUserAuthenticatedAPI, UserQueryKeyEnum } from 'store/user/api'
import { UserStateType } from 'store/user/util'

const LandingPage = lazy(async () => import('page/landing'))
const LandingLoginPage = lazy(async () => import('page/landing.login'))
const LandingSignupPage = lazy(async () => import('page/landing.signup'))
const LandingForgotPasswordPage = lazy(async () => import('page/landing.forgot-password'))
const LandingResetPasswordPage = lazy(async () => import('page/landing.reset-password'))
const UserHomePage = lazy(async () => import('page/user.home'))
const UserProfilePage = lazy(async () => import('page/user.profile'))
const RestaurantWishTablePage = lazy(async () => import('page/restaurant.wish.table'))
const RestaurantWishMapPage = lazy(async () => import('page/restaurant.wish.map'))
const RestaurantFavoriteTablePage = lazy(async () => import('page/restaurant.favorite.table'))
const RestaurantFavoriteMapPage = lazy(async () => import('page/restaurant.favorite.map'))
const CookRecipeGridPage = lazy(async () => import('page/cook.recipe/grid'))
const CookRecipeTablePage = lazy(async () => import('page/cook.recipe/table'))
const CookRecipeDetailPage = lazy(async () => import('page/cook.recipe/detail'))
const CollectionShopTablePage = lazy(async () => import('page/collection.shop/table'))
const CollectionGameTablePage = lazy(async () => import('page/collection.game/table'))
const CollectionStudyTablePage = lazy(async () => import('page/collection.study/table'))

const userSelector = (state: UserStoreStateType) => state.user
export const Router = () => {
	const user: UserStateType = useUserStore(userSelector)
	const accessToken: string = user.otherInfo.jwtAccessToken ?? ''
	const isAuthenticated = user._id !== '' && accessToken !== ''
	useQuery(UserQueryKeyEnum.User, async () => checkUserAuthenticatedAPI(user._id, user.email, accessToken))
	let router
	if (isAuthenticated) {
		router = createBrowserRouter([
			{ path: '*', element: <Navigate to={ROUTE.USER_HOME} /> },
			{ path: ROUTE.USER_HOME, element: <PageWrapper title='User Home' component={<UserHomePage />} /> },
			{ path: ROUTE.USER_PROFILE, element: <PageWrapper title='User Profile' component={<UserProfilePage />} /> },
			{ path: ROUTE.RESTAURANT_WISH_TABLE, element: <PageWrapper title='Considered Restaurant List' component={<RestaurantWishTablePage />} /> },
			{ path: ROUTE.RESTAURANT_WISH_MAP, element: <PageWrapper title='Considered Restaurant Map' component={<RestaurantWishMapPage />} /> },
			{ path: ROUTE.RESTAURANT_FAVORITE_TABLE, element: <PageWrapper title='Restaurant List' component={<RestaurantFavoriteTablePage />} /> },
			{ path: ROUTE.RESTAURANT_FAVORITE_MAP, element: <PageWrapper title='Restaurant Map' component={<RestaurantFavoriteMapPage />} /> },
			{ path: ROUTE.COOK_RECIPE_GRID, element: <PageWrapper title='Recipe Grid' component={<CookRecipeGridPage />} /> },
			{ path: ROUTE.COOK_RECIPE_TABLE, element: <PageWrapper title='Recipe Table' component={<CookRecipeTablePage />} /> },
			{ path: ROUTE.COOK_RECIPE_DETAIL, element: <PageWrapper title='Recipe Detail' component={<CookRecipeDetailPage />} /> },
			{ path: ROUTE.COLLECTION_TABLE_GAME, element: <PageWrapper title='Collection game table' component={<CollectionGameTablePage />} /> },
			{ path: ROUTE.COLLECTION_TABLE_SHOP, element: <PageWrapper title='Collection shop table' component={<CollectionShopTablePage />} /> },
			{ path: ROUTE.COLLECTION_TABLE_STUDY, element: <PageWrapper title='Collection study table' component={<CollectionStudyTablePage />} /> },
		])
	} else {
		router = createBrowserRouter([
			{ path: '*', element: <Navigate to={ROUTE.LANDING} /> },
			{ path: ROUTE.LANDING, element: <PageWrapper title='Lifepedia' component={<LandingPage />} /> },
			{ path: ROUTE.LANDING_SIGNUP, element: <PageWrapper title='Signup' component={<LandingSignupPage />} /> },
			{ path: ROUTE.LANDING_LOGIN, element: <PageWrapper title='Login' component={<LandingLoginPage />} /> },
			{ path: ROUTE.LANDING_FORGOT_PASSWORD, element: <PageWrapper title='Forgot Password' component={<LandingForgotPasswordPage />} /> },
			{ path: ROUTE.LANDING_RESET_PASSWORD, element: <PageWrapper title='Reset Password' component={<LandingResetPasswordPage />} /> },
		])
	}
	return <RouterProvider router={router} />
}
