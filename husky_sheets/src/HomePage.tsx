import React, {useEffect} from "react";
import Popup from "reactjs-popup";
import Button from "@mui/material/Button";
import "./HomePage.css";
import { useNavigate } from 'react-router-dom';
import {Buffer} from "buffer";

interface ISheet {
  name: string;
  publisher: string;
}


/*
This function is responsible for the UI for the homepage page

Owner: Amani
*/
function HomePage() {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [sheetName, setSheetName] = React.useState("");
  const [sheets, setSheets] = React.useState<ISheet[]>([]);

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

    getSheets();

    //do not remove this. The table will constantly update if removed
  }, []);

  const getSheets = () => {
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

        let listOfSheets: ISheet[] = [];

        const fetchAllSheets = data.value.map((publisherData) => {
          const dataPublisher = publisherData.publisher;

          return fetch("http://localhost:8080/api/v1/getSheets", {
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
            }),
          })
            .then((response1) => response1.json())
            .then((data1) => {
              console.log(data1.value);
              listOfSheets = [
                ...listOfSheets,
                ...data1.value.map((sheet) => ({
                  name: sheet.sheet,
                  publisher: sheet.publisher,
                })),
              ];
            });
        });

        Promise.all(fetchAllSheets).then(() => {
          setSheets(listOfSheets);
        });
      })
      .catch((error) => {
        console.error("Error fetching sheets:", error);
      });
  };


  const openPopup = () => {
    setOpen(!open);
  };

  const creatingSheet = () => {
    fetch("http://localhost:8080/api/v1/createSheet", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Basic " + base64encodedData,
      },
      body: JSON.stringify({
        publisher: username,
        sheet: sheetName,
        id: null,
        payload: null,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          navigate("/home_page/sheet");
        } else {
          navigate("/home_page");
          console.log(data.message);
          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleInputChange = (event) => {
    setSheetName(event.target.value);
  };

  const deletingSheet = (publisherName: string, nameOfSheet: string) => {
    fetch("http://localhost:8080/api/v1/deleteSheet", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Basic " + base64encodedData,
      },
      body: JSON.stringify({
        publisher: publisherName,
        sheet: nameOfSheet,
        id: null,
        payload: null,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          getSheets();
        } else {
          console.log(data.message);
        }
      })
      .catch((error) => {
        console.log("Couldn't delete the sheet. Error: " + error.message);
      });
  };

  // const [cookies] = useCookies(['user']);
  // const user = cookies.user;

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


        <table className="sheets-table">
          <thead>
            <tr>
              <th>Sheet Name</th>
              <th>Owner</th>
            </tr>
          </thead>
          <tbody>
            {sheets.map((sheet, index) => (
              <tr key={index}>
                <td>{sheet.name}</td>
                <td>{sheet.publisher}</td>
                <td>
                  <Button variant="contained" color="secondary" onClick={() =>navigate("/home_page/sheet")}>
                    Open Sheet
                  </Button>
                </td>
                <td>
                  <Button variant="contained" color="secondary" onClick={() => deletingSheet(sheet.publisher, sheet.name)}>
                    Delete Sheet
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Popup open={open} closeOnDocumentClick onClose={openPopup}>
          <div className="popup-content">
            <p>Please give your new sheet a name, then press open sheet</p>
            <div className="input-field">
              <input
                type="text"
                placeholder="Sheet Name"
                className="Sheet-name-cd husky_hfield"
                value={sheetName}
                onChange={handleInputChange}
              />
            </div>
            <div className="popup-button">
              <Button
                variant="contained"
                color="secondary"
                onClick={creatingSheet}
              >
                Open Sheet
              </Button>
            </div>
          </div>
        </Popup>
      </div>
    </div>

  );
}

export default HomePage;
