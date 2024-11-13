import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const fetchQuestions = async (subjectcode) => {
  try {
    const response = await fetch(`http://localhost:8081/questions?subjID=${subjectcode}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    return [];
  }
};

const Exam = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const srn = location.state.srn
  const examCode = location.state.subjid

  console.log(srn)
  console.log(examCode)
  const { subjectcode } = useParams();
  const [testData, setTestData] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchQuestions(subjectcode);
      console.log('Fetched questions:', data);
      setTestData(data);
    };

    loadData();
  }, [subjectcode]);

  const optionLetterMap = ['A', 'B', 'C', 'D'];

  const handleOptionSelect = (questionId, optionIndex) => {
    const selectedOption = optionLetterMap[optionIndex];
    console.log(`Selected option for question ${questionId}:`, selectedOption);
    setAnswers(prev => ({
      ...prev,
      [questionId]: selectedOption
    }));
  };

  const handleSubmit = () => {
    navigate('/teacherhome', { state: { srn: srn } })
  }

  if (!testData) return <div>Loading...</div>;

  return (
    <div style={{
      background: 'linear-gradient(135deg, #09203F 0%, #537895 100%)',
      minHeight: '100vh',
      fontFamily: 'Calibri, sans-serif',
      color: '#ffffff',
      padding: '2rem 0'
    }}>
      <div className="container">
        <h1 className="text-center mb-2" style={{ fontSize: '3rem', fontWeight: 'bold' }}>
          {subjectcode}
        </h1>

        {testData.map((question, index) => (
          <div key={question.QuestionID} className="mb-5">
            <h3 className="mb-4">{question.QuestionID}. {question.Question}</h3>
            <div className="row">
              {[question.Option1, question.Option2, question.Option3, question.Option4].map((option, optionIndex) => (
                <div key={optionIndex} className="col-md-6 mb-3">
                  <div className="option-box">
                    <input
                      type="radio"
                      id={`q${question.QuestionID}o${optionIndex}`}
                      name={`question${question.QuestionID}`}
                      value={option}
                      checked={answers[question.QuestionID] === optionLetterMap[optionIndex]}
                      onChange={() => handleOptionSelect(question.QuestionID, optionIndex)}
                      className="me-2"
                    />
                    <label htmlFor={`q${question.QuestionID}o${optionIndex}`}>
                      {option}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="text-center mt-5">
          <button className="btn btn-primary btn-lg" onClick={handleSubmit}>
            Go back to home page 
          </button>
        </div>
      </div>

      <style>
        {`
          .option-box {
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            padding: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          .option-box:hover {
            background-color: rgba(255, 255, 255, 0.2);
          }
          .option-box.selected {
            background-color: rgba(74, 144, 226, 0.6);
            outline: 2px solid #4a90e2;
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

export default Exam;