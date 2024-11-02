import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "Computer Science"];

const ExamCreationPage = () => {
  const [showTitle, setShowTitle] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [questionCount, setQuestionCount] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [detailedAnswer, setDetailedAnswer] = useState('');

  useEffect(() => {
    setTimeout(() => setShowTitle(true), 500);
  }, []);

  const handleSubjectChange = (e) => setSelectedSubject(e.target.value);
  const handleQuestionCountChange = (e) => {
    const count = parseInt(e.target.value);
    if (!isNaN(count) && count >= 1 && count <= 40) {
      setQuestionCount(count);
      setShowQuestionForm(true);
    } else {
      setShowQuestionForm(false);
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleCorrectAnswerChange = (index) => {
    setCorrectAnswer(index);
  };

  const handleNextQuestion = () => {
    if (questionText && options.every(option => option) && correctAnswer !== null && detailedAnswer) {
      const newQuestion = {
        text: questionText,
        options,
        correctAnswer,
        detailedAnswer
      };
      setQuestions([...questions, newQuestion]);
      setCurrentQuestion(currentQuestion + 1);
      setQuestionText('');
      setOptions(['', '', '', '']);
      setCorrectAnswer(null);
      setDetailedAnswer('');
    } else {
      alert('Please fill in all fields, select a correct answer, and provide a detailed answer before proceeding.');
    }
  };

  const handlePublishTest = () => {
    // Here you would typically send the questions to a server
    console.log('Publishing test:', { subject: selectedSubject, questions });
    alert('Test published successfully!');
  };

  return (
    <div className="container-fluid min-vh-100 py-5" style={{
      background: 'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)',
    }}>
      <h1 className={`text-center mb-5 text-white ${showTitle ? 'fade-in' : ''}`} style={{ fontSize: '3.5rem' }}>Exam Creation</h1>
      
      <div className="row mb-4">
        <div className="col-md-6">
          <h4 className="text-white">Select Subject</h4>
          <select className="form-control" value={selectedSubject} onChange={handleSubjectChange}>
            <option value="">Choose a subject</option>
            {subjects.map((subject, index) => (
              <option key={index} value={subject}>{subject}</option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <h4 className="text-white">Number of Questions</h4>
          <input
            type="number"
            className="form-control"
            placeholder="1-40"
            min="1"
            max="40"
            value={questionCount}
            onChange={handleQuestionCountChange}
          />
        </div>
      </div>

      <hr className="bg-white my-4" />

      {showQuestionForm && (
        <div className={`question-form ${showQuestionForm ? 'fade-in' : ''}`}>
          <h3 className="mb-3 text-white">Question {currentQuestion}</h3>
          <textarea
            className="form-control mb-3 bg-dark text-white"
            placeholder="Enter your question here"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />
          <div className="row mb-3">
            {options.map((option, index) => (
              <div key={index} className="col-md-6 mb-2">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control bg-dark text-white"
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text bg-dark">
                      <input
                        type="checkbox"
                        checked={correctAnswer === index}
                        onChange={() => handleCorrectAnswerChange(index)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="font-weight-bold text-white">Tick the box for the correct answer.</p>
          <h5 className="text-white mt-4">Enter Detailed Answer</h5>
          <textarea
            className="form-control mb-3 bg-dark text-white"
            placeholder="Enter detailed answer"
            value={detailedAnswer}
            onChange={(e) => setDetailedAnswer(e.target.value)}
          />
          <button
            className="btn btn-primary"
            onClick={currentQuestion < questionCount ? handleNextQuestion : handlePublishTest}
          >
            {currentQuestion < questionCount ? 'Next Question' : 'Publish Test'}
          </button>
        </div>
      )}

      <style>
        {`
          .fade-in {
            animation: fadeIn 1s;
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .form-control {
            background-color: rgba(0, 0, 0, 0.5) !important;
            color: white !important;
          }
          .form-control::placeholder {
            color: rgba(255, 255, 255, 0.5) !important;
          }
        `}
      </style>
    </div>
  );
};

export default ExamCreationPage;
