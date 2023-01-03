import { queryRequest } from 'pkg/util/graphql'
import { toast } from 'react-toastify'
import { refreshObjectStateWhenRefreshPage, resetObjectStateWhenLogout } from 'store'

export enum UserQueryKeyEnum {
	User = 'user',
}
export const checkUserAuthenticatedAPI = async (userId: string, email: string, accessToken: string) => {
	if (userId === '' || accessToken === '') return
	const { data, message } = await queryRequest(`checkUserAuthenticated(id:"${userId}" email:"${email}" jwtAccessToken:"${accessToken}")`)
	if (data === null || !data.checkUserAuthenticated) {
		toast.error(message)
		await resetObjectStateWhenLogout()
		return
	}
	await refreshObjectStateWhenRefreshPage()
}
