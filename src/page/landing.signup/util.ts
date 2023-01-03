import { yupResolver } from '@hookform/resolvers/yup'
import { ROUTE } from 'pkg/route'
import { mutationRequest } from 'pkg/util/graphql'
import type { NavigateFunction } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

export interface FieldType {
	email: string
	password: string
	confirmedPassword: string
}
export enum FieldName {
	Email = 'email',
	Password = 'password',
	ConfirmedPassword = 'confirmedPassword',
}
const schema = Yup.object({
	[FieldName.Email]: Yup.string().email().required(),
	[FieldName.Password]: Yup.string().required(),
	[FieldName.ConfirmedPassword]: Yup.string()
		.oneOf([Yup.ref(FieldName.Password), null], 'two passwords must match')
		.required('confirm your password'),
})
export const getFormConfig = (): any => ({
	mode: 'onChange',
	resolver: yupResolver(schema),
	defaultValues: {
		[FieldName.Email]: '',
		[FieldName.Password]: '',
		[FieldName.ConfirmedPassword]: '',
	},
})

export const userSignupAPI = async (v: FieldType, navigate: NavigateFunction) => {
	try {
		await schema.validate(v)
	} catch (error: any) {
		toast.error(error.message)
		return
	}
	const { data, message } = await mutationRequest(
		`userSignup(email:"${v[FieldName.Email]}",password:"${v[FieldName.Password]}"){username email phoneNumber role otherInfo _id updatedAt createdAt}`
	)
	if (data === null) {
		toast.error(message)
		return
	}
	const user = data.userSignup
	navigate(ROUTE.LANDING_LOGIN, { state: { email: user.email } })
}
