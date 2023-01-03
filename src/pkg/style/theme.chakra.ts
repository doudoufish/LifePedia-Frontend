import { extendTheme } from '@chakra-ui/react'

export enum BreakpointEnum {
	SM = '320px',
	MD = '768px',
	LG = '1024px',
	XL = '1280px',
	XXL = '1600px',
}
export const BREAKPOINT = {
	sm: BreakpointEnum.SM,
	md: BreakpointEnum.MD,
	lg: BreakpointEnum.LG,
	xl: BreakpointEnum.XL,
	'2xl': BreakpointEnum.XXL,
}
const ButtonStyle = {
	components: {
		Button: {
			baseStyle: {},
			variants: {
				'1': {
					bg: '#4471ff',
					color: 'white',
					borderRadius: '10px',
					_hover: { bgColor: '#5A85FF', _disabled: { bgColor: '#4471ff' } },
					_active: { bg: 'gray.300' },
				},
				'2': {
					borderRadius: '10px',
					borderWidth: '2px',
					color: 'gray.500',
					bg: 'white',
					_hover: { borderColor: '#4471ff', color: '#4471ff' },
					_active: { bg: 'gray.300' },
				},
				'3': { borderRadius: '10px', borderWidth: '2px', color: 'red', _hover: { borderColor: 'red' }, _active: { bg: 'gray.300' } },
			},
		},
	},
}
export const chakraTheme = extendTheme({ breakpoints: BREAKPOINT }, ButtonStyle)
