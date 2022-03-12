import { useReducer } from 'react'

const useForceRender = () => {
    const [, forceRender] = useReducer(x => !x, true)
    return forceRender
}

export default useForceRender