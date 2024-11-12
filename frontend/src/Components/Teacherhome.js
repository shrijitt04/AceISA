import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function TeacherHomePage() {
  const [exams, setExams] = useState([])
  const [typedText, setTypedText] = useState('')
  const [showExams, setShowExams] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const welcomeText = 'Welcome to ACE ISA'

  const navigate = useNavigate()
  const location = useLocation()
  const srn = location.state?.srn

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

    let index = 0
    const typingInterval = setInterval(() => {
      if (index <= welcomeText.length) {
        setTypedText(welcomeText.slice(0, index))
        index++
      } else {
        clearInterval(typingInterval)
        setTimeout(() => setShowExams(true), 500)
      }
    }, 100)

    return () => clearInterval(typingInterval)
  }, [])

  const viewExam = (examCode) => {
    alert("Viewing Exam: " + examCode)
    navigate(`/teacherexampage/${examCode}`, { state: { srn, subjid: examCode } })
  }

  const deleteExam = async (examCode) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete exam: ${examCode}?`)
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8081/delete/${examCode}`)
        setExams(exams.filter(exam => exam.SubjID !== examCode))
        alert("Exam deleted successfully.")
      } catch (error) {
        console.error('Error deleting exam:', error)
        alert("Failed to delete exam.")
      }
    }
  }

  const createExam = () => {
    alert("Creating a new exam")
    navigate('/createnewexam', { state: { srn } })
  }

  const viewLeaderboard = () => {
    alert("Viewing the leaderboard")
    navigate('/leaderboard', { state: { srn } })
  }

  const handleLogout = () => {
    alert("You are now logging out.")
    navigate('/login')
  }

  return (
    <div style={styles.examPage}>
      <div style={{
        ...styles.sidebar,
        width: isSidebarOpen ? '200px' : '60px'
      }}>
        <button style={styles.menuButton} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          ☰
        </button>
        {isSidebarOpen && (
          <div style={styles.sidebarContent}>
            <button style={styles.sidebarButton} onClick={createExam}>Create Exam</button>
            <button style={styles.sidebarButton} onClick={viewLeaderboard}>Leaderboard</button>
            <button style={styles.sidebarButton} onClick={handleLogout}>Log out</button>
          </div>
        )}
      </div>
      <div style={styles.mainContent}>
        <h1 style={styles.welcomeText}>{typedText}</h1>
        {showExams && (
          <div style={styles.examGrid}>
            {exams.map((exam, index) => (
              <div key={index} style={styles.examCard}>
                <h3 style={styles.examCode}>{exam.SubjID}</h3>
                <p style={styles.subjectName}>{exam.Course_name}</p>
                <p style={styles.examInfo}>Created By: {exam.Created_by}</p>
                <p style={styles.examInfo}>Created On: {new Date(exam.Created_on).toLocaleDateString()}</p>
                <div style={styles.buttonContainer}>
                  <button 
                    style={styles.viewButton}
                    onClick={() => viewExam(exam.SubjID)}
                  >
                    View
                  </button>
                  <button 
                    style={styles.deleteButton}
                    onClick={() => deleteExam(exam.SubjID)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const styles = {
  examPage: {
    background: 'linear-gradient(135deg, #09203F 0%, #537895 100%)',
    minHeight: '100vh',
    fontFamily: 'Calibri, sans-serif',
    overflowX: 'hidden',
    display: 'flex',
  },
  sidebar: {
    position: 'fixed',
    left: 0,
    top: 0,
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    transition: 'width 0.3s ease-in-out',
    overflowX: 'hidden',
    zIndex: 1000,
  },
  menuButton: {
    width: '100%',
    color: 'white',
    padding: '15px',
    textAlign: 'left',
    cursor: 'pointer',
    border: 'none',
    background: 'none',
    fontSize: '20px',
    fontFamily: 'Calibri, sans-serif',
  },
  sidebarContent: {
    paddingTop: '20px',
  },
  sidebarButton: {
    display: 'block',
    width: '100%',
    padding: '10px 15px',
    color: 'white',
    background: 'none',
    border: 'none',
    textAlign: 'left',
    cursor: 'pointer',
    fontFamily: 'Calibri, sans-serif',
  },
  mainContent: {
    flexGrow: 1,
    padding: '20px',
    marginLeft: '60px',
  },
  welcomeText: {
    color: 'white',
    fontSize: '2rem',
    overflow: 'hidden',
    borderRight: '.15em solid orange',
    whiteSpace: 'nowrap',
    margin: '0 auto',
    letterSpacing: '.15em',
    animation: 'typing 3.5s steps(40, end), blink-caret .75s step-end infinite',
    fontFamily: 'Calibri, sans-serif',
  },
  examGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    marginTop: '2rem',
  },
  examCard: {
    flex: '0 0 calc(33.333% - 20px)',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: '10px',
    padding: '20px',
    color: 'white',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    minWidth: '250px',
  },
  examCode: {
    fontSize: '1.5rem',
    marginBottom: '10px',
    fontWeight: 'bold',
    fontFamily: 'Calibri, sans-serif',
  },
  subjectName: {
    fontSize: '1.2rem',
    marginBottom: '15px',
    fontFamily: 'Calibri, sans-serif',
  },
  examInfo: {
    fontSize: '0.9rem',
    marginBottom: '5px',
    fontFamily: 'Calibri, sans-serif',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '15px',
  },
  viewButton: {
    flex: 1,
    marginRight: '5px',
    padding: '8px',
    backgroundColor: '#4a90e2',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontFamily: 'Calibri, sans-serif',
  },
  deleteButton: {
    flex: 1,
    marginLeft: '5px',
    padding: '8px',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontFamily: 'Calibri, sans-serif',
  },
}