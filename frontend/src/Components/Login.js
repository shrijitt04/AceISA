import React from "react";
import './styles.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";

function Login() {
  const [values, setValues] = useState({
    srn: '',
    password: '',
    userType: '' // Initialize userType here
  });

  const navigate = useNavigate();

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues(prev => ({ ...prev, [name]: value.trim() })); // Trim spaces
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8081/login', values)
      .then(res => {
        console.log(res);
        if (res.data.Login) {
          if(values.userType==="student"){
            navigate('/student', { state: { srn: values.srn } });
          }
          else if(values.userType==="staff"){
            navigate('/teacherhome', { state: { srn: values.srn } });
          }
          else{
            alert("Please select student/staff")
          }
        } else {
          alert("Bad Credentials");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="login template d-flex justify-content-center align-items-center vh-100 bg-primary" style={{
      height: "100vh", // Ensure the height is set for the gradient to be visible
      background:
        "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)",
    }}>
      <div className="form_container p-5 rounded bg-white">
        <form onSubmit={handleSubmit}>
          <h3 className="text-center"> Sign In </h3>
          <div className="mb-2">
            <label htmlFor="SRN">SRN/SID</label>
            <input
              type="text"
              name="srn" // Add name attribute
              placeholder="PES2XXXXXXXXX"
              className="form-control"
              onChange={handleInput}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password" // Add name attribute
              placeholder="Enter Password"
              className="form-control"
              onChange={handleInput}
            />
          </div>

          {/* Radio buttons for Student and Staff */}
          <div className="mb-2">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="userType" // This is already correct
                id="student"
                value="student"
                onChange={handleInput}
              />
              <label className="form-check-label" htmlFor="student">Student</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="userType" // This is already correct
                id="staff"
                value="staff"
                onChange={handleInput}
              />
              <label className="form-check-label" htmlFor="staff">Staff</label>
            </div>
          </div>
          <div className="d-grid">
            <button className="btn btn-primary">Sign In</button>
          </div>
          <p className="text-end mt-2">
            New User? <Link to="/signup" className="ms-2">Sign Up Now!</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
