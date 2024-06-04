import logo from './logo.svg';
import './App.css';
import { Grid } from 'gridjs-react';
import { h } from 'gridjs';
import React, { useState, useEffect } from "react";


import Button from "@mui/material/Button";
// import { Buffer } from 'buffer';
import { useNavigate } from "react-router-dom";

function App() {

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/sheet")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  
  const columns = [
    { name: '1', attributes:{ 
      "contenteditable" : "false"
  }, formatter: (cell) => h('div', { style: { backgroundColor: '#f0f0f0', fontWeight: 'bold', height: '100%', width: '100%', boxSizing: 'border-box', borderCollapse: 'collapse'} }, cell), // Custom rendering for shading
      }, 
    ...Array.from({ length: 4 - 1 }, (_, index) => ({
      name: `${index + 0}`,
      attributes:{ 
        "contenteditable" : "true"
    }, formatter: (cell) => h('div', { style: { height: '100%', width: '100%', boxSizing: 'border-box', borderCollapse: 'collapse', width: '40px'} }, cell), resizable: true,
  }))
  ];

  const data = Array.from({ length: 3 }, (_, rowIndex) => {
    const row = Array.from({ length: 3 - 1 }, () => '');
    return [rowIndex + 0, ...row]; 
  });
  



  const grid = new Grid({
    columns: columns,
    data: data,
    style: {
      borderCollapse: 'collapse', // Remove gap between cells
      border: '1px solid #ddd', // Add border to every row and column
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
    },
    search: {
      server: {
        url: (prev, keyword) => `${prev}?search=${keyword}`
      }
    },
    server: {
      url: 'http://localhost:8080/api/v1/sheet',
      then: data => {return data.grid.map(userInput => {
        // Return the modified data
        return userInput.map(value => value); // For example, converting each value to uppercase
      });
    }}
  });

  return (grid);
}

export default App;
