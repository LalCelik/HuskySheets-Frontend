// const MyButton = ({ to }) => { 
  
//     return ( 
//         <a href={`/${to}`}> 
//             <button className="my-button"> 
//                 Take me to {to === '' ? "home" : to} 
//             </button> 
//         </a> 
//     ) 
// } 
  
// export default MyButton;

// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// function MyButton({ to, children }) {
//   let navigate = useNavigate();

//   return (
//     <button onClick={() => navigate(to)}>
//       {children}
//     </button>
//   );
// }

// export default MyButton;

import React from "react";
import { Link } from "react-router-dom";

function MyButton({ to, text }) {
  return (
    <Link to={to}>
      <button>{text}</button>
    </Link>
  );
}

export default MyButton;
