import { HStack, Text, VStack } from '@chakra-ui/react'
import { CollectionStudyStateType } from 'store/collection.study/util'

export const StudyDetailForm = (props: { collectionStudy: CollectionStudyStateType }) => {
	const { collectionStudy } = props
	return (
		<>
			<VStack spacing='10px' align='flex-start' borderBottomWidth='1px' p='10px'>
				<HStack spacing='5px'>
					<Text fontWeight='semibold'>Title:</Text>
					<Text>{collectionStudy.title}</Text>
				</HStack>
				<HStack spacing='5px' align='stretch'>
					<Text fontWeight='semibold'>Platform:</Text>
					<Text>{collectionStudy.platform}</Text>
				</HStack>
				<HStack spacing='5px'>
					<Text fontWeight='semibold'>Categories:</Text>
					<Text>{collectionStudy.categoryList.join(', ')}</Text>
				</HStack>
			</VStack>
			<VStack spacing='10px' align='flex-start' borderBottomWidth='1px' p='10px'>
				<Text fontWeight='semibold'>Detail:</Text>
				<Text>{collectionStudy.detail}</Text>
			</VStack>
		</>
	)
}
