// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import reportWebVitals from "./reportWebVitals";
// import App from "./husky_sheets/src/App";

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import HomePage from './HomePage';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home_page" element={<HomePage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();


//reportWebVitals();
