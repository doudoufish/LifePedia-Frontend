import { Box, Button, Center, HStack, IconButton, Tooltip, useDisclosure } from '@chakra-ui/react'
import { SingleTopLayout } from 'layout/singleTop'
import { DeleteIconButton } from 'pkg/component/icon-button.delete'
import { ModalWrapper } from 'pkg/component/modal'
import { TableContent } from 'pkg/component/table.content'
import { Header } from 'pkg/component/table.header'
import { ROUTE } from 'pkg/route'
import { ReactElement, useEffect, useMemo, useState } from 'react'
import { BiEdit, BiMapAlt } from 'react-icons/bi'
import { MdAddBusiness } from 'react-icons/md'
import { SiGooglemaps } from 'react-icons/si'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useFilters, useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table'
import {
	restaurantFavoriteSelector,
	setRestaurantFavoriteListState,
	setRestaurantFavoriteState,
	setViewState,
	useRestaurantFavoriteStore,
} from 'store/restaurant.favorite'
import { RestaurantFavoriteStateType, RESTAURANT_FAVORITE_LIST_QUERY_KEY } from 'store/restaurant.favorite/util'
import { userSelector, useUserStore } from 'store/user'
import { RestaurantFavoriteForm } from './form'
import { deleteRestaurantFavoriteAPI, restaurantFavoriteListAPI } from './util'

const p = '5px'
const color = 'gray.800'
const borderRadius = '10px'
const borderWidth = '2px'
const containerBg = 'white'
const iconSize = '25px'
const iconVariant = 'ghost'
const initialState: any = { pageSize: 5 }
enum AccessorName {
	Name = 'name',
	Address = 'address',
	phoneNumber = 'phoneNumber',
	Action = 'action',
}
const getColumns = () => [
	{ Header: 'Name', accessor: AccessorName.Name, needToHideInSmallWindow: false, useClipboard: false },
	{ Header: 'Address', accessor: AccessorName.Address, needToHideInSmallWindow: true, useClipboard: true },
	{ Header: 'Phone Number', accessor: AccessorName.phoneNumber, needToHideInSmallWindow: true, useClipboard: true },
	{ Header: 'Action', accessor: AccessorName.Action, needToHideInSmallWindow: false, useClipboard: false },
]
const ActionColumnComponent = (props: { row: any }) => {
	const { row } = props
	const queryClient = useQueryClient()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const { viewState } = useRestaurantFavoriteStore(restaurantFavoriteSelector)
	const navigate = useNavigate()
	const restaurantFavorite: RestaurantFavoriteStateType = row.original
	const deleteRestaurantFavoriteMutation = useMutation(async () =>
		deleteRestaurantFavoriteAPI(restaurantFavorite._id, restaurantFavorite.menuPhotoType, queryClient)
	)
	return (
		<HStack>
			<ModalWrapper
				isOpen={isOpen}
				onClose={onClose}
				closeOnOverlayClick={false}
				header='Update Favorite Restaurant'
				body={<RestaurantFavoriteForm isAdding={false} onClose={onClose} />}
				footer={null}
			/>
			<Tooltip placement='top-end' label='Update Record'>
				<IconButton
					aria-label=''
					icon={<BiEdit size={iconSize} />}
					variant={iconVariant}
					onClick={async () => {
						await setRestaurantFavoriteState(row.original)
						onOpen()
					}}
				/>
			</Tooltip>
			<Tooltip placement='top-end' label='Search Address on Google Map'>
				<IconButton
					aria-label=''
					icon={<SiGooglemaps size={iconSize} />}
					variant={iconVariant}
					onClick={() => window.open(`https://www.google.com/maps/place/${restaurantFavorite.address}`, '_blank')}
				/>
			</Tooltip>
			<Tooltip placement='top-end' label='Search Address on Internal Map'>
				<IconButton
					aria-label=''
					size='sm'
					icon={<BiMapAlt color={color} size={iconSize} />}
					variant={iconVariant}
					onClick={async () => {
						await setViewState({
							...viewState,
							longitude: restaurantFavorite.location.coordinates[0],
							latitude: restaurantFavorite.location.coordinates[1],
							zoom: 12,
						})
						navigate(ROUTE.RESTAURANT_FAVORITE_MAP, { replace: true })
					}}
				/>
			</Tooltip>
			<DeleteIconButton
				isDisabled={false}
				alertTitle='Delete Favorite Restaurant'
				isLoading={false}
				onClick={async () => deleteRestaurantFavoriteMutation.mutateAsync()}
			/>
		</HStack>
	)
}
export default function RestaurantFavoriteTablePage(): ReactElement {
	const navigate = useNavigate()
	const { user } = useUserStore(userSelector)
	const { restaurantFavoriteList } = useRestaurantFavoriteStore(restaurantFavoriteSelector)
	const columns: any = useMemo(() => getColumns(), [])
	const [data, setData] = useState([])
	const table: any = useTable({ columns, data, initialState }, useFilters, useGlobalFilter, useSortBy, usePagination)
	const { isOpen, onOpen, onClose } = useDisclosure()
	useQuery(RESTAURANT_FAVORITE_LIST_QUERY_KEY, async () => {
		const list: any = await restaurantFavoriteListAPI(user._id)
		await setRestaurantFavoriteListState(list)
	})

	useEffect(() => setData(restaurantFavoriteList as never), [restaurantFavoriteList])

	return (
		<SingleTopLayout
			topbarRightExtra={
				<>
					<Button variant='2' isActive>
						List
					</Button>
					<Button variant='2' onClick={async () => navigate(ROUTE.RESTAURANT_FAVORITE_MAP, { replace: true })}>
						Map
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
								header='Add Favorite Restaurant'
								body={<RestaurantFavoriteForm isAdding onClose={onClose} />}
								footer={null}
							/>
							<Tooltip placement='top-end' label='Add Favorite Restaurant'>
								<IconButton aria-label='' icon={<MdAddBusiness size={iconSize} />} variant={iconVariant} onClick={onOpen} />
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
