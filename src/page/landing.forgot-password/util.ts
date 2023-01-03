import { yupResolver } from '@hookform/resolvers/yup'
import { getAppUrl } from 'pkg/env'
import { ROUTE } from 'pkg/route'
import { mutationRequest } from 'pkg/util/graphql'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

export interface FieldType {
	email: string
}
export enum FieldName {
	Email = 'email',
}
const schema = Yup.object({
	[FieldName.Email]: Yup.string().required(),
})
export const getFormConfig = (): any => ({
	mode: 'onChange',
	resolver: yupResolver(schema),
	defaultValues: {
		[FieldName.Email]: '',
	},
})

export const userRequestToResetPasswordAPI = async (v: FieldType, setHasSentEmail: (hasSentEmail: boolean) => void) => {
	try {
		await schema.validate(v)
	} catch (error: any) {
		toast.error(error.message)
		return
	}
	const passwordResetUri = `${getAppUrl()}${ROUTE.LANDING_RESET_PASSWORD}`
	const { data, message } = await mutationRequest(`userSendResetPasswordEmail(email: "${v[FieldName.Email]}", passwordResetUri: "${passwordResetUri}")`)
	if (data === null) {
		toast.error(message)
		return
	}
	setHasSentEmail(true)
	toast.success('Email has been sent, please check your email')
}
