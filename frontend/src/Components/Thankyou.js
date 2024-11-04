import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ThankYouPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const score = location.state.correct_answers;
  const totalQuestions = location.state.totalQuestions;
  const srn = location.state.srn;
  const examCode = location.state.examCode;
  const [typedText, setTypedText] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const onGoBack = async () => {
    const values = {
      srn: srn,
      score: score,
      totalQuestions: totalQuestions,
      examCode: examCode,
    };

    try {
      await axios.post('http://localhost:8081/email', values);
      alert("You are returning to home page");
      navigate('/student', { state: { srn: srn } });
    } catch (err) {
      console.error("Failed to send email:", err.response ? err.response.data : err.message);
      alert("Failed to send email. Please try again later.");
    }
  };

  useEffect(() => {
    const text = 'Thank you for your participation';
    let index = 0;

    const typingInterval = setInterval(() => {
      if (index <= text.length) {
        setTypedText(text.slice(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => setShowMessage(true), 500);
      }
    }, 50);

    return () => {
      clearInterval(typingInterval);
    };
  }, []);

  return (
    <div
      style={{
        background: 'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)',
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif',
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
        className={`bottom-content ${showMessage ? 'fade-in' : ''}`}
        style={{
          opacity: 0,
          transition: 'opacity 1s ease-in',
        }}
      >
        <button onClick={onGoBack} className="btn btn-primary btn-lg mt-4">
          &#8592; Go back to home screen
        </button>
      </div>

      <style>
        {`
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
          .btn-primary {
            background-color: #4a90e2;
            border-color: #4a90e2;
          }
          .btn-primary:hover {
            background-color: #3a7bc8;
            border-color: #3a7bc8;
          }
        `}
      </style>
    </div>
  );
};

export default ThankYouPage;
