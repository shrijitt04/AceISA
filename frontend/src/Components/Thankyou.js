import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';


const ThankYouPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const score = location.state.correct_answers;
  const totalQuestions = location.state.totalQuestions;
  const srn = location.state.srn;
  const examCode = location.state.examCode;
  const [typedText1, setTypedText1] = useState('');
  const [typedText2, setTypedText2] = useState('');
  const [showScore, setShowScore] = useState(false);
  const [showBottom, setShowBottom] = useState(false);

  const onGoBack = async () => {
    const values = { 
      srn: srn, 
      score: score, 
      totalQuestions: totalQuestions, 
      examCode: examCode,
    };
  
    try {
      
      await axios.post('http://localhost:8081/email', values);
      
      alert("You are returing to home page");
      navigate('/student', { state: { srn: srn } });
    } catch (err) {
      console.error("Failed to send email:", err.response ? err.response.data : err.message);
      alert("Failed to send email. Please try again later.");
    }
  };
  
  
  useEffect(() => {
    const text1 = 'Thank you for taking up the test';
    const text2 = 'You scored';
    let index1 = 0;
    let index2 = 0;

    const typing1Interval = setInterval(() => {
      if (index1 <= text1.length) {
        setTypedText1(text1.slice(0, index1));
        index1++;
      } else {
        clearInterval(typing1Interval);
        
        const typing2Interval = setInterval(() => {
          if (index2 <= text2.length) {
            setTypedText2(text2.slice(0, index2));
            index2++;
          } else {
            clearInterval(typing2Interval);
            setTimeout(() => setShowScore(true), 500);
            setTimeout(() => setShowBottom(true), 2000); // Show bottom content 1.5 seconds after score appears
          }
        }, 100);
      }
    }, 50); // Reduced from 100ms to 50ms for faster typing

    return () => {
      clearInterval(typing1Interval);
    };
  }, []);

  return (
    <div style={{
      background: 'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <h1 className="mb-4" style={{
        overflow: 'hidden',
        borderRight: '.15em solid orange',
        whiteSpace: 'nowrap',
        margin: '0 auto',
        letterSpacing: '.15em',
        animation: 'typing 2s steps(40, end), blink-caret .75s step-end infinite',
      }}>
        {typedText1}
      </h1>
      
      <h2 className="mb-4" style={{
        overflow: 'hidden',
        borderRight: '.15em solid orange',
        whiteSpace: 'nowrap',
        margin: '0 auto',
        letterSpacing: '.15em',
        animation: 'typing 3.5s steps(40, end), blink-caret .75s step-end infinite',
      }}>
        {typedText2}
      </h2>
      
      <div className={`score ${showScore ? 'visible' : ''}`}>
        {score}/{totalQuestions}
      </div>
      
      <div className={`bottom-content ${showBottom ? 'visible' : ''}`}>
        <p className="mt-4 mb-5">
          Your marks have been submitted to the respective faculty. If you have any queries please contact them.
        </p>
        
        <button onClick={onGoBack} className="btn btn-primary btn-lg">
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
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .score {
            font-size: 8rem;
            font-weight: bold;
            opacity: 0;
            transition: opacity 1s ease-in;
          }
          .score.visible {
            opacity: 1;
          }
          .bottom-content {
            opacity: 0;
            transition: opacity 1s ease-in;
          }
          .bottom-content.visible {
            opacity: 1;
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