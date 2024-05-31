import './App.css';
import { Grid } from 'gridjs-react';
import { h } from 'gridjs';
import React, { useState, useEffect, useRef } from "react";
import { createHook } from 'async_hooks';
import { Selection, SelectionSettings, cellEdit, cellSave, cellSelected, rowSelected } from '@syncfusion/ej2-react-grids';
import { RowSelection } from "gridjs/plugins/selection";
import { useConfig } from "gridjs";
import { PluginPosition } from "gridjs";

function Sheet() {

  const [message, setMessage] = useState("");

  const gridContainerRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/sheet")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  /**
  useEffect(() => {  
       if (gridContainerRef.current) {
        const grid = new Grid({
                   columns: [
                  {name: '1',
                  attributes: {
                  "contenteditable": "false"
                  },
                  formatter: (cell) => h('div', {
                  style: {backgroundColor: '#f0f0f0', fontWeight: 'bold', height: '100%', width: '100%', boxSizing: 'border-box', borderCollapse: 'collapse' }, onfocus: handleCellFocus, onblur: handleCellBlur }, cell),},
                ...Array.from({ length: 4 - 1 }, (_, index) => ({
                   name: `${index + 0}`,
                   attributes: {"contenteditable": "true"}, 
                   formatter: (cell) => h('div', {
                    style: {boxSizing: 'border-box',
                    borderCollapse: 'collapse',  width: '40px'
                  },
                  onfocus: handleCellFocus,
                  onblur: handleCellBlur}, cell),
                  resizable: true }))
                ],data: Array.from({ length: 3 }, (_, rowIndex) => {
                  const row = Array.from({ length: 3 - 1 }, () => '')
                  return [rowIndex + 0, ...row];}),
                  style: {borderCollapse: 'collapse',border: '1px solid #ddd',
                  table: {border: '1px solid #ccc', borderCollapse: 'collapse'}, 
                  th: {backgroundColor: '#f0f0f0',color: '#000', textAlign: 'center',border: '1px solid #ccc', borderCollapse: 'collapse'},
                  td: {textAlign: 'center', border: '1px solid #ccc', borderCollapse: 'collapse'}
                         },
                server: {
                  
                  url: 'http://localhost:8080/api/v1/sheet',
                  
                  then: data => { 
                    
                    return data.grid.map(userInput => userInput.map(value => value));
                  }         
                
              }       
            });       
            grid.render(gridContainerRef.current);  
            const cells = gridContainerRef.current.querySelectorAll('td[contenteditable="true"]');
                   cells.forEach(cell => {

                    cell.addEventListener('focus', handleCellFocus);
                    
                    cell.addEventListener('blur', handleCellBlur);
                  
                  });       
                  
                  return () => {
                    
                    cells.forEach(cell => {
                      
                      cell.removeEventListener('focus', handleCellFocus);
                      
                      cell.removeEventListener('blur', handleCellBlur);
                    
                    });       
                  
                  };    
                 }   
                },
                 [gridContainerRef.current]);
  
  **/

  const handleCellFocus = (event) => 
    {     
    const cell = event.target;     
    console.log('Cell is being edited:', cell);  
  };

  const handleCellBlur = (event) => {
    
    const cell = event.target; 
    
    console.log('Cell editing finished:', cell);
  
  };

  const columns = [
    { name: '1', attributes:{ 
      "contenteditable" : "false"
  }, formatter: (cell) => h('div', { style: { backgroundColor: '#f0f0f0', fontWeight: 'bold', height: '100%', width: '100%', boxSizing: 'border-box', borderCollapse: 'collapse'}, onfocus: handleCellFocus}, cell),
 // Custom rendering for shading
      }, 
    ...Array.from({ length: 4 - 1 }, (_, index) => ({
      name: `${index + 0}`,
      attributes:{ 
        "contenteditable" : "true"
    }, formatter: (cell) => h('div', { style: { boxSizing: 'border-box', borderCollapse: 'collapse', width: '40px'}, onfocus: handleCellFocus }, cell), resizable: true // Set width for each column // Custom rendering for shading
    }))
  ];

  const data = Array.from({ length: 3 }, (_, rowIndex) => {
    const row = Array.from({ length: 3 - 1 }, () => '')
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

  // <div style={{ padding: '20px' }}><div ref={gridContainerRef}></div></div>  

  return (grid);
  
}

export default Sheet
