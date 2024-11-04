import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const StudentDetailsPage = ({ studentName = "John Doe", studentSRN = "SRN12345" }) => {
  const [currentEmail, setCurrentEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  const handleEmailChange = (e) => {
    e.preventDefault();
    if (currentEmail !== 'current@example.com') {
      setDialogMessage('Wrong current email entered');
      setShowDialog(true);
    } else {
      console.log('Email updated to:', newEmail);
      setDialogMessage('Email updated successfully');
      setShowDialog(true);
    }
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (currentPassword !== 'currentpassword') {
      setDialogMessage('Wrong current password entered');
      setShowDialog(true);
    } else {
      console.log('Password updated');
      setDialogMessage('Password updated successfully');
      setShowDialog(true);
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)',
      minHeight: '100vh',
      padding: '2rem',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div className="mb-4">
        <h1 className="mb-2" style={{ fontSize: '3rem' }}>
          {studentName}
        </h1>
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
            />
          </div>
          <button type="submit" className="btn btn-primary">Update Password</button>
        </form>
      </div>

      {showDialog && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="bg-white p-4 rounded">
            <p>{dialogMessage}</p>
            <button className="btn btn-primary" onClick={() => setShowDialog(false)}>Close</button>
          </div>
        </div>
      )}

      <style>
        {`
          .form-control::placeholder {
            color: rgba(255,255,255,0.5);
          }
        `}
      </style>
    </div>
  );
};

export default StudentDetailsPage;