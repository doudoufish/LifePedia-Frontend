import { strToJSON } from 'pkg/util/convert'
import { queryRequest } from 'pkg/util/graphql'
import { toast } from 'react-toastify'
import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { CollectionStudyPlatformEnum, CollectionStudyStateType } from './util'

export interface CollectionStudyStoreStateType {
	collectionStudy: CollectionStudyStateType
	collectionStudyList: CollectionStudyStateType[]
}
const initialStoreState: CollectionStudyStoreStateType = {
	collectionStudy: {
		_id: '',
		createdAt: '',
		updatedAt: '',
		userId: '',
		title: '',
		url: '',
		platform: CollectionStudyPlatformEnum.Udemy,
		categoryList: [],
		detail: '',
		otherInfo: {},
	},
	collectionStudyList: [],
}

const slice = () => initialStoreState
const name = 'lifepedia-collection-Study-store'
export const useCollectionStudyStore = create(devtools(persist(slice, { name }), { name }))
// selector
export const collectionStudySelector = (state: CollectionStudyStoreStateType) => state
// state function
export const setCollectionStudyState = async (collectionStudy: CollectionStudyStateType) => {
	const oldState: CollectionStudyStoreStateType = useCollectionStudyStore.getState()
	useCollectionStudyStore.setState({ ...oldState, collectionStudy })
}
export const resetCollectionStudyState = async () => useCollectionStudyStore.setState(initialStoreState)
export const setCollectionStudyListState = async (collectionStudyList: CollectionStudyStateType[]) => {
	const oldState: CollectionStudyStoreStateType = useCollectionStudyStore.getState()
	useCollectionStudyStore.setState({ ...oldState, collectionStudyList })
}
// helper state function
export const refreshCollectionStudyState = async () => {
	const oldState: CollectionStudyStoreStateType = useCollectionStudyStore.getState()
	const collectionStudyId = oldState.collectionStudy._id
	if (collectionStudyId === '') {
		toast.error('collection for Study id is empty')
		return
	}
	const { data, message } = await queryRequest(
		`collectionStudy(filter:{_id:"${collectionStudyId}"}){_id userId title url categoryList detail otherInfo updatedAt createdAt}`
	)
	if (data === null) {
		toast.error(message)
		return
	}
	const { collectionStudy } = data
	collectionStudy.otherInfo = strToJSON(collectionStudy.otherInfo)
	useCollectionStudyStore.setState({ ...oldState, collectionStudy })
}
