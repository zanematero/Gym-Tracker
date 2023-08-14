import { createContext, useReducer, useContext } from "react";

const WorkoutContext = createContext();

const getWorkouts = (weekday) => {
    return {workouts: JSON.parse(localStorage.getItem(weekday)) || []};
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_WORKOUT':
            const updatedWorkouts = [...state.weekdays[action.weekday].workouts, action.workout];
            localStorage.setItem(action.weekday, JSON.stringify(updatedWorkouts));
            return {
                ...state, weekdays: { ...state.weekdays,[action.weekday]: { ...state.weekdays[action.weekday], workouts: updatedWorkouts, }},
            };
        case 'GET_WORKOUTS':
            return {
                ...state, weekdays: {
                    ...state.weekdays, [action.weekday]: {
                        ...state.weekdays[action.weekday], workouts: action.workouts,
                    }
                }
            }
        default:
            return state;
    }
}

const WorkoutProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, {
        weekdays: {
            Monday: getWorkouts('Monday'),
            Tuesday: getWorkouts('Tuesday'),
            Wednesday: getWorkouts('Wednesday'),
            Thursday: getWorkouts('Thursday'),
            Friday: getWorkouts('Friday'),
            Saturday: getWorkouts('Saturday'),
            Sunday: getWorkouts('Sunday')
        }
    })

    return (
        <WorkoutContext.Provider value={{ state, dispatch }}>
            {children}
        </WorkoutContext.Provider>
    )
}

const useWorkoutContext = () => {
    return useContext(WorkoutContext);
};

export { WorkoutProvider, useWorkoutContext }