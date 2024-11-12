import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import logo2 from './logo2.jpg'; // Make sure the image path is correct

export default function Component() {
  const [values, setValues] = useState({
    srn: '',
    password: '',
    userType: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues(prev => ({ ...prev, [name]: value.trim() }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    axios.post('http://localhost:8081/login', values)
      .then(res => {
        if (res.data.Login) {
          if (values.userType === "student") {
            navigate('/student', { state: { srn: values.srn } });
          } else if (values.userType === "staff") {
            navigate('/teacherhome', { state: { srn: values.srn } });
          } else {
            alert("Please select student/staff");
          }
        } else {
          alert("Bad Credentials");
        }
      })
      .catch(err => {
        console.log(err);
        alert("An error occurred. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleForgotPassword = () => {
    const srn = prompt("Please enter your SRN/SID to reset your password:");
    if (srn) {
      axios.post('http://localhost:8081/forgot-password', { srn })
        .then(res => {
          if (res.data.success) {
            alert("Password reset link sent to your registered email.");
          } else {
            alert("Failed to send password reset link. Please try again.");
          }
        })
        .catch(err => {
          console.log(err);
          alert("An error occurred while sending the reset link.");
        });
    }
  };

  return (
    <div className="min-h-screen d-flex justify-content-center align-items-center" 
      style={{
        background: "linear-gradient(135deg, #09203F 0%, #537895 100%)",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
      <div className="card shadow-lg border-0 position-relative" style={{ maxWidth: '800px', width: '90%', margin: 'auto', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
        <div className="card-body p-0">
          <div className="row g-0">
            <div className="col-12 col-md-5 text-center p-5 d-flex flex-column justify-content-center align-items-center">
              <img
                src={logo2} 
                alt="Education"
                className="img-fluid mb-4"
                style={{ maxWidth: '200px' }}
              />
              <div className="small text-muted">
                Welcome to AceISA!
              </div>
            </div>
            <div className="col-12 col-md-7 p-5">
              <h4 className="text-center mb-4">Member Login</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control form-control-lg bg-light"
                    name="srn"
                    placeholder="SRN/SID"
                    onChange={handleInput}
                    required
                    style={{ borderRadius: '25px' }}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control form-control-lg bg-light"
                    name="password"
                    placeholder="Password"
                    onChange={handleInput}
                    required
                    style={{ borderRadius: '25px' }}
                  />
                </div>
                <div className="mb-4">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="userType"
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
                      name="userType"
                      id="staff"
                      value="staff"
                      onChange={handleInput}
                    />
                    <label className="form-check-label" htmlFor="staff">Staff</label>
                  </div>
                </div>
                <div className="d-grid gap-2">
                  <button 
                    className="btn btn-success btn-lg"
                    type="submit" 
                    disabled={isLoading}
                    style={{ borderRadius: '25px' }}
                  >
                    {isLoading ? (
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    ) : null}
                    LOGIN
                  </button>
                </div>
                <div className="text-center mt-3">
                  <button
                    type="button"
                    className="btn btn-link text-muted text-decoration-none"
                    onClick={handleForgotPassword}
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="text-center mt-2">
                  <Link to="/signup" className="text-muted text-decoration-none">
                    Create your Account →
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
