import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals.tsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App.tsx';
import HomePage from './HomePage.tsx';
import Registration from './Registration.tsx';
import Sheet from "./Sheet.tsx"


const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home_page" element={<HomePage />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/home_page/sheet/:sheetName/:dataPublisher" element={<Sheet />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();

