import { Button, Center, Flex, HStack, Img, Spacer, Text } from '@chakra-ui/react'
import { ROUTE } from 'pkg/route'
import { useNavigate } from 'react-router-dom'

const borderWidth = '2px'
const borderRadius = '10px'
export const Topbar = () => {
	const navigate = useNavigate()
	return (
		<Flex bgColor='white' borderWidth={borderWidth} borderRadius={borderRadius}>
			<div style={{ cursor: 'pointer' }}>
				<Center pl='4px' onClick={() => navigate(ROUTE.LANDING)}>
					<Img boxSize='40px' width='40px' src='/logo.png' />
					<Text fontWeight='bold' fontSize='30px' color='gray.600'>
						Lifepedia
					</Text>
				</Center>
			</div>
			<Spacer />
			<HStack>
				<Center>
					<Button variant='1' onClick={() => navigate(ROUTE.LANDING_LOGIN)}>
						Log in
					</Button>
				</Center>
				<Center pr='4px'>
					<Button variant='1' onClick={() => navigate(ROUTE.LANDING_SIGNUP)}>
						Sign up
					</Button>
				</Center>
			</HStack>
		</Flex>
	)
}
