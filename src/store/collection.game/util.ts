// constant and secondary type
export enum CollectionGamePlatformEnum {
	Steam = 'Steam',
}
export interface CollectionGameStateType {
	_id: string
	createdAt: string
	updatedAt: string
	userId: string
	name: string
	platform: CollectionGamePlatformEnum
	url: string
	typeList: string[]
	detail: string
	mediaLink: string
	otherInfo: any
}
// helper function
