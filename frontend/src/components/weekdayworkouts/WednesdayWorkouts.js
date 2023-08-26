import WorkoutItem from "../WorkoutItem"
import CreateWorkout from "../CreateWorkout"
import { useWorkoutContext } from "../../context/WorkoutContext";

function WednesdayWorkouts() {

    const { state } = useWorkoutContext();

    return (
        <div className="workout-day">
            <h2>Workouts for Wednesday:</h2>
            <hr></hr>
            <div className="workout-container">
                <CreateWorkout weekday={'Wednesday'} />
                {state.weekdays['Wednesday'].workouts.length > 0 ? (
                    state.weekdays['Wednesday'].workouts.map((workout) => (
                        <WorkoutItem
                            workout={workout}
                            weekday={'Wednesday'}
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

export default WednesdayWorkouts