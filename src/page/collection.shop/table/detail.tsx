import { HStack, ListItem, Text, UnorderedList, VStack } from '@chakra-ui/react'
import { CollectionShopStateType } from 'store/collection.shop/util'

export const ShopDetailForm = (props: { collectionShop: CollectionShopStateType }) => {
	const { collectionShop } = props
	const detailList = collectionShop.detail.split('%')
	return (
		<>
			<VStack spacing='10px' align='flex-start' p='10px'>
				<Text fontWeight='semibold'>Name:</Text>
				<Text>{collectionShop.name}</Text>
			</VStack>
			<VStack spacing='10px' align='flex-start' borderBottomWidth='1px' p='10px'>
				<HStack spacing='5px' align='stretch'>
					<Text fontWeight='semibold'>Platform:</Text>
					<Text>{collectionShop.platform}</Text>
				</HStack>
				<HStack spacing='5px'>
					<Text fontWeight='semibold'>Types:</Text>
					<Text>{collectionShop.typeList.join(', ')}</Text>
				</HStack>
			</VStack>
			<VStack spacing='10px' align='flex-start' p='10px'>
				<Text fontWeight='semibold'>Detail:</Text>
				<UnorderedList>
					{detailList.map((detail: string, index: number) => {
						if (detail === '') return null
						return <ListItem key={index}>{detail}</ListItem>
					})}
				</UnorderedList>
			</VStack>
		</>
	)
}
