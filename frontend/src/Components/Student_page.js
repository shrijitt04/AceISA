import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Menu } from 'lucide-react'

export default function Component() {
  const [exams, setExams] = useState([])
  const [typedText, setTypedText] = useState('')
  const [typedSRN, setTypedSRN] = useState('')
  const [showExams, setShowExams] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const welcomeText = 'Welcome to ACE ISA'

  const navigate = useNavigate()
  const location = useLocation()
  const srn = location.state?.srn || ''

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await fetch('http://localhost:8081/exams', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (!response.ok) throw new Error('Failed to fetch exams')
        const data = await response.json()
        setExams(data)
      } catch (error) {
        console.error('Failed to fetch exams:', error)
      }
    }

    fetchExams()

    // First type the welcome text
    let welcomeIndex = 0
    const welcomeTyping = setInterval(() => {
      if (welcomeIndex <= welcomeText.length) {
        setTypedText(welcomeText.slice(0, welcomeIndex))
        welcomeIndex++
      } else {
        clearInterval(welcomeTyping)
        // Start typing SRN after welcome text is complete
        let srnIndex = 0
        const srnTyping = setInterval(() => {
          if (srnIndex <= srn.length) {
            setTypedSRN(srn.slice(0, srnIndex))
            srnIndex++
          } else {
            clearInterval(srnTyping)
            setTimeout(() => setShowExams(true), 500)
          }
        }, 100)
      }
    }, 100)

    return () => clearInterval(welcomeTyping)
  }, [srn])

  const startExam = (examCode) => {
    const values = {
      srn: srn,
      examCode: examCode,
    }

    axios.post('http://localhost:8081/check_marks', values)
      .then(res => {
        if (res.data.Given) {
          alert("Your marks for this exam have been noted, each exam can be taken only once!")
        } else {
          alert("Starting Exam: " + examCode)
          navigate(`/exam/${examCode}`, { state: { srn: srn, subjid: examCode } })
        }
      })
      .catch(err => {
        console.error('Error checking exam status:', err)
      })
  }

  const goToProfile = () => {
    navigate('/studentprofile', { state: { srn: srn } })
  }

  const handleLogout = () => {
    alert("You are now logging out.")
    navigate('/login')
  }

  return (
    <div className="exam-page">
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button className="menu-button" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <Menu size={24} />
        </button>
        {isSidebarOpen && (
          <div className="sidebar-content">
            <button onClick={goToProfile}>Profile</button>
            <button>Subjects</button>
            <button>About Us</button>
            <button onClick={handleLogout}>Log out</button>
          </div>
        )}
      </div>
      <div className="main-content">
        <h1 className="welcome-text">
          {typedText}
          {typedText.length === welcomeText.length && (
            <span className="srn-text">{typedSRN ? `, ${typedSRN}` : ''}</span>
          )}
        </h1>
        {showExams && (
          <div className="exam-grid">
            {exams.map((exam, index) => (
              <div key={index} className="exam-card">
                <h3 className="exam-code">{exam.SubjID}</h3>
                <p className="subject-name">{exam.Course_name}</p>
                <p className="exam-info">Created By: {exam.Created_by}</p>
                <p className="exam-info">Created On: {new Date(exam.Created_on).toLocaleDateString()}</p>
                <button className="btn btn-primary w-100" onClick={() => startExam(exam.SubjID)}>
                  Take Test
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <style jsx>{`
        .exam-page {
          background: linear-gradient(135deg, #09203F 0%, #537895 100%);
          min-height: 100vh;
          font-family: 'Calibri', sans-serif;
          display: flex;
        }

        .sidebar {
          width: 60px;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.8);
          transition: width 0.3s ease;
          position: fixed;
          left: 0;
          top: 0;
          overflow: hidden;
        }

        .sidebar.open {
          width: 200px;
        }

        .menu-button {
          background: none;
          border: none;
          color: white;
          padding: 15px;
          width: 100%;
          text-align: left;
          cursor: pointer;
        }

        .sidebar-content {
          padding-top: 20px;
        }

        .sidebar-content button {
          display: block;
          width: 100%;
          padding: 10px 15px;
          color: white;
          background: none;
          border: none;
          text-align: left;
          cursor: pointer;
          font-family: 'Calibri', sans-serif;
        }

        .sidebar-content button:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }

        .main-content {
          flex-grow: 1;
          padding: 20px;
          margin-left: 60px;
        }

        .welcome-text {
          color: white;
          font-family: 'Calibri', sans-serif;
          margin: 0 0 20px;
          display: inline-block;
        }

        .welcome-text, .srn-text {
          overflow: hidden;
          border-right: .15em solid orange;
          white-space: nowrap;
          letter-spacing: .15em;
          animation: blink-caret .75s step-end infinite;
        }

        .exam-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
          padding: 20px;
        }

        .exam-card {
          background-color: #1D2023;
          border-radius: 15px;  /* Updated: Increased border-radius for more rounded edges */
          padding: 20px;
          color: white;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          overflow: hidden;  /* Added: Ensures content doesn't overflow rounded corners */
        }

        .exam-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        .exam-code {
          font-size: 1.5rem;
          margin-bottom: 10px;
          font-weight: bold;
        }

        .subject-name {
          font-size: 1.2rem;
          margin-bottom: 15px;
        }

        .exam-info {
          font-size: 0.9rem;
          margin-bottom: 5px;
        }

        .btn-primary {
          background-color: #007bff;
          border: none;
          transition: background-color 0.3s ease;
          border-radius: 10px;  /* Added: Rounded corners for the button */
          padding: 10px;  /* Added: More padding for better appearance */
          margin-top: 10px;  /* Added: Space above the button */
        }

        .btn-primary:hover {
          background-color: #0056b3;
        }

        @keyframes blink-caret {
          from, to { border-color: transparent }
          50% { border-color: orange }
        }
      `}</style>
    </div>
  )
}