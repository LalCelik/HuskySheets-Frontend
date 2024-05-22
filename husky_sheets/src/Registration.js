import React from "react";
import "./Registration.css";
//import { Button } from "@material-ui/core";
import MyButton from "./MyButton";

function Registration() {
  return (
    <div className="Registration">
      <div className="Register-header">
        <h1>Account Registration Page</h1>
      </div>
      <div className="Register-content">
        <div>
          <h4>Please input a username to create a new account</h4>
          <h6>
            Your username should be unique and no more than 20 characters long
          </h6>
        </div>
        <input
          type="text"
          placeholder="Please enter a username"
          className="name-field"
        />
        {/* <Button variant="contained" color="primary" onClick={() => {}}>
            Submit
        </Button> */}
        <div>
          <h4>Please input a password to create a new account</h4>
          <h6>Your password should be no more than 15 characters long</h6>
        </div>
        <input
          type="text"
          placeholder="Please enter a password"
          className="name-field"
        />
      </div>
      <div className="button-container">
        <MyButton to="/" text="Back to login page" />
      </div>
    </div>
  );
}

export default Registration;
