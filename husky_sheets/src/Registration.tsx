import React, { useState } from "react";
import "./Registration.css";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import "primereact/resources/themes/lara-light-purple/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

/**
 * Responsible for the UI for the registration page
 *
 * @returns the elements of the registration page to be
 * displayed to the user
 *
 * Owner: Amani & Lal
 */
function Registration() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

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
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data["success"]) {
          navigate("/");
        } else {
          setMessage(data["message"]);
        }
      })
      .catch(() => {
        setMessage("An error occurred. Please try again.");
      });
  };

  return (
    <div className="Registration">
      <div className="Registration-content">
        <div className="registration-card">
          <div className="registration-header">
            <i className="pi pi-user-plus" style={{ fontSize: "2.5rem", color: "#028090" }}></i>
            <h1>Create Account</h1>
            <p>Sign up to get started</p>
          </div>
          {message && <div className="error-message">{message}</div>}
          <form onSubmit={handleSubmit} className="registration-fields">
            <div className="field">
              <label htmlFor="username">Username</label>
              <InputText
                id="username"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <Password
                id="password"
                placeholder="Choose a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                toggleMask
                feedback={false}
              />
            </div>
            <Button type="submit" label="Create Account" icon="pi pi-user-plus" className="register-btn" />
          </form>
          <div className="login-link-section">
            <span>Already have an account?</span>
            <Button
              label="Back to login"
              link
              onClick={() => navigate("/")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
