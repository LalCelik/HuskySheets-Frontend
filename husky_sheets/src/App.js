// import React from 'react';
// //import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
// import { BrowserRouter as Link} from 'react-router-dom';
// import './App.css';
// //import HomePage from './HomePage';

// function App() {
//     return (
//         //<Router>
//             <div className="App">
//                 <header className="App-header">
//                     <h1>Welcome to the login page</h1>
//                 </header>
//                 <div className="App-content">
//                     <Link to="/home">
//                         <button>Press here for HuskSheet access</button>
//                     </Link>
//                 </div>
//             </div>
//             /* <Routes>
//                 <Route path="/home" element={<HomePage />} />
//             </Routes> */
//         //</Router>
//     );
// }

//  export default App;

import React from "react";
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MyButton from "./MyButton";
//import HomePage from "./HomePage";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the login page</h1>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <header className="App-content">
        {/* <MyButton to="/" text="Home" /> */}
        <MyButton to="home_page" text="Access the sheet" />
      </header>
    </div>
  );
}

export default App;
