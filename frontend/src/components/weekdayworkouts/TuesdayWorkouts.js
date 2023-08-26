import WorkoutItem from "../WorkoutItem"
import CreateWorkout from "../CreateWorkout"
import { useWorkoutContext } from "../../context/WorkoutContext";

function TuesdayWorkouts() {

    const { state } = useWorkoutContext();

    return (
        <div className="workout-day">
            <h2>Workouts for Tuesday:</h2>
            <hr></hr>
            <div className="workout-container">
                <CreateWorkout weekday={'Tuesday'} />
                {state.weekdays['Tuesday'].workouts.length > 0 ? (
                    state.weekdays['Tuesday'].workouts.map((workout) => (
                        <WorkoutItem
                            workout={workout}
                            weekday={'Tuesday'}
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

export default TuesdayWorkouts