import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import { ButtonGroup, Editable, EditableInput, EditablePreview, IconButton, Input, Tooltip, useEditableControls } from '@chakra-ui/react'

const EditableControls = () => {
	const { isEditing, getSubmitButtonProps, getCancelButtonProps } = useEditableControls()
	return isEditing ? (
		<ButtonGroup justifyContent='end' size='sm' w='full' spacing={2} mt={2}>
			<IconButton aria-label='' icon={<CheckIcon />} {...getSubmitButtonProps()} />
			<IconButton aria-label='' icon={<CloseIcon boxSize={3} />} {...getCancelButtonProps()} />
		</ButtonGroup>
	) : null
}
export const CustomEditableListInput = (props: { index: number; value: string; list: string[]; setList: (list: string[]) => void }) => {
	const { index, value, list, setList } = props
	return (
		<Editable
			value={value}
			isPreviewFocusable
			selectAllOnFocus
			onChange={(v: string) => {
				const newList = [...list]
				newList[index] = v
				setList(newList)
			}}
			onSubmit={(v: string) => {
				const newList = [...list]
				newList[index] = v
				setList(newList)
			}}
		>
			<Tooltip label='Click to edit'>
				<EditablePreview py={2} px={4} _hover={{ background: 'gray.100' }} />
			</Tooltip>
			<Input py={2} px={4} as={EditableInput} />
			<EditableControls />
		</Editable>
	)
}
