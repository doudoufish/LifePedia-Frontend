import { AspectRatio, HStack, Text, VStack } from '@chakra-ui/react'
import { CollectionGameStateType } from 'store/collection.game/util'

export const GameDetailForm = (props: { collectionGame: CollectionGameStateType }) => {
	const { collectionGame } = props
	return (
		<>
			<VStack spacing='10px' align='flex-start' borderBottomWidth='1px' p='10px'>
				<HStack spacing='5px'>
					<Text fontWeight='semibold'>Name:</Text>
					<Text>{collectionGame.name}</Text>
				</HStack>
				<HStack spacing='5px' align='stretch'>
					<Text fontWeight='semibold'>Platform:</Text>
					<Text>{collectionGame.platform}</Text>
				</HStack>
				<HStack spacing='5px'>
					<Text fontWeight='semibold'>Types:</Text>
					<Text>{collectionGame.typeList.join(', ')}</Text>
				</HStack>
			</VStack>
			<VStack spacing='10px' align='flex-start' borderBottomWidth='1px' p='10px'>
				<Text fontWeight='semibold'>Detail:</Text>
				<Text>{collectionGame.detail}</Text>
			</VStack>
			<VStack spacing='10px' pt='10px'>
				<HStack spacing='5px'>
					<AspectRatio w='600px' ratio={2}>
						<iframe title={collectionGame.name} src={collectionGame.mediaLink} allowFullScreen />
					</AspectRatio>
				</HStack>
			</VStack>
		</>
	)
}
