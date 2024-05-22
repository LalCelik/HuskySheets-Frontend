import React from "react";
import "./App.css";
import MyButton from "./MyButton";

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
        <div className="button-container">
          <MyButton to="register" text="Make an account" />
          <MyButton to="home_page" text="Access the sheet" />
        </div>
      </div>
    </div>
  );
}

export default App;
