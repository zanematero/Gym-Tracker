import { NavLink } from "react-router-dom"

function Navbar() {
    return (
        <div className="nav">
            <NavLink className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : "pending"
            } to="/">
                Home
            </NavLink>
            <NavLink  className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : "pending"
            } to="/workouts">
                Workouts
            </NavLink>
        </div>
    )
}

export default Navbar