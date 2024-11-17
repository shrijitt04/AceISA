import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo2 from './logo2.jpg';

export default function Component() {
    const [isChecked, setIsChecked] = useState(false);
    const [values, setValues] = useState({
        name: '',
        srn: '',
        email: '',
        number: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleInput = (event) => {
        const { name, value } = event.target;
        setValues((prev) => ({ ...prev, [name]: value.trim() }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Pre-submit validation for SRN
        const srnPattern = /^(PES2UG22CS[0-9]{3})$/;
        if (!srnPattern.test(values.srn)) {
            alert("Invalid SRN format! It must be PES2UG22CSXXX");
            return; // Prevent form submission
        }

        setIsLoading(true);
        try {
            await axios.post('http://localhost:8081/signup', values);
            alert("Signed up successfully!!");
            navigate('/login');
        } catch (err) {
            console.log(err);
            alert("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
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
            <div className="card shadow-lg border-0 position-relative" style={{
                maxWidth: '800px',
                width: '90%',
                margin: 'auto',
                backgroundColor: 'rgba(255, 255, 255, 0.8)'
            }}>
                <div className="card-body p-0">
                    <div className="row g-0">
                        <div className="col-12 col-md-5 text-center p-5 d-flex flex-column justify-content-center align-items-center">
                            <img src={logo2} alt="Education" className="img-fluid mb-4" style={{ maxWidth: '200px' }} />
                            <div className="small text-muted"> Join AceISA today! </div>
                        </div>
                        <div className="col-12 col-md-7 p-5">
                            <h4 className="text-center mb-4">Sign Up</h4>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg bg-light"
                                        name="name"
                                        placeholder="Full Name"
                                        onChange={handleInput}
                                        required
                                        style={{ borderRadius: '25px' }}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg bg-light"
                                        name="srn"
                                        placeholder="SRN"
                                        onChange={handleInput}
                                        required
                                        style={{ borderRadius: '25px' }}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="email"
                                        className="form-control form-control-lg bg-light"
                                        name="email"
                                        placeholder="Email"
                                        onChange={handleInput}
                                        required
                                        style={{ borderRadius: '25px' }}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="tel"
                                        className="form-control form-control-lg bg-light"
                                        name="number"
                                        placeholder="Phone Number"
                                        onChange={handleInput}
                                        required
                                        minLength="10"
                                        maxLength="10"
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
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="check"
                                            onChange={handleCheckboxChange}
                                        />
                                        <label className="form-check-label" htmlFor="check">
                                            I agree to all the terms and conditions
                                        </label>
                                    </div>
                                </div>
                                <div className="d-grid gap-2">
                                    <button
                                        className="btn btn-success btn-lg"
                                        type="submit"
                                        disabled={!isChecked || isLoading}
                                        style={{ borderRadius: '25px' }}
                                    >
                                        {isLoading ? (
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        ) : null}
                                        Sign Up
                                    </button>
                                </div>
                                <div className="text-center mt-3">
                                    <Link to="/login" className="text-muted text-decoration-none">
                                        Already registered? Login Now!
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
