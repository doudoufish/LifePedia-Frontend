import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { IntroStateType } from './util'

export interface CommonStoreStateType {
	intro: IntroStateType
}
const initialStoreState: CommonStoreStateType = {
	intro: { stepEnabled: false, hintEnabled: false },
}

const slice = () => initialStoreState
const name = 'lifepedia-common-store'
export const useCommonStore = create(devtools(persist(slice, { name }), { name }))
// selector
export const commonSelector = (state: CommonStoreStateType) => state
// state function
export const setIntroStepEnabledState = async (stepEnabled: boolean) => {
	const oldState: CommonStoreStateType = useCommonStore.getState()
	useCommonStore.setState({
		...oldState,
		intro: { ...oldState.intro, stepEnabled },
	})
}
export const setIntroHintEnabledState = async (hintEnabled: boolean) => {
	const oldState: CommonStoreStateType = useCommonStore.getState()
	useCommonStore.setState({
		...oldState,
		intro: { ...oldState.intro, hintEnabled },
	})
}
export const resetCommonState = async () => useCommonStore.setState(initialStoreState)
// helper state function
