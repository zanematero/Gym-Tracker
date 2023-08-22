import { Link } from "react-router-dom";
import { useWorkoutContext } from "../context/WorkoutContext.js"

function WorkoutItem({ workout, weekday }) {

    const { dispatch } = useWorkoutContext();

    const handleDelete = async (id) => {
        console.log(id)
        try {
            const response = await fetch(`${process.env.REACT_APP_BASEURL}/workouts/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })            
            const json = await response.json()
            console.log(json)
            dispatch({type: 'DELETE_WORKOUT', weekday: weekday, workout: json})
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="Workout">
            <h3>Workout:</h3>
            <div>Title: {workout.title}</div>
            <div>Sets: {workout.sets}</div>
            <div>Reps: {workout.reps}</div>
            <div>Weight: {workout.weight}</div>
            <div>id: {workout._id}</div>
            <Link to="/update-workout" state={{ workout, weekday }}>Update this workout</Link>
            <button onClick={() => {handleDelete(workout._id)}}>Delete Workout</button>
        </div>
    )
}

export default WorkoutItem;
