import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
//import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
//import HomePage from './HomePage';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// const rootElement = document.getElementById('root');
// ReactDOM.render(
//   <BrowserRouter>
//     <Switch>
//       <Route exact path="/" component={App} />
//       <Route path="/home_page" component={HomePage} />
//     </Switch>
//   </BrowserRouter>,
//   rootElement
// );

reportWebVitals();
