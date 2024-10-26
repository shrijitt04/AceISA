import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const exams = [
  { subject: "Mathematics", code: "MATH101", questions: 50, marks: 100 },
  { subject: "Physics", code: "PHYS101", questions: 40, marks: 80 },
  { subject: "Chemistry", code: "CHEM101", questions: 45, marks: 90 },
  { subject: "Biology", code: "BIO101", questions: 60, marks: 120 },
  { subject: "Computer Science", code: "CS101", questions: 55, marks: 110 },
  { subject: "English Literature", code: "ENG101", questions: 30, marks: 60 },
  { subject: "Advanced Quantum Mechanics and Theoretical Physics", code: "PHYS401", questions: 35, marks: 70 }
];

const HomePage = () => {
  const [typedText, setTypedText] = useState('');
  const [showContent, setShowContent] = useState(false);
  const welcomeText = 'Welcome to ACE ISA';

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index <= welcomeText.length) {
        setTypedText(welcomeText.slice(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => setShowContent(true), 500); // Start showing content after a short delay
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  const viewExam = (examCode) => {
    alert(`Viewing exam: ${examCode}`);
    // Here you would typically redirect to the exam view page
    // window.location.href = `exam-view.html?code=${examCode}`;
  };

  const createExam = () => {
    alert('Creating a new exam');
    // Here you would typically redirect to the exam creation page
    // window.location.href = 'create-exam.html';
  };

  return (
    <div style={{
      background: 'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)',
      minHeight: '100vh',
      fontFamily: '"Courier New", monospace',
      overflow: 'hidden'
    }}>
      <div className="container pt-5">
        <h1 className="text-white mb-4" style={{
          overflow: 'hidden',
          borderRight: '.15em solid orange',
          whiteSpace: 'nowrap',
          margin: '0 auto',
          letterSpacing: '.15em',
          animation: 'typing 3.5s steps(40, end), blink-caret .75s step-end infinite',
        }}>
          {typedText}
        </h1>
        
        <hr className="bg-white my-4" style={{ height: '2px' }} />
        
        <div className={`content-container ${showContent ? 'show' : ''}`}>
          <div className="row mb-4">
            <div className="col-12 text-center">
              <button 
                className="btn btn-success btn-lg"
                onClick={createExam}
              >
                Create Exam
              </button>
            </div>
          </div>
          
          <div className="row">
            {exams.map((exam, index) => (
              <div key={index} className="col-md-3 mb-4 exam-container" style={{
                transitionDelay: `${index * 0.1}s`
              }}>
                <div className="exam-card">
                  <h3 className="fw-bold exam-code">{exam.code}</h3>
                  <p className="subject-name">{exam.subject}</p>
                  <p className="exam-info">Questions: {exam.questions}</p>
                  <p className="exam-info">Max Marks: {exam.marks}</p>
                  <button 
                    className="btn btn-primary w-100" 
                    onClick={() => viewExam(exam.code)}
                  >
                    View Exam
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
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
          .content-container {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 1s ease-out, transform 1s ease-out;
          }
          .content-container.show {
            opacity: 1;
            transform: translateY(0);
          }
          .exam-container {
            opacity: 0;
            transform: translateX(100%);
            transition: opacity 1s ease-out, transform 1s ease-out;
          }
          .content-container.show .exam-container {
            opacity: 1;
            transform: translateX(0);
          }
          .exam-card {
            background-color: rgba(30, 30, 30, 0.9);
            border-radius: 15px;
            padding: 20px;
            height: 100%;
            transition: all 0.3s ease;
            cursor: pointer;
            transform: perspective(1000px) rotateY(0deg);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            display: flex;
            flex-direction: column;
            color: #e0e0e0;
          }
          .exam-card:hover {
            transform: perspective(1000px) rotateY(5deg) scale(1.05);
            box-shadow: 0 10px 20px rgba(0,0,0,0.4);
          }
          .exam-card:hover ~ .exam-card {
            filter: blur(2px);
          }
          .exam-code {
            font-size: 1.2rem;
            line-height: 1.3;
            margin-bottom: 0.5rem;
            word-wrap: break-word;
            hyphens: auto;
            color: #ffffff;
          }
          .subject-name {
            font-size: 1rem;
            color: #a0a0a0;
            margin-bottom: 0.5rem;
            word-wrap: break-word;
            hyphens: auto;
          }
          .exam-info {
            color: #c0c0c0;
          }
          .btn-primary {
            background-color: #4a90e2;
            border-color: #4a90e2;
          }
          .btn-primary:hover {
            background-color: #3a7bc8;
            border-color: #3a7bc8;
          }
          .btn-success {
            background-color: #28a745;
            border-color: #28a745;
          }
          .btn-success:hover {
            background-color: #218838;
            border-color: #1e7e34;
          }
        `}
      </style>
    </div>
  );
};

export default HomePage;