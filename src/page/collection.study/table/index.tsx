import { Box, Button, Center, HStack, IconButton, Tooltip, useDisclosure } from '@chakra-ui/react'
import { SingleTopLayout } from 'layout/singleTop'
import { DeleteIconButton } from 'pkg/component/icon-button.delete'
import { ModalWrapper } from 'pkg/component/modal'
import { TableContent } from 'pkg/component/table.content'
import { Header } from 'pkg/component/table.header'
import { ROUTE } from 'pkg/route'
import { ReactElement, useEffect, useMemo, useState } from 'react'
import { BiBookOpen, BiDetail } from 'react-icons/bi'
import { FiExternalLink } from 'react-icons/fi'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useFilters, useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table'
import { collectionStudySelector, setCollectionStudyListState, useCollectionStudyStore } from 'store/collection.study'
import { CollectionStudyStateType } from 'store/collection.study/util'
import { userSelector, useUserStore } from 'store/user'
import { StudyDetailForm } from './detail'
import { AddCollectionStudyForm } from './form.add'
import { collectionStudyListAPI, COLLECTION_STUDY_QUERY_KEY, deleteCollectionStudyAPI } from './util'

const p = '5px'

const borderRadius = '10px'
const borderWidth = '2px'
const containerBg = 'white'
const iconSize = '25px'
const iconVariant = 'ghost'
const initialState: any = { pageSize: 5 }
enum AccessorName {
	Title = 'title',
	Platform = 'platform',
	CategoryList = 'categoryListText',
	Action = 'action',
}
const getColumns = () => [
	{ Header: 'Title', accessor: AccessorName.Title, needToHideInSmallWindow: false, useClipboard: false },
	{ Header: 'Platform', accessor: AccessorName.Platform, needToHideInSmallWindow: false, useClipboard: false },
	{ Header: 'Categories', accessor: AccessorName.CategoryList, needToHideInSmallWindow: false, useClipboard: false },
	{ Header: 'Action', accessor: AccessorName.Action, needToHideInSmallWindow: false, useClipboard: false },
]
const ActionColumnComponent = (props: { row: any }) => {
	const { row } = props
	const queryClient = useQueryClient()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const collectionStudy: CollectionStudyStateType = row.original
	const deleteCollectionStudyMutation = useMutation(async () => deleteCollectionStudyAPI(collectionStudy._id, queryClient))
	return (
		<HStack>
			<ModalWrapper
				isOpen={isOpen}
				onClose={onClose}
				closeOnOverlayClick={false}
				header='Study Detail'
				body={<StudyDetailForm collectionStudy={collectionStudy} />}
				footer={null}
			/>
			<Tooltip placement='top-end' label='Study Detail'>
				<IconButton aria-label='' icon={<BiDetail size={iconSize} />} variant={iconVariant} onClick={onOpen} />
			</Tooltip>
			<Tooltip placement='top-end' label='Go to URL website'>
				<IconButton
					aria-label=''
					icon={<FiExternalLink size={iconSize} />}
					variant={iconVariant}
					onClick={async () => window.open(collectionStudy.url, '_blank')}
				/>
			</Tooltip>
			<DeleteIconButton
				isDisabled={false}
				alertTitle='Delete Study Collection'
				isLoading={false}
				onClick={async () => deleteCollectionStudyMutation.mutateAsync()}
			/>
		</HStack>
	)
}
const convertToTableData = (collectionStudyList: CollectionStudyStateType[]) => {
	const data = []
	for (const collectionStudy of collectionStudyList) {
		data.push({
			...collectionStudy,
			categoryListText: collectionStudy.categoryList.join(', '),
		})
	}
	return data
}
export default function CollectionStudyTablePage(): ReactElement {
	const navigate = useNavigate()
	const { user } = useUserStore(userSelector)
	const { collectionStudyList } = useCollectionStudyStore(collectionStudySelector)
	const columns: any = useMemo(() => getColumns(), [])
	const [data, setData] = useState([])
	const table: any = useTable({ columns, data, initialState }, useFilters, useGlobalFilter, useSortBy, usePagination)
	const { isOpen, onOpen, onClose } = useDisclosure()
	useQuery(COLLECTION_STUDY_QUERY_KEY, async () => {
		const list: any = await collectionStudyListAPI(user._id)
		await setCollectionStudyListState(list)
	})

	useEffect(() => setData(convertToTableData(collectionStudyList) as never), [collectionStudyList])

	return (
		<SingleTopLayout
			topbarRightExtra={
				<>
					<Button variant='2' onClick={async () => navigate(ROUTE.COLLECTION_TABLE_GAME, { replace: true })}>
						Game
					</Button>
					<Button variant='2' onClick={async () => navigate(ROUTE.COLLECTION_TABLE_SHOP, { replace: true })}>
						Shop
					</Button>
					<Button variant='2' isActive>
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
								header='Add Study Collection'
								body={<AddCollectionStudyForm onClose={onClose} />}
								footer={null}
							/>
							<Tooltip placement='top-end' label='Add Study Collection'>
								<IconButton aria-label='' icon={<BiBookOpen size={iconSize} />} variant={iconVariant} onClick={onOpen} />
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
