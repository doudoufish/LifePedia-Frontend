import { Box, Button, Center, Flex, VStack } from '@chakra-ui/react'
import { Topbar } from 'layout/landing/topbar'
import { ROUTE } from 'pkg/route'
import type { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { Footer } from './footer'

const m = '5px'
const p = '5px'
const borderRadius = '10px'
const fontSize2 = { sm: '35px', xl: '50px' }
const fontSize4 = { sm: '15px', xl: '20px' }
export default function LandingPage(): ReactElement {
	const navigate = useNavigate()
	return (
		<>
			<Flex bgImage='/landing-image1.svg' bgRepeat='no-repeat' bgSize='cover' h='80vh' bgColor='gray.200'>
				<Box position='fixed' left={m} p={p} w='calc(100vw - 10px)'>
					<Topbar />
				</Box>
				<Box w='100vw'>
					<Center>
						<Flex mt='400px' bgColor='white' borderRadius={borderRadius}>
							<VStack align='stretch' fontWeight='bold' m='20px'>
								<Center fontSize={fontSize2} color='gray.700'>
									Personal Life Butler for Everyone
								</Center>
								<Center fontSize={fontSize4} color='gray.600'>
									Way more than a note taking. Customize the personal life you want to manage in different aspects.
								</Center>
								<Center pt='10px'>
									<Button variant='1' onClick={() => navigate(ROUTE.LANDING_LOGIN)}>
										Get started
									</Button>
								</Center>
							</VStack>
						</Flex>
					</Center>
				</Box>
			</Flex>

			<Footer />
		</>
	)
}
