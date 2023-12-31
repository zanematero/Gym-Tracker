import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { WorkoutProvider } from './context/WorkoutContext';
import { BrowserRouter } from 'react-router-dom';
import './style/index.css';
import { UserContextProvider } from './context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserContextProvider>
    <BrowserRouter>
      <React.StrictMode>
        <WorkoutProvider>
          <App />
        </WorkoutProvider>
      </React.StrictMode>
    </BrowserRouter>
  </UserContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
