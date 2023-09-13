import { useUserContext } from "../context/UserContext.js";
import { useWorkoutContext } from "../context/WorkoutContext.js"
import { useState } from 'react'
import WorkoutItem from './WorkoutItem.js'

function TodaysWorkout() {

    const { currentUser } = useUserContext()
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

    const todaysUserSpecificWorkouts = currentUser
    ? state.weekdays[todaysWeekday].workouts.filter((workout) =>
          workout.user === currentUser._id
      )
    : [];

    return (
        <div className='todays-workout'>
            {state.weekdays[todaysWeekday].workouts.length > 0 ? (
                <h1>Start stretching! Today's workouts for {todaysWeekday} are:</h1>
            ) : (
                <div>
                    <h2>No workouts created yet for {todaysWeekday}, click on the workouts tab to get started!</h2>
                </div>
            )}
            {todaysUserSpecificWorkouts.length > 0 ? (
                    todaysUserSpecificWorkouts.map((workout) => (
                        <WorkoutItem
                            workout={workout}
                            weekday={todaysWeekday}
                            key={workout._id}
                        />
                    ))
                ) : (
                    <p className="workouts-none-text">No workouts created yet for {todaysWeekday}, let's get to it!</p>
                )}
        </div>
    )
}

export default TodaysWorkout;