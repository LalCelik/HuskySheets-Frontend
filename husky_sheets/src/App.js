import React from "react";
import "./App.css";
import MyButton from "./MyButton";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the login page</h1>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <header className="App-content">
        <MyButton to="home_page" text="Access the sheet" />
      </header>
    </div>
  );
}

export default App;
