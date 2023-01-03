import { Button, Flex, FormControl, FormErrorMessage, Input, Text, VStack } from '@chakra-ui/react'
import { LandingLayout } from 'layout/landing'
import _ from 'lodash'
import { ROUTE } from 'pkg/route'
import type { ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import type { FieldType } from './util'
import { FieldName, getFormConfig, userSignupAPI } from './util'

const color = 'gray.600'
const buttonBgColor = '#6A95FF'
const borderRadius = '10px'
const borderWidth = '2px'
export default function LandingSignupPage(): ReactElement {
	const navigate = useNavigate()
	const rhf = useForm<FieldType>(getFormConfig())
	const { errors } = rhf.formState
	const isFormValid = _.isEmpty(errors)
	const userSignupMutation = useMutation(async () => {
		const v: FieldType = rhf.getValues()
		await userSignupAPI(v, navigate)
	})

	return (
		<LandingLayout bgImage='/signup-image.svg'>
			<Flex mt='300px' mb='100px' direction='column' w='500px' borderRadius={borderRadius} borderWidth={borderWidth} p='40px' bg='white'>
				<Text fontSize='xl' color={color} fontWeight='bold' textAlign='center' mb='30px'>
					Sign Up
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
					<FormControl isInvalid={!!errors.confirmedPassword?.message}>
						<Input placeholder='Confirm Password' type='password' {...rhf.register(FieldName.ConfirmedPassword)} />
						<FormErrorMessage>{errors.confirmedPassword?.message}</FormErrorMessage>
					</FormControl>
					<Button
						w='100%'
						h='50px'
						variant='1'
						isLoading={userSignupMutation.isLoading}
						onClick={async () => userSignupMutation.mutateAsync()}
						isDisabled={!isFormValid}
					>
						Sign up
					</Button>
				</VStack>
				<Flex justifyContent='center' mt='30px'>
					<Text color={color} fontWeight='medium'>
						Already have an account?
						<Button ml='10px' color={buttonBgColor} variant='link' onClick={() => navigate(ROUTE.LANDING_LOGIN)}>
							Log in
						</Button>
					</Text>
				</Flex>
			</Flex>
		</LandingLayout>
	)
}
