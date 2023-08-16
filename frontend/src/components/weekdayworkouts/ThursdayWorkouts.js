import WorkoutItem from "../WorkoutItem"
import CreateWorkout from "../CreateWorkout"
import { useWorkoutContext } from "../../context/WorkoutContext";

function ThursdayWorkouts() {

    const { state } = useWorkoutContext();

    return (
        <div>
            <h2>Workouts for Thursday:</h2>
            {state.weekdays['Thursday'].workouts.length > 0 ? (
                state.weekdays['Thursday'].workouts.map((workout) => (
                    <WorkoutItem 
                    workout={workout}
                    weekday={'Thursday'}
                    key={workout._id}
                    />
                    
                ))
            ) : (
                <p>No workouts created yet for Thursday, let's get to it!</p>
            )}
            <CreateWorkout weekday={'Thursday'} />
        </div>
    )
}

export default ThursdayWorkouts