import {useRef, useState} from "react";

interface Options {
    delay: number
    minDuration: number
}

type State = "initial" | "finallyLoaded" | "waitingDelay" | "delayOut" | "showing"

// TODO: finish spin delay state machine

const useSpinDelay = (loading: boolean, options: Options): boolean => {
    // loading
    // elapsed < delay => don't show
    // elapsed > delay => show for minDuration
    // again loading => show until loading

    // !loading
    // return false

    const [state, setState] = useState<State>("initial")
    const delayRef = useRef<number>()
    const durationRef = useRef<number>()

    switch (state) {
        case "initial":
            if(!loading) {
                setState("finallyLoaded")
                return false
            } else {
                setState("waitingDelay")
                delayRef.current = setTimeout(() => {
                    setState("delayOut")
                }, options.delay)
                return false
            }
        case "finallyLoaded":
            if(loading) {
                setState("waitingDelay")
                delayRef.current = setTimeout(() => {
                    setState("delayOut")
                }, options.delay)
            }
            return false
        case "waitingDelay":
            if(loading)
                return false
            clearTimeout(delayRef.current)
            setState("finallyLoaded")
            return false
        case "delayOut":
            durationRef.current = setTimeout(() => {
                clearTimeout(durationRef.current)
                setState("finallyLoaded")
            }, options.minDuration)
            setState("showing")
            return true
        case "showing":
            return true
    }
    return false
};

export default useSpinDelay;