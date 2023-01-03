import { Button, FormControl, FormErrorMessage, FormLabel, HStack, Input, VStack } from '@chakra-ui/react'
import _ from 'lodash'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import AsyncSelect from 'react-select/async'
import { restaurantWishSelector, useRestaurantWishStore } from 'store/restaurant.wish'
import { userSelector, useUserStore } from 'store/user'
import { addRestaurantWishAPI, FieldName, FieldType, getFormConfig, searchAddress, updateRestaurantWishAPI } from './form.util'

export const RestaurantWishForm = (props: { isAdding: boolean; onClose: () => void }) => {
	const { user } = useUserStore(userSelector)
	const { restaurantWish } = useRestaurantWishStore(restaurantWishSelector)
	const { isAdding, onClose } = props
	const queryClient = useQueryClient()
	const rhf = useForm<FieldType>(getFormConfig())
	const { errors } = rhf.formState
	const watch = rhf.watch()
	const isFormValid = _.isEmpty(errors)
	const addUpdateRestaurantMutation = useMutation(async () => {
		if (isAdding) {
			await addRestaurantWishAPI(rhf.getValues(), user._id, queryClient, onClose)
			return
		}
		await updateRestaurantWishAPI(rhf.getValues(), restaurantWish._id, queryClient, onClose)
	})

	const onAddressChange = (option: any) => {
		const { feature } = option
		rhf.setValue(FieldName.Address, feature.place_name as never)
		const locationCoordinates = feature.center
		rhf.setValue(FieldName.LocationCoordinates, locationCoordinates as never)
	}

	useEffect(() => {
		if (!isAdding) {
			rhf.setValue(FieldName.Name, restaurantWish.name as never)
			rhf.setValue(FieldName.Address, restaurantWish.address as never)
			rhf.setValue(FieldName.LocationCoordinates, restaurantWish.location.coordinates as never)
			rhf.setValue(FieldName.PhoneNumber, restaurantWish.phoneNumber as never)
		}
	}, [restaurantWish])

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
			<HStack>
				<Button
					variant='1'
					isLoading={addUpdateRestaurantMutation.isLoading}
					onClick={async () => addUpdateRestaurantMutation.mutateAsync()}
					isDisabled={!isFormValid}
				>
					{isAdding ? 'Add' : 'Update'}
				</Button>
				<Button variant='2' isLoading={addUpdateRestaurantMutation.isLoading} onClick={onClose}>
					Cancel
				</Button>
			</HStack>
		</VStack>
	)
}
