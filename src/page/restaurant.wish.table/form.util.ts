import { yupResolver } from '@hookform/resolvers/yup'
import { MAPBOX_TOKEN } from 'pkg/env'
import { mutationRequest } from 'pkg/util/graphql'
import { toast } from 'react-toastify'
import { RESTAURANT_WISH_LIST_QUERY_KEY } from 'store/restaurant.wish/util'
import * as Yup from 'yup'
import 'yup-phone'

// constant and form type
export interface FieldType {
	name: string
	address: string
	locationCoordinates: number[]
	phoneNumber: string
}
export enum FieldName {
	Name = 'name',
	Address = 'address',
	LocationCoordinates = 'locationCoordinates',
	PhoneNumber = 'phoneNumber',
}
const schema = Yup.object({
	[FieldName.Name]: Yup.string().max(40).required(),
	[FieldName.Address]: Yup.string().required(),
	[FieldName.LocationCoordinates]: Yup.array().of(Yup.number()).min(2).max(2).required(),
	[FieldName.PhoneNumber]: Yup.string(),
})
export const getFormConfig = (): any => ({
	mode: 'onChange',
	resolver: yupResolver(schema),
	defaultValues: {
		[FieldName.Name]: '',
		[FieldName.Address]: '',
		[FieldName.LocationCoordinates]: [0, 0],
		[FieldName.PhoneNumber]: '',
	},
})
// helper function
export const searchAddress = async (value: string) => {
	if (value.length < 3) return []
	const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?access_token=${MAPBOX_TOKEN}`)
	const data = await res.json()
	return data.features.map((feature: any) => ({ label: feature.place_name, value: feature.place_name, feature }))
}
// api function
export const addRestaurantWishAPI = async (v: FieldType, userId: string, queryClient: any, onClose: () => void) => {
	try {
		await schema.validate(v)
	} catch (error: any) {
		toast.error(error.message)
		return
	}
	const { data, message } = await mutationRequest(
		`addRestaurantWish(record:{
			userId:"${userId}" name:"${v[FieldName.Name]}" address: "${v[FieldName.Address]}"
			location:{coordinates:[${v[FieldName.LocationCoordinates]}]} phoneNumber: "${v[FieldName.PhoneNumber]}"
		}){record{_id userId name address location {coordinates} phoneNumber otherInfo updatedAt createdAt}}`
	)
	if (data === null) {
		toast.error(message)
		return
	}
	const isSuccess = data.addRestaurantWish
	if (!isSuccess) {
		toast.error('something went wrong')
		return
	}
	toast.success('add restaurant success')
	queryClient.invalidateQueries(RESTAURANT_WISH_LIST_QUERY_KEY)
	onClose()
}
export const updateRestaurantWishAPI = async (v: FieldType, id: string, queryClient: any, onClose: () => void) => {
	try {
		await schema.validate(v)
	} catch (error: any) {
		toast.error(error.message)
		return
	}
	const { data, message } = await mutationRequest(
		`updateRestaurantWish(
			filter:{_id:"${id}"}
			record:{name:"${v[FieldName.Name]}" address: "${v[FieldName.Address]}" location:{coordinates:[${v[FieldName.LocationCoordinates]}]}
			phoneNumber: "${v[FieldName.PhoneNumber]}"}
		){record{_id userId name address location {coordinates} phoneNumber otherInfo updatedAt createdAt}}`
	)
	if (data === null) {
		toast.error(message)
		return
	}
	const isSuccess = data.updateRestaurantWish
	if (!isSuccess) {
		toast.error('something went wrong')
		return
	}
	toast.success('update restaurant success')
	queryClient.invalidateQueries(RESTAURANT_WISH_LIST_QUERY_KEY)
	onClose()
}
