import React from "react";
import { Link } from "react-router-dom";


/**
 * Responsible for giving the client the opportunity to from one page 
 * to another (through the mechanicism of a button)
 * 
 * @param to the target file
 * @param text what the button should say
 * 
 * @returns a link to the target file
 * 
 * Owner: Amani
 */
function MyButton({ to, text }) {
  return (
    <Link to={to}>
      <button>{text}</button>
    </Link>
  );
}

export default MyButton;
