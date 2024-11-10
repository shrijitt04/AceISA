import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const StudentDetailsPage = () => {
  const location = useLocation();
  const studentSRN = location.state.srn;
  const [currentEmail, setCurrentEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleEmailChange = async (e) => {
    e.preventDefault();
    const values = { srn: studentSRN, currentEmail, newEmail };
    try {
      const response = await axios.post("http://localhost:8081/change_email", values);
      if (response.status === 200){
        alert('Failed to update email. Please try again.');
      }
    } catch (error) {
      alert('Email updated successfully');
      console.error('Error updating email:', error);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault(); 
    const values = { srn: studentSRN, currentPassword, newPassword };
    
    try {
      const response = await axios.post("http://localhost:8081/change_password", values);
      
      if (response.status === 200) {
        alert('Failed to update password. Please try again.'); 
      } else {
        alert('Failed to update password. Please try again.'); 
      }
    } catch (error) {
      alert('Password updated successfully'); 
      console.error('Error updating password:', error);
    }
  };
  
  return (
    <div style={{
      background: 'linear-gradient(135deg, #09203F 0%, #537895 100%)',
      minHeight: '100vh',
      padding: '2rem',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div className="mb-4">
        <h2 style={{ fontSize: '1.5rem' }}>
          {studentSRN}
        </h2>
      </div>

      <div className="p-4 rounded mb-4" style={{ border: '2px solid white', backgroundColor: 'rgba(255,255,255,0.1)' }}>
        <h3 className="mb-3 text-white">Change Email</h3>
        <form onSubmit={handleEmailChange}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control bg-dark text-white"
              placeholder="Enter current email address"
              value={currentEmail}
              onChange={(e) => setCurrentEmail(e.target.value)}
              required
              style={{ color: 'white', backgroundColor: 'white', borderColor: '#495057' }}
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control bg-dark text-white"
              placeholder="Enter new email address"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
              style={{ color: 'white', backgroundColor: '#343a40', borderColor: '#495057' }}
            />
          </div>
          <button type="submit" className="btn btn-primary">Update Email</button>
        </form>
      </div>

      <div className="p-4 rounded" style={{ border: '2px solid white', backgroundColor: 'rgba(255,255,255,0.1)' }}>
        <h3 className="mb-3 text-white">Change Password</h3>
        <form onSubmit={handlePasswordChange}>
          <div className="mb-3">
            <input
              type="password"
              className="form-control bg-dark text-white"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              style={{ color: 'white', backgroundColor: '#343a40', borderColor: '#495057' }}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control bg-dark text-white"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              style={{ color: 'white', backgroundColor: '#343a40', borderColor: '#495057' }}
            />
          </div>
          <button type="submit" className="btn btn-primary">Update Password</button>
        </form>
      </div>
    </div>
  );
};

export default StudentDetailsPage;
