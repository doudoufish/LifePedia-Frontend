import { Box, Button, Center, HStack, Image, SimpleGrid, StackDivider, Text, Tooltip, VStack } from '@chakra-ui/react'
import { SingleTopLayout } from 'layout/singleTop'
import { ROUTE } from 'pkg/route'
import { ReactElement } from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { cookRecipeSelector, setCookRecipeState, useCookRecipeStore } from 'store/cook.recipe'
import { CustomEditableListInput } from './editable-input.list'
import { CustomEditableValueInput } from './editable-input.value'
import { bbcgoodfoodCrawlerRunAPI, updateCookRecipeAPI } from './util'

const p = '5px'
const borderRadius = '10px'
const borderWidth = '2px'
const containerBg = 'white'
export default function CookRecipeDetailPage(): ReactElement {
	const navigate = useNavigate()
	const { cookRecipe } = useCookRecipeStore(cookRecipeSelector)
	const updateCookRecipeMutation = useMutation(async () =>
		updateCookRecipeAPI(cookRecipe._id, cookRecipe.name, cookRecipe.ingredientList, cookRecipe.methodList)
	)
	const setName = (name: string) => setCookRecipeState({ ...cookRecipe, name })
	const setIngredientList = (list: string[]) => setCookRecipeState({ ...cookRecipe, ingredientList: list })
	const setMethodList = (list: string[]) => setCookRecipeState({ ...cookRecipe, methodList: list })
	return (
		<SingleTopLayout
			topbarRightExtra={
				<>
					<Button variant='2' onClick={async () => navigate(ROUTE.COOK_RECIPE_GRID, { replace: true })}>
						Today's Pick
					</Button>
					<Button variant='2' onClick={async () => navigate(ROUTE.COOK_RECIPE_TABLE, { replace: true })}>
						Recipes
					</Button>
				</>
			}
		>
			<Box borderRadius={borderRadius} borderWidth={borderWidth} bg={containerBg} p={p}>
				<Center>
					<VStack spacing='10px' align='stretch'>
						<Center>
							<Image boxSize='200px' objectFit='cover' src={cookRecipe.foodPhotoLink} alt={cookRecipe.name} />
						</Center>
						<Center>
							<CustomEditableValueInput value={cookRecipe.name} setValue={setName} />
						</Center>
						<Center>
							<HStack spacing='10px'>
								<Tooltip placement='bottom' label='export information from url again'>
									<Button
										variant='2'
										onClick={async () => {
											const { name, ingredientList, methodList } = await bbcgoodfoodCrawlerRunAPI(cookRecipe.url)
											setCookRecipeState({ ...cookRecipe, name, ingredientList, methodList })
										}}
									>
										Export
									</Button>
								</Tooltip>
								<Tooltip placement='bottom' label='save current change'>
									<Button variant='2' onClick={async () => updateCookRecipeMutation.mutateAsync()}>
										Save
									</Button>
								</Tooltip>
							</HStack>
						</Center>
					</VStack>
				</Center>
			</Box>
			<SimpleGrid columns={2} spacing='2px'>
				<Box borderRadius={borderRadius} borderWidth={borderWidth} bg={containerBg} p={p}>
					<VStack divider={<StackDivider borderColor='gray.200' />} spacing='2px' align='stretch'>
						{cookRecipe.ingredientList.map((ingredient: string, index: number) => {
							return <CustomEditableListInput key={index} index={index} value={ingredient} list={cookRecipe.ingredientList} setList={setIngredientList} />
						})}
					</VStack>
				</Box>
				<Box borderRadius={borderRadius} borderWidth={borderWidth} bg={containerBg} p={p}>
					<VStack divider={<StackDivider borderColor='gray.200' />} spacing='5px' align='stretch'>
						{cookRecipe.methodList.map((method: string, index: number) => {
							const value = method.replace(`STEP ${index + 1}`, '')
							return (
								<VStack key={index} spacing='2px' align='stretch' p='2px'>
									<Text fontWeight='semibold' fontSize='15px'>{`Step ${index + 1}`}</Text>
									<CustomEditableListInput key={index} index={index} value={value} list={cookRecipe.methodList} setList={setMethodList} />
								</VStack>
							)
						})}
					</VStack>
				</Box>
			</SimpleGrid>
		</SingleTopLayout>
	)
}
