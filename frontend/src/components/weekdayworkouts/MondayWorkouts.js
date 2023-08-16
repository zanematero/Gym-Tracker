import WorkoutItem from "../WorkoutItem"
import CreateWorkout from "../CreateWorkout"
import { useWorkoutContext } from "../../context/WorkoutContext";

function MondayWorkouts() {

    const { state } = useWorkoutContext();

    return (
        <div>
            <h2>Workouts for Monday:</h2>
            {state.weekdays['Monday'].workouts.length > 0 ? (
                state.weekdays['Monday'].workouts.map((workout) => (
                    <WorkoutItem 
                    workout={workout}
                    weekday={'Monday'}
                    key={workout._id}
                    />
                    
                ))
            ) : (
                <p>No workouts created yet for Monday, let's get to it!</p>
            )}
            <CreateWorkout weekday={'Monday'} />
        </div>
    )
}

export default MondayWorkouts