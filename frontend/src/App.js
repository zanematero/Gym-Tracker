import CreateWorkout from "./components/CreateWorkout";
import WorkoutContainer from "./components/WorkoutContainer";

function App() {
  return (
    <div className="App">
      <h1>Welcome to Gym-Tracker!</h1>
      <WorkoutContainer />
      <CreateWorkout />
    </div>
  );
}

export default App;
