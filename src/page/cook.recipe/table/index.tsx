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
import { MdOutlineCheckCircle, MdOutlineRadioButtonUnchecked, MdRestaurantMenu } from 'react-icons/md'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useFilters, useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table'
import { cookRecipeSelector, setCookRecipeListState, setCookRecipeState, useCookRecipeStore } from 'store/cook.recipe'
import { CookRecipeStateType } from 'store/cook.recipe/util'
import { userSelector, useUserStore } from 'store/user'
import { AddCookRecipeForm } from './form.add'
import { cookRecipeListAPI, COOK_RECIPE_LIST_QUERY_KEY, deleteCookRecipeAPI, switchPickAPI } from './util'

const p = '5px'
const borderRadius = '10px'
const borderWidth = '2px'
const containerBg = 'white'
const iconSize = '25px'
const iconVariant = 'ghost'
const initialState: any = { pageSize: 5 }
enum AccessorName {
	Name = 'name',
	IsTodayPick = 'isTodayPick',
	Action = 'action',
}
const getColumns = () => [
	{ Header: 'Name', accessor: AccessorName.Name, needToHideInSmallWindow: false },
	{ Header: "Is Today's Pick", accessor: AccessorName.IsTodayPick, needToHideInSmallWindow: false },
	{ Header: 'Action', accessor: AccessorName.Action, needToHideInSmallWindow: false },
]
const ActionColumnComponent = (props: { row: any }) => {
	const { row } = props
	const queryClient = useQueryClient()
	const navigate = useNavigate()
	const cookRecipe: CookRecipeStateType = row.original
	const deleteCookRecipeMutation = useMutation(async () => deleteCookRecipeAPI(cookRecipe._id, queryClient))
	return (
		<HStack>
			<Tooltip placement='top-end' label='Recipe Detail'>
				<IconButton
					aria-label=''
					icon={<BiDetail size={iconSize} />}
					variant={iconVariant}
					onClick={async () => {
						await setCookRecipeState(cookRecipe)
						navigate(ROUTE.COOK_RECIPE_DETAIL, { replace: true })
					}}
				/>
			</Tooltip>
			<Tooltip placement='top-end' label='Go to URL website'>
				<IconButton aria-label='' icon={<FiExternalLink size={iconSize} />} variant={iconVariant} onClick={async () => window.open(cookRecipe.url, '_blank')} />
			</Tooltip>
			<Tooltip placement='top-end' label={cookRecipe.isPicked ? 'Unpick' : 'Pick'}>
				{cookRecipe.isPicked ? (
					<IconButton
						aria-label=''
						icon={<MdOutlineCheckCircle size={iconSize} />}
						variant={iconVariant}
						onClick={async () => switchPickAPI(row.original._id, false, queryClient)}
					/>
				) : (
					<IconButton
						aria-label=''
						icon={<MdOutlineRadioButtonUnchecked size={iconSize} />}
						variant={iconVariant}
						onClick={async () => switchPickAPI(row.original._id, true, queryClient)}
					/>
				)}
			</Tooltip>
			<DeleteIconButton isDisabled={false} alertTitle='Delete Recipe' isLoading={false} onClick={async () => deleteCookRecipeMutation.mutateAsync()} />
		</HStack>
	)
}
export default function CookRecipeTablePage(): ReactElement {
	const { user } = useUserStore(userSelector)
	const navigate = useNavigate()
	const columns: any = useMemo(() => getColumns(), [])
	const { cookRecipeList } = useCookRecipeStore(cookRecipeSelector)
	const [data, setData] = useState([])
	const table: any = useTable({ columns, data, initialState }, useFilters, useGlobalFilter, useSortBy, usePagination)
	const { isOpen, onOpen, onClose } = useDisclosure()
	const queryClient = useQueryClient()
	useQuery(COOK_RECIPE_LIST_QUERY_KEY, async () => {
		const list: any = await cookRecipeListAPI(user._id)
		await setCookRecipeListState(list)
	})

	useEffect(() => {
		const dataList = []
		for (const item of cookRecipeList) dataList.push({ ...item, isTodayPick: item.isPicked ? 'Yes' : 'No' })
		setData(dataList as never)
	}, [cookRecipeList])

	return (
		<SingleTopLayout
			topbarRightExtra={
				<>
					<Button
						variant='2'
						onClick={async () => {
							queryClient.invalidateQueries(COOK_RECIPE_LIST_QUERY_KEY)
							navigate(ROUTE.COOK_RECIPE_GRID)
						}}
					>
						Today's Pick
					</Button>
					<Button variant='2' isActive>
						Recipes
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
								header='Add Cook Recipe'
								body={<AddCookRecipeForm onClose={onClose} />}
								footer={null}
							/>
							<Tooltip placement='top-end' label='Add Recipe'>
								<IconButton aria-label='' icon={<MdRestaurantMenu size={iconSize} />} variant={iconVariant} onClick={onOpen} />
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
