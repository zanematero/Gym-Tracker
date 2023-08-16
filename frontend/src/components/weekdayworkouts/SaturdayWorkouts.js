import WorkoutItem from "../WorkoutItem"
import CreateWorkout from "../CreateWorkout"
import { useWorkoutContext } from "../../context/WorkoutContext";

function SaturdayWorkouts() {

    const { state } = useWorkoutContext();

    return (
        <div>
            <h2>Workouts for Saturday:</h2>
            {state.weekdays['Saturday'].workouts.length > 0 ? (
                state.weekdays['Saturday'].workouts.map((workout) => (
                    <WorkoutItem 
                    workout={workout}
                    weekday={'Saturday'}
                    key={workout._id}
                    />
                    
                ))
            ) : (
                <p>No workouts created yet for Saturday, let's get to it!</p>
            )}
            <CreateWorkout weekday={'Saturday'} />
        </div>
    )
}

export default SaturdayWorkouts