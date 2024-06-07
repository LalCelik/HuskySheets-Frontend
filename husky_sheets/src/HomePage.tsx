import React, { useEffect } from "react";
import Popup from "reactjs-popup";
import Button from "@mui/material/Button";
import MyButton from "./MyButton.tsx";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
// import {useCookies} from 'react-cookie';

/*
This function is responsible for the UI for the homepage page

Owner: Amani
*/
function HomePage() {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  // const [page, setPage] = React.useState(false)

  const user = document.cookie;
  if (user === "") {
    navigate("/");
  }
  const username = user.split(":")[0];
  const password = user.split(":")[1];
  const base64encodedData = Buffer.from(`${username}:${password}`).toString(
    "base64"
  );

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/register", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Basic " + base64encodedData,
      },
    }).then((response) => {
      if (!response.ok) {
        navigate("/");
      }
    });
  });

  fetch("http://localhost:8080/api/v1/getPublishers", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Basic " + base64encodedData,
    },
  })

    .then((response) => response.json())
    .then((data) => {
      console.log(data.value);

      var list = [];

      for (let i = 0; i < data.value.length; i++) {
        const dataPublisher = data.value[i].publisher;

        fetch("http://localhost:8080/api/v1/getSheets", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Basic " + base64encodedData,
          },
          body: JSON.stringify({
            publisher: dataPublisher,
            sheet: null,
            id: null,
            payload: null,
        })
        })

        .then((response1) => response1.json())
        .then((data1) => {
          console.log(data1.value);
        })

      }
    })
    .catch((error) => {
      // Handle any errors
    });

  const openPopup = () => {
    setOpen(!open);
  };

  // const [cookies] = useCookies(['user']);
  // const user = cookies.user;

  // const handleClick = () => {
  //   <MyButton to="sheet" text="" />
  // }

  return (
    <div className="HomePage">
      <header className="Home-header">
        <h2>HuskSheets Homepage</h2>
        <Button variant="contained" color="secondary" onClick={openPopup}>
          Create a new sheet
        </Button>
      </header>
      <div className="Home-content">
        {/* This is just an example of how to see the username and password
        set by the cookie in App.tsx */}

        {/* <p> Username: {user.username}</p>
        <p> Password: {user.password}</p> */}

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
