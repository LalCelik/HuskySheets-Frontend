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
