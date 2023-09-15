import { useEffect, useState } from "react"
import { useUserContext } from "../../context/UserContext"
import { useNavigate } from "react-router-dom";

function LogIn() {
    const navigate = useNavigate()
    const { currentUser, setCurrentUser } = useUserContext();

    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    })

    async function handleSubmit(e) {
        try {
            e.preventDefault()
            const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            })
            if (response.status === 200) {
                const user = await response.json()
                console.log("fetched:", user)
                await setCurrentUser(user)
                localStorage.setItem('token', user.token)
                navigate(`/`)
                window.location.reload()
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        console.log("currentUser inside useeffect", currentUser)
    }, [currentUser])
    return (
        <div className="LogIn">
            <h1>Log-in</h1>
            <form onSubmit={handleSubmit}>
                <div className="">
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
                </div>
                <input className="submit" type="submit" value="Log-In" />
            </form>
        </div>
    )
}
export default LogIn