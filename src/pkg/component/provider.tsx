import { ChakraProvider } from '@chakra-ui/react'
import { chakraTheme } from 'pkg/style/theme.chakra'
import type { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ToastContainer } from 'react-toastify'

export const Provider = (props: { children: ReactNode }) => {
	const { children } = props
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: { staleTime: Number.POSITIVE_INFINITY, retry: 1 },
		},
	})
	return (
		<QueryClientProvider client={queryClient}>
			<ChakraProvider theme={chakraTheme}>
				<ToastContainer position='top-center' theme='colored' limit={2} hideProgressBar closeOnClick={false} draggable={false} />
				{children}
			</ChakraProvider>
		</QueryClientProvider>
	)
}
