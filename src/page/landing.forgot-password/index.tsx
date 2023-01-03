import { Button, Flex, FormControl, FormErrorMessage, Input, Text, VStack } from '@chakra-ui/react'
import { LandingLayout } from 'layout/landing'
import _ from 'lodash'
import { ReactElement, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { FieldName, FieldType, getFormConfig, userRequestToResetPasswordAPI } from './util'

const color = 'gray.600'
const borderRadius = '10px'
const borderWidth = '2px'
export default function LandingForgotPasswordPage(): ReactElement {
	const rhf = useForm<FieldType>(getFormConfig())
	const { errors } = rhf.formState
	const isFormValid = _.isEmpty(errors)
	const [hasSentEmail, setHasSentEmail] = useState(false)
	const userRequestToResetPasswordMutation = useMutation(async () => userRequestToResetPasswordAPI(rhf.getValues(), setHasSentEmail))
	return (
		<LandingLayout bgImage='/login-image.png'>
			<Flex mt='150px' mb='100px' direction='column' w='600px' borderRadius={borderRadius} borderWidth={borderWidth} p='40px' bg='white'>
				<Text fontSize='xl' color={color} fontWeight='bold' textAlign='center' mb='20px'>
					Forgot Password
				</Text>
				<Text fontSize='md' color={color} textAlign='center' mb='40px'>
					We'll send you an email with link on how to reset your password.
				</Text>
				<VStack align='stretch'>
					<FormControl isInvalid={!!errors.email?.message}>
						<Input placeholder='Email' {...rhf.register(FieldName.Email)} />
						<FormErrorMessage>{errors.email?.message}</FormErrorMessage>
					</FormControl>
					{hasSentEmail ? (
						<Button w='100%' h='50px' variant='1' isDisabled>
							Sent
						</Button>
					) : (
						<Button
							w='100%'
							h='50px'
							variant='1'
							isLoading={userRequestToResetPasswordMutation.isLoading}
							onClick={async () => userRequestToResetPasswordMutation.mutateAsync()}
							isDisabled={!isFormValid}
						>
							Send
						</Button>
					)}
				</VStack>
			</Flex>
		</LandingLayout>
	)
}
