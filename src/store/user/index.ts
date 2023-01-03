import { strToJSON } from 'pkg/util/convert'
import { queryRequest } from 'pkg/util/graphql'
import { toast } from 'react-toastify'
import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { UserStateType } from './util'

// primary type and initial state
export interface UserStoreStateType {
	user: UserStateType
}
const initialStoreState: UserStoreStateType = {
	user: { _id: '', createdAt: '', updatedAt: '', role: '', username: '', email: '', phoneNumber: '', otherInfo: {} },
}
// store
const slice = () => initialStoreState
const name = 'lifepedia-user-store'
export const useUserStore = create(devtools(persist(slice, { name }), { name }))
// selector
export const userSelector = (state: UserStoreStateType) => state
// function
export const setUserState = async (user: UserStateType) => {
	const oldState: UserStoreStateType = useUserStore.getState()
	useUserStore.setState({
		...oldState,
		user: {
			_id: user._id,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
			role: user.role,
			username: user.username,
			email: user.email,
			phoneNumber: user.phoneNumber,
			otherInfo: user.otherInfo,
		},
	})
}
export const resetUserState = async () => useUserStore.setState(initialStoreState)
// helper state function
export const refreshUserState = async () => {
	const oldState: UserStoreStateType = useUserStore.getState()
	const userId = oldState.user._id
	if (userId === '') {
		toast.error('user id is empty')
		return
	}
	const { data, message } = await queryRequest(`user(filter:{_id:"${userId}"}){username email phoneNumber role otherInfo _id updatedAt createdAt}`)
	if (data === null) {
		toast.error(message)
		return
	}
	const { user } = data
	user.otherInfo = strToJSON(user.otherInfo)
	useUserStore.setState({
		...oldState,
		user: {
			_id: oldState.user._id,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
			role: user.role,
			username: user.username,
			email: user.email,
			phoneNumber: user.phoneNumber,
			otherInfo: { ...oldState.user.otherInfo, ...user.otherInfo },
		},
	})
}
