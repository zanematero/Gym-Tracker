import WorkoutItem from "../WorkoutItem"
import CreateWorkout from "../CreateWorkout"
import { useWorkoutContext } from "../../context/WorkoutContext";

function FridayWorkouts() {

    const { state } = useWorkoutContext();

    return (
        <div className="workout-day">
            <h2>Workouts for Friday:</h2>
            <hr></hr>
            <div className="workout-container">
                <CreateWorkout weekday={'Friday'} />
                {state.weekdays['Friday'].workouts.length > 0 ? (
                    state.weekdays['Friday'].workouts.map((workout) => (
                        <WorkoutItem
                            workout={workout}
                            weekday={'Friday'}
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

export default FridayWorkouts

/* {weekdays.map((weekday) => (
    <div className="weekday-item" key={weekday}>
        <h3>Workouts for {weekday}:</h3>
        {state.weekdays[weekday].workouts.length > 0 ? (
            state.weekdays[weekday].workouts.map((workout) => (
                <WorkoutItem
                    weekday={weekday}
                    workout={workout}
                    key={workout._id}
                />
            ))
        ) : (
            <p>No workouts created yet for {weekday}, let's get to it!</p>
        )}
        <CreateWorkout weekday={weekday} />
    </div>
))} */