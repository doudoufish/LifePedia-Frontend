import { Button, Flex, FormControl, FormErrorMessage, Input, Text, VStack } from '@chakra-ui/react'
import { LandingLayout } from 'layout/landing'
import _ from 'lodash'
import { ReactElement, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { FieldName, FieldType, getFormConfig, userResetPasswordAPI } from './util'

const color = 'gray.600'
const borderRadius = '10px'
const borderWidth = '2px'
function useURL() {
	const { search } = useLocation()
	return useMemo(() => new URLSearchParams(search), [search])
}
export default function LandingResetPasswordPage(): ReactElement {
	const navigate = useNavigate()
	const url = useURL()
	const userId = url.get('id') ?? ''
	const code = url.get('code') ?? ''
	const isLinkValid = userId !== '' && code !== ''
	const rhf = useForm<FieldType>(getFormConfig())
	const { errors } = rhf.formState
	const isFormValid = _.isEmpty(errors)
	const userResetPasswordMutation = useMutation(async () => userResetPasswordAPI(rhf.getValues(), userId, code, navigate))
	return (
		<LandingLayout bgImage='/login-image.png'>
			<Flex mt='150px' mb='100px' direction='column' w='600px' borderRadius={borderRadius} borderWidth={borderWidth} p='40px' bg='white'>
				<Text fontSize='xl' color={color} fontWeight='bold' textAlign='center' mb='30px'>
					Reset Password
				</Text>
				{isLinkValid ? (
					<VStack align='stretch'>
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
							isLoading={userResetPasswordMutation.isLoading}
							onClick={async () => userResetPasswordMutation.mutateAsync()}
							isDisabled={!isFormValid}
						>
							Set
						</Button>
					</VStack>
				) : (
					<Text textAlign='center'>link is not valid</Text>
				)}
			</Flex>
		</LandingLayout>
	)
}
