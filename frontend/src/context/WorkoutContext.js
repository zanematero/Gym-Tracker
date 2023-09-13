import { createContext, useReducer, useContext } from "react";

const WorkoutContext = createContext(); // initialize workout context

const getWorkouts = (weekday) => {
    return { workouts: JSON.parse(localStorage.getItem(weekday)) || [] };
} // access workouts according to their weekday

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_WORKOUT':
            console.log("state", state)
            const updatedWorkouts = [...state.weekdays[action.weekday].workouts, action.workout];
            console.log("new state", updatedWorkouts)
            console.log("current user id", action.currentUser._id)
            localStorage.setItem(action.weekday, JSON.stringify(updatedWorkouts));
            // create workouts to include new workout and update localstorage with correct weekday
            return {
                weekdays: {
                    ...state.weekdays,
                    [action.weekday]: {
                        workouts: updatedWorkouts.filter(workout => workout.user == action.currentUser._id)
                    }
                }
            };
        case 'DELETE_WORKOUT':
            const remainingWorkouts = state.weekdays[action.weekday].workouts.filter(
                workout => workout._id !== action.workout._id
            );
            localStorage.setItem(action.weekday, JSON.stringify(remainingWorkouts));
            // filter out workout by id and update local storage
            return {
                ...state, weekdays: {
                    ...state.weekdays, [action.weekday]: {
                        workouts: remainingWorkouts
                    }
                }
            }
        case 'GET_WORKOUT':
            return {
                workouts: {
                    ...state, weekdays: {
                        ...state.weekdays, [action.weekday]: {
                            workouts: state.weekdays[action.weekday]
                        }
                    }
                }
            }; // help me
        case 'UPDATE_WORKOUT':
            const newWorkouts = state.weekdays[action.weekday].workouts.map((w => (
                w._id === action.workout._id ? { ...w, ...action.workout } : w
            )));
            // map all workouts, if workout is equal to correct id, update workout, otherwise return workout
            localStorage.setItem(action.weekday, JSON.stringify(newWorkouts));
            // update local storage
            return {
                currentUser: {
                    workouts: {
                        ...state, weekdays: {
                            ...state.weekdays, [action.weekday]: {
                                workouts: newWorkouts
                            }
                        }
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
    );
};

const useWorkoutContext = () => {
    return useContext(WorkoutContext);
};

export { WorkoutProvider, useWorkoutContext }