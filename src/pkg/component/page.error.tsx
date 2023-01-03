import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/react'
import { useRouteError } from 'react-router-dom'

export const SimpleErrorPage = () => {
	const error = useRouteError() as any
	return (
		<Alert status='error' variant='subtle' flexDirection='column' alignItems='center' justifyContent='center' textAlign='center' height='100vh'>
			<AlertIcon boxSize='40px' mr={0} />
			<AlertTitle mt={4} mb={1} fontSize='lg'>
				{error.message}
			</AlertTitle>
		</Alert>
	)
}
