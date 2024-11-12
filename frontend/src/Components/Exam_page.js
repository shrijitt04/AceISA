import React, { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const fetchQuestions = async (subjectcode) => {
  try {
    const response = await fetch(`http://localhost:8081/questions?subjID=${subjectcode}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching questions:', error)
    return []
  }
}

export default function Exam() {
  const location = useLocation()
  const navigate = useNavigate()
  const srn = location.state.srn
  const examCode = location.state.subjid
  const { subjectcode } = useParams()
  const [testData, setTestData] = useState(null)
  const [answers, setAnswers] = useState({})

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchQuestions(subjectcode)
      console.log('Fetched questions:', data)
      setTestData(data)
    }

    loadData()
  }, [subjectcode])

  const optionLetterMap = ['A', 'B', 'C', 'D']

  const handleOptionSelect = (questionId, optionIndex) => {
    const selectedOption = optionLetterMap[optionIndex]
    console.log(`Selected option for question ${questionId}:`, selectedOption)
    setAnswers(prev => ({
      ...prev,
      [questionId]: selectedOption
    }))
  }

  const handleSubmit = () => {
    console.log("Test submitted with answers:", answers)
    const totalQuestions = testData.length
    const answeredQuestions = Object.keys(answers).length
    let correct_answers = 0
  
    if (answeredQuestions === totalQuestions) {
      for (let i = 0; i < testData.length; i++) {
        const questionId = testData[i].QuestionID
        const correctAnswer = testData[i].Answer
        
        if (answers[questionId] === correctAnswer) {
          correct_answers++
        }
      }
      
      console.log("Correct answers:", correct_answers)
      
      const values = {
        examCode: examCode,
        srn: srn,
        correct_answers: correct_answers
      }
      
      try {
        axios.post('http://localhost:8081/marks', values)
        alert(`Test submitted successfully!`)
        navigate('/Thankyou', { state : { srn: values.srn, correct_answers : values.correct_answers, totalQuestions: testData.length, examCode: values.examCode }})
      } catch (err) {
        console.log(err)
      }
    } else {
      alert(`Please answer all questions. You have answered ${answeredQuestions} out of ${totalQuestions} questions.`)
    }
  }

  if (!testData) return <div>Loading...</div>

  return (
    <div style={{
      background: 'linear-gradient(135deg, #09203F 0%, #537895 100%)',
      minHeight: '100vh',
      fontFamily: 'Calibri, sans-serif',
      color: '#ffffff',
      padding: '2rem 0'
    }}>
      <div className="container">
        <h1 className="text-center mb-5" style={{ fontSize: '3rem', fontWeight: 'bold' }}>
          {subjectcode}
        </h1>

        {testData.map((question, index) => (
          <div key={question.QuestionID} className="mb-5">
            <h3 className="mb-4">{question.QuestionID}. {question.Question}</h3>
            <div className="row">
              {[question.Option1, question.Option2, question.Option3, question.Option4].map((option, optionIndex) => (
                <div key={optionIndex} className="col-md-6 mb-3">
                  <div 
                    className={`option-box ${answers[question.QuestionID] === optionLetterMap[optionIndex] ? 'selected' : ''}`}
                    onClick={() => handleOptionSelect(question.QuestionID, optionIndex)}
                  >
                    <input
                      type="radio"
                      id={`q${question.QuestionID}o${optionIndex}`}
                      name={`question${question.QuestionID}`}
                      value={option}
                      checked={answers[question.QuestionID] === optionLetterMap[optionIndex]}
                      onChange={() => {}}
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
            Submit Test
          </button>
        </div>
      </div>

      <style jsx>{`
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
      `}</style>
    </div>
  )
}