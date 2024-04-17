import React from 'react';
import {  Link } from "react-router-dom";
const Navbar= () =>{
  return (
  
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <Link to="/alluser" className="navbar-brand" href="#">MERN</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/create" className="nav-link active" aria-current="page" href="#">Create user</Link>
        </li>
        <li className="nav-item">
          <Link to="/update" className="nav-link" href="#">Update user</Link>
        </li>
       
      </ul>
    </div>
  </div>
</nav>
  
  
  );
}
export default Navbar;