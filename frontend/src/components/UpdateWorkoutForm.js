import { useState } from "react"
import { useWorkoutContext } from "../context/WorkoutContext"
import { useNavigate, useLocation } from 'react-router-dom'

function UpdateWorkoutForm() {
    const navigate = useNavigate();
    const location = useLocation()
    const { workout, weekday } = location.state

    const { dispatch } = useWorkoutContext()

    const [title, setTitle] = useState(workout.title)
    const [sets, setSets] = useState(workout.sets)
    const [reps, setReps] = useState(workout.reps)
    const [weight, setWeight] = useState(workout.weight)

    const handleUpdate = async (e) => {
        console.log({ title: title, sets: sets, reps: reps, weight: weight })
        e.preventDefault()

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/workouts/${workout._id}`, {
                method: 'PUT',
                body: JSON.stringify({ title: title, sets: sets, reps: reps, weight: weight }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.ok) {
                const json = await response.json();
                dispatch({ type: 'UPDATE_WORKOUT', workout: json, weekday: weekday });
                console.log(json);
                navigate(`/workouts/${weekday}`);
                window.location.reload()
            } else {
                console.error("Error updating workout. Status:", response.status);
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="update-workout" onSubmit={handleUpdate}>
            <form>
                <h2>Change your &nbsp; "{workout.title}" &nbsp; workout</h2>
                <div>
                    <label>Title:</label>
                    <input
                        type='text'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </div>
                <div>
                    <label>Sets:</label>
                    <input
                        type='text'
                        onChange={(e) => setSets(e.target.value)}
                        value={sets}
                    />
                </div>
                <div>
                    <label>Reps:</label>
                    <input
                        type='text'
                        onChange={(e) => setReps(e.target.value)}
                        value={reps}
                    />
                </div>
                <div>
                    <label>Weight:</label>
                    <input
                        type='text'
                        onChange={(e) => setWeight(e.target.value)}
                        value={weight}
                    />
                </div>
                <button className="update" type="submit">Update Workout</button>
            </form>
        </div>
    )
}

export default UpdateWorkoutForm