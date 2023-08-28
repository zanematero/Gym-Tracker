import { NavLink } from "react-router-dom";

function WorkoutNavbar() {
    return (
        <div>
            <div className="workout-navbar">
                <NavLink className={({ isActive, isPending }) =>
                    isPending ? "" : isActive ? "active" : "inactive"
                } to="/workouts/monday">
                    Monday
                </NavLink>
                <NavLink className={({ isActive, isPending }) =>
                    isPending ? "" : isActive ? "active" : "inactive"
                } to="/workouts/tuesday">
                    Tuesday
                </NavLink>
                <NavLink className={({ isActive, isPending }) =>
                    isPending ? "" : isActive ? "active" : "inactive"
                } to="/workouts/wednesday">
                    Wednesday
                </NavLink>
                <NavLink className={({ isActive, isPending }) =>
                    isPending ? "" : isActive ? "active" : "inactive"
                } to="/workouts/thursday">
                    Thursday
                </NavLink>
                <NavLink className={({ isActive, isPending }) =>
                    isPending ? "" : isActive ? "active" : "inactive"
                } to="/workouts/friday">
                    Friday
                </NavLink>
                <NavLink className={({ isActive, isPending }) =>
                    isPending ? "" : isActive ? "active" : "inactive"
                } to="/workouts/saturday">
                    Saturday
                </NavLink>
                <NavLink className={({ isActive, isPending }) =>
                    isPending ? "" : isActive ? "active" : "inactive"
                } to="/workouts/sunday">
                    Sunday
                </NavLink>
            </div>
        </div>
    )
}

export default WorkoutNavbar