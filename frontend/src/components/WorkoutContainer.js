import { useEffect } from "react"
import WorkoutItem from './WorkoutItem.js'
import CreateWorkout from "./CreateWorkout.js"
import { useWorkoutContext } from "../context/WorkoutContext.js"
import TodaysWorkout from "./TodaysWorkout.js";

function WorkoutContainer() {

    const { state, dispatch } = useWorkoutContext();
    const weekdays = Object.keys(state.weekdays)

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch(`${process.env.REACT_APP_BASEURL}/workouts`)
            const workouts = await response.json()
            dispatch({ type: 'GET_WORKOUTS', workouts: workouts })
        }
        fetchWorkouts()
    }, [dispatch])

    
    return (
        <div>
            <TodaysWorkout />
            {weekdays.map((weekday) => (
                <div className="weekday" key={weekday}>
                    <h3>Workouts for {weekday}:</h3>
                    {state.weekdays[weekday].workouts.length > 0 ? (
                        state.weekdays[weekday].workouts.map((workout) => (
                            <WorkoutItem
                                weekday={weekday}
                                workout={workout}
                                key={workout._id}
                            />
                        ))
                    ) : (
                        <p>No workouts available for {weekday}</p>
                    )}
                    <CreateWorkout weekday={weekday} />
                </div>
            ))}
        </div>
    );
}

export default WorkoutContainer;