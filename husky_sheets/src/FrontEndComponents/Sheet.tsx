import './App.css';
import { Grid } from 'gridjs-react';
import { h } from 'gridjs';
import React, { useState, useEffect, useRef } from "react";
import { Buffer } from 'buffer';

import {Form, useNavigate} from "react-router-dom";
import FormulaParse from '../ParsingUtils/FormulaParse.tsx';
import getCellsInFormula from '../ParsingUtils/GetRefs.tsx';
import { columnNameToIndex } from '../SheetUtils/ColNameToIdx.tsx';
import RefToNumberFormula from '../ParsingUtils/RefToNumberFormula.tsx'
import { generateColumnName } from '../SheetUtils/IdxToColName.tsx';
import {useParams} from "react-router-dom";
import { recentUpdate, setRecentUpdate } from '../recentUpdates.tsx'; 
import splitString from '../ParsingUtils/StringToLetterAndNum.tsx';


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
      "AVG", "CONCAT", "DEBUG", "COPY"];
  const [share, setShare] = useState(false);
  const [searchUser, setSearchUser] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const cellNamePattern = /^[A-Z]+[0-9]+$/;
  const {sheetName} = useParams();
  const {dataPublisher} = useParams();
  const [publishedData, setPublishedData] = useState(false);
  const [localRecentUpdate, setLocalRecentUpdate] = useState(recentUpdate);

  const [url, setUrl] = useState('https://husksheets.fly.dev/api/v1/getUpdatesForSubscription'); // Define state variable for URL

  const [combineData, setCombinedData] = useState(false);

  const user = decodeURIComponent(document.cookie);
  if (user === "") {
    navigate("/");
  }
  const username = user.split(":")[0];
  const password = user.split(":")[1];
  const base64encodedData = Buffer.from(`${username}:${password}`).toString('base64');

  useEffect(() => {
    fetch("https://husksheets.fly.dev/api/v1/register", {
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
        
        cell.addEventListener('focus', handleCellFocus);
        cell.addEventListener('blur', handleCellBlur);
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
    var newValue = cell.textContent;
    const cellIndex = cell.cellIndex; 
    const rowIndex = cell.parentElement.rowIndex ; 

    const columnName = generateColumnName(cellIndex); 

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

      updateFormulaCell(columnName, rowIndex);
    }

    var origDebug = "";
  
    if (newValue[0] === "=") {
      if (newValue.toUpperCase().includes("DEBUG")) {
        origDebug = origDebug.concat(newValue.toString());
        newValue = newValue.replace(/\bDEBUG\b/g, '').trim();
      }
     
      const gridInstance = gridContainerRef.current;
      var tds = gridInstance.querySelectorAll("td[data-column-id='" + columnName.toLowerCase() + "']");
      var refList = [`${rowIndex - 1}-${cellIndex}`];
      try {
        if (newValue.includes("COPY"))  {
          const tokens = getCellsInFormula(newValue.toUpperCase());
          const newPattern = /(IF|SUM|MIN|MAX|AVG|CONCAT|DEBUG|COPY|:|<|>|<>|&|=|\+|,|\*|-|\/|\||\(|\)|[A-Z]+\d+|\d+(\.\d+)?|[A-Za-z]+|[=+\-*\/(),])/g;
          const newString = RefToNumberFormula(cellNamePattern, dels, data, newValue, refList)
          const newTokens = newString.match(newPattern) || [];
          const refCell = tokens[5];
          const copyVal = newTokens[3];
          var str = splitString(refCell);
          var colIdx = columnNameToIndex(str?.letter) - 1;
          var rowIdx = str?.numeric+1;
          const columnName = generateColumnName(colIdx);
          tds[rowIdx - 1].innerHTML = copyVal;
        }
        tds[rowIndex - 1].innerHTML = FormulaParse(RefToNumberFormula(cellNamePattern, dels, data, newValue, refList)).value;
        if (origDebug.includes("DEBUG")) {
          console.log("DEBUG DISPLAY: ", tds[rowIndex - 1].innerHTML)
        }
      } catch (err) {
        tds[rowIndex - 1].innerHTML = "ERROR";
      }
    }
  };

  
  function updateFormulaCell(columnName, rowIndex) {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        if (String(data[i][j]).includes(`${columnName}${rowIndex - 1}`)) {
          const gridInstance = gridContainerRef.current;
          const cN = generateColumnName(j);
          var td = gridInstance.querySelectorAll("td[data-column-id='" + cN.toLowerCase() + "']");
          var refList = [`${i}-{j}`];
          try {
            td[i].innerHTML = FormulaParse(RefToNumberFormula(cellNamePattern, dels, data, data[i][j], refList)).value;
            updateFormulaCell(cN, i + 1);
          } catch (err) {
            td[i].innerHTML = "ERROR";
          }
        }
      }
    }
  }


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
      name: generateColumnName(index + 1), 
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


  function reverseParse(listUpdates) {
    var finalData = Array.from({ length: 100 }, (_, rowIndex) => {
      const row = Array.from({ length: 100 - 1 }, () => '')
      return [rowIndex, ...row];
    });
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
    var origDebug = "";
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        if (data[i][j][0] === "=") {
          if (data[i][j].includes("DEBUG")) {
            origDebug = origDebug.concat(data[i][j].toString());
            data[i][j] = data[i][j].toString().replace(/\bDEBUG\b/g, '').trim();

          }
          var refList = [`${i}-${j}`];
          if (data[i][j].includes("COPY"))  {
            const tokens = getCellsInFormula(data[i][j].toUpperCase());
            const newTokens = getCellsInFormula(RefToNumberFormula(cellNamePattern, dels, data, data[i][j], refList));
            const refCell = tokens[5];
            const copyVal = newTokens[3];
            var str = splitString(refCell);
            var colIdx = columnNameToIndex(str?.letter) - 1;
            var rowIdx = str?.numeric +1;
            console.log("COPY VAL", tokens);
            var columnName = generateColumnName(colIdx);
            tds[rowIdx - 1].innerHTML = copyVal;
          }
          try {
            displayData[i][j] = '' + FormulaParse(RefToNumberFormula(cellNamePattern, dels, data, data[i][j], refList)).value;
            if (origDebug.includes("DEBUG")) {
              console.log("DEBUG DISPLAY: ", displayData[i][j])
            }
          } catch (err) {
            console.log(err)
            displayData[i][j] = "ERROR";
          }
        }
      }
    }

    for (let rowIdx = 0; rowIdx < displayData.length; rowIdx++) {
      for (let colIdx = 0; colIdx < displayData[rowIdx].length; colIdx++) {
        finalData[rowIdx][colIdx] = displayData[rowIdx][colIdx];
      }
    }

    return finalData;
  }

  const getUpdates = () => {
    var pubData = Array.from({ length: 100 }, (_, rowIndex) => {
      const row = Array.from({ length: 100 - 1 }, () => '')
      return [rowIndex, ...row];
    });
    const regex = /([A-Z]+)(\d+)/;
    if (username == dataPublisher) {
      fetch('https://husksheets.fly.dev/api/v1/getUpdatesForPublished', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + base64encodedData
        },
        body: JSON.stringify({
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
        return response.json(); 
      })
      .then(data => {  
        for (let sheetIdx = 0; sheetIdx < data.value.length; sheetIdx++) {          
          const allUpdates = data.value[sheetIdx].payload.split("\n");
          for (let updateIdx = localRecentUpdate; updateIdx < allUpdates.length - 1; updateIdx++) {
            const splitStr = allUpdates[updateIdx].split(" ");
            const match = regex.exec(splitStr[0]);
            const cellCoords = {letter: match[1], number: parseInt(match[2], 10)};
            const colIdx = columnNameToIndex(cellCoords.letter);
            const rowIdx = cellCoords.number;
            const cellIndex = columnNameToIndex(colIdx);
            const columnName = generateColumnName(cellIndex);
            const gridInstance = gridContainerRef.current;
            var tds = gridInstance.querySelectorAll("td[data-column-id='" + cellCoords.letter.toLowerCase() + "']");
            tds[rowIdx].innerHTML = splitStr[1];
            displayData[rowIdx][colIdx] = splitStr[1]
            const updateToAdd = `\$${cellCoords.letter}${rowIdx} ${splitStr[1]}\n`
            empListUpdates.push(updateToAdd);
          }
        }
      })
      .catch(error => {
        console.error('Error posting data:', error);
      });
      setRecentUpdate(recentUpdate + 1)
      return pubData;
    }
  }
    
  const saveSheetUpdates = () => {
    var updateUrl = 'https://husksheets.fly.dev/api/v1/updateSubscription'
    var stringEmpListUpdates = "";
    console.log(displayData);
    for (let i = 0; i < empListUpdates.length; i++) {
      stringEmpListUpdates = stringEmpListUpdates + empListUpdates[i];
    }
    if (username === dataPublisher) {
      console.log("HERE");
      updateUrl = 'https://husksheets.fly.dev/api/v1/updatePublished'
    }
    console.log(updateUrl)
  
    fetch(updateUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + base64encodedData
      },
      body: JSON.stringify({
        publisher: dataPublisher,
        sheet: sheetName,
        id: recentUpdate,
        payload: stringEmpListUpdates,
      })
    })
    .then(response => {
      if (!response.ok) {
        console.log(response);
        throw new Error('Network response was not ok');
      }
      return response.json(); 
    })
    .then(data => {
      console.log('Post request successful:', data);
    })
    .catch(error => {
      console.error('Error posting data:', error);
    });
  }

  
  return (
    <div className="panel">
      <button data-testid="save sheet" onClick={saveSheetUpdates}>Save</button>
      <button data-testid="get-updates-button" onClick={getUpdates}>Get Updates</button>
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
          url:'https://husksheets.fly.dev/api/v1/getUpdatesForSubscription' ,
          body: JSON.stringify({
            publisher: dataPublisher,
            sheet: sheetName,
            id: -1,
            payload: "examplePayload"
          }),
          then: data => {
            let resultList = data.value[0].payload.split("\n")
            resultList.pop() 
            return reverseParse(resultList);
          }
        }}
      />
    </div>
  </div>);
}
 
export default Sheet;

function reverseParse(listUpdates: any) {
  throw new Error('Function not implemented.');
}
