import WorkoutNavbar from "./WorkoutNavbar.js";
import { Outlet } from "react-router-dom";

function WorkoutContainer() {

    /* useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch(`${process.env.REACT_APP_BASEURL}/workouts`)
            const workouts = await response.json()
            dispatch({ type: 'GET_WORKOUTS', workouts: workouts })
        }
        fetchWorkouts()
    }, [dispatch]) */


    return (
        <div>
            <WorkoutNavbar />
            <Outlet />
        </div>
    );
}

export default WorkoutContainer;