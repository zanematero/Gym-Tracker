import WorkoutItem from "../WorkoutItem"
import CreateWorkout from "../CreateWorkout"
import { useWorkoutContext } from "../../context/WorkoutContext";

function SundayWorkouts() {

    const { state } = useWorkoutContext();

    return (
        <div className="workout-day">
            <h2>Workouts for Sunday:</h2>
            <hr></hr>
            <div className="workout-container">
                <CreateWorkout weekday={'Sunday'} />
                {state.weekdays['Sunday'].workouts.length > 0 ? (
                    state.weekdays['Sunday'].workouts.map((workout) => (
                        <WorkoutItem
                            workout={workout}
                            weekday={'Sunday'}
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

export default SundayWorkouts