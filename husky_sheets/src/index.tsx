import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals.tsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './FrontEndComponents/App.tsx';
import HomePage from './FrontEndComponents/HomePage.tsx';
import Registration from './FrontEndComponents/Registration.tsx';
import Sheet from "./FrontEndComponents/Sheet.tsx"


const rootElement = document.getElementById('root');
console.log("Root ele" + rootElement);

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

const root = ReactDOM.createRoot(rootElement);
console.log("root" + root);

/**
 * This is responsible for the navigation from one page to another
 * within the UI
 * 
 * Owner: Amani
 */
root.render(
  // <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home_page" element={<HomePage />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/home_page/sheet/:sheetName/:dataPublisher" element={<Sheet />} />
      </Routes>
    </Router>
  // </React.StrictMode>
);

reportWebVitals();

