import { Button, FormControl, FormErrorMessage, FormLabel, HStack, Input, VStack } from '@chakra-ui/react'
import _ from 'lodash'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { collectionGameSelector, useCollectionGameStore } from 'store/collection.game'
import { userSelector, useUserStore } from 'store/user'
import { addCollectionGameAPI, FieldName, FieldType, getFormConfig } from './form.add.util'

export const AddCollectionGameForm = (props: { onClose: () => void }) => {
	const { user } = useUserStore(userSelector)
	const { onClose } = props
	const { collectionGameList } = useCollectionGameStore(collectionGameSelector)
	const queryClient = useQueryClient()
	const rhf = useForm<FieldType>(getFormConfig())
	const { errors } = rhf.formState
	const watch = rhf.watch()
	const isFormValid = _.isEmpty(errors)
	const addCollectionGameMutation = useMutation(async () => {
		// check same link in collectionGameList
		for (const collectionGame of collectionGameList) {
			if (collectionGame.url === watch.url) {
				toast.error('record with the same url already exist')
				return
			}
		}
		await addCollectionGameAPI(rhf.getValues(), user._id, queryClient, onClose)
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
					isLoading={addCollectionGameMutation.isLoading}
					onClick={async () => addCollectionGameMutation.mutateAsync()}
					isDisabled={!isFormValid}
				>
					Add
				</Button>
				<Button variant='2' isLoading={addCollectionGameMutation.isLoading} onClick={onClose}>
					Cancel
				</Button>
			</HStack>
		</VStack>
	)
}
