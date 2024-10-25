
import React from "react";
import {Link} from 'react-router-dom';

function Home() {
  return (
    <div
      style={{
        height: "100vh", // Ensure the height is set for the gradient to be visible
        background:
          "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)",
      }}
    >
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <p className="navbar-brand">
            <Link to="/" style={{
              color: "red",
              fontSize: "x-large",
              fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
            }}> AceISA </Link>
          </p>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <p className="nav-link active" aria-current="page">
                  <Link to="/login" style={{ color: '#6c757d', textDecoration: 'none' }}>Login/Sign Up</Link></p>
                  
                
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Leaderboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  About Us
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Subjects
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Database Management Systems</a></li>
                  <li><a className="dropdown-item" href="#">Big Data</a></li>
                  <li><a className="dropdown-item" href="#">Machine Learning</a></li>
                  <li><a className="dropdown-item" href="#">Internet Of Things</a></li>
                  <li><a className="dropdown-item" href="#">Software Engineering</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
    </div>
  );
}

export default Home;



