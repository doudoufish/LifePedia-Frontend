import { strToJSON } from 'pkg/util/convert'
import { queryRequest } from 'pkg/util/graphql'
import { toast } from 'react-toastify'
import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { CollectionShopStateType } from './util'

export interface CollectionShopStoreStateType {
	collectionShop: CollectionShopStateType
	collectionShopList: CollectionShopStateType[]
}
const initialStoreState: CollectionShopStoreStateType = {
	collectionShop: {
		_id: '',
		createdAt: '',
		updatedAt: '',
		userId: '',
		name: '',
		platform: '',
		url: '',
		typeList: [],
		productLink: '',
		detail: '',
		note: '',
		otherInfo: {},
	},
	collectionShopList: [],
}

const slice = () => initialStoreState
const name = 'lifepedia-collection-shop-store'
export const useCollectionShopStore = create(devtools(persist(slice, { name }), { name }))
// selector
export const collectionShopSelector = (state: CollectionShopStoreStateType) => state
// state function
export const setCollectionShopState = async (collectionShop: CollectionShopStateType) => {
	const oldState: CollectionShopStoreStateType = useCollectionShopStore.getState()
	useCollectionShopStore.setState({ ...oldState, collectionShop })
}
export const resetCollectionShopState = async () => useCollectionShopStore.setState(initialStoreState)
export const setCollectionShopListState = async (collectionShopList: CollectionShopStateType[]) => {
	const oldState: CollectionShopStoreStateType = useCollectionShopStore.getState()
	useCollectionShopStore.setState({ ...oldState, collectionShopList })
}
// helper state function
export const refreshCollectionShopState = async () => {
	const oldState: CollectionShopStoreStateType = useCollectionShopStore.getState()
	const collectionShopId = oldState.collectionShop._id
	if (collectionShopId === '') {
		toast.error('collection for Shop id is empty')
		return
	}
	const { data, message } = await queryRequest(
		`collectionShop(filter:{_id:"${collectionShopId}"}){_id userId name platform url typeList productLink detail note otherInfo updatedAt createdAt}`
	)
	if (data === null) {
		toast.error(message)
		return
	}
	const { collectionShop } = data
	collectionShop.otherInfo = strToJSON(collectionShop.otherInfo)
	useCollectionShopStore.setState({ ...oldState, collectionShop })
}
