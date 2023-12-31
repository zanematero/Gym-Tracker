import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import WorkoutContainer from "./components/WorkoutContainer";
import MondayWorkouts from "./components/weekdayworkouts/MondayWorkouts"
import TuesdayWorkouts from "./components/weekdayworkouts/TuesdayWorkouts"
import WednesdayWorkouts from "./components/weekdayworkouts/WednesdayWorkouts"
import ThursdayWorkouts from "./components/weekdayworkouts/ThursdayWorkouts"
import FridayWorkouts from "./components/weekdayworkouts/FridayWorkouts"
import SaturdayWorkouts from "./components/weekdayworkouts/SaturdayWorkouts"
import SundayWorkouts from "./components/weekdayworkouts/SundayWorkouts"
import UpdateWorkoutForm from "./components/UpdateWorkoutForm";
import None from "./components/None"
import LogIn from "./components/forms/LogIn";
import SignUp from "./components/forms/SignUp";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/workouts/" element={<WorkoutContainer />} >
          <Route index element={<None/>}/>
          <Route path="monday" element={<MondayWorkouts/>}/>
          <Route path="tuesday" element={<TuesdayWorkouts/>}/>
          <Route path="wednesday" element={<WednesdayWorkouts/>}/>
          <Route path="thursday" element={<ThursdayWorkouts/>}/>
          <Route path="friday" element={<FridayWorkouts/>}/>
          <Route path="saturday" element={<SaturdayWorkouts/>}/>
          <Route path="sunday" element={<SundayWorkouts/>}/>
        </Route>
        <Route path="/update-workout" element={<UpdateWorkoutForm/>}/>
        <Route path="/log-in" element={<LogIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
      </Routes>
    </div>
  );
}

export default App;
