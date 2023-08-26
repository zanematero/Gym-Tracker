import WorkoutItem from "../WorkoutItem"
import CreateWorkout from "../CreateWorkout"
import { useWorkoutContext } from "../../context/WorkoutContext";

function MondayWorkouts() {

    const { state } = useWorkoutContext();

    return (
        <div className="workout-day">
            <h2>Workouts for Monday:</h2>
            <hr></hr>
            <div className="workout-container">
                <CreateWorkout weekday={'Monday'} />
                {state.weekdays['Monday'].workouts.length > 0 ? (
                    state.weekdays['Monday'].workouts.map((workout) => (
                        <WorkoutItem
                            workout={workout}
                            weekday={'Monday'}
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

export default MondayWorkouts