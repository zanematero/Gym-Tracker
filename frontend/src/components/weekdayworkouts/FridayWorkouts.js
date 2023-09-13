import WorkoutItem from "../WorkoutItem";
import CreateWorkout from "../CreateWorkout";
import { useWorkoutContext } from "../../context/WorkoutContext";
import { useUserContext } from "../../context/UserContext"; // Import the user context

function FridayWorkouts() {
    const { state } = useWorkoutContext();
    const { currentUser } = useUserContext(); // Access the current user from the context

    const userSpecificWorkouts = currentUser
    ? state.weekdays['Friday'].workouts.filter((workout) =>
          workout.user === currentUser._id
      )
    : [];

    return (
        <div className="workout-day">
            <h2>Workouts for Friday:</h2>
            <hr></hr>
            <div className="workout-container">
                <CreateWorkout weekday={'Friday'} />
                {userSpecificWorkouts.length > 0 ? (
                    userSpecificWorkouts.map((workout) => (
                        <WorkoutItem
                            workout={workout}
                            weekday={'Friday'}
                            key={workout._id}
                        />
                    ))
                ) : (
                    <p className="workouts-none-text">No workouts created yet for Friday, let's get to it!</p>
                )}
            </div>
        </div>
    );
}

export default FridayWorkouts;