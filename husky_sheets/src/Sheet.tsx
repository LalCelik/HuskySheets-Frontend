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
  console.log("BEGINNING AGAIN");
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
  const [publishedData, setPublishedData] = useState(false);

  const [url, setUrl] = useState('http://localhost:8080/api/v1/getUpdatesForSubscription'); // Define state variable for URL
  const [updateUrl, setUpdateUrl] = useState('http://localhost:8080/api/v1/updateSubscription'); // Define state variable for URL

  const [combineData, setCombinedData] = useState(false);

  const user = document.cookie;
  if (user === "") {
    navigate("/");
  }
  const username = user.split(":")[0];
  const password = user.split(":")[1];
  const base64encodedData = Buffer.from(`${username}:${password}`).toString('base64');

  console.log(dataPublisher + user);




  if (dataPublisher != username) {
    //console.log(sheetUrlEnding);
    //sheetUrlEnding = "getUpdatesForPublished";
    //updateSheetUrlEnding = "updatePublished";
  }
  else {
    //sheetUrlEnding = "getUpdatesForSubscription";
    //updateSheetUrlEnding = "updateSubscription";
  }

  //console.log(sheetUrlEnding);
  //console.log(updateSheetUrlEnding);
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

    console.log(rowIndex, cellIndex);
    const gridInstance = gridContainerRef.current;
    console.log("IN THE CELL FOCUS - gridinstance", gridInstance);
    var tds = gridInstance.querySelectorAll("td[data-column-id='" + columnName.toLowerCase() + "']");
    console.log("IN THE CELL FOCUS - tds", tds);
    tds[rowIndex].innerHTML = data[rowIndex][cellIndex];
    console.log("IN THE CELL FOCUS - tds at row index", tds[rowIndex].innerHTML);
    console.log("IN THE CELL FOCUS - data at r/c", data[rowIndex][cellIndex]);
  };

  const handleCellBlur = (event) => {
    console.log("GET TO BLUR");
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


  function updateFormulaCell(newVal, cellOfNewVal, formulaCellName, formulaCellCol, formulaCellRow) {
    const tokens = getCellsInFormula(cellsToUpdate[cellOfNewVal][formulaCellName]);
    var convertedExpression = ""
    // loop through expression
    tokens.forEach((token) => {
      // if token isn't a refeence to a cell, append it normally
      if (!cellNamePattern.test(token)) {
        convertedExpression.concat(token.props.children);
      }
      // if the token was a reference to the cell that was just updated
      if (token === cellOfNewVal) {
        convertedExpression.concat(newVal);
      }
      // grab the cell value normally
      else {
        const colIdx = columnNameToIndex(token[0])
        const rowIdx = token[1]
        convertedExpression.concat(data[colIdx][rowIdx].toString());
      }
    })

    // calculate the result of this expression and update the table
    data[formulaCellCol][formulaCellRow] = FormulaParse(convertedExpression);
  }

   
  const handleCellInput = (event) => {
    // console.log('Cell value is changing:', event.target.textContent);
  };
 


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
    var finalData = Array.from({ length: 100 }, (_, rowIndex) => {
      const row = Array.from({ length: 100 - 1 }, () => '')
      return [rowIndex, ...row];
    });
    var cellsWithFormulas = []
    const regex = /([A-Z]+)(\d+)/;
    //console.log("PRE", displayData);
  
    for (let idx=0; idx < listUpdates.length; idx++) {
      const splitStr = listUpdates[idx].split(" ");
      const match = regex.exec(splitStr[0]);
      if (splitStr[1][0] === "=") {
        cellsWithFormulas.push(idx);
      }
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
    for (let idx = 0; idx < cellsWithFormulas.length; idx++) {
      const splitStr = listUpdates[cellsWithFormulas[idx]].split(" ");
      const match = regex.exec(splitStr[0]);
      const cellCoords = {letter: match[1], number: parseInt(match[2], 10)};
      const colIdx = columnNameToIndex(cellCoords.letter);
      const rowIdx = cellCoords.number;
      splitStr[0] = "";
      if ( splitStr.join("").includes("COPY")) {

      }
      else {
        displayData[rowIdx][colIdx] = '' + FormulaParse(RefToNumberFormula(cellNamePattern, dels, data, splitStr.join(""))).value;
      }
      // console.log(RefToNumberFormula(cellNamePattern, dels, data, splitStr.join("")));
    }

    for (let rowIdx = 0; rowIdx < displayData.length; rowIdx++) {
      for (let colIdx = 0; colIdx < displayData[rowIdx].length; colIdx++) {
        finalData[rowIdx][colIdx] = displayData[rowIdx][colIdx];
      }
    }
    
    const pub = getPublished();
    //console.log("HELLO" , getPublished())


    console.log("HERE", pub)
    
    //getPublished().map(item => {console.log(item['1'])
    //})
    /**
    for (let rIdx = 0; rIdx < 1; rIdx++) {
      console.log("********", getPublished()[0])
      for (let cIdx = 0; cIdx < 10; cIdx) {
        console.log(getPublished()[rIdx][cIdx]);
        finalData[rIdx][cIdx] = getPublished()[rIdx][cIdx]
      }
    }

    **/
   
  
    //finalData = getPublished();

    return finalData;
  }

  const getPublished = () => {
    const regex = /([A-Z]+)(\d+)/;
    var d = Array.from({ length: 100 }, (_, rowIndex) => {
      const row = Array.from({ length: 100 - 1 }, () => '')
      return [rowIndex, ...row];
    });
    fetch('http://localhost:8080/api/v1/getUpdatesForPublished', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + base64encodedData
      },
      body: JSON.stringify({
        // publisher: "user3",
        // sheet: "Example Sheet",
        publisher: dataPublisher,
        sheet: sheetName,
        id: -1,
        payload: "example payload",
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
      //console.log(data.value);

      for (let sheetIdx = 0; sheetIdx < data.value.length; sheetIdx++) {
        const allUpdates = data.value[sheetIdx].payload.split("\n");
        for (let updateIdx = 0; updateIdx < allUpdates.length-1; updateIdx++) {
          //console.log("UPDATES ****", allUpdates[updateIdx]);
          //console.log(allUpdates[updateIdx])
          const splitStr = allUpdates[updateIdx].split(" ");
          
          const match = regex.exec(splitStr[0]);
          const cellCoords = {letter: match[1], number: parseInt(match[2], 10)};
          const colIdx = columnNameToIndex(cellCoords.letter);
          const rowIdx = cellCoords.number;
          const cellIndex = columnNameToIndex(colIdx);
          //console.log(splitStr[1]);
          d[rowIdx][colIdx] = splitStr[1];

          //return displayData;
          //console.log(d)
        }
      }
      //console.log("MIDDLE", d);
      //return finalData;
      // Handle success
    })
    .catch(error => {
      console.error('Error posting data:', error);
      // Handle error
    });

    //console.log("POST", d);
    return d;
  }

  const saveSheetUpdates = () => {
    var stringEmpListUpdates = "";
    for (let i = 0; i < empListUpdates.length; i++) {
      stringEmpListUpdates = stringEmpListUpdates + empListUpdates[i];
    }
   
    if (username == dataPublisher) {
      console.log("HERE");
      setUpdateUrl('http://localhost:8080/api/v1/updatePublished')
    }
  
    console.log(stringEmpListUpdates);
    //console.log("http://localhost:8080/api/v1/" + updateSheetUrlEnding);
    fetch(updateUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + base64encodedData
      },
      body: JSON.stringify({
        // publisher: "user3",
        // sheet: "Example Sheet",
        publisher: dataPublisher,
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

  const getUpdates = () => {
    setPublishedData(true);
    if (username == dataPublisher) {
      setUrl('http://localhost:8080/api/v1/getUpdatesForPublished')
    }
    console.log("HERE");
  }

  /**
  const mergePublished = () => {
    //console.log(displayData);
    for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
      for (let cellIndex = 0; cellIndex < data[rowIndex].length; cellIndex++) {
        const columnName = generateColumnName(cellIndex);
        const gridInstance = gridContainerRef.current;
        var tds = gridInstance.querySelectorAll("td[data-column-id='" + columnName.toLowerCase() + "']");
        //tds[rowIndex].innerHTML = data[rowIndex][cellIndex];
        console.log(displayData[rowIndex][cellIndex]);
        displayData[rowIndex][cellIndex] = tds[rowIndex].textContent;

      }
    }
    return displayData
  }


/**
  const getUpdates = () => {
    var stringEmpListUpdates = "";
    console.log(displayData);
    for (let rowIndex = 1; rowIndex < displayData.length; rowIndex++) {
      //console.log("ROW IDX*************", rowIndex);
      for (let cellIndex = 1; cellIndex < displayData[rowIndex-1].length; cellIndex++) {
          if (displayData[cellIndex][rowIndex].toString().length != 0) {
            var columnName = generateColumnName(cellIndex);
            console.log("DISPLAY DATA", displayData[cellIndex][rowIndex]);
            const updateToAdd = `\$${columnName}${rowIndex - 1} ${displayData[cellIndex][rowIndex]}\n`;
            //console.log(updateToAdd);
            stringEmpListUpdates = stringEmpListUpdates.concat(updateToAdd)
            //console.log(stringEpListUpdates);
          }
          }
          }
    console.log("EMPLIST UPDATES", stringEmpListUpdates);
    if (username == dataPublisher) {
      console.log(displayData);
      //setUrl('http://localhost:8080/api/v1/getUpdatesForPublished');
      fetch('http://localhost:8080/api/v1/getUpdatesForPublished', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + base64encodedData
        },
        body: JSON.stringify({
          // publisher: "user3",
          // sheet: "Example Sheet",
          publisher: dataPublisher,
          sheet: sheetName,
          id: -1,
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
  }
    **/

  
  
  
  return (
    <div className="panel">
      {/* Add your panel components here */}
      <button onClick={saveSheetUpdates}>Save</button>
      <button onClick={getUpdates}>Get Updates</button>
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
          url:'http://localhost:8080/api/v1/getUpdatesForSubscription' ,

          // body: '{"publisher": "user3","sheet": "Example Sheet","id": -1,"payload": "examplePayload"}';
          body: JSON.stringify({
            publisher: dataPublisher,
            sheet: sheetName,
            id: -1,
            payload: "examplePayload"
          }),
          then: data => {

            console.log("PRINTING DATA", data);
            //displayAllPublishedChanges(data.value);
            let resultList = data.value[0].payload.split("\n")
            resultList.pop() // Removes empty string at the end
            return reverseParse(resultList);
          }
        }}
      />
    </div>
  </div>);
}
 
export default Sheet;