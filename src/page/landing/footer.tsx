import { Box, Divider, HStack, Icon, Link, Text, VStack } from '@chakra-ui/react'
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa'
import { FiTwitter } from 'react-icons/fi'
import { GrInstagram } from 'react-icons/gr'

export const Footer = () => {
	return (
		<Box bg='white'>
			<Divider w='95%' mx='auto' color='gray.600' h='3.5px' />
			<VStack py={3}>
				<HStack justify='center'>
					<Link>
						<Icon color='gray.800' h='20px' w='20px' as={FaFacebookF} />
					</Link>
					<Link>
						<Icon color='gray.800' h='20px' w='20px' as={FiTwitter} />
					</Link>
					<Link>
						<Icon h='20px' w='20px' as={GrInstagram} />
					</Link>
					<Link>
						<Icon h='20px' w='20px' as={FaLinkedinIn} />
					</Link>
				</HStack>

				<Text textAlign='center' fontSize='smaller'>
					2022 &copy; Lifepedia Inc.
				</Text>
			</VStack>
		</Box>
	)
}
