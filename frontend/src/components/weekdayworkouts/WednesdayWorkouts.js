import WorkoutItem from "../WorkoutItem"
import CreateWorkout from "../CreateWorkout"
import { useWorkoutContext } from "../../context/WorkoutContext";

function WednesdayWorkouts() {

    const { state } = useWorkoutContext();

    return (
        <div>
            <h2>Workouts for Wednesday:</h2>
            {state.weekdays['Wednesday'].workouts.length > 0 ? (
                state.weekdays['Wednesday'].workouts.map((workout) => (
                    <WorkoutItem 
                    workout={workout}
                    weekday={'Wednesday'}
                    key={workout._id}
                    />
                    
                ))
            ) : (
                <p>No workouts created yet for Wednesday, let's get to it!</p>
            )}
            <CreateWorkout weekday={'Wednesday'} />
        </div>
    )
}

export default WednesdayWorkouts