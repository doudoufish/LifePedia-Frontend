import { IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/react'
import { ROUTE } from 'pkg/route'
import { CgProfile } from 'react-icons/cg'
import { useNavigate } from 'react-router-dom'
import { resetObjectStateWhenLogout } from 'store'

const color = 'gray.600'
const iconSize1 = '20px'
const iconVariant = 'ghost'
export const PrimaryTopbarRightUserMenuIconButton = () => {
	const navigate = useNavigate()
	return (
		<Menu>
			<MenuButton as={IconButton} icon={<CgProfile color={color} size={iconSize1} />} variant={iconVariant} />
			<MenuList>
				<MenuItem onClick={async () => navigate(ROUTE.USER_HOME, { replace: true })}>Home</MenuItem>
				<MenuItem onClick={async () => navigate(ROUTE.USER_PROFILE, { replace: true })}>User Profile</MenuItem>
				<MenuDivider />
				<MenuItem
					onClick={async () => {
						await resetObjectStateWhenLogout()
						navigate(ROUTE.LANDING_LOGIN)
					}}
				>
					Logout
				</MenuItem>
			</MenuList>
		</Menu>
	)
}
