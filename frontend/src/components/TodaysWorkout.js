import { useWorkoutContext } from "../context/WorkoutContext.js"
import { useState } from 'react'

function TodaysWorkout() {

    const { state } = useWorkoutContext();

    const today = new Date();
    const day = today.getDay();

    const [todaysWeekday] = useState(() => {
        if (day === 0) {
            return 'Sunday';
        } else if (day === 1) {
            return 'Monday';
        } else if (day === 2) {
            return 'Tuesday';
        } else if (day === 3) {
            return 'Wednesday';
        } else if (day === 4) {
            return 'Thursday';
        } else if (day === 5) {
            return 'Friday';
        } else if (day === 6) {
            return 'Saturday';
        }
    });

    return (
        <div className='todays-workout'>
            {state.weekdays[todaysWeekday].workouts.length > 0 ? (
                <h1>Start stretching! Today's workouts for {todaysWeekday} are:</h1>
            ) : (
                <div>
                    <h2>No workouts created yet for {todaysWeekday}, click on the workouts tab to get started!</h2>
                </div>
            )}
            {state.weekdays[todaysWeekday].workouts.length > 0 ? (
                state.weekdays[todaysWeekday].workouts.map((workout) => (
                    <div className="workout">
                        <h1>{workout.title}</h1>
                        <h2>Sets: {workout.sets}</h2>
                        <h2>Reps: {workout.reps}</h2>
                        <h2>Weight: {workout.weight}</h2>
                    </div>
                ))
            ) : (
                <></>
            )}
        </div>
    )
}

export default TodaysWorkout;