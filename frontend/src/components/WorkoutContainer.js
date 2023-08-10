import { useEffect, useState } from "react"
import WorkoutItem from './WorkoutItem.js'

function WorkoutContainer() {

    const [workouts, setWorkouts] = useState([])

    useEffect(() => {
    const fetchWorkouts = async () => {
        const response = await fetch(`${process.env.REACT_APP_BASEURL}/workouts/`)
        const json = await response.json()
        setWorkouts(json)
    }
    fetchWorkouts()
}, [])

    return (
        <div>
            {workouts.map(workout => {return <WorkoutItem workout={workout} key={workout._id}/>})}
        </div>
    )
}

export default WorkoutContainer;