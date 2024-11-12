"use client";

import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

export default function LeaderboardPage() {
  const [examCode, setExamCode] = useState('');
  const [students, setStudents] = useState([]);
  const [averageMarks, setAverageMarks] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const handleExamSelect = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/leaderboard`, {
        params: { examCode }
      });
      if (response.data.leaderboard && response.data.leaderboard.length > 0) {
        setStudents(response.data.leaderboard);
        setAverageMarks(response.data.averageMarks);
        setShowDetails(true);
      } else {
        setShowDetails(false);
        alert("No data available for the selected exam.");
      }
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      alert(`Failed to load leaderboard data: ${error.message}`);
    }
  };

  useEffect(() => {
    if (showDetails && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const distribution = getScoreDistribution();

      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: distribution.map(d => `Score: ${d.score}`),
          datasets: [{
            label: 'Number of Students',
            data: distribution.map(d => d.count),
            backgroundColor: distribution.map((_, index) => 
              `rgba(${255 - index * 40}, ${150 + index * 20}, ${255}, 0.7)`
            ),
            borderColor: 'rgba(255, 255, 255, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: { 
              beginAtZero: true,
              grid: { color: 'rgba(255, 255, 255, 0.1)' },
              ticks: { color: 'white' }
            },
            x: { 
              grid: { color: 'rgba(255, 255, 255, 0.1)' },
              ticks: { color: 'white' }
            }
          },
          plugins: {
            legend: { 
              labels: { color: 'white', font: { family: 'Calibri' } }
            }
          }
        }
      });
    }
  }, [students, showDetails]);

  const getScoreDistribution = () => {
    const distribution = Array(5).fill(0);
    students.forEach(student => {
      const marks = student.marks ?? 0; // Default to 0 if marks is null or undefined
      const scoreIndex = Math.min(4, Math.max(0, marks - 1));
      distribution[scoreIndex]++;
    });
    return distribution.map((count, index) => ({ score: index + 1, count }));
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #09203F 0%, #537895 100%)',
      minHeight: '100vh',
      fontFamily: 'Calibri, sans-serif',
      color: 'white',
      padding: '2rem',
      position: 'absolute',
      width: '100%',
      top: 0,
      left: 0
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          Exam Leaderboard
        </h1>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <input
            type="text"
            placeholder="Enter Exam Code"
            value={examCode}
            onChange={(e) => setExamCode(e.target.value)}
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              width: '200px'
            }}
          />
          <button 
            onClick={handleExamSelect} 
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              border: 'none',
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontFamily: 'Calibri, sans-serif'
            }}
            onMouseOver={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'}
            onMouseOut={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
          >
            Select Exam
          </button>
        </div>

        {showDetails && (
          <>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '2rem'
            }}>
              <h2 style={{
                fontSize: '1.8rem',
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: '1.5rem'
              }}>
                Leaderboard Results
              </h2>
              <div style={{ overflowX: 'auto' }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  marginBottom: '1rem'
                }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid rgba(255, 255, 255, 0.2)' }}>
                      <th style={{ padding: '1rem', textAlign: 'left', borderRight: '1px solid rgba(255, 255, 255, 0.2)' }}>Position</th>
                      <th style={{ padding: '1rem', textAlign: 'left', borderRight: '1px solid rgba(255, 255, 255, 0.2)' }}>SRN</th>
                      <th style={{ padding: '1rem', textAlign: 'left' }}>Marks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, index) => (
                      <tr 
                        key={student.SRN}
                        style={{
                          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                          background: index % 2 === 0 ? 'rgba(255, 255, 255, 0.05)' : 'transparent'
                        }}
                      >
                        <td style={{ padding: '1rem', borderRight: '1px solid rgba(255, 255, 255, 0.2)' }}>{index + 1}</td>
                        <td style={{ padding: '1rem', borderRight: '1px solid rgba(255, 255, 255, 0.2)' }}>{student.SRN}</td>
                        <td style={{ padding: '1rem' }}>{student.marks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '2rem'
            }}>
              <h2 style={{
                fontSize: '1.8rem',
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: '1.5rem'
              }}>
                Score Distribution
              </h2>
              <canvas ref={chartRef} style={{ width: '100%', height: '300px' }}></canvas>
            </div>

            <div style={{
              textAlign: 'center',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '1.5rem'
            }}>
              <p style={{
                fontSize: '1.2rem',
                fontWeight: 'bold',
                marginBottom: '0.5rem'
              }}>
                Average Score: {averageMarks}
              </p>
              <p style={{ fontSize: '1.2rem' }}>
                Total Students: {students.length}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
