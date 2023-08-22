import TodaysWorkout from "./TodaysWorkout"

function Home() {
    return (
        <div className="home">
            <h1>Welcome to Gym-Tracker!</h1>
            <TodaysWorkout />
        </div>
    )
}

export default Home