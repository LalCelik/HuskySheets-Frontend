import React, { useState } from "react";
import "./Registration.css";
import MyButton from "./MyButton.tsx";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";


/**
 * Responsible for teh UI for the registration page
 * 
 * @returns the elements of the registration page to be
 * displayed to the user
 * 
 * Owner: Amani
 */
function Registration() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  /**
   * Responsible for getting the input from the input field and saving
   * the form data
   * 
   * @param event an action event
   * 
   * Owner: Sunkwan
   */
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  /**
   * Connects to the registration logic in the backend server
   * 
   * @param event an action event
   * 
   * Owner: Sunkwan
   */
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    fetch("http://localhost:8080/api/v1/registerUser", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data["success"]) {
          navigate("/");
        } else {
          console.log(data["message"]);
          const mes = document.getElementById("message");
          if (mes) {
            mes.innerHTML = data["message"];
          }
        }
      })
      .catch((error) => {
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="Registration">
        <div className="Register-header">
          <h1>Account Registration Page</h1>
        </div>
        <div id="message"></div>
        <div className="Register-content">
          <div>
            <h4>Please input a username to create a new account</h4>
          </div>
          <div className="input-container">
            <input
              type="text"
              placeholder="Please enter a username"
              className="name-field"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
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
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="submit-button">
          <Button variant="contained" color="secondary" type="submit">
            Create Account
          </Button>
        </div>
        <div className="button-container">
          <MyButton to="/" text="Back to login page" />
        </div>
      </div>
    </form>
  );
}

export default Registration;
