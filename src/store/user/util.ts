// constant and secondary type
export enum UserRoleEnum {
	Global = 'Global',
	Operator = 'Operator',
	Prospect = 'Prospect',
}
export interface UserStateType {
	_id: string
	createdAt: string
	updatedAt: string
	role: string
	username: string
	email: string
	phoneNumber: string
	otherInfo: any
}
// helper function
