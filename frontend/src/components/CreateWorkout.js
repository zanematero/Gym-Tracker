import { useState } from "react"
import { useWorkoutContext } from "../context/WorkoutContext"
import { useUserContext } from "../context/UserContext"

function CreateWorkout({ weekday }) {

    const { dispatch } = useWorkoutContext()
    const { currentUser } = useUserContext()

    const [title, setTitle] = useState('')
    const [sets, setSets] = useState(0)
    const [reps, setReps] = useState(0)
    const [weight, setWeight] = useState(0)

    const handleSubmit = async (e) => {
        const workout = { title, sets, reps, weight, user: currentUser._id }
        console.log("handle submit's current user: ", currentUser)
        e.preventDefault()

        try {
            const response = await fetch(`${process.env.REACT_APP_BASEURL}/workouts`, {
                method: 'POST',
                body: JSON.stringify(workout),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const json = await response.json()
            dispatch({ type: 'ADD_WORKOUT', weekday: weekday, workout: json, currentUser: currentUser})
            setTitle('')
            setSets(0)
            setReps(0)
            setWeight(0)
            console.log("new workout", json)
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div className="create-workout" onSubmit={handleSubmit}>
            <form>
                <h2>Create a new workout</h2>
                <div>
                    <label>Title: </label>
                    <input
                        type='text'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </div>
                <div>
                    <label>Sets: </label>
                    <input
                        type='text'
                        onChange={(e) => setSets(e.target.value)}
                        value={sets}
                    />
                </div>
                <div>
                    <label>Reps: </label>
                    <input
                        type='text'
                        onChange={(e) => setReps(e.target.value)}
                        value={reps}
                    />
                </div>
                <div>
                    <label>Weight: </label>
                    <input
                        type='text'
                        onChange={(e) => setWeight(e.target.value)}
                        value={weight}
                    />
                </div>
                <button className="add" type="submit">Add Workout</button>
            </form>
        </div>
    )
}

export default CreateWorkout