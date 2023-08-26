import { NavLink } from "react-router-dom"

function Navbar() {
    return (
        <div className="nav">
            <NavLink className={({ isActive, isPending }) =>
                isPending ? "" : isActive ? "active" : "inactive"
            } to="/">
                Home
            </NavLink>
            <NavLink className={({ isActive, isPending }) =>
                isPending ? "" : isActive ? "active" : "inactive"
            } to='/workouts'>
                Workouts
            </NavLink>
        </div>
    )
}

export default Navbar