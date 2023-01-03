import { QuestionOutlineIcon } from '@chakra-ui/icons'
import { Flex, HStack, IconButton, Img, Spacer, Text } from '@chakra-ui/react'
import { PrimaryTopbarRightUserMenuIconButton } from 'pkg/component/icon-button.user-menu'
import { ROUTE } from 'pkg/route'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { setIntroStepEnabledState } from 'store/common'

const color = 'gray.600'
const iconSize = '20px'
const iconVariant = 'ghost'
export const Topbar = (props: { topbarRightExtra: ReactNode }) => {
	const { topbarRightExtra } = props
	const navigate = useNavigate()
	return (
		<Flex>
			<div style={{ cursor: 'pointer' }}>
				<HStack onClick={() => navigate(ROUTE.USER_HOME, { replace: true })}>
					<Img boxSize='40px' width='40px' src='/logo.png' />
					<Text fontWeight='bold' fontSize='30px' color='gray.600'>
						Lifepedia
					</Text>
				</HStack>
			</div>
			<Spacer />
			<HStack spacing='2px'>
				{topbarRightExtra}
				<IconButton
					aria-label=''
					icon={<QuestionOutlineIcon color={color} w={iconSize} h={iconSize} />}
					variant={iconVariant}
					onClick={() => setIntroStepEnabledState(true)}
				/>
				<PrimaryTopbarRightUserMenuIconButton />
			</HStack>
		</Flex>
	)
}
