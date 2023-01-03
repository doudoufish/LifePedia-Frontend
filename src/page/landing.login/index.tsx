import { Button, Flex, FormControl, FormErrorMessage, Input, Text, VStack } from '@chakra-ui/react'
import { LandingLayout } from 'layout/landing'
import _ from 'lodash'
import { ROUTE } from 'pkg/route'
import type { ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import type { FieldType } from './util'
import { FieldName, getFormConfig, userLoginAPI } from './util'

const color = 'gray.600'
const buttonBgColor = '#6A95FF'
const borderRadius = '10px'
const borderWidth = '2px'
export default function LandingLoginPage(): ReactElement {
	const navigate = useNavigate()
	const location: any = useLocation()
	const initialEmail = location.state?.email ?? ''
	const rhf = useForm<FieldType>(getFormConfig(initialEmail))
	const { errors } = rhf.formState
	const isFormValid = _.isEmpty(errors)
	const userLoginMutation = useMutation(async () => userLoginAPI(rhf.getValues()))
	return (
		<LandingLayout bgImage='/login-image.png'>
			<Flex mt='300px' mb='100px' direction='column' w='500px' borderRadius={borderRadius} borderWidth={borderWidth} p='40px' bg='white'>
				<Text fontSize='xl' color={color} fontWeight='bold' textAlign='center' mb='30px'>
					Log In
				</Text>
				<VStack align='stretch'>
					<FormControl isInvalid={!!errors.email?.message}>
						<Input placeholder='Email' {...rhf.register(FieldName.Email)} />
						<FormErrorMessage>{errors.email?.message}</FormErrorMessage>
					</FormControl>
					<FormControl isInvalid={!!errors.password?.message}>
						<Input placeholder='Password' type='password' {...rhf.register(FieldName.Password)} />
						<FormErrorMessage>{errors.password?.message}</FormErrorMessage>
					</FormControl>
					<Button
						w='100%'
						h='50px'
						variant='1'
						isLoading={userLoginMutation.isLoading}
						onClick={async () => userLoginMutation.mutateAsync()}
						isDisabled={!isFormValid}
					>
						Log in
					</Button>
				</VStack>
				<Flex justifyContent='center' mt='50px'>
					<Text color={color} fontWeight='small'>
						<Button ml='10px' color={buttonBgColor} variant='link' onClick={() => navigate(ROUTE.LANDING_FORGOT_PASSWORD)}>
							Forgot password?
						</Button>
					</Text>
				</Flex>
				<Flex justifyContent='center' mt='5px'>
					<Text color={color} fontWeight='medium'>
						Don't have an account?
						<Button ml='10px' color={buttonBgColor} variant='link' onClick={() => navigate(ROUTE.LANDING_SIGNUP)}>
							Sign up
						</Button>
					</Text>
				</Flex>
			</Flex>
		</LandingLayout>
	)
}
