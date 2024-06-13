import './App.css';
import { Grid } from 'gridjs-react';
import { h } from 'gridjs';
import React, { useState, useEffect, useRef } from "react";
import { Buffer } from 'buffer';

import {Form, useNavigate} from "react-router-dom";
import FormulaParse from './ParsingUtils/FormulaParse.tsx';
import getCellsInFormula from './ParsingUtils/GetRefs.tsx';
import { columnNameToIndex } from './SheetUtils/ColNameToIdx.tsx';
// import splitString from './ParsingUtils/StringToLetterAndNum'
import RefToNumberFormula from './ParsingUtils/RefToNumberFormula.tsx'
import { generateColumnName } from './SheetUtils/IdxToColName.tsx';
import {useParams} from "react-router-dom";


/**
 * Ownership : Ira 
 * Represents the interface of the main sheet which is a grid of cells that the user can edit
 * @returns a grid of cells
 */
function Sheet() {
  const [message, setMessage] = useState("");
  const gridContainerRef = useRef(null);
  const previousValues = useRef({});
  const [empListUpdates, setUpdates] = useState([]);
  const navigate = useNavigate();
  const [cellsToUpdate, setCellsToUpdate] = useState(new Map([]));
  const dels = ["(", "+", ",", "-", "*", "/", ")", "=", ">", "<",
     "<>", "&", ":", "|", "IF", "SUM", "MIN", "MAX",
      "AVG", "CONCAT", "DEBUG"];
  const [share, setShare] = useState(false);
  const [searchUser, setSearchUser] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const cellNamePattern = /^[A-Z]+[0-9]+$/;
  const {sheetName} = useParams();
  const {dataPublisher} = useParams();


  const user = document.cookie;
  if (user === "") {
    navigate("/");
  }
  const username = user.split(":")[0];
  const password = user.split(":")[1];
  const base64encodedData = Buffer.from(`${username}:${password}`).toString('base64');

  /**
  function getCellsInFormula(expression) {
    const pattern =  "(IF|SUM|MIN|MAX|AVG|CONCAT|DEBUG|:|<|>|<>|&|=|\\+|,|\\*|-|\\/|\\||\\(|\\)|[A-Z]+\\d+)";

    const regex = new RegExp(pattern, 'g');

    const tokens = expression.match(regex) || [];

    return tokens;
  }
    */

  // useEffect(() => {
  //   fetch("http://localhost:8080/api/v1/getSheets", {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Basic ' + base64encodedData
  //     },
  //     body: JSON.stringify({
  //       publisher: username,
  //       sheet: sheetName,
  //       id: null,
  //       payload: null
  //     })
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log(data);
  //       setUpdates(data.value);
  //       setMessage(data.value);
  //     })
  //
  //     .catch(error => {
  //       console.error("Error fetching sheet:", error);
  //     });
  //
  // }, [sheetName, base64encodedData, username]);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/register", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + base64encodedData
      }
    })
    .then(response => {
      if (!response.ok) {
        navigate("/");
      }
    })

    const observer = new MutationObserver(() => {
      const cells = document.querySelectorAll('[contenteditable="true"]');
      cells.forEach(cell => {
        cell.removeEventListener('focus', handleCellFocus);
        cell.removeEventListener('blur', handleCellBlur);
        cell.removeEventListener('input', handleCellInput);

        cell.addEventListener('focus', handleCellFocus);
        cell.addEventListener('blur', handleCellBlur);
        cell.addEventListener('input', handleCellInput);
      });
    });

    if (gridContainerRef.current) {
      observer.observe(gridContainerRef.current, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleCellFocus = (event) => {
    const cell = event.target;
    const cellIndex = cell.cellIndex;
    const columnName = generateColumnName(cellIndex);
    const rowIndex = cell.parentElement.rowIndex - 1;

    const gridInstance = gridContainerRef.current;
    var tds = gridInstance.querySelectorAll("td[data-column-id='" + columnName.toLowerCase() + "']");
    tds[rowIndex].innerHTML = data[rowIndex][cellIndex];
  };

  const handleCellBlur = (event) => {
    const cell = event.target;
    // const newValue = cell.textContent.toUpperCase();
    const newValue = cell.textContent;
    const cellIndex = cell.cellIndex; // Get the column index directly from the cell
    const rowIndex = cell.parentElement.rowIndex ; // Subtract 1 to account for header row

    const columnName = generateColumnName(cellIndex); // Generate column name based on column index

    let oldValue = previousValues.current[`${columnName}-${rowIndex}`];
    if (!oldValue) {
      oldValue = data[rowIndex - 1][cellIndex];
    }
    if (oldValue !== newValue) {
      const updateToAdd = `\$${columnName}${rowIndex - 1} ${newValue}\n`
      empListUpdates.push(updateToAdd);
      setUpdates(empListUpdates);

      previousValues.current[`${columnName}-${rowIndex}`] = newValue;
      data[rowIndex - 1][cellIndex] = newValue;

      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
          if (String(data[i][j]).includes(`${columnName}${rowIndex - 1}`)) {
            const gridInstance = gridContainerRef.current;
            const cN = generateColumnName(j);
            var td = gridInstance.querySelectorAll("td[data-column-id='" + cN.toLowerCase() + "']");
            td[i].innerHTML = FormulaParse(RefToNumberFormula(cellNamePattern, dels, data, data[i][j])).value;
          }
        }
      }
    }
    // // if the cell currently being edited affects another cell with a formula
    // if (Object.keys(cellsToUpdate).includes(`${columnName}${rowIndex - 1}`)) {
    //   for (let key in cellsToUpdate[`${columnName}${rowIndex - 1}`]) {
    //     const colIdx = columnNameToIndex(key[0]);
    //     const rowIdx = key[1];
    //     updateFormulaCell(newValue, `${columnName}${rowIndex - 1}`, key, colIdx, rowIdx);
    //   }
    // }

    // if an equation is detected
    if (newValue[0] === "=") {
      const gridInstance = gridContainerRef.current;
      var tds = gridInstance.querySelectorAll("td[data-column-id='" + columnName.toLowerCase() + "']");
      tds[rowIndex - 1].innerHTML = FormulaParse(RefToNumberFormula(cellNamePattern, dels, data, newValue)).value;
    }
  };


  // function updateFormulaCell(newVal, cellOfNewVal, formulaCellName, formulaCellCol, formulaCellRow) {
  //   const tokens = getCellsInFormula(cellsToUpdate[cellOfNewVal][formulaCellName]);
  //   var convertedExpression = ""
  //   // loop through expression
  //   tokens.forEach((token) => {
  //     // if token isn't a refeence to a cell, append it normally
  //     if (!cellNamePattern.test(token)) {
  //       convertedExpression.concat(token.props.children);
  //     }
  //     // if the token was a reference to the cell that was just updated
  //     if (token === cellOfNewVal) {
  //       convertedExpression.concat(newVal);
  //     }
  //     // grab the cell value normally
  //     else {
  //       const colIdx = columnNameToIndex(token[0])
  //       const rowIdx = token[1]
  //       convertedExpression.concat(data[colIdx][rowIdx].toString());
  //     }
  //   })
  //
  //   // calculate the result of this expression and update the table
  //   data[formulaCellCol][formulaCellRow] = FormulaParse(convertedExpression);
  // }

   
  const handleCellInput = (event) => {
    // console.log('Cell value is changing:', event.target.textContent);
  };
 
  /**
  const generateColumnName = (index) => {
    let columnName = '';
    while (index > 0) {
      let remainder = index % 26;
      if (remainder === 0) {
        columnName = 'Z' + columnName;
        index = Math.floor(index / 26) - 1;
      } else {
        columnName = String.fromCharCode(64 + remainder) + columnName;
        index = Math.floor(index / 26);
      }
    }
    return columnName;
  };

  **/

  const columns = [
    {
      name: "-",
      attributes: {
        "contenteditable": "false" 
      },
      formatter: (cell) => h('div', {
        style: {
          backgroundColor: '#f0f0f0',
          fontWeight: 'bold',
          height: '100%',
          width: '100%',
          boxSizing: 'border-box',
          borderCollapse: 'collapse'
        }
      }, cell),
    },
    ...Array.from({ length: 100 - 1 }, (_, index) => ({
      name: generateColumnName(index + 1), // Adjust index to start from 1
      attributes: {
        "contenteditable": "true"
      },
      formatter: (cell) => h('div', {
        style: {
          boxSizing: 'border-box',
          borderCollapse: 'collapse',
          width: '40px'
        }
      }, cell),
      resizable: true
    }))
  ];

  const data = Array.from({ length: 100 }, (_, rowIndex) => {
    const row = Array.from({ length: 100 - 1 }, () => '')
    return [rowIndex, ...row];
  });

  const displayData = Array.from({ length: 100 }, (_, rowIndex) => {
    const row = Array.from({ length: 100 - 1 }, () => '')
    return [rowIndex, ...row];
  });

  /**
  const columnNameToIndex = (columnName) => {
    let index = 0;
    for (let i = 0; i < columnName.length; i++) {
      index = index * 26 + columnName.charCodeAt(i) - 64;
    }
    return index; // Convert to 0-based index
  };

  
  function splitString(input) {
    const regexPattern = /^([A-Z]+)(\d+)$/i;
    const match = input.match(regexPattern);
    
    if (match) {
        const letterPart = match[1];
        const numericPart = match[2];
        return {
            letter: letterPart.toUpperCase(), 
            numeric: parseInt(numericPart)
        };
    } else {
        return null;
    }
  }
    

  function RefToNumberFormula(refInputString) {
    var newString = "";
    const tokens = getCellsInFormula(refInputString);
    for (let i = 0; i < tokens.length; i++) {
      if (dels.includes(tokens[i]) || (!isNaN(parseFloat(tokens[i])))) {
        newString = newString.concat(tokens[i]);
      }
      else if (cellNamePattern.test(tokens[i])) {
        var str = splitString(tokens[i]);
        var rowIdx = columnNameToIndex(str?.letter);
        var colIdx = str?.numeric;
        newString = newString.concat(data[colIdx][rowIdx].toString())
      }
    }
    return newString;
  }
    */

  function reverseParse(listUpdates) {
    var cellsWithFormulas = []
    const regex = /([A-Z]+)(\d+)/;

    for (let idx=0; idx < listUpdates.length; idx++) {
      const splitStr = listUpdates[idx].split(" ");
      const match = regex.exec(splitStr[0]);
      if (match) {
        const cellCoords = {letter: match[1], number: parseInt(match[2], 10)};
        const colIdx = columnNameToIndex(cellCoords.letter);
        const rowIdx = cellCoords.number;
        splitStr[0] = "";
        data[rowIdx][colIdx] = splitStr.join("");
        displayData[rowIdx][colIdx] = splitStr.join("");
      }
      else {
        console.log("INVALID");
      }
    }
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        if (data[i][j][0] === "=") {
          displayData[i][j] = '' + FormulaParse(RefToNumberFormula(cellNamePattern, dels, data, data[i][j])).value;
        }
      }
    }
    return displayData;
  }

  const saveSheetUpdates = () => {
    var stringEmpListUpdates = "";
    for (let i = 0; i < empListUpdates.length; i++) {
      stringEmpListUpdates = stringEmpListUpdates + empListUpdates[i];
    }
    console.log(stringEmpListUpdates);
    fetch("http://localhost:8080/api/v1/updatePublished", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + base64encodedData
      },
      body: JSON.stringify({
        publisher: username,
        sheet: sheetName,
        id: 0,
        payload: stringEmpListUpdates,
      })
    })
    .then(response => {
      if (!response.ok) {
        console.log(response);
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse response body as JSON
    })
    .then(data => {
      console.log('Post request successful:', data);
      // Handle success
    })
    .catch(error => {
      console.error('Error posting data:', error);
      // Handle error
    });
  }

  const shareSheet = () => {
    setShare(true);
  }

  const handleCloseDialog = () => {
    setShare(false);
  }

  const addUser = () => {
    getSheets();
    console.log(searchResults);
  }

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchUser(value);
    
    console.log(value);
    console.log(searchResults)
  
  };

  const handleSelectResult = (result) => {
    console.log('Selected:', result);
    handleCloseDialog();
  };

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
        for (let i = 0; i < data.value.length; i++) {
          searchResults.push(data.value[i].publisher);
        };
        setSearchResults(searchResults);
      })
    };

  return (
    <div className="panel">
      {/* Add your panel components here */}
      <button onClick={saveSheetUpdates}>Save</button>
      <button onClick={shareSheet}>Share</button>
       {/* Dialog box */}
       {share && (
        <div style={{ 
          position: 'fixed', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          backgroundColor: '#fff', 
          border: '1px solid #ccc', /* Border style */
          borderRadius: '8px', 
          padding: '20px', 
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <div className="dialog-content">
            {/* Dialog content */}
            <p>This is a dialog box!</p>
            
            {/* Search bar */}
            <input
              type="text"
              value={searchUser}
              onChange={handleSearchChange}
              placeholder="Search..."
              style={{ marginBottom: '10px', padding: '5px', width: '100%' }}
            />
            
            {/* Search results */}
            {searchResults.length > 0 ? (
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {searchResults.map((result, index) => (
                  <li key={index} style={{ marginBottom: '5px', cursor: 'pointer' }} onClick={() => handleSelectResult(result)}>
                    {result}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No results found</p>
            )}
          </div>
          
          {/* Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {/* Button to perform action 1 (Close) */}
            <button style={{ marginRight: '10px' }} onClick={handleCloseDialog}>Close</button>
            
            {/* Button to perform action 2 (Share) */}
            <button onClick={addUser}>Share</button>
          </div>
        </div>
      )}
    <div ref={gridContainerRef}>
      <Grid
        columns={columns}
        data={data}
        style={{
          borderCollapse: 'collapse', 
          border: '1px solid #ddd', 
          table: {
            border: '1px solid #ccc',
            borderCollapse: 'collapse'
          },
          th: {
            'background-color': '#f0f0f0',
            color: '#000',
            'text-align': 'center',
            border: '1px solid #ccc',
            borderCollapse: 'collapse'
          },
          td: {
            'text-align': 'center',
            border: '1px solid #ccc',
            borderCollapse: 'collapse'
          }
        }}
        server={{
          method: 'POST',
          headers: {'Accept': 'application/json','Content-Type': 'application/json','Authorization': 'Basic ' + base64encodedData},
          url: 'http://localhost:8080/api/v1/getUpdatesForSubscription',

          // body: '{"publisher": "user3","sheet": "Example Sheet","id": -1,"payload": "examplePayload"}',

          body: JSON.stringify({
            publisher: dataPublisher,
            sheet: sheetName,
            id: -1,
            payload: "examplePayload"
          }),
          then: data => {
            let resultList = data.value[0].payload.split("\n")
            resultList.pop() // Removes empty string at the end
            return reverseParse(resultList);
          }
        }}
      />
    </div>
  </div>);}
 
export default Sheet;