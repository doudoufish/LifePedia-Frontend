import { Box, Center, chakra, Flex, HStack, Link } from '@chakra-ui/react'

const Card = () => {
	return (
		<Box w='md' mx='auto' py={4} px={8} bg='white' shadow='lg' rounded='lg'>
			<chakra.h2
				color='gray.800'
				fontSize={{
					base: '2xl',
					md: '3xl',
				}}
				mt={{
					base: 2,
					md: 0,
				}}
				fontWeight='bold'
			>
				Design Tools
			</chakra.h2>

			<chakra.p mt={2} color='gray.600'>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores deserunt ea doloremque natus error, rerum quas odio quaerat nam ex commodi hic,
				suscipit in a veritatis pariatur minus consequuntur!
			</chakra.p>

			<Flex justifyContent='end' mt={4}>
				<Link fontSize='xl' color='brand.500'>
					John Doe
				</Link>
			</Flex>
		</Box>
	)
}
export const TeamMember = () => {
	return (
		<Center pt='300px'>
			<HStack spacing='50px'>
				<Card />
				<Card />
				<Card />
			</HStack>
		</Center>
	)
}
