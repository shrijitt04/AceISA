import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

function Signup() {
  // State to track if the checkbox is checked
  const [isChecked, setIsChecked] = useState(false);

  // Function to toggle the checkbox state
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const [values, setValues] = useState({
    name:'',
    srn:'',
    email:'',
    number: '',
    password:'',
  })

  const handleInput = (event) => {
    setValues(prev=>({...prev, [event.target.name]: event.target.value}))
  }

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8081/signup', values);
      alert("Signed up successfully!!");
      navigate('/student');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="signup template d-flex justify-content-center align-items-center vh-100 bg-primary" style={{
        height: "100vh", // Ensure the height is set for the gradient to be visible
        background:
          "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)",
      }}> 
      <div className="form_container p-5 rounded bg-white">
        <form onSubmit={handleSubmit}>
          <h3 className="text-center"> Sign Up </h3>
          <div className="mb-2">
            <label htmlFor="name">Full Name</label>
            <input type="text" className="form-control" name="name" onChange={handleInput} required/>
          </div>
          <div className="mb-2">
            <label htmlFor="srn">SRN/SID</label>
            <input type="text" name="srn" placeholder="PES2XXXXXXXXX" required className="form-control" onChange={handleInput} />
          </div>
          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" placeholder="example@gmail.com" required className="form-control" onChange={handleInput}/>
          </div>
          <div className="mb-2">
            <label htmlFor="number">Phone Number</label>
            <input type="tel" name="number" required className="form-control" onChange={handleInput}/>
          </div>
          <div className="mb-2">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="Enter Password" required className="form-control" onChange={handleInput}/>
          </div>
          <div className="mb-2">
            <input 
              type="checkbox" 
              className="custom-control custom-checkbox" 
              id="check" 
              onChange={handleCheckboxChange}
            />
            <label htmlFor="check" className="custom-input-label ms-2">
              I agree to all the terms and conditions
            </label>
          </div>
          <div className="d-grid">
            {/* The button is disabled unless the checkbox is checked */}
            <button className="btn btn-primary" disabled={!isChecked}>Sign Up</button>
          </div>
          <p className="text-end mt-2">
            Already registered? <Link to="/login" className="ms-2">Login Now!</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
