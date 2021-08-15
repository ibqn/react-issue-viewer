import { RootState } from '.'

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) {
      return undefined
    }
    const state = JSON.parse(serializedState)
    return state
  } catch (error) {
    console.warn(error)
    return undefined
  }
}

export const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (error) {
    console.warn(error)
  }
}
