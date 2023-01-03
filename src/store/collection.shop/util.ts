// constant and secondary type
export enum CollectionShopPlatformEnum {
	Amazon = 'Amazon',
}
export enum CollectionShopTypeClothingPantShoeEnum {}
export enum CollectionShopTypeElectronicDigitalEnum {
	CellPhoneAccessory = 'Cell Phone & Accessory',
	ComputerTabletPCComponent = 'Computer, Tablet & PC Component',
	HeadphoneEarbud = 'Headphone & Earbud',
	WearableDevice = 'Wearable Device',
	SmartHomeDevice = 'Smart Home Device',
	CameraMonitor = 'Camera & Monitor',
	VideoGameConsoleAccessory = 'Video Game Console & Accessory',
	SoftwareMedia = 'Software & Media',
}
export enum CollectionShopTypeFoodGroceryEnum {
	BeverageWine = 'Beverage & Wine',
	Snack = 'Snack',
	FrozenFood = 'Frozen Food',
}
export enum CollectionShopTypeKitchenHouseholdSupplyEnum {}
export enum CollectionShopTypeHomeFurnitureEnum {}
export enum CollectionShopTypeBeautyHealthEnum {}
export enum CollectionShopTypePetSupplyEnum {
	Cat = 'Cat',
	Dog = 'Dog',
}
export interface CollectionShopStateType {
	_id: string
	createdAt: string
	updatedAt: string
	userId: string
	name: string
	platform: string
	url: string
	typeList: string[]
	productLink: string
	detail: string
	note: string
	otherInfo: any
}

// helper function
