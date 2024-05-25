import React from "react";
import "./Registration.css";
import MyButton from "./MyButton.tsx";
import Button from "@mui/material/Button";

function Registration() {
  return (
    <div className="Registration">
      <div className="Register-header">
        <h1>Account Registration Page</h1>
      </div>
      <div className="Register-content">
        <div>
          <h4>Please input a username to create a new account</h4>
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Please enter a username"
            className="name-field"
          />
        </div>
        <div>
          <h4>Please input a password to create a new account</h4>
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Please enter a password"
            className="password-field"
          />
        </div>
      </div>
      <div className="submit-button">
      <Button variant="contained" color="secondary" onClick={() => {}}>
            Create Account
          </Button>
      </div>
      <div className="button-container">
        <MyButton to="/" text="Back to login page" />
      </div>
    </div>
  );
}

export default Registration;
