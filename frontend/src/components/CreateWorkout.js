import { useState } from "react"

function CreateWorkout() {

    const [title, setTitle] = useState('')
    const [sets, setSets] = useState(0)
    const [reps, setReps] = useState(0)
    const [weight, setWeight] = useState(0)

    const handleSubmit = async (e) => {
        const workout = { title, sets, reps, weight }
        e.preventDefault()

        try {
            await fetch(`${process.env.REACT_APP_BASEURL}/workouts/`, {
                method: 'POST',
                body: JSON.stringify(workout),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div className="create-workout" onSubmit={handleSubmit}>
            <form>
                <h4>Create a new workout for</h4>
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
                <button>Add Workout</button>
            </form>
        </div>
    )
}

export default CreateWorkout