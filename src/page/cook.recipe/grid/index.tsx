import { Box, Button, Center, HStack, IconButton, Image, SimpleGrid, Tooltip, VStack } from '@chakra-ui/react'
import { SingleTopLayout } from 'layout/singleTop'
import _ from 'lodash'
import { ROUTE } from 'pkg/route'
import { ReactElement, useEffect, useState } from 'react'
import { BiDetail } from 'react-icons/bi'
import { FiExternalLink } from 'react-icons/fi'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { cookRecipeSelector, setCookRecipeListState, setCookRecipeState, useCookRecipeStore } from 'store/cook.recipe'
import { CookRecipeStateType } from 'store/cook.recipe/util'
import { userSelector, useUserStore } from 'store/user'
import { cookRecipeListAPI, COOK_RECIPE_LIST_QUERY_KEY } from '../table/util'

const p = '5px'
const borderRadius = '10px'
const borderWidth = '2px'
const iconSize = '25px'
const containerBg = 'white'
export default function CookRecipeGridPage(): ReactElement {
	const { user } = useUserStore(userSelector)
	const navigate = useNavigate()
	const [data, setData] = useState([])
	const { cookRecipeList } = useCookRecipeStore(cookRecipeSelector)
	useQuery(COOK_RECIPE_LIST_QUERY_KEY, async () => {
		const list: any = await cookRecipeListAPI(user._id)
		await setCookRecipeListState(list)
		const newList: CookRecipeStateType[] = []
		list.forEach((item: CookRecipeStateType) => {
			if (item.isPicked) newList.push(item)
		})
		return newList
	})
	useEffect(() => {
		const dataList = []
		for (const item of cookRecipeList) {
			if (item.isPicked) dataList.push(item)
		}
		setData(dataList as never)
	}, [cookRecipeList])
	return (
		<SingleTopLayout
			topbarRightExtra={
				<>
					<Button variant='2' isActive>
						Today's Pick
					</Button>
					<Button variant='2' onClick={async () => navigate(ROUTE.COOK_RECIPE_TABLE, { replace: true })}>
						Recipes
					</Button>
				</>
			}
		>
			{_.isEmpty(data) ? (
				<Center borderRadius={borderRadius} borderWidth={borderWidth} bg={containerBg} p={p} h='300px'>
					No Today's Pick
				</Center>
			) : (
				<SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} spacing='10px'>
					{data.map((cookRecipe: CookRecipeStateType) => (
						<Center key={cookRecipe._id} borderRadius={borderRadius} borderWidth={borderWidth} bg={containerBg} p='10px' h='350px'>
							<VStack spacing='10px' align='stretch'>
								<Center>
									<Image boxSize='200px' objectFit='cover' src={cookRecipe.foodPhotoLink} alt={cookRecipe.name} />
								</Center>
								<Box>{cookRecipe.name}</Box>
								{/* <Box>{cookRecipe.ingredientList.join(', ')}</Box> */}
								<Center>
									<HStack spacing='30px'>
										<Tooltip placement='bottom' label='Recipe Detail'>
											<IconButton
												aria-label=''
												icon={<BiDetail size={iconSize} />}
												variant='ghost'
												onClick={async () => {
													await setCookRecipeState(cookRecipe)
													navigate(ROUTE.COOK_RECIPE_DETAIL, { replace: true })
												}}
											/>
										</Tooltip>
										<Tooltip placement='bottom' label='Go to URL website'>
											<IconButton
												aria-label=''
												icon={<FiExternalLink size={iconSize} />}
												variant='ghost'
												onClick={async () => window.open(cookRecipe.url, '_blank')}
											/>
										</Tooltip>
									</HStack>
								</Center>
							</VStack>
						</Center>
					))}
				</SimpleGrid>
			)}
		</SingleTopLayout>
	)
}
