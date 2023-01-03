// constant and secondary type
export enum CollectionStudyPlatformEnum {
	Udemy = 'Udemy',
}
export interface CollectionStudyStateType {
	_id: string
	createdAt: string
	updatedAt: string
	userId: string
	title: string
	url: string
	platform: CollectionStudyPlatformEnum
	categoryList: any
	detail: string
	otherInfo: any
}

// helper function
