import { useState, useEffect } from "react"
import { useUserContext } from "../../context/UserContext"
import { useNavigate } from "react-router-dom";

function SignUp() {
    const navigate = useNavigate() // use to navigate after submit
    const { currentUser, setCurrentUser } = useUserContext(); // accessing user context

    const [credentials, setCredentials] = useState({
        username: '',
        email: '',
        password: ''
    }) // creating state for form credentials

    const [error, setError] = useState(null) // make state for error to show

    async function handleSubmit(e) {
        try {
            e.preventDefault()
            const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            }) // send credentials to sign up route 
            if (response.status === 201) {
                const user = await response.json(); // create user
                setCurrentUser(user); // Update the current user in the context
                localStorage.setItem('token', user.token); // Save the token to localStorage
                navigate(`/`)
                window.location.reload()
            }
            if (response.status === 409) {
                setError("An account already exists with this email.")
            }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        console.log(currentUser); // This will log the updated currentUser value
    }, [currentUser]);

    return (
        <div className="SignUp">
            <h1>Sign-Up</h1>
            <form onSubmit={handleSubmit}>
                <div className="">
                    <label htmlFor="username">Username</label>
                    <input
                        type="username"
                        required
                        value={credentials.username}
                        onChange={e => setCredentials({ ...credentials, username: e.target.value })}
                        className=""
                        id="username"
                        name="username"
                    />
                </div>
                <div className="">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        required
                        value={credentials.email}
                        onChange={e => setCredentials({ ...credentials, email: e.target.value })}
                        className=""
                        id="email"
                        name="email"
                    />
                </div>
                <div className="">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        required
                        value={credentials.password}
                        onChange={e => setCredentials({ ...credentials, password: e.target.value })}
                        className=""
                        id="password"
                        name="password"
                    />
                </div>
                <input className="submit" type="submit" value="Sign-Up" />
            </form>
            {error}
        </div>
    )
}

export default SignUp

// col-sm-6 form-group

// form-control