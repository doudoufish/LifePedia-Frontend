import { Center, Icon } from '@chakra-ui/react'
import { useDropzone } from 'react-dropzone'
import { FiFile } from 'react-icons/fi'

export const ImageUploadBlock = (props: { onDrop: (files: any) => void; maxFiles: number; multiple: boolean }) => {
	const { onDrop, maxFiles, multiple } = props
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
		maxFiles,
		multiple,
	})
	const dropText = isDragActive ? 'Drop the menu photo here ...' : 'Drag menu photo file here or click'
	return (
		<Center
			p={10}
			cursor='pointer'
			bg={isDragActive ? 'gray.100' : 'transparent'}
			_hover={{ bg: 'gray.100' }}
			transition='background-color 0.2s ease'
			borderRadius={4}
			border='3px dashed'
			borderColor={isDragActive ? 'teal.300' : 'gray.300'}
			{...getRootProps()}
		>
			<input {...getInputProps()} />
			<Icon as={FiFile} mr={2} />
			<p>{dropText}</p>
		</Center>
	)
}
