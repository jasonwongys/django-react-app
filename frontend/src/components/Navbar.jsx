import React from "react";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <ul>
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        <a href="/api/notes">Add Notes</a>
      </li>
      <li>
        <a href="/logout">Logout</a>
      </li>
    </ul>
  );
};

export default Navbar;
