import { NavLink, useNavigate } from "react-router-dom"
import { useUserContext } from "../context/UserContext"

function Navbar() {

    const { currentUser } = useUserContext()

    const navigate = useNavigate()

    const handleLogout = async (e) => {
        console.log("starting handling logout")
        e.preventDefault()

        const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/logout`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });

        if (response.ok) {
            // The request was successful
            localStorage.removeItem('token');
            console.log("Logout successful");
            navigate('/')
            window.location.reload()
        } else {
            // The request encountered an error
            console.error("Error logging out. Status:", response.status);

            try {
                const errorData = await response.json();
                console.error("Error message:", errorData.message);
            } catch (error) {
                console.error("Response is not JSON:", error);
            }
        }
    }

    return (
        <div className="nav">
            <span className="mainNavLinks">
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
            </span>
            {currentUser ? (
                <span className="navLinkContainer">
                    <button className="userNavButton" onClick={handleLogout}>Log-Out</button>
                </span>
            ) : (
                <span className="navLinkContainer">
                    <NavLink to='/sign-up' className="userNavLinks">
                        Sign-Up
                    </NavLink>
                    <NavLink to='/log-in' className="userNavLinks">
                        Log-In
                    </NavLink>
                </span>
            )}
        </div>
    )
}

export default Navbar