import { Box, Button, Center, HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import { Hints, Steps } from 'intro.js-react'
import { SingleTopLayout } from 'layout/singleTop'
import { ROUTE } from 'pkg/route'
import { ReactElement, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { commonSelector, setIntroStepEnabledState, useCommonStore } from 'store/common'

const borderRadius = '10px'
const borderWidth = '2px'
const containerBg = 'white'
const Block = (props: { children: ReactNode; name: string }) => {
	const { children, name } = props
	return (
		<Center mt='25px' h='200px'>
			<VStack align='stretch'>
				<Center>
					<Text fontWeight='bold' fontSize='20px'>
						{name}
					</Text>
				</Center>
				{children}
			</VStack>
		</Center>
	)
}
const stepList: any = [
	{ element: '#considerations', intro: 'The restaurant you want to go' },
	{ element: '#favorites', intro: 'the restaurant you like' },
	{ element: '#todayPick', intro: 'pick the recipe you want to cook today' },
	{ element: '#recipes', intro: 'customized recipe' },
	{ element: '#collectionGame', intro: 'save the game link you like' },
	{ element: '#collectionShop', intro: 'save the product you want' },
	{ element: '#collectionStudy', intro: 'save the study link you want to study later' },
]
const hintList: any = [{ element: '', hint: '', hintPosition: 'top-right' }]
export default function UserHomePage(): ReactElement {
	const navigate = useNavigate()
	const { intro } = useCommonStore(commonSelector)
	return (
		<SingleTopLayout topbarRightExtra={null}>
			<Steps enabled={intro.stepEnabled} steps={stepList} initialStep={0} onExit={() => setIntroStepEnabledState(false)} />
			<Hints enabled={intro.hintEnabled} hints={hintList} />
			<SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing='2px'>
				<Box bg={containerBg} height='250px' borderRadius={borderRadius} borderWidth={borderWidth}>
					<Block name='Restaurant'>
						<HStack>
							<Button id='considerations' w='130%' h='50px' variant='2' onClick={async () => navigate(ROUTE.RESTAURANT_WISH_TABLE, { replace: true })}>
								Considerations
							</Button>
							<Button id='favorites' w='70%' h='50px' variant='2' onClick={async () => navigate(ROUTE.RESTAURANT_FAVORITE_TABLE, { replace: true })}>
								Favorites
							</Button>
						</HStack>
					</Block>
				</Box>
				<Box bg={containerBg} height='250px' borderRadius={borderRadius} borderWidth={borderWidth}>
					<Block name='Cook'>
						<HStack>
							<Button w='120%' id='todayPick' h='50px' variant='2' onClick={async () => navigate(ROUTE.COOK_RECIPE_GRID, { replace: true })}>
								Today's Pick
							</Button>
							<Button w='80%' id='recipes' h='50px' variant='2' onClick={async () => navigate(ROUTE.COOK_RECIPE_TABLE, { replace: true })}>
								Recipes
							</Button>
						</HStack>
					</Block>
				</Box>
				<Box bg={containerBg} height='250px' borderRadius={borderRadius} borderWidth={borderWidth}>
					<Block name='Collection'>
						<VStack>
							<Button id='collectionGame' w='170%' h='50px' variant='2' onClick={async () => navigate(ROUTE.COLLECTION_TABLE_GAME, { replace: true })}>
								Game
							</Button>
							<Button id='collectionShop' w='170%' h='50px' variant='2' onClick={async () => navigate(ROUTE.COLLECTION_TABLE_SHOP, { replace: true })}>
								Shop
							</Button>
							<Button id='collectionStudy' w='170%' h='50px' variant='2' onClick={async () => navigate(ROUTE.COLLECTION_TABLE_STUDY, { replace: true })}>
								Study
							</Button>
						</VStack>
					</Block>
				</Box>
				<Box bg={containerBg} height='250px' borderRadius={borderRadius} borderWidth={borderWidth}>
					<Block name='Travel'>
						<HStack>
							<Button w='80%' h='50px' variant='2' onClick={async () => {}} isDisabled>
								Travel Plans
							</Button>
							<Button w='120%' h='50px' variant='2' onClick={async () => {}} isDisabled>
								Footprint Records
							</Button>
						</HStack>
					</Block>
				</Box>
			</SimpleGrid>
		</SingleTopLayout>
	)
}
