import { useEffect } from "react"
import WorkoutItem from './WorkoutItem.js'
import CreateWorkout from "./CreateWorkout.js"
import { useWorkoutContext } from "../context/WorkoutContext.js"
import TodaysWorkout from "./TodaysWorkout.js";
import WorkoutNavbar from "./WorkoutNavbar.js";

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
            <WorkoutNavbar />
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
                        <p>No workouts created yet for {weekday}, let's get to it!</p>
                    )}
                    <CreateWorkout weekday={weekday} />
                </div>
            ))}
        </div>
    );
}

export default WorkoutContainer;