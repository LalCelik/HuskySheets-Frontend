import React from "react";
import { Link } from "react-router-dom";


/*
This function is responsible for giving the client the opportunity to
go from one page to another (through the mechanicism of a button)

Owner: Amani
*/
function MyButton({ to, text }) {
  return (
    <Link to={to}>
      <button>{text}</button>
    </Link>
  );
}

export default MyButton;
