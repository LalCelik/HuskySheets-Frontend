import React from "react";
import Popup from "reactjs-popup";
import Button from "@mui/material/Button";
import MyButton from "./MyButton.tsx"
import "./HomePage.css";
<<<<<<< HEAD
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Sheet from "./Sheet.tsx"
=======
// import {useCookies} from 'react-cookie';

>>>>>>> f197f31cea783a39d6c85210fe10b788671c2a3c

/*
This function is responsible for the UI for the homepage page

Owner: Amani
*/
function HomePage() {
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(false)
  

  const openPopup = () => {
    setOpen(!open);
  };
  
  // const [cookies] = useCookies(['user']);
  // const user = cookies.user;

  const handleClick = () => {
    <MyButton to="sheet" text="" />
  }

  return (
    <div className="HomePage">
      <header className="Home-header">
        <h2>HuskSheets Homepage</h2>
      </header>
      <div className="Home-content">


        {/* This is just an example of how to see the username and password
        set by the cookie in App.tsx */}

        {/* <p> Username: {user.username}</p>
        <p> Password: {user.password}</p> */}
        
        <Button variant="contained" color="secondary" onClick={openPopup}>
          Create a new sheet
        </Button>
        <Popup open={open} closeOnDocumentClick onClose={openPopup}>
          <div className="popup-content">
            <p>Please give your new sheet a name, then press open sheet</p>
            <div className="input-field">
              <input
                type="text"
                placeholder="Sheet Name"
                className="Sheet-name-cd husky_hfield"
              />
            </div>
            <div className="popup-button">
              <MyButton to="sheet" text="Open Sheet" />
            </div>
          </div>
        </Popup>
      </div>
    </div>

  );
}

export default HomePage;