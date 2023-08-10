function WorkoutItem({ workout }) {
    return (
        <div className="Workout">
            <h3>Workout:</h3>
            <div>Title: {workout.title}</div>
            <div>Sets: {workout.sets}</div>
            <div>Reps: {workout.reps}</div>
            <div>Weight: {workout.weight}</div>
        </div>
    )
}

export default WorkoutItem;
