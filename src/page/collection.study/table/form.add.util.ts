import { yupResolver } from '@hookform/resolvers/yup'
import _ from 'lodash'
import { mutationRequest } from 'pkg/util/graphql'
import { toast } from 'react-toastify'
import { CollectionStudyPlatformEnum } from 'store/collection.study/util'
import * as Yup from 'yup'
import 'yup-phone'
import { COLLECTION_STUDY_QUERY_KEY } from './util'

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
// api function
export const addCollectionStudyAPI = async (v: FieldType, userId: string, queryClient: any, onClose: () => void) => {
	try {
		await schema.validate(v)
	} catch (error: any) {
		toast.error(error.message)
		return
	}
	const { data, message } = await mutationRequest(
		`addCollectionStudy(userId:"${userId}" url:"${v[FieldName.URL]}" platform:"${CollectionStudyPlatformEnum.Udemy}"
		){_id userId title platform url categoryList detail otherInfo updatedAt createdAt}`
	)
	if (data === null) {
		toast.error(message)
		return
	}
	const study = data.addCollectionStudy
	if (_.isEmpty(study.categoryList) && _.isEmpty(study.detail)) {
		toast.warn('add study success but no detail')
	} else {
		toast.success('add study success with detail information')
	}
	queryClient.invalidateQueries(COLLECTION_STUDY_QUERY_KEY)
	onClose()
}
