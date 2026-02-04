import { useState, FormEvent } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import "primereact/resources/themes/lara-light-purple/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";


/**
 * This function is responsible for the UI for the login page
 *
 * @returns the elements to be displayed on the login page
 *
 * Owner: Amani & Lal
 */

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  /**
   * This is responsible for creating a cookie of a user's name and password once
   * theye login to the site. Navigates to the homepage of the application once
   * everything is set
   *
   * @param event an action event
   *
   * Owner: Amani
   */

  function loginEvent(event: FormEvent) {
    event.preventDefault();
    console.log(password);
    const login = username + ':' + password
    document.cookie = encodeURIComponent(login)
    console.log(document.cookie)
    navigate("/home_page");
  }

  return (
    <div className="App">
      <div className="App-content">
        <div className="login-card">
          <div className="login-header">
            <i className="pi pi-table" style={{ fontSize: "2.5rem", color: "#028090" }}></i>
            <h1>HuskySheets</h1>
            <p>Sign in to continue</p>
          </div>
          <form onSubmit={loginEvent} className="login-fields">
            <div className="field">
              <label htmlFor="username">Username</label>
              <InputText
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <Password
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                toggleMask
                feedback={false}
              />
            </div>
            <div className="create-account-section">
              <span>Don't have an account?</span>
              <Button
                label="Create an account"
                link
                onClick={() => navigate("/register")}
              />
            </div>
            <Button type="submit" label="Login" icon="pi pi-sign-in" className="login-btn" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
