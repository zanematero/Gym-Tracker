import WorkoutItem from "../WorkoutItem";
import CreateWorkout from "../CreateWorkout";
import { useWorkoutContext } from "../../context/WorkoutContext";
import { useUserContext } from "../../context/UserContext"; // Import the user context

function WednesdayWorkouts() {
    const { state } = useWorkoutContext();
    const { currentUser } = useUserContext(); // Access the current user from the context

    const userSpecificWorkouts = currentUser
    ? state.weekdays['Wednesday'].workouts.filter((workout) =>
          workout.user === currentUser._id
      )
    : [];

    return (
        <div className="workout-day">
            <h2>Workouts for Wednesday:</h2>
            <hr></hr>
            <div className="workout-container">
                <CreateWorkout weekday={'Wednesday'} />
                {userSpecificWorkouts.length > 0 ? (
                    userSpecificWorkouts.map((workout) => (
                        <WorkoutItem
                            workout={workout}
                            weekday={'Wednesday'}
                            key={workout._id}
                        />
                    ))
                ) : (
                    <p className="workouts-none-text">No workouts created yet for Wednesday, let's get to it!</p>
                )}
            </div>
        </div>
    );
}

export default WednesdayWorkouts;