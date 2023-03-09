import { useState } from "react"

export const useSubscribeTime = (callback: () => void) => {
    const [timeoutState, setTimeoutState] = useState<NodeJS.Timeout>()
    const [intervalState, setIntervalState] = useState<NodeJS.Timer>()

    const subscribe = () => {
        const seconds = 60 - new Date().getSeconds()
        const timeoutId = setTimeout(() => {
            callback()

            const intervalId = setInterval(callback, 60_000)
            setIntervalState(intervalId)
        }, seconds * 1000)
        setTimeoutState(timeoutId)
    }

    const unsubscribe = () => {
        clearTimeout(timeoutState)
        clearInterval(intervalState)
    }

    return {subscribe, unsubscribe}
}