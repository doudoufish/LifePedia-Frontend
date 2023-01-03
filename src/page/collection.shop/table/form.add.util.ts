import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import _ from 'lodash'
import { mutationRequest } from 'pkg/util/graphql'
import { toast } from 'react-toastify'
import { CollectionShopPlatformEnum } from 'store/collection.shop/util'
import * as Yup from 'yup'
import 'yup-phone'
import { COLLECTION_SHOP_QUERY_KEY } from './util'

// constant and form type
export interface FieldType {
	url: string
}
export enum FieldName {
	URL = 'url',
}
const schema = Yup.object({
	[FieldName.URL]: Yup.string().url().required(),
})
export const getFormConfig = (): any => ({
	mode: 'onChange',
	resolver: yupResolver(schema),
	defaultValues: {
		[FieldName.URL]: '',
	},
})
export const FILE_DIR = 'collection_shop'
// helper function
// api function
export const uploadPhoto = async (filePath: string, photo: any) => {
	const { data, message } = await mutationRequest(`getSignedUrlFromCloudflareR2(filePath:"${filePath}")`)
	if (data === null) {
		toast.error(message)
		return
	}
	const signedUrl = data.getSignedUrlFromCloudflareR2
	const response = await axios.put(signedUrl, photo, {
		headers: {},
	})
	return response
}
export const addCollectionShopAPI = async (v: FieldType, userId: string, photo: any, queryClient: any, onClose: () => void) => {
	try {
		await schema.validate(v)
	} catch (error: any) {
		toast.error(error.message)
		return
	}
	const { data, message } = await mutationRequest(
		`addCollectionShop(userId:"${userId}" url:"${v[FieldName.URL]}" platform:"${CollectionShopPlatformEnum.Amazon}"
		){_id userId name platform url typeList productLink detail note otherInfo updatedAt createdAt}`
	)
	if (data === null) {
		// check message contain circular structure
		if (message.includes('circular structure')) {
			toast.error('this link does not work properly, please try another link or try again later')
			return
		}
		toast.error(message)
	}
	const shop = data.addCollectionShop
	if (_.isEmpty(shop.typeList) && _.isEmpty(shop.detail)) {
		toast.warn('add shop success but no detail')
	} else {
		toast.success('add shop success with detail information')
	}
	queryClient.invalidateQueries(COLLECTION_SHOP_QUERY_KEY)
	onClose()
}
