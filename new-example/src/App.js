import { tableCellClasses } from '@mui/material';
import { cellEdit } from '@syncfusion/ej2-react-grids';
import { Grid } from 'gridjs-react';
import { h } from 'gridjs';



function App() {
  const columns = [
    { name: '1', attributes:{ 
      "contenteditable" : "false"
  }, formatter: (cell) => h('div', { style: { backgroundColor: '#f0f0f0', fontWeight: 'bold', height: '100%', width: '100%', boxSizing: 'border-box', borderCollapse: 'collapse'} }, cell), // Custom rendering for shading
      }, 
    ...Array.from({ length: 100 - 1 }, (_, index) => ({
      name: `${index + 0}`,
      attributes:{ 
        "contenteditable" : "true"
    }, formatter: (cell) => h('div', { style: { height: '100%', width: '100%', boxSizing: 'border-box', borderCollapse: 'collapse', width: '40px'} }, cell), resizable: true // Set width for each column // Custom rendering for shading
    }))
  ];

  const data = Array.from({ length: 100 }, (_, rowIndex) => {
    const row = Array.from({ length: 100 - 1 }, () => '');
    return [rowIndex + 0, ...row]; 
  });
 

  return (
    new Grid({
      columns: columns,
      search: true,
      data:data,
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
      }
    }));
}

export default App