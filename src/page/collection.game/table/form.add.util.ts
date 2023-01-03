import { yupResolver } from '@hookform/resolvers/yup'
import _ from 'lodash'
import { mutationRequest } from 'pkg/util/graphql'
import { toast } from 'react-toastify'
import { CollectionGamePlatformEnum } from 'store/collection.game/util'
import * as Yup from 'yup'
import 'yup-phone'
import { COLLECTION_GAME_QUERY_KEY } from './util'

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
export const addCollectionGameAPI = async (v: FieldType, userId: string, queryClient: any, onClose: () => void) => {
	try {
		await schema.validate(v)
	} catch (error: any) {
		toast.error(error.message)
		return
	}
	const { data, message } = await mutationRequest(
		`addCollectionGame(userId:"${userId}" url:"${v[FieldName.URL]}" platform:"${CollectionGamePlatformEnum.Steam}"
		){_id userId name platform url typeList mediaLink detail otherInfo updatedAt createdAt}`
	)
	if (data === null) {
		toast.error(message)
		return
	}
	const game = data.addCollectionGame
	if (_.isEmpty(game.typeList) && _.isEmpty(game.detail)) {
		toast.warn('add game success but no detail')
	} else {
		toast.success('add game success with detail information')
	}
	queryClient.invalidateQueries(COLLECTION_GAME_QUERY_KEY)
	onClose()
}
