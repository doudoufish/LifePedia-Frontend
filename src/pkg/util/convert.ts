export const strToJSON = (str: string): any => {
	try {
		return JSON.parse(str)
	} catch (e) {
		return {}
	}
}

export const convertOtherInfoToInputString = (otherInfo: any) => JSON.stringify(JSON.stringify(otherInfo))
export const convertCommonOtherInfoToInputString = (otherInfo: any) => {
	const otherInfoString = JSON.stringify(JSON.stringify(JSON.stringify(otherInfo)))
	return otherInfoString.slice(1, -1)
}
