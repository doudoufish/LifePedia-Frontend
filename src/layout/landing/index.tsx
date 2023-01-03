import { Box, Center, Flex } from '@chakra-ui/react'
import { Topbar } from 'layout/landing/topbar'
import { ReactNode } from 'react'

const m = '5px'
const p = '5px'
export const LandingLayout = (props: { children: ReactNode; bgImage: string }) => {
	const { children, bgImage } = props
	return (
		<Flex bgImage={bgImage} bgRepeat='repeat' bgSize='contain' h='100vh' bgColor='gray.200'>
			<Box position='fixed' left={m} p={p} w='calc(100vw - 10px)'>
				<Topbar />
			</Box>
			<Box w='100vw'>
				<Center>{children}</Center>
			</Box>
		</Flex>
	)
}
