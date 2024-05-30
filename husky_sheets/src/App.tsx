import React from "react";
import "./App.css";
import MyButton from "./MyButton.tsx";


/*
This function is responsible for the UI for the login page

Owner: Amani
*/
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the login page</h1>
      </header>
      <div className="App-content">
        <div className="login-fields">
          <input
            type="text"
            placeholder="Enter your username"
            className="name-field"
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="password-field"
          />
        </div>
      </div>
      <div className="button-container">
        <MyButton to="register" text="Make an account" />
        <MyButton to="home_page" text="Login" />
      </div>
    </div>
  );
}

export default App;
