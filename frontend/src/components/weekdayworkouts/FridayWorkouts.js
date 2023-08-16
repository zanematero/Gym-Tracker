import WorkoutItem from "../WorkoutItem"
import CreateWorkout from "../CreateWorkout"
import { useWorkoutContext } from "../../context/WorkoutContext";

function FridayWorkouts() {

    const { state } = useWorkoutContext();

    return (
        <div>
            <h2>Workouts for Friday:</h2>
            {state.weekdays['Friday'].workouts.length > 0 ? (
                state.weekdays['Friday'].workouts.map((workout) => (
                    <WorkoutItem 
                    workout={workout}
                    weekday={'Friday'}
                    key={workout._id}
                    />
                    
                ))
            ) : (
                <p>No workouts created yet for Friday, let's get to it!</p>
            )}
            <CreateWorkout weekday={'Friday'} />
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