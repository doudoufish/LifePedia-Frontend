import { Box, chakra, Flex, GridItem, Icon, SimpleGrid, Stack } from '@chakra-ui/react'
import { ReactNode } from 'react'

const Feature = (props: { title: string; children: ReactNode }) => {
	const { title, children } = props
	return (
		<Flex>
			<Flex shrink={0}>
				<Icon boxSize={5} mt={1} mr={2} color='brand.500' viewBox='0 0 20 20' fill='currentColor'>
					<path
						fillRule='evenodd'
						d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
						clipRule='evenodd'
					/>
				</Icon>
			</Flex>
			<Box ml={4}>
				<chakra.dt
					fontSize='lg'
					fontWeight='bold'
					lineHeight='6'
					_light={{
						color: 'gray.900',
					}}
				>
					{title}
				</chakra.dt>
				<chakra.dd mt={2} color='gray.500'>
					{children}
				</chakra.dd>
			</Box>
		</Flex>
	)
}
export const FeatureList = () => {
	return (
		<Box shadow='xl' bg='white' px={8} py={20} mx='auto'>
			<SimpleGrid
				alignItems='center'
				columns={{
					base: 1,
					lg: 3,
				}}
				spacingY={{
					base: 10,
					lg: 32,
				}}
				spacingX={{
					base: 10,
					lg: 24,
				}}
			>
				<Box alignSelf='start'>
					<chakra.h2
						_light={{
							color: 'brand.500',
						}}
						fontWeight='semibold'
						textTransform='uppercase'
						letterSpacing='wide'
					>
						Everything you need
					</chakra.h2>
					<chakra.h2
						mb={3}
						fontSize={{
							base: '3xl',
							md: '4xl',
						}}
						fontWeight='extrabold'
						textAlign={{
							base: 'center',
							sm: 'left',
						}}
						_light={{
							color: 'black',
						}}
						lineHeight='shorter'
						letterSpacing='tight'
					>
						All-in-one platform
					</chakra.h2>
					<chakra.p
						mb={6}
						fontSize={{
							base: 'lg',
							md: 'xl',
						}}
						textAlign={{
							base: 'center',
							sm: 'left',
						}}
						color='gray.600'
					>
						Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in accusamus quisquam.
					</chakra.p>
				</Box>
				<GridItem colSpan={2}>
					<Stack
						spacing={{
							base: 10,
							md: 0,
						}}
						display={{
							md: 'grid',
						}}
						gridTemplateColumns={{
							md: 'repeat(2,1fr)',
						}}
						gridColumnGap={{
							md: 8,
						}}
						gridRowGap={{
							md: 10,
						}}
					>
						<Feature title='Invite team members'>
							Improve your conversion rates by monitoring exactly what???s going on while your customers are in trial.{' '}
						</Feature>
						<Feature title='Unify your payments stack'>
							Manage all your online and offline sales in one place with a single integration, simplifying reporting and reconciliation.
						</Feature>
						<Feature title='Own your in-store experience'>
							{' '}
							Provide a seamless customer experience across channels, like reserving online and picking up in store.
						</Feature>
						<Feature title='Grow your platform???s revenue'> Add in-person payments to your platform or marketplace. Using Terminal with Connect. </Feature>
						<Feature title='Clear overview for efficient tracking'>
							{' '}
							Handle your subscriptions and transactions efficiently with the clear overview in Dashboard. Fea
						</Feature>
						<Feature title='Decide how you integrate Payments'>
							{' '}
							Love to code? Decide how you integrate Payments and build advanced and reliable products yourself from scratch.{' '}
						</Feature>
					</Stack>
				</GridItem>
			</SimpleGrid>
		</Box>
	)
}
