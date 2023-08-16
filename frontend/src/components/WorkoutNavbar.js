import { NavLink } from "react-router-dom";

function WorkoutNavbar() {
    return (
        <div>
            <NavLink to="/workouts/monday">
                Monday
            </NavLink>
            <NavLink to="/workouts/tuesday">
                Tuesday
            </NavLink>
            <NavLink to="/workouts/wednesday">
                Wednesday
            </NavLink>
            <NavLink to="/workouts/thursday">
                Thursday
            </NavLink>
            <NavLink to="/workouts/friday">
                Friday
            </NavLink>
            <NavLink to="/workouts/saturday">
                Saturday
            </NavLink>
            <NavLink to="/workouts/sunday">
                Sunday
            </NavLink>
        </div>
    )
}

export default WorkoutNavbar