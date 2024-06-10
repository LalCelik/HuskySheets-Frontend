import React, { useState } from "react";
import "./App.css";
import MyButton from "./MyButton";
// import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

/*
This function is responsible for the UI for the login page

Owner: Amani
*/
function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  /*
  This is responsible for creating a cookie of a user's name and password once
  they login to the site
  */
  function loginEvent(event) {
    event.preventDefault();
    document.cookie = username + ":" + password;
    navigate("/home_page");
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the login page</h1>
      </header>
      <div className="App-content">
        <form onSubmit={loginEvent} className="login-fields">
          <input
            type="text"
            placeholder="Enter your username"
            className="name-field"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="password-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="login-button">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
      <div className="button-container">
        <MyButton to="register" text="Make an account" />
      </div>
    </div>
  );
}

export default App;
