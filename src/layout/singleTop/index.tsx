import { Box, Flex } from '@chakra-ui/react'
import type { ReactNode } from 'react'
import { Topbar } from './topbar'

const p = '5px'
const pl = '10px'
const borderRadius = '10px'
const borderWidth = '2px'
export const SingleTopLayout = (props: { children: ReactNode; topbarRightExtra: ReactNode }) => {
	const { children, topbarRightExtra } = props
	return (
		<Flex bg='gray.200' color='gray.600' minH='100vh'>
			<Box position='fixed' zIndex='banner' left='2px' p={p} pl={pl} w='calc(100vw - 2px)' bg='white' borderWidth={borderWidth} borderRadius={borderRadius}>
				<Topbar topbarRightExtra={topbarRightExtra} />
			</Box>
			<Box mt='60px' w='100vw' borderWidth={borderWidth} borderRadius={borderRadius}>
				{children}
			</Box>
		</Flex>
	)
}
