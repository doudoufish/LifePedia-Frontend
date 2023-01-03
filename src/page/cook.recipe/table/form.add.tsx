import { Button, FormControl, FormErrorMessage, FormLabel, HStack, Input, VStack } from '@chakra-ui/react'
import _ from 'lodash'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { cookRecipeSelector, useCookRecipeStore } from 'store/cook.recipe'
import { userSelector, useUserStore } from 'store/user'
import { addCookRecipeAPI, FieldName, FieldType, getFormConfig } from './form.add.util'

export const AddCookRecipeForm = (props: { onClose: () => void }) => {
	const { user } = useUserStore(userSelector)
	const { onClose } = props
	const queryClient = useQueryClient()
	const rhf = useForm<FieldType>(getFormConfig())
	const { cookRecipeList } = useCookRecipeStore(cookRecipeSelector)
	const { errors } = rhf.formState
	const watch = rhf.watch()
	const isFormValid = _.isEmpty(errors)
	const addCookRecipeMutation = useMutation(async () => {
		// check same link in cookRecipeList
		for (const cookRecipe of cookRecipeList) {
			if (cookRecipe.url === watch.url) {
				toast.error('record with the same url already exist')
				return
			}
		}
		await addCookRecipeAPI(rhf.getValues(), user._id, queryClient, onClose)
	})

	return (
		<VStack align='stretch'>
			<FormControl isInvalid={!!errors.url?.message}>
				<FormLabel>URL</FormLabel>
				<Input placeholder='URL' {...rhf.register(FieldName.URL)} />
				<FormErrorMessage>{errors.url?.message}</FormErrorMessage>
			</FormControl>
			<HStack>
				<Button variant='1' isLoading={addCookRecipeMutation.isLoading} onClick={async () => addCookRecipeMutation.mutateAsync()} isDisabled={!isFormValid}>
					Add
				</Button>
				<Button variant='2' isLoading={addCookRecipeMutation.isLoading} onClick={onClose}>
					Cancel
				</Button>
			</HStack>
		</VStack>
	)
}
