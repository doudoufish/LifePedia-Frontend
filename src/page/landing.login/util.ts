import { yupResolver } from '@hookform/resolvers/yup'
import { LocalStorageKey } from 'pkg/env'
import { strToJSON } from 'pkg/util/convert'
import { mutationRequest } from 'pkg/util/graphql'
import { toast } from 'react-toastify'
import { setUserState } from 'store/user'
import * as Yup from 'yup'

export interface FieldType {
	email: string
	password: string
}
export enum FieldName {
	Email = 'email',
	Password = 'password',
}
const schema = Yup.object({
	[FieldName.Email]: Yup.string().email().required(),
	[FieldName.Password]: Yup.string().required(),
})
export const getFormConfig = (email: string): any => ({
	mode: 'onChange',
	resolver: yupResolver(schema),
	defaultValues: {
		[FieldName.Email]: email,
		[FieldName.Password]: '',
	},
})

export const userLoginAPI = async (v: FieldType) => {
	try {
		await schema.validate(v)
	} catch (error: any) {
		toast.error(error.message)
		return
	}
	const { data, message } = await mutationRequest(
		`userLogin(email:"${v[FieldName.Email]}",password:"${v[FieldName.Password]}"){username email phoneNumber role otherInfo _id updatedAt createdAt}`
	)
	if (data === null) {
		toast.error(message)
		return
	}
	const user = data.userLogin
	user.otherInfo = strToJSON(user.otherInfo)
	if (user.otherInfo.jwtAccessToken) {
		localStorage.setItem(LocalStorageKey.USER_ID, user._id)
		localStorage.setItem(LocalStorageKey.USER_ACCESS_TOKEN, user.otherInfo.jwtAccessToken)
	} else {
		toast.warn('token is missing')
	}
	await setUserState(user)
}
