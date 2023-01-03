import { strToJSON } from 'pkg/util/convert'
import { queryRequest } from 'pkg/util/graphql'
import { toast } from 'react-toastify'
import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { CollectionGamePlatformEnum, CollectionGameStateType } from './util'

export interface CollectionGameStoreStateType {
	collectionGame: CollectionGameStateType
	collectionGameList: CollectionGameStateType[]
}
const initialStoreState: CollectionGameStoreStateType = {
	collectionGame: {
		_id: '',
		createdAt: '',
		updatedAt: '',
		userId: '',
		name: '',
		platform: CollectionGamePlatformEnum.Steam,
		url: '',
		typeList: [],
		detail: '',
		mediaLink: '',
		otherInfo: {},
	},
	collectionGameList: [],
}

const slice = () => initialStoreState
const name = 'lifepedia-collection-game-store'
export const useCollectionGameStore = create(devtools(persist(slice, { name }), { name }))
// selector
export const collectionGameSelector = (state: CollectionGameStoreStateType) => state
// state function
export const setCollectionGameState = async (collectionGame: CollectionGameStateType) => {
	const oldState: CollectionGameStoreStateType = useCollectionGameStore.getState()
	useCollectionGameStore.setState({ ...oldState, collectionGame })
}
export const resetCollectionGameState = async () => useCollectionGameStore.setState(initialStoreState)
export const setCollectionGameListState = async (collectionGameList: CollectionGameStateType[]) => {
	const oldState: CollectionGameStoreStateType = useCollectionGameStore.getState()
	useCollectionGameStore.setState({ ...oldState, collectionGameList })
}
// helper state function
export const refreshCollectionGameState = async () => {
	const oldState: CollectionGameStoreStateType = useCollectionGameStore.getState()
	const collectionGameId = oldState.collectionGame._id
	if (collectionGameId === '') return
	const { data, message } = await queryRequest(
		`collectionGame(filter:{_id:"${collectionGameId}"}){_id userId name platform url typeList mediaLink detail otherInfo updatedAt createdAt}`
	)
	if (data === null) {
		toast.error(message)
		return
	}
	const { collectionGame } = data
	collectionGame.otherInfo = strToJSON(collectionGame.otherInfo)
	useCollectionGameStore.setState({ ...oldState, collectionGame })
}
