import { useState } from "react"
import { useWorkoutContext } from "../context/WorkoutContext"
import { useNavigate, useLocation } from 'react-router-dom'

function UpdateWorkoutForm() {
    const navigate = useNavigate();
    const location = useLocation()
    const { workout , weekday } = location.state

    const { dispatch } = useWorkoutContext()

    const [title, setTitle] = useState(workout.title)
    const [sets, setSets] = useState(workout.sets)
    const [reps, setReps] = useState(workout.reps)
    const [weight, setWeight] = useState(workout.weight)

    const handleUpdate = async (e) => {
        console.log({ title: title, sets: sets, reps: reps, weight: weight })
        e.preventDefault()

        try {
            const response = await fetch(`${process.env.REACT_APP_BASEURL}/workouts/${workout._id}`, {
                method: 'PUT',
                body: JSON.stringify({ title: title, sets: sets, reps: reps, weight: weight }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const json = await response.json()
            dispatch({ type: 'UPDATE_WORKOUT', workout: json, weekday: weekday })
            console.log(json)           
            navigate(`/workouts/${weekday}`)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="update-workout" onSubmit={handleUpdate}>
            <form>
                <h4>Change your {workout.title} workout</h4>
                <label>Title:</label>
                <input
                    type='text'
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <label>Sets:</label>
                <input
                    type='text'
                    onChange={(e) => setSets(e.target.value)}
                    value={sets}
                />
                <label>Reps:</label>
                <input
                    type='text'
                    onChange={(e) => setReps(e.target.value)}
                    value={reps}
                />
                <label>Weight:</label>
                <input
                    type='text'
                    onChange={(e) => setWeight(e.target.value)}
                    value={weight}
                />
                <button type="submit">Update Workout</button>
            </form>
        </div>
    )
}

export default UpdateWorkoutForm