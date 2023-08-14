import { useEffect, useState } from "react"
import WorkoutItem from './WorkoutItem.js'
import CreateWorkout from "./CreateWorkout.js"
import { useWorkoutContext } from "../context/WorkoutContext.js"

function WorkoutContainer() {

    const { state, dispatch } = useWorkoutContext();
    const weekdays = Object.keys(state.weekdays)
    const workouts = Object.values(state.weekdays)

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch(`${process.env.REACT_APP_BASEURL}/workouts`)
            const workouts = await response.json()
            dispatch({type: 'GET_WORKOUTS', workouts: workouts})
        }
        fetchWorkouts()
    }, [dispatch])

    return (
        <div>
            {weekdays.map((weekday) => (
                <div className="weekday">
                    <CreateWorkout weekday={weekday} />
                    <h3>Workouts for {weekday}:</h3>
                    {state.weekdays[weekday].workouts.map(workout => { return <WorkoutItem workout={workout} key={workout._id} /> })}
                </div>
            ))}
        </div>
    )
}

export default WorkoutContainer;