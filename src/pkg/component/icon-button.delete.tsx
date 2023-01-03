import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogCloseButton,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
	IconButton,
	useDisclosure,
} from '@chakra-ui/react'
import { useRef } from 'react'
import { RiDeleteBinLine } from 'react-icons/ri'

const defaultIconSize = '25px'
const defaultIconButtonSize = '40px'
export const DeleteIconButton = (props: {
	iconSize?: string
	iconButtonSize?: string
	isDisabled: boolean
	alertTitle: string
	alertBody?: string
	isLoading: boolean
	onClick: () => void
}) => {
	const { isDisabled, alertTitle, isLoading, onClick } = props
	const iconSize = props.iconSize ?? defaultIconSize
	const iconButtonSize = props.iconButtonSize ?? defaultIconButtonSize
	const alertBody = props.alertBody ?? 'Are you sure you want to delete?'
	const { isOpen, onOpen, onClose } = useDisclosure()
	const cancelRef: any = useRef()
	return (
		<>
			<IconButton
				aria-label=''
				icon={<RiDeleteBinLine size={iconSize} />}
				variant='3'
				w={iconButtonSize}
				h={iconButtonSize}
				isDisabled={isDisabled}
				onClick={onOpen}
			/>
			<AlertDialog motionPreset='slideInBottom' leastDestructiveRef={cancelRef} onClose={onClose} isOpen={isOpen} isCentered>
				<AlertDialogOverlay />
				<AlertDialogContent>
					<AlertDialogHeader>{alertTitle}</AlertDialogHeader>
					<AlertDialogCloseButton />
					<AlertDialogBody>{alertBody}</AlertDialogBody>
					<AlertDialogFooter>
						<Button ref={cancelRef} onClick={onClose}>
							No
						</Button>
						<Button
							colorScheme='red'
							ml={3}
							isLoading={isLoading}
							onClick={async () => {
								onClick()
								onClose()
							}}
						>
							Yes
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}
