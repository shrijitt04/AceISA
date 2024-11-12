import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function ThankYouPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const score = location.state.correct_answers
  const totalQuestions = location.state.totalQuestions
  const srn = location.state.srn
  const examCode = location.state.examCode
  const [typedText, setTypedText] = useState('')
  const [showMessage, setShowMessage] = useState(false)
  const [showButton, setShowButton] = useState(false)

  const onGoBack = async () => {
    const values = {
      srn: srn,
      score: score,
      totalQuestions: totalQuestions,
      examCode: examCode,
    }

    try {
      await axios.post('http://localhost:8081/email', values)
      alert("You are returning to home page")
      navigate('/student', { state: { srn: srn } })
    } catch (err) {
      console.error("Failed to send email:", err.response ? err.response.data : err.message)
      alert("Failed to send email. Please try again later.")
    }
  }

  useEffect(() => {
    const text = 'Thank you for your participation'
    let index = 0

    const typingInterval = setInterval(() => {
      if (index <= text.length) {
        setTypedText(text.slice(0, index))
        index++
      } else {
        clearInterval(typingInterval)
        setTimeout(() => setShowMessage(true), 500)
        setTimeout(() => setShowButton(true), 1000)
      }
    }, 50)

    return () => {
      clearInterval(typingInterval)
    }
  }, [])

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #09203F 0%, #537895 100%)',
        minHeight: '100vh',
        fontFamily: 'Calibri, sans-serif',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <h1
        className="mb-4"
        style={{
          overflow: 'hidden',
          borderRight: '.15em solid orange',
          whiteSpace: 'nowrap',
          margin: '0 auto',
          letterSpacing: '.15em',
          animation: 'typing 2s steps(40, end), blink-caret .75s step-end infinite',
          fontSize: '3rem',
        }}
      >
        {typedText}
      </h1>

      <h2
        className={`mb-4 ${showMessage ? 'fade-in' : ''}`}
        style={{
          fontSize: '1.5rem',
          opacity: 0,
          transition: 'opacity 1s ease-in',
        }}
      >
        The marks have been sent to your email and submitted to the respective faculty
      </h2>

      <div
        className={`bottom-content ${showButton ? 'slide-up' : ''}`}
        style={{
          opacity: 0,
          transform: 'translateY(20px)',
          transition: 'opacity 1s ease-in, transform 1s ease-out',
        }}
      >
        <button onClick={onGoBack} className="btn btn-primary btn-lg mt-4">
          &#8592; Go back to home screen
        </button>
      </div>

      <style jsx>{`
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }
        @keyframes blink-caret {
          from, to { border-color: transparent }
          50% { border-color: orange; }
        }
        .fade-in {
          opacity: 1 !important;
        }
        .slide-up {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .btn-primary {
          background-color: #4a90e2;
          border-color: #4a90e2;
          transition: all 0.3s ease;
        }
        .btn-primary:hover {
          background-color: #3a7bc8;
          border-color: #3a7bc8;
          transform: translateY(-3px);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        .btn-primary:focus {
          animation: pulse 1s infinite;
        }
      `}</style>
    </div>
  )
}