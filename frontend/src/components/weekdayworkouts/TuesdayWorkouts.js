import WorkoutItem from "../WorkoutItem"
import CreateWorkout from "../CreateWorkout"
import { useWorkoutContext } from "../../context/WorkoutContext";

function TuesdayWorkouts() {

    const { state } = useWorkoutContext();

    return (
        <div>
            <h2>Workouts for Tuesday:</h2>
            {state.weekdays['Tuesday'].workouts.length > 0 ? (
                state.weekdays['Tuesday'].workouts.map((workout) => (
                    <WorkoutItem 
                    workout={workout}
                    weekday={'Tuesday'}
                    key={workout._id}
                    />
                    
                ))
            ) : (
                <p>No workouts created yet for Tuesday, let's get to it!</p>
            )}
            <CreateWorkout weekday={'Tuesday'} />
        </div>
    )
}

export default TuesdayWorkouts