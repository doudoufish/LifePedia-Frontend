import { yupResolver } from '@hookform/resolvers/yup'
import { ROUTE } from 'pkg/route'
import { mutationRequest } from 'pkg/util/graphql'
import type { NavigateFunction } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

export interface FieldType {
	password: string
	confirmedPassword: string
}
export enum FieldName {
	Password = 'password',
	ConfirmedPassword = 'confirmedPassword',
}
const schema = Yup.object({
	[FieldName.Password]: Yup.string().required(),
	[FieldName.ConfirmedPassword]: Yup.string()
		.oneOf([Yup.ref(FieldName.Password), null], 'two passwords must match')
		.required('confirm your password'),
})
export const getFormConfig = (): any => ({
	mode: 'onChange',
	resolver: yupResolver(schema),
	defaultValues: {
		[FieldName.Password]: '',
		[FieldName.ConfirmedPassword]: '',
	},
})

export const userResetPasswordAPI = async (v: FieldType, userId: string, code: string, navigate: NavigateFunction) => {
	try {
		await schema.validate(v)
	} catch (error: any) {
		toast.error(error.message)
		return
	}
	const { data, message } = await mutationRequest(`userResetPassword(id:"${userId}",passCodeToken:"${code}",password:"${v[FieldName.Password]}")`)
	if (data === null) {
		toast.error(message)
		return
	}
	navigate(ROUTE.LANDING_LOGIN)
}
