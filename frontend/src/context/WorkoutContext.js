import { createContext, useReducer, useContext } from "react";

const WorkoutContext = createContext();

const getWorkouts = (weekday) => {
    return { workouts: JSON.parse(localStorage.getItem(weekday)) || [] };
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_WORKOUT':
            const addedWorkouts = [...state.weekdays[action.weekday].workouts, action.workout];
            localStorage.setItem(action.weekday, JSON.stringify(addedWorkouts));
            return {
                ...state, weekdays: {
                    ...state.weekdays, [action.weekday]: {
                        workouts: addedWorkouts
                    }
                }
            }
        case 'DELETE_WORKOUT':
            const remainingWorkouts = state.weekdays[action.weekday].workouts.filter(
                workout => workout._id !== action.workout._id
            );
            localStorage.setItem(action.weekday, JSON.stringify(remainingWorkouts));
            return {
                ...state, weekdays: {
                    ...state.weekdays, [action.weekday]: {
                        workouts: remainingWorkouts
                    }
                }
            }
        case 'GET_WORKOUT':
            return {
                ...state, weekdays: {
                    ...state.weekdays, [action.weekday]: {
                        workouts: action.workouts
                    }
                }
            }
        case 'UPDATE_WORKOUT':
            const newWorkouts = state.weekdays[action.weekday].workouts.map((w => (
                w._id === action.workout._id ? { ...w, ...action.workout } : w
            )));
            localStorage.setItem(action.weekday, JSON.stringify(newWorkouts));
            return {
                ...state, weekdays: {
                    ...state.weekdays, [action.weekday]: {
                        workouts: newWorkouts
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
            Sunday: getWorkouts('Sunday'),
        }
    });

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