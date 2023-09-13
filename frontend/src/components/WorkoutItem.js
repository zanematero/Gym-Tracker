import { Link } from "react-router-dom";
import { useWorkoutContext } from "../context/WorkoutContext.js"

function WorkoutItem({ workout, weekday }) {

    const { dispatch } = useWorkoutContext();

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://gym-tracker-api.vercel.app/workouts/${id}`, {
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
        <div className="workout">
            <h1>{workout.title}</h1>
            <h2>Sets: {workout.sets}</h2>
            <h2>Reps: {workout.reps}</h2>
            <h2>Weight: {workout.weight}</h2>
            <span><h3><Link className="link" to="/update-workout" state={{ workout, weekday }}>Update</Link></h3></span>
            <span><button className="delete" onClick={() => {handleDelete(workout._id)}}>Delete</button></span>
        </div>
    )
}

export default WorkoutItem;
