import { Button, FormControl, FormErrorMessage, FormLabel, HStack, Image, Input, Text, Textarea, VStack } from '@chakra-ui/react'
import _ from 'lodash'
import { ImageUploadBlock } from 'pkg/component/upload.image'
import { R2_PUBLIC_URL } from 'pkg/util'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import AsyncSelect from 'react-select/async'
import { toast } from 'react-toastify'
import { restaurantFavoriteSelector, useRestaurantFavoriteStore } from 'store/restaurant.favorite'
import { userSelector, useUserStore } from 'store/user'
import { addRestaurantFavoriteAPI, FieldName, FieldType, getFormConfig, searchAddress, updateRestaurantFavoriteAPI } from './form.util'
import { FILE_DIR } from './util'

export const RestaurantFavoriteForm = (props: { isAdding: boolean; onClose: () => void }) => {
	const { user } = useUserStore(userSelector)
	const { restaurantFavorite } = useRestaurantFavoriteStore(restaurantFavoriteSelector)
	const { isAdding, onClose } = props
	const queryClient = useQueryClient()
	const [photo, setPhoto] = useState<any>({})
	const rhf = useForm<FieldType>(getFormConfig())
	const { errors } = rhf.formState
	const watch = rhf.watch()
	const isFormValid = _.isEmpty(errors)
	const addUpdateRestaurantFavoriteMutation = useMutation(async () => {
		if (isAdding) {
			await addRestaurantFavoriteAPI(rhf.getValues(), user._id, photo, queryClient, onClose)
			return
		}
		await updateRestaurantFavoriteAPI(rhf.getValues(), restaurantFavorite._id, photo, queryClient, onClose)
	})

	const onAddressChange = (option: any) => {
		const { feature } = option
		rhf.setValue(FieldName.Address, feature.place_name as never)
		const locationCoordinates = feature.center
		rhf.setValue(FieldName.LocationCoordinates, locationCoordinates as never)
	}

	const onDrop = useCallback(async (fileList: any) => {
		if (_.isEmpty(fileList)) {
			toast.error('invalid file')
			setPhoto({})
			return
		}
		const file = fileList[0]
		if (file.size > 10000000) {
			toast.error('file size must less than 10MB')
			setPhoto({})
			return
		}
		if (!['image/jpeg', 'image/png'].includes(file.type)) {
			toast.error('only .jpeg and .png are allowed')
			setPhoto({})
			return
		}
		rhf.setValue(FieldName.MenuPhotoType, file.type.split('/')[1] as never)
		setPhoto(file)
	}, [])

	useEffect(() => {
		if (!isAdding) {
			rhf.setValue(FieldName.Name, restaurantFavorite.name as never)
			rhf.setValue(FieldName.Address, restaurantFavorite.address as never)
			rhf.setValue(FieldName.LocationCoordinates, restaurantFavorite.location.coordinates as never)
			rhf.setValue(FieldName.PhoneNumber, restaurantFavorite.phoneNumber as never)
			rhf.setValue(FieldName.MenuPhotoType, restaurantFavorite.menuPhotoType as never)
			rhf.setValue(FieldName.Note, restaurantFavorite.note.replaceAll('%', '\n') as never)
		}
	}, [restaurantFavorite])

	let imageUploadComponent = null
	if (_.isEmpty(photo)) {
		if (!_.isEmpty(watch.menuPhotoType)) {
			imageUploadComponent = (
				<VStack>
					<Image
						boxSize='200px'
						objectFit='cover'
						src={`${R2_PUBLIC_URL}/${FILE_DIR}/${restaurantFavorite._id}.${restaurantFavorite.menuPhotoType}`}
						alt={restaurantFavorite.menuPhotoType}
					/>
					<Button size='xs' onClick={() => rhf.setValue(FieldName.MenuPhotoType, '' as never)} ml={2}>
						Cancel
					</Button>
				</VStack>
			)
		} else {
			imageUploadComponent = <ImageUploadBlock onDrop={onDrop} maxFiles={1} multiple={false} />
		}
	} else {
		imageUploadComponent = (
			<VStack>
				<Text>{photo.name}</Text>
				<Button size='xs' onClick={() => rhf.setValue(FieldName.MenuPhotoType, '' as never)} ml={2}>
					Cancel
				</Button>
			</VStack>
		)
	}
	return (
		<VStack align='stretch'>
			<FormControl isInvalid={!!errors.name?.message}>
				<FormLabel>Name</FormLabel>
				<Input placeholder='Name' {...rhf.register(FieldName.Name)} />
				<FormErrorMessage>{errors.name?.message}</FormErrorMessage>
			</FormControl>
			<FormLabel>Address</FormLabel>
			<AsyncSelect
				placeholder='Search for an address'
				loadOptions={async (value: string) => searchAddress(value)}
				value={{ label: watch.address, value: watch.address }}
				onChange={(option: any) => onAddressChange(option)}
			/>
			<FormControl isInvalid={!!errors.phoneNumber?.message}>
				<FormLabel>Phone Number</FormLabel>
				<Input placeholder='Phone Number' {...rhf.register(FieldName.PhoneNumber)} />
				<FormErrorMessage>{errors.phoneNumber?.message}</FormErrorMessage>
			</FormControl>
			<FormControl isInvalid={!!errors.menuPhotoType}>
				<FormLabel>Menu</FormLabel>
				{imageUploadComponent}
			</FormControl>
			<FormControl isInvalid={!!errors.note?.message}>
				<FormLabel>Note</FormLabel>
				<Textarea placeholder='enter extra information here' {...rhf.register(FieldName.Note)} />
				<FormErrorMessage>{errors.note?.message}</FormErrorMessage>
			</FormControl>
			<HStack>
				<Button
					variant='1'
					isLoading={addUpdateRestaurantFavoriteMutation.isLoading}
					onClick={async () => addUpdateRestaurantFavoriteMutation.mutateAsync()}
					isDisabled={!isFormValid}
				>
					{isAdding ? 'Add' : 'Update'}
				</Button>
				<Button variant='2' isLoading={addUpdateRestaurantFavoriteMutation.isLoading} onClick={onClose}>
					Cancel
				</Button>
			</HStack>
		</VStack>
	)
}
