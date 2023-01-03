import { Box, Button, Center, HStack, IconButton, Tooltip, useDisclosure } from '@chakra-ui/react'
import { SingleTopLayout } from 'layout/singleTop'
import { DeleteIconButton } from 'pkg/component/icon-button.delete'
import { ModalWrapper } from 'pkg/component/modal'
import { TableContent } from 'pkg/component/table.content'
import { Header } from 'pkg/component/table.header'
import { ROUTE } from 'pkg/route'
import { ReactElement, useEffect, useMemo, useState } from 'react'
import { BiDetail } from 'react-icons/bi'
import { FaGamepad } from 'react-icons/fa'
import { FiExternalLink } from 'react-icons/fi'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useFilters, useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table'
import { collectionGameSelector, setCollectionGameListState, useCollectionGameStore } from 'store/collection.game'
import { CollectionGameStateType } from 'store/collection.game/util'
import { userSelector, useUserStore } from 'store/user'
import { GameDetailForm } from './detail'
import { AddCollectionGameForm } from './form.add'
import { collectionGameListAPI, COLLECTION_GAME_QUERY_KEY, deleteCollectionGameAPI } from './util'

const p = '5px'
const borderRadius = '10px'
const borderWidth = '2px'
const containerBg = 'white'
const iconSize = '25px'
const iconVariant = 'ghost'
const initialState: any = { pageSize: 5 }
enum AccessorName {
	Name = 'name',
	Platform = 'platform',
	TypeList = 'typeListText',
	Action = 'action',
}
const getColumns = () => [
	{ Header: 'Name', accessor: AccessorName.Name, needToHideInSmallWindow: false, useClipboard: false },
	{ Header: 'Platform', accessor: AccessorName.Platform, needToHideInSmallWindow: false, useClipboard: false },
	{ Header: 'Types', accessor: AccessorName.TypeList, needToHideInSmallWindow: false, useClipboard: false },
	{ Header: 'Action', accessor: AccessorName.Action, needToHideInSmallWindow: false, useClipboard: false },
]
const ActionColumnComponent = (props: { row: any }) => {
	const { row } = props
	const queryClient = useQueryClient()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const collectionGame: CollectionGameStateType = row.original
	const deleteCollectionGameMutation = useMutation(async () => deleteCollectionGameAPI(collectionGame._id, queryClient))
	return (
		<HStack>
			<ModalWrapper
				isOpen={isOpen}
				onClose={onClose}
				closeOnOverlayClick={false}
				header='Game Detail'
				body={<GameDetailForm collectionGame={collectionGame} />}
				footer={null}
			/>
			<Tooltip placement='top-end' label='Game Detail'>
				<IconButton aria-label='' icon={<BiDetail size={iconSize} />} variant={iconVariant} onClick={onOpen} />
			</Tooltip>
			<Tooltip placement='top-end' label='Go to URL website'>
				<IconButton
					aria-label=''
					icon={<FiExternalLink size={iconSize} />}
					variant={iconVariant}
					onClick={async () => window.open(collectionGame.url, '_blank')}
				/>
			</Tooltip>
			<DeleteIconButton
				isDisabled={false}
				alertTitle='Delete Game Collection'
				isLoading={false}
				onClick={async () => deleteCollectionGameMutation.mutateAsync()}
			/>
		</HStack>
	)
}
const convertToTableData = (collectionGameList: CollectionGameStateType[]) => {
	const data = []
	for (const collectionGame of collectionGameList) {
		data.push({
			...collectionGame,
			typeListText: collectionGame.typeList.join(', '),
		})
	}
	return data
}
export default function CollectionGameTablePage(): ReactElement {
	const navigate = useNavigate()
	const { user } = useUserStore(userSelector)
	const { collectionGameList } = useCollectionGameStore(collectionGameSelector)
	const columns: any = useMemo(() => getColumns(), [])
	const [data, setData] = useState([])
	const table: any = useTable({ columns, data, initialState }, useFilters, useGlobalFilter, useSortBy, usePagination)
	const { isOpen, onOpen, onClose } = useDisclosure()
	useQuery(COLLECTION_GAME_QUERY_KEY, async () => {
		const list: any = await collectionGameListAPI(user._id)
		await setCollectionGameListState(list)
	})

	useEffect(() => setData(convertToTableData(collectionGameList) as never), [collectionGameList])

	return (
		<SingleTopLayout
			topbarRightExtra={
				<>
					<Button variant='2' isActive>
						Game
					</Button>
					<Button variant='2' onClick={async () => navigate(ROUTE.COLLECTION_TABLE_SHOP, { replace: true })}>
						Shop
					</Button>
					<Button variant='2' onClick={async () => navigate(ROUTE.COLLECTION_TABLE_STUDY, { replace: true })}>
						Study
					</Button>
				</>
			}
		>
			<Box borderRadius={borderRadius} borderWidth={borderWidth} bg={containerBg} p={p}>
				<Header
					leftComponent={
						<Center>
							<ModalWrapper
								isOpen={isOpen}
								onClose={onClose}
								closeOnOverlayClick={false}
								header='Add Game Collection'
								body={<AddCollectionGameForm onClose={onClose} />}
								footer={null}
							/>
							<Tooltip placement='top-end' label='Add Game Collection'>
								<IconButton aria-label='' icon={<FaGamepad size={iconSize} />} variant={iconVariant} onClick={onOpen} />
							</Tooltip>
						</Center>
					}
					table={table}
				/>
			</Box>
			<Box borderRadius={borderRadius} borderWidth={borderWidth} bg={containerBg} p={p}>
				<TableContent table={table} ActionColumnComponent={ActionColumnComponent} />
			</Box>
		</SingleTopLayout>
	)
}
