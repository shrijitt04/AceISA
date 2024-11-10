import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

export default function StudentDetailsPage() {
  const location = useLocation()
  const studentSRN = location.state.srn
  const [currentEmail, setCurrentEmail] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const handleEmailChange = async (e) => {
    e.preventDefault()
    const values = { srn: studentSRN, currentEmail, newEmail }
    try {
      const response = await axios.post("http://localhost:8081/change_email", values)
      if (response.status === 200){
        alert('Failed to update email. Please try again.')
      }
    } catch (error) {
      alert('Email updated successfully')
      console.error('Error updating email:', error)
    }
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    const values = { srn: studentSRN, currentPassword, newPassword }
    try {
      const response = await axios.post("http://localhost:8081/change_password", values)
      if (response.status === 200) {
        alert('Failed to update password. Please try again.')
      } else {
        alert('Failed to update password. Please try again.')
      }
    } catch (error) {
      alert('Password updated successfully')
      console.error('Error updating password:', error)
    }
  }
  
  return (
    <div className="min-h-screen p-8 text-white" style={{
      background: 'linear-gradient(135deg, #09203F 0%, #537895 100%)',
      fontFamily: 'Calibri, sans-serif'
    }}>
      <div className="mb-4">
        <h2 className="text-2xl font-bold">{studentSRN}</h2>
      </div>

      <div className="p-4 rounded mb-4 border-2 border-white bg-opacity-10 bg-white">
        <h3 className="mb-3 text-xl font-semibold">Change Email</h3>
        <form onSubmit={handleEmailChange}>
          <div className="mb-3">
            <input
              type="email"
              className="w-full p-2 bg-gray-800 text-white rounded"
              placeholder="Current email"
              value={currentEmail}
              onChange={(e) => setCurrentEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="w-full p-2 bg-gray-800 text-white rounded"
              placeholder="New email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Update Email
          </button>
        </form>
      </div>

      <div className="p-4 rounded border-2 border-white bg-opacity-10 bg-white">
        <h3 className="mb-3 text-xl font-semibold">Change Password</h3>
        <form onSubmit={handlePasswordChange}>
          <div className="mb-3">
            <input
              type="password"
              className="w-full p-2 bg-gray-800 text-white rounded"
              placeholder="Current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="w-full p-2 bg-gray-800 text-white rounded"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Update Password
          </button>
        </form>
      </div>
    </div>
  )
}