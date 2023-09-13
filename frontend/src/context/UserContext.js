import { createContext, useState, useEffect, useContext } from "react";

const UserContext = createContext(); // initialize user context

function UserContextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null); // create current user state

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await fetch(`https://gym-tracker-api.vercel.app/auth/current`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    },
                    credentials: 'include' // access current user with token
                });
                console.log(response)

                if (response.ok) {
                    const user = await response.json();
                    setCurrentUser(user); // set current user to user
                    console.log("Fetched user data:", user); // Log the user data
                    } else {
                    console.error("Error fetching user data. Status:", response.status);
                }
            } catch (err) {
                console.error("Error during accessing Current User:", err);
            }
        };

        fetchCurrentUser();
    }, []);

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    );
}

const useUserContext = () => {
    return useContext(UserContext);
};

export { UserContextProvider, useUserContext };