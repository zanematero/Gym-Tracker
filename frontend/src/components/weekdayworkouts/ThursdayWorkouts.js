import WorkoutItem from "../WorkoutItem"
import CreateWorkout from "../CreateWorkout"
import { useWorkoutContext } from "../../context/WorkoutContext";

function ThursdayWorkouts() {

    const { state } = useWorkoutContext();

    return (
        <div className="workout-day">
            <h2>Workouts for Thursday:</h2>
            <hr></hr>
            <div className="workout-container">
                <CreateWorkout weekday={'Thursday'} />
                {state.weekdays['Thursday'].workouts.length > 0 ? (
                    state.weekdays['Thursday'].workouts.map((workout) => (
                        <WorkoutItem
                            workout={workout}
                            weekday={'Thursday'}
                            key={workout._id}
                        />
                    ))
                ) : (
                    <></>
                )}
            </div>
        </div>
    )
}

export default ThursdayWorkouts