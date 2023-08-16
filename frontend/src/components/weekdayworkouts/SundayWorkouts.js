import WorkoutItem from "../WorkoutItem"
import CreateWorkout from "../CreateWorkout"
import { useWorkoutContext } from "../../context/WorkoutContext";

function SundayWorkouts() {

    const { state } = useWorkoutContext();

    return (
        <div>
            <h2>Workouts for Sunday:</h2>
            {state.weekdays['Sunday'].workouts.length > 0 ? (
                state.weekdays['Sunday'].workouts.map((workout) => (
                    <WorkoutItem 
                    workout={workout}
                    weekday={'Sunday'}
                    key={workout._id}
                    />
                    
                ))
            ) : (
                <p>No workouts created yet for Sunday, let's get to it!</p>
            )}
            <CreateWorkout weekday={'Sunday'} />
        </div>
    )
}

export default SundayWorkouts