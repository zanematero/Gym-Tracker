import { useWorkoutContext } from "../context/WorkoutContext.js"
import WorkoutItem from './WorkoutItem.js';
import { useState, useEffect } from 'react'

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
            <h1>Start stretching! Today's workouts for {todaysWeekday} are:</h1>
            {state.weekdays[todaysWeekday].workouts.length > 0 ? (
                state.weekdays[todaysWeekday].workouts.map((workout) => (
                    <WorkoutItem
                        weekday={todaysWeekday}
                        workout={workout}
                        key={workout._id}
                    />
                ))
            ) : (
                <p>No workouts available for {todaysWeekday}</p>
            )}
        </div>
    )
}

export default TodaysWorkout;