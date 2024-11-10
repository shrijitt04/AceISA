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
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #09203F 0%, #537895 100%)',
      fontFamily: 'Calibri, sans-serif'
    }}>
      <div className="w-full py-6 px-4 text-center text-white" style={{
        background: 'linear-gradient(to right, rgba(9, 32, 63, 0.9), rgba(83, 120, 149, 0.9))'
      }}>
        <h1 className="text-3xl font-bold">Welcome to your profile dashboard</h1>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email Change Section */}
          <div className="rounded-lg p-6" style={{ backgroundColor: '#1D2023' }}>
            <h2 className="text-white text-2xl font-bold mb-6" style={{ fontFamily: 'Calibri, sans-serif' }}>
              Change Email
            </h2>
            <form onSubmit={handleEmailChange} className="space-y-4">
              <input
                type="email"
                className="w-full p-3 rounded bg-white text-gray-900"
                placeholder="Current email"
                value={currentEmail}
                onChange={(e) => setCurrentEmail(e.target.value)}
                required
              />
              <input
                type="email"
                className="w-full p-3 rounded bg-white text-gray-900"
                placeholder="New email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="w-32 p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Update Email
              </button>
            </form>
          </div>

          {/* Password Change Section */}
          <div className="rounded-lg p-6" style={{ backgroundColor: '#1D2023' }}>
            <h2 className="text-white text-2xl font-bold mb-6" style={{ fontFamily: 'Calibri, sans-serif' }}>
              Change Password
            </h2>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <input
                type="password"
                className="w-full p-3 rounded bg-white text-gray-900"
                placeholder="Current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
              <input
                type="password"
                className="w-full p-3 rounded bg-white text-gray-900"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <button
                type="submit"
                className="w-32 p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Update Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}