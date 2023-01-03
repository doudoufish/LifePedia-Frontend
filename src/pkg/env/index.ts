import _ from 'lodash'
import { ENV_MODE, ENV_SERVER_URL } from './config'

enum ModeOption {
	LOCAL = 'local',
	PROD = 'prod',
}
export const getMode = (): string => ENV_MODE
export const isLocalMode = (): boolean => getMode() === ModeOption.LOCAL
export const getServerUrl = (): string => {
	if (!_.isEmpty(ENV_SERVER_URL)) {
		return ENV_SERVER_URL
	}

	const info: any = {
		[ModeOption.LOCAL]: 'http://localhost:9409/graphql',
		[ModeOption.PROD]: 'https://api.lifepedia.top/graphql',
	}
	return info[ENV_MODE]
}
export const getAppUrl = (): string => {
	const urlPrefix = {
		[ModeOption.LOCAL]: 'http://localhost:4147',
		[ModeOption.PROD]: 'https://lifepedia.top',
	}
	return urlPrefix[ENV_MODE]
}

export const MAPBOX_TOKEN = 'pk.eyJ1IjoidGFpbW9vcmZhcm9vcSIsImEiOiJja2ZxdGJ0djYwZWJhMndvMGk1OTJ1Zzl0In0.gEz-H-Kz1NZygFLOPyKMNg'

export enum LocalStorageKey {
	USER_ID = 'userId',
	USER_ACCESS_TOKEN = 'userAccessToken',
}
export const VITE_PWA_SETTING = {
	registerType: 'autoUpdate',
	includeAssets: ['favicon.png', 'robots.txt', 'apple-touch-icon.png', 'icons/*.svg', 'fonts/*.woff2'],
	manifest: {
		theme_color: '#BD34FE',
		icons: [
			{ src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
			{ src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
		],
	},
}
