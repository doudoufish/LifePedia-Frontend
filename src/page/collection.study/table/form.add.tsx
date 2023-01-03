import { Button, FormControl, FormErrorMessage, FormLabel, HStack, Input, VStack } from '@chakra-ui/react'
import _ from 'lodash'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { collectionStudySelector, useCollectionStudyStore } from 'store/collection.study'
import { userSelector, useUserStore } from 'store/user'
import { addCollectionStudyAPI, FieldName, FieldType, getFormConfig } from './form.add.util'

export const AddCollectionStudyForm = (props: { onClose: () => void }) => {
	const { user } = useUserStore(userSelector)
	const { onClose } = props
	const { collectionStudyList } = useCollectionStudyStore(collectionStudySelector)
	const queryClient = useQueryClient()
	const rhf = useForm<FieldType>(getFormConfig())
	const { errors } = rhf.formState
	const watch = rhf.watch()
	const isFormValid = _.isEmpty(errors)
	const addUpdateCollectionStudyMutation = useMutation(async () => {
		// check same link in collectionStudyList
		for (const collectionStudy of collectionStudyList) {
			if (collectionStudy.url === watch.url) {
				toast.error('record with the same url already exist')
				return
			}
		}
		await addCollectionStudyAPI(rhf.getValues(), user._id, queryClient, onClose)
	})

	return (
		<VStack align='stretch'>
			<FormControl isInvalid={!!errors.url?.message}>
				<FormLabel>URL</FormLabel>
				<Input placeholder='URL' {...rhf.register(FieldName.URL)} />
				<FormErrorMessage>{errors.url?.message}</FormErrorMessage>
			</FormControl>
			<HStack>
				<Button
					variant='1'
					isLoading={addUpdateCollectionStudyMutation.isLoading}
					onClick={async () => addUpdateCollectionStudyMutation.mutateAsync()}
					isDisabled={!isFormValid}
				>
					Add
				</Button>
				<Button variant='2' isLoading={addUpdateCollectionStudyMutation.isLoading} onClick={onClose}>
					Cancel
				</Button>
			</HStack>
		</VStack>
	)
}
