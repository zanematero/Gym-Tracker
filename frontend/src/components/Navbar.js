import { NavLink } from "react-router-dom"

function Navbar () {
    return (
        <div>
            <NavLink to="/">
                Home
            </NavLink>
            <NavLink to="/workouts">
                Workouts
            </NavLink>
        </div>
    )
}

export default Navbar