import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import _ from 'lodash'
import { MAPBOX_TOKEN } from 'pkg/env'
import { mutationRequest } from 'pkg/util/graphql'
import { toast } from 'react-toastify'
import { RESTAURANT_FAVORITE_LIST_QUERY_KEY } from 'store/restaurant.favorite/util'
import * as Yup from 'yup'
import 'yup-phone'
import { FILE_DIR } from './util'

// constant and form type
export interface FieldType {
	name: string
	address: string
	locationCoordinates: number[]
	phoneNumber: string
	menuPhotoType: string
	note: string
}
export enum FieldName {
	Name = 'name',
	Address = 'address',
	LocationCoordinates = 'locationCoordinates',
	PhoneNumber = 'phoneNumber',
	MenuPhotoType = 'menuPhotoType',
	Note = 'note',
}
const schema = Yup.object({
	[FieldName.Name]: Yup.string().max(40).required(),
	[FieldName.Address]: Yup.string().required(),
	[FieldName.LocationCoordinates]: Yup.array().of(Yup.number()).min(2).max(2).required(),
	[FieldName.PhoneNumber]: Yup.string(),
	[FieldName.MenuPhotoType]: Yup.string(),
	[FieldName.Note]: Yup.string().max(100),
})
export const getFormConfig = (): any => ({
	mode: 'onChange',
	resolver: yupResolver(schema),
	defaultValues: {
		[FieldName.Name]: '',
		[FieldName.Address]: '',
		[FieldName.LocationCoordinates]: [0, 0],
		[FieldName.PhoneNumber]: '',
		[FieldName.MenuPhotoType]: '',
		[FieldName.Note]: '',
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
export const uploadPhoto = async (filePath: string, photo: any) => {
	const { data, message } = await mutationRequest(`getSignedUrlFromCloudflareR2(filePath:"${filePath}")`)
	if (data === null) {
		toast.error(message)
		return
	}
	const signedUrl = data.getSignedUrlFromCloudflareR2
	const response = await axios.put(signedUrl, photo, {
		headers: {},
	})
	return response
}
export const addRestaurantFavoriteAPI = async (v: FieldType, userId: string, photo: any, queryClient: any, onClose: () => void) => {
	try {
		await schema.validate(v)
	} catch (error: any) {
		toast.error(error.message)
		return
	}
	if (v[FieldName.Note].indexOf('%') > -1) {
		toast.error('note cannot contain %')
		return
	}
	const note = v[FieldName.Note].replaceAll(/\n/g, '%')
	const { data, message } = await mutationRequest(
		`addRestaurantFavorite(record:{
			userId:"${userId}" name:"${v[FieldName.Name]}" address:"${v[FieldName.Address]}"
			location:{coordinates:[${v[FieldName.LocationCoordinates]}]} phoneNumber:"${v[FieldName.PhoneNumber]}"
			menuPhotoType:"${v[FieldName.MenuPhotoType]}" note:"${note}"
		}){record{_id userId name address location {coordinates} phoneNumber menuPhotoType note otherInfo updatedAt createdAt}}`
	)
	if (data === null) {
		toast.error(message)
		return
	}
	const { record } = data.addRestaurantFavorite
	if (!_.isEmpty(photo)) await uploadPhoto(`${FILE_DIR}/${record._id}.${v[FieldName.MenuPhotoType]}`, photo)
	toast.success('add restaurant success')
	queryClient.invalidateQueries(RESTAURANT_FAVORITE_LIST_QUERY_KEY)
	onClose()
}
export const updateRestaurantFavoriteAPI = async (v: FieldType, id: string, photo: any, queryClient: any, onClose: () => void) => {
	try {
		await schema.validate(v)
	} catch (error: any) {
		toast.error(error.message)
		return
	}
	if (v[FieldName.Note].indexOf('%') > -1) {
		toast.error('note cannot contain %')
		return
	}
	const note = v[FieldName.Note].replaceAll(/\n/g, '%')
	const { data, message } = await mutationRequest(
		`updateRestaurantFavorite(
			filter:{_id:"${id}"}
			record:{name:"${v[FieldName.Name]}" address: "${v[FieldName.Address]}" location:{coordinates:[${v[FieldName.LocationCoordinates]}]}
			phoneNumber: "${v[FieldName.PhoneNumber]}" menuPhotoType: "${v[FieldName.MenuPhotoType]}" note: "${note}"}
		){record{_id userId name address location {coordinates} phoneNumber menuPhotoType note otherInfo updatedAt createdAt}}`
	)
	if (data === null) {
		toast.error(message)
		return
	}
	const { record } = data.updateRestaurantFavorite
	if (!_.isEmpty(photo)) await uploadPhoto(`${FILE_DIR}/${record._id}.${v[FieldName.MenuPhotoType]}`, photo)
	toast.success('update restaurant success')
	queryClient.invalidateQueries(RESTAURANT_FAVORITE_LIST_QUERY_KEY)
	onClose()
}
