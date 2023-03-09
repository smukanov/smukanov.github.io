import moment from "moment"
import { FC, useEffect, useState } from "react"
import { buildStyles, CircularProgressbarWithChildren } from "react-circular-progressbar"
import { useSubscribeTime } from "../custom-hooks"

const convertMinutesToProgressPercent = (minutes: number) => {
    const onePercent = 7.2
    const passedMinutes = minutes > 720 ? minutes - 720 : minutes
    return passedMinutes / onePercent
}

type TimeProgressBarProps = {
    children: JSX.Element
}   

export const TimeProgressBar: FC<TimeProgressBarProps> = ({children}) => {
    const getCurrentProgress = () => {
        const startDay = new Date(new Date().setHours(0, 0, 0, 0))
        const passedMinutesFromStartDay = moment().diff(startDay, 'minutes')
        return convertMinutesToProgressPercent(passedMinutesFromStartDay)
    }

    const [timeProgress, setTimeProgress] = useState(getCurrentProgress())
    
    const {subscribe, unsubscribe} = useSubscribeTime(() => {
        setTimeProgress(getCurrentProgress())
    })

    useEffect(() => {
        subscribe()
        return unsubscribe
    }, [])

    return (
        <CircularProgressbarWithChildren
            className="relative rounded-full" 
            value={timeProgress} 
            strokeWidth={1} 
            styles={buildStyles({
                pathColor: 'orange',
                trailColor: 'black',
            })}>
                {children}
            </CircularProgressbarWithChildren>
    )
}