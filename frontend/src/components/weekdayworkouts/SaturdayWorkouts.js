import WorkoutItem from "../WorkoutItem"
import CreateWorkout from "../CreateWorkout"
import { useWorkoutContext } from "../../context/WorkoutContext";

function SaturdayWorkouts() {

    const { state } = useWorkoutContext();

    return (
        <div className="workout-day">
            <h2>Workouts for Saturday:</h2>
            <hr></hr>
            <div className="workout-container">
                <CreateWorkout weekday={'Saturday'} />
                {state.weekdays['Saturday'].workouts.length > 0 ? (
                    state.weekdays['Saturday'].workouts.map((workout) => (
                        <WorkoutItem
                            workout={workout}
                            weekday={'Saturday'}
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

export default SaturdayWorkouts