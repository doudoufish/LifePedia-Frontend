import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { ReactNode } from 'react'

export const ModalWrapper = (props: {
	isOpen: boolean
	onClose: () => void
	closeOnOverlayClick: boolean
	header: string
	body: ReactNode
	footer: ReactNode
	size?: string
}) => {
	const { isOpen, onClose, closeOnOverlayClick, header, body, footer, size } = props
	return (
		<Modal size={size} isOpen={isOpen} onClose={onClose} closeOnOverlayClick={closeOnOverlayClick}>
			<ModalOverlay />
			<ModalContent maxW='800px'>
				<ModalHeader>{header}</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>{body}</ModalBody>
				<ModalFooter>{footer}</ModalFooter>
			</ModalContent>
		</Modal>
	)
}
