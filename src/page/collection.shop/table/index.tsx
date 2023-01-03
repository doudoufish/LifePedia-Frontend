import { Box, Button, Center, HStack, IconButton, Tooltip, useDisclosure } from '@chakra-ui/react'
import { SingleTopLayout } from 'layout/singleTop'
import { DeleteIconButton } from 'pkg/component/icon-button.delete'
import { ModalWrapper } from 'pkg/component/modal'
import { TableContent } from 'pkg/component/table.content'
import { Header } from 'pkg/component/table.header'
import { ROUTE } from 'pkg/route'
import { ReactElement, useEffect, useMemo, useState } from 'react'
import { BiDetail } from 'react-icons/bi'
import { FiExternalLink } from 'react-icons/fi'
import { HiShoppingBag } from 'react-icons/hi'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useFilters, useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table'
import { collectionShopSelector, setCollectionShopListState, useCollectionShopStore } from 'store/collection.shop'
import { CollectionShopStateType } from 'store/collection.shop/util'
import { userSelector, useUserStore } from 'store/user'
import { ShopDetailForm } from './detail'
import { AddCollectionShopForm } from './form.add'
import { collectionShopListAPI, COLLECTION_SHOP_QUERY_KEY, deleteCollectionShopAPI } from './util'

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
	const collectionShop: CollectionShopStateType = row.original
	const deleteCollectionShopMutation = useMutation(async () => deleteCollectionShopAPI(collectionShop._id, queryClient))
	return (
		<HStack>
			<ModalWrapper
				isOpen={isOpen}
				onClose={onClose}
				closeOnOverlayClick={false}
				header='Shop Detail'
				body={<ShopDetailForm collectionShop={collectionShop} />}
				footer={null}
			/>
			<Tooltip placement='top-end' label='Shop Detail'>
				<IconButton aria-label='' icon={<BiDetail size={iconSize} />} variant={iconVariant} onClick={onOpen} />
			</Tooltip>
			<Tooltip placement='top-end' label='Go to URL website'>
				<IconButton
					aria-label=''
					icon={<FiExternalLink size={iconSize} />}
					variant={iconVariant}
					onClick={async () => window.open(collectionShop.url, '_blank')}
				/>
			</Tooltip>
			<DeleteIconButton
				isDisabled={false}
				alertTitle='Delete Shop Collection'
				isLoading={false}
				onClick={async () => deleteCollectionShopMutation.mutateAsync()}
			/>
		</HStack>
	)
}
const convertToTableData = (collectionShopList: CollectionShopStateType[]) => {
	const data = []
	for (const collectionShop of collectionShopList) {
		data.push({
			...collectionShop,
			typeListText: collectionShop.typeList.join(', '),
		})
	}
	return data
}
export default function CollectionShopTablePage(): ReactElement {
	const { user } = useUserStore(userSelector)
	const navigate = useNavigate()
	const { collectionShopList } = useCollectionShopStore(collectionShopSelector)
	const columns: any = useMemo(() => getColumns(), [])
	const [data, setData] = useState([])
	const table: any = useTable({ columns, data, initialState }, useFilters, useGlobalFilter, useSortBy, usePagination)
	const { isOpen, onOpen, onClose } = useDisclosure()
	useQuery(COLLECTION_SHOP_QUERY_KEY, async () => {
		const list: any = await collectionShopListAPI(user._id)
		await setCollectionShopListState(list)
	})

	useEffect(() => setData(convertToTableData(collectionShopList) as never), [collectionShopList])

	return (
		<SingleTopLayout
			topbarRightExtra={
				<>
					<Button variant='2' onClick={async () => navigate(ROUTE.COLLECTION_TABLE_GAME, { replace: true })}>
						Game
					</Button>
					<Button variant='2' isActive>
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
								header='Add Shop Collection'
								body={<AddCollectionShopForm onClose={onClose} />}
								footer={null}
							/>
							<Tooltip placement='top-end' label='Add Shop Collection'>
								<IconButton aria-label='' icon={<HiShoppingBag size={iconSize} />} variant={iconVariant} onClick={onOpen} />
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
