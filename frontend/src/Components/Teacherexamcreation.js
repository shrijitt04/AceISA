import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ExamCreationPage = () => {
  const [showTitle, setShowTitle] = useState(false);
  const [subjID, setSubjID] = useState('');
  const [courseName, setCourseName] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [createdOn, setCreatedOn] = useState('');
  const [questionCount, setQuestionCount] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [questionID, setQuestionID] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [detailedAnswer, setDetailedAnswer] = useState('');

  useEffect(() => {
    setTimeout(() => setShowTitle(true), 500);
  }, []);

  const handleInputChange = (setter) => (e) => setter(e.target.value);

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

  const handleNextQuestion = async () => {
    // Check that all necessary fields are filled out
    if (questionID && questionText && options.every(option => option) && correctAnswer && detailedAnswer) {
      const newQuestion = {
        QuestionID: questionID,
        subjID: subjID,
        Question: questionText,
        Option1: options[0],
        Option2: options[1],
        Option3: options[2],
        Option4: options[3],
        Answer: correctAnswer,
        DetailedAnswer: detailedAnswer,
      };

      // Make API call to add the current question
      try {
        const response = await axios.post("http://localhost:8081/add-question", newQuestion);
        
        // Check if the response is successful
        if (response.status === 200) {
          // Append the new question to the questions array
          setQuestions(prevQuestions => [...prevQuestions, newQuestion]);

          // Increment currentQuestion only if it is less than the questionCount
          if (currentQuestion < questionCount) {
            setCurrentQuestion(currentQuestion + 1);
            // Reset the fields for the next question
            setQuestionID('');
            setQuestionText('');
            setOptions(['', '', '', '']);
            setCorrectAnswer('');
            setDetailedAnswer('');
          } else {
            alert("You have entered all the questions. Click on 'Publish Test' to finish.");
          }
        } else {
          alert('Failed to add the question. Please try again.');
        }
      } catch (error) {
        console.error('Error adding question:', error);
        alert('An error occurred while adding the question.');
      }
    } else {
      alert('Please fill in all fields and provide a detailed answer before proceeding.');
    }
  };

  const handleCreateTest = async () => {
    const values = {
      SubjID: subjID,
      Course_name: courseName,
      Created_by: createdBy,
      Created_on: createdOn,
    };

    try {
      const response = await axios.post("http://localhost:8081/create-test", values);
      alert("Test created successfully, please enter the questions");
    } catch (err) {
      console.error(err);
      alert("An error occurred while creating the test.");
    }
  };

  return (
    <div className="container-fluid min-vh-100 py-5" style={{
      background: 'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)',
    }}>
      <h1 className={`text-center mb-5 text-white ${showTitle ? 'fade-in' : ''}`} style={{ fontSize: '3.5rem' }}>Exam Creation</h1>

      <div className="row mb-4">
        <div className="col-md-3">
          <h4 className="text-white">Subject ID</h4>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Subject ID"
            value={subjID}
            onChange={handleInputChange(setSubjID)}
          />
        </div>
        <div className="col-md-3">
          <h4 className="text-white">Course Name</h4>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Course Name"
            value={courseName}
            onChange={handleInputChange(setCourseName)}
          />
        </div>
        <div className="col-md-3">
          <h4 className="text-white">Created By</h4>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Created By"
            value={createdBy}
            onChange={handleInputChange(setCreatedBy)}
          />
        </div>
        <div className="col-md-3">
          <h4 className="text-white">Created On</h4>
          <input
            type="date"
            className="form-control"
            value={createdOn}
            onChange={handleInputChange(setCreatedOn)}
          />
        </div>
      </div>

      <hr className="bg-white my-4" />

      <div className="row mb-4">
        <div className="col-md-6">
          <button className="btn btn-success mt-4" onClick={handleCreateTest}>
            Create Test
          </button>
        </div>
      </div>

      <div className="row mb-4">
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

      {showQuestionForm && (
        <div className={`question-form ${showQuestionForm ? 'fade-in' : ''}`} style={{ opacity: 0.9 }}>
          <h3 className="mb-3 text-white">Question {currentQuestion}</h3>
          <input
            type="text"
            className="form-control mb-3 bg-dark text-white"
            placeholder="Enter Question ID"
            value={questionID}
            onChange={(e) => setQuestionID(e.target.value)}
          />
          <textarea
            className="form-control mb-3 bg-dark text-white"
            placeholder="Enter your question here"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />
          <div className="row mb-3">
            {options.map((option, index) => (
              <div key={index} className="col-md-6 mb-2">
                <input
                  type="text"
                  className="form-control bg-dark text-white"
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />
              </div>
            ))}
          </div>
          <h5 className="text-white mt-4">Correct Answer (A, B, C, or D)</h5>
          <input
            type="text"
            className="form-control mb-3 bg-dark text-white"
            placeholder="Enter correct answer (A, B, C, or D)"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value.toUpperCase())}
          />
          <h5 className="text-white mt-4">Enter Detailed Answer</h5>
          <textarea
            className="form-control mb-3 bg-dark text-white"
            placeholder="Enter detailed answer"
            value={detailedAnswer}
            onChange={(e) => setDetailedAnswer(e.target.value)}
          />
          {currentQuestion < questionCount ? (
            <button
              className="btn btn-primary"
              onClick={handleNextQuestion}
            >
              Next Question
            </button>
          ) : (
            <button
              className="btn btn-warning"
              onClick={handleNextQuestion} // Optionally you can change this to a different function if needed
            >
              Publish Test
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ExamCreationPage;
