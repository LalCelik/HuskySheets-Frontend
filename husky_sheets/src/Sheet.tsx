import './App.css';
import { Grid } from 'gridjs-react';
import { h } from 'gridjs';
import React, { useState, useEffect, useRef } from "react";
import { createHook } from 'async_hooks';
import { Selection, SelectionSettings, cellEdit, cellSave, cellSelected, dataRowIndex, row, rowSelected } from '@syncfusion/ej2-react-grids';
import { RowSelection } from "gridjs/plugins/selection";
import { useConfig } from "gridjs";
import { PluginPosition } from "gridjs";
import { log } from 'console';
import axios from 'axios';
import { json } from 'stream/consumers';
import { Buffer } from 'buffer';
import {useNavigate} from "react-router-dom";

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

  const user = document.cookie;
  if (user == "") {
    navigate("/");
  }
  const username = user.split(":")[0];
  const password = user.split(":")[1];
  const base64encodedData = Buffer.from(`${username}:${password}`).toString('base64');

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
        .catch(error => {
          console.error('Error posting data:', error);
          navigate("/");
        });
  }, []);
 
  useEffect(() => {
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
    console.log('Cell is being focused:', event.target.textContent);  
  };
 
  const handleCellBlur = (event) => {    
    const cell = event.target;
    const newValue = cell.textContent;
    const cellIndex = cell.cellIndex; // Get the column index directly from the cell
    const rowIndex = cell.parentElement.rowIndex ; // Subtract 1 to account for header row
   
    const columnName = generateColumnName(cellIndex); // Generate column name based on column index
   
    const oldValue = previousValues.current[`${columnName}-${rowIndex}`];
   
    if (oldValue !== newValue) {
      console.log(empListUpdates.length);
      const updateToAdd = `${columnName}${rowIndex - 1} ${newValue}`
      empListUpdates.push(updateToAdd);
      setUpdates(empListUpdates);
      console.log(empListUpdates.length);
      
      console.log(`Cell value changed at row ${rowIndex}, column ${columnName}. Old value: ${oldValue}, New value: ${newValue}`);
      previousValues.current[`${columnName}-${rowIndex}`] = newValue;
    } else {
      console.log(`Cell editing finished at row ${rowIndex}, column ${columnName}. Value: ${newValue}`);
    }
  };
   
  const handleCellInput = (event) => {
    console.log('Cell value is changing:', event.target.textContent);
  };
 
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
    return [rowIndex + 0, ...row];
  });
  
  const columnNameToIndex = (columnName) => {
    let index = 0;
    for (let i = 0; i < columnName.length; i++) {
      index = index * 26 + columnName.charCodeAt(i) - 64;
    }
    return index; // Convert to 0-based index
  };

  function reverseParse(listUpdates) {
    for (let idx=0; idx < listUpdates.length; idx++) {
      const splitStr = listUpdates[idx].split(" ");
      const regex = /([A-Z]+)(\d+)/;
      const match = regex.exec(splitStr[0]);
      
      if (match) {
        const cellCoords = {letter: match[1], number: parseInt(match[2], 10)};
        const colIdx = columnNameToIndex(cellCoords.letter);
        const rowIdx = cellCoords.number;
        data[rowIdx][colIdx] = splitStr[1];
        // console.log(data[rowIdx][colIdx]);
        //return data;
      }
      else {
        console.log("INVALID");
      }
    }
    return data;
  }

  const saveSheetUpdates = () => {
    fetch("http://localhost:8080/api/v1/updatePublished", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic ${base64encodedData}'
      },
      body: JSON.stringify({
        publisher: "user3",
        sheet: "Example Sheet",
        id: 0,
        payload: "test", // Change this
      })
    })
    .then(response => {
      if (!response.ok) {
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

  return (
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
      search={{
        server: {
          url: (prev, keyword) => `${prev}?search=${keyword}`
        }
      }}
      server={{
        method: 'POST',
        headers: {'Accept': 'application/json','Content-Type': 'application/json','Authorization': 'Basic ' + base64encodedData},
        url: 'http://localhost:8080/api/v1/getUpdatesForSubscription',
        body: '{"publisher": "user3","sheet": "Example Sheet","id": -1,"payload": "examplePayload"}',
        then: data => {
          // console.log(data.value[0].payload.split("\n"))
          let resultList = data.value[0].payload.split("\n")
          resultList.pop() // Removes empty string at the end
          return reverseParse(resultList);
        }
      }}
    />
    <button onClick={saveSheetUpdates}>Save</button>
  </div>
  );
}

export default Sheet;