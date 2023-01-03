import { Button, FormControl, FormErrorMessage, FormLabel, HStack, Input, VStack } from '@chakra-ui/react'
import _ from 'lodash'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { collectionShopSelector, useCollectionShopStore } from 'store/collection.shop'
import { userSelector, useUserStore } from 'store/user'
import { addCollectionShopAPI, FieldName, FieldType, getFormConfig } from './form.add.util'

export const AddCollectionShopForm = (props: { onClose: () => void }) => {
	const { user } = useUserStore(userSelector)
	const { onClose } = props
	const { collectionShopList } = useCollectionShopStore(collectionShopSelector)
	const queryClient = useQueryClient()
	const [photo, setPhoto] = useState<any>({})
	const rhf = useForm<FieldType>(getFormConfig())
	const { errors } = rhf.formState
	const watch = rhf.watch()
	const isFormValid = _.isEmpty(errors)
	const addCollectionShopMutation = useMutation(async () => {
		// check same link in collectionShopList
		for (const collectionShop of collectionShopList) {
			if (collectionShop.url === watch.url) {
				toast.error('record with the same url already exist')
				return
			}
		}
		await addCollectionShopAPI(rhf.getValues(), user._id, photo, queryClient, onClose)
	})

	// const onDrop = useCallback(async (fileList: any) => {
	// 	if (_.isEmpty(fileList)) {
	// 		toast.error('invalid file')
	// 		setPhoto({})
	// 		return
	// 	}
	// 	const file = fileList[0]
	// 	if (file.size > 10000000) {
	// 		toast.error('file size must less than 10MB')
	// 		setPhoto({})
	// 		return
	// 	}
	// 	if (!['image/jpeg', 'image/png'].includes(file.type)) {
	// 		toast.error('only .jpeg and .png are allowed')
	// 		setPhoto({})
	// 		return
	// 	}
	// 	// rhf.setValue(FieldName.PhotoPath, file.name as never)
	// 	setPhoto(file)
	// }, [])

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
					isLoading={addCollectionShopMutation.isLoading}
					onClick={async () => addCollectionShopMutation.mutateAsync()}
					isDisabled={!isFormValid}
				>
					Add
				</Button>
				<Button variant='2' isLoading={addCollectionShopMutation.isLoading} onClick={onClose}>
					Cancel
				</Button>
			</HStack>
		</VStack>
	)
}
