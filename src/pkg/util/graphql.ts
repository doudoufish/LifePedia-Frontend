import { gql, GraphQLClient } from 'graphql-request'
import _ from 'lodash'
import { getServerUrl, LocalStorageKey } from 'pkg/env'

interface ResponseType {
	data: any
	message: string
}
const request = async (query: any, variables?: any): Promise<ResponseType> => {
	const userid: any = localStorage.getItem(LocalStorageKey.USER_ID)
	const accesstoken: any = localStorage.getItem(LocalStorageKey.USER_ACCESS_TOKEN)
	try {
		const graphQLClient = new GraphQLClient(getServerUrl(), { headers: { userid, accesstoken } })
		const res: any = await graphQLClient.request(query, variables)
		return { data: res, message: '' }
	} catch (err: any) {
		let message: string
		if (err.response && !_.isEmpty(err.response.errors)) {
			message = err.response.errors[0].message
		} else if (err.message) {
			message = err.message
		} else {
			message = JSON.stringify(err)
		}
		return { data: null, message }
	}
}
export const queryRequest = async (query: string, variables?: any): Promise<ResponseType> => request(gql`query {${query}}`, variables)
export const mutationRequest = async (query: string, variables?: any): Promise<ResponseType> => request(gql`mutation {${query}}`, variables)
