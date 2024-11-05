import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export default function Component() {
  const [exams, setExams] = useState([]);
  const [typedText, setTypedText] = useState('');
  const [showExams, setShowExams] = useState(false);
  const welcomeText = 'Welcome to ACE ISA';

  const navigate = useNavigate(); // Hook for navigating to other pages
  const location = useLocation();

  const srn = location.state.srn;
  const welcomeText2 = srn;
  console.log(srn);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await fetch('http://localhost:8081/exams', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch exams');
        }

        const data = await response.json();
        setExams(data);
      } catch (error) {
        console.error('Failed to fetch exams:', error);
      }
    };

    fetchExams();

    let index = 0;
    const typingInterval = setInterval(() => {
      if (index <= welcomeText.length) {
        setTypedText(welcomeText.slice(0, index) + "," + welcomeText2);
        index++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => setShowExams(true), 500);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  const startExam = (examCode) => {
    const values = {
      srn: srn,
      examCode: examCode,
    };

    axios.post('http://localhost:8081/check_marks', values)
      .then(res => {
        if (res.data.Given) {
          alert("Exam already submitted");
        } else {
          alert("Starting Exam: " + examCode);
          navigate(`/exam/${examCode}`, { state: { srn: srn, subjid: examCode } });
        }
      })
      .catch(err => {
        console.error('Error checking exam status:', err);
      });
  };

  const goToProfile = () => {
    navigate('/studentprofile', { state: { srn: srn } });
  };

  return (
    <div className="exam-page">
      <div className="container pt-5">
        <h1 className="welcome-text mb-4">{typedText}</h1>
        <button className="btn btn-secondary mb-3" onClick={goToProfile}>
          Profile
        </button>
        {showExams && (
          <div className="scroll-container">
            <div className="scroll-content">
              {exams.map((exam, index) => (
                <div key={index} className="exam-card">
                  <h3 className="fw-bold exam-code">{exam.SubjID}</h3>
                  <p className="subject-name">{exam.Course_name}</p>
                  <p className="exam-info">Created By: {exam.Created_by}</p>
                  <p className="exam-info">Created On: {new Date(exam.Created_on).toLocaleDateString()}</p>
                  <button className="btn btn-primary w-100" onClick={() => startExam(exam.SubjID)}>
                    Take Test
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <style>
        {`
          .exam-page {
            background: linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%);
            min-height: 100vh;
            font-family: "Courier New", monospace;
            overflow-x: hidden;
          }
          .welcome-text {
            color: white;
            overflow: hidden;
            border-right: .15em solid orange;
            white-space: nowrap;
            margin: 0 auto;
            letter-spacing: .15em;
            animation: typing 3.5s steps(40, end), blink-caret .75s step-end infinite;
          }
          .scroll-container {
            overflow-x: auto;
            margin-top: 2rem;
            padding-bottom: 1rem;
          }
          .scroll-content {
            display: flex;
            padding-bottom: 1rem;
          }
          .exam-card {
            flex: 0 0 300px;
            background-color: rgba(0, 0, 0, 0.6);
            border-radius: 10px;
            padding: 20px;
            color: white;
            margin-right: 20px;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .exam-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
          }
          .exam-code {
            font-size: 1.5rem;
            margin-bottom: 10px;
          }
          .subject-name {
            font-size: 1.2rem;
            margin-bottom: 15px;
          }
          .exam-info {
            font-size: 0.9rem;
            margin-bottom: 5px;
          }
          @keyframes typing {
            from { width: 0 }
            to { width: 100% }
          }
          @keyframes blink-caret {
            from, to { border-color: transparent }
            50% { border-color: orange }
          }
          .scroll-container::-webkit-scrollbar {
            height: 8px;
          }
          .scroll-container::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
          }
          .scroll-container::-webkit-scrollbar-thumb {
            background-color: rgba(255, 255, 255, 0.5);
            border-radius: 4px;
          }
        `}
      </style>
    </div>
  );
}
