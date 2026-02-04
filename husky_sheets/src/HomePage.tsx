import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import "primereact/resources/themes/lara-light-purple/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./HomePage.css";

interface ISheet {
  name: string;
  publisher: string;
}

/**
 * This function is responsible for the UI for the homepage page
 *
 * @returns the elements of the homepage file
 *
 * Owner: Amani & Lal
 */

function HomePage() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [sheetName, setSheetName] = useState("");
  const [sheets, setSheets] = useState<ISheet[]>([]);

  const user = decodeURIComponent(document.cookie);
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
        Authorization: "Basic " + base64encodedData
      },
    }).then((response) => {
      if (!response.ok) {
        navigate("/");
      }
    });

    getSheets();
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
        let listOfSheets: ISheet[] = [];

        const fetchAllSheets = data.value.map((publisherData: { publisher: string }) => {
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
              if (data1.success) {
                listOfSheets = [
                  ...listOfSheets,
                  ...data1.value.map((sheet: { sheet: string; publisher: string }) => ({
                    name: sheet.sheet,
                    publisher: sheet.publisher,
                  })),
                ];
              }
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
          navigate(`/home_page/sheet/${sheetName}/${username}`);
        } else {
          navigate("/home_page");
          console.log(data.message);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
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

  const deleteCurrUser = () => {
    fetch("http://localhost:8080/api/v1/deleteUser", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Basic " + base64encodedData,
      },
      body: JSON.stringify({
        username: username,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          document.cookie = "";
          navigate("/");
        } else {
          console.log(data.message);
        }
      })
      .catch((error) => {
        console.log("Couldn't delete the user. Error: " + error.message);
      });
  };

  const handleLogout = () => {
    document.cookie = "";
    navigate("/");
  };

  const actionBodyTemplate = (rowData: ISheet) => {
    return (
      <div className="action-buttons">
        <Button
          label="Open"
          icon="pi pi-external-link"
          className="p-button-sm"
          onClick={() =>
            navigate(`/home_page/sheet/${rowData.name}/${rowData.publisher}`)
          }
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-sm p-button-danger"
          onClick={() => deletingSheet(rowData.publisher, rowData.name)}
        />
      </div>
    );
  };

  return (
    <div className="HomePage">
      <header className="Home-header">
        <Button
          label="Delete Account"
          icon="pi pi-user-minus"
          severity="danger"
          onClick={deleteCurrUser}
        />
        <div className="header-title">
          <i className="pi pi-table" style={{ fontSize: "1.5rem" }}></i>
          <h2>HuskySheets</h2>
        </div>
        <div className="header-actions">
          <Button
            label="New Sheet"
            icon="pi pi-plus"
            onClick={openPopup}
          />
          <Button
            label="Logout"
            icon="pi pi-sign-out"
            severity="danger"
            onClick={handleLogout}
          />
        </div>
      </header>

      <div className="Home-content">
        <div className="table-container">
          <DataTable
            value={sheets}
            stripedRows
            emptyMessage="No sheets found. Create one to get started!"
            className="sheets-table"
          >
            <Column field="name" header="Sheet Name" sortable />
            <Column field="publisher" header="Owner" sortable />
            <Column header="Actions" body={actionBodyTemplate} />
          </DataTable>
        </div>
      </div>

      <Dialog
        header="Create New Sheet"
        visible={open}
        onHide={openPopup}
        className="create-sheet-dialog"
      >
        <div className="dialog-content">
          <div className="field">
            <label htmlFor="sheetName">Sheet Name</label>
            <InputText
              id="sheetName"
              placeholder="Enter sheet name"
              value={sheetName}
              onChange={(e) => setSheetName(e.target.value)}
              className="w-full"
            />
          </div>
          <Button
            label="Create Sheet"
            icon="pi pi-check"
            onClick={creatingSheet}
            className="create-btn"
          />
        </div>
      </Dialog>
    </div>
  );
}

export default HomePage;
