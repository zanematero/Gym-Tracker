import TodaysWorkout from "./TodaysWorkout"
import { useUserContext } from "../context/UserContext"

function Home() {

    const { currentUser } = useUserContext();

    return (
        <div className="home">
            {currentUser ? (
                <div>
                    <h1>Welcome to Gym-Tracker, {currentUser.username}!</h1>
                    <TodaysWorkout />
                </div>
            ) : (
                <h1>Welcome to Gym-Tracker! Log-in or create an account to get started!</h1>
            )}
        </div>
    )
}

export default Home