"use client";

import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

export default function LeaderboardPage() {
  const [examCode, setExamCode] = useState('');
  const [students, setStudents] = useState([]);
  const [averageMarks, setAverageMarks] = useState(0); // Store the average marks
  const [showDetails, setShowDetails] = useState(false);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Fetch the leaderboard data and average marks on exam selection
 const handleExamSelect = async () => {
  try {
    const response = await axios.get(`http://localhost:8081/leaderboard`, {
      params: { examCode }
    });
    setStudents(response.data.leaderboard);
    setAverageMarks(response.data.averageMarks);  // Set average marks from response
    setShowDetails(true);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    alert("Failed to load leaderboard data");
  }
};


  // Update the chart whenever students or details are shown
  useEffect(() => {
    if (showDetails) {
      const ctx = chartRef.current.getContext('2d');
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const distribution = getScoreDistribution();
      
      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: distribution.map(d => `Score: ${d.score}`), // Display scores as labels
          datasets: [{
            label: 'Number of Students',
            data: distribution.map(d => d.count),
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            borderColor: 'rgba(255, 255, 255, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: { beginAtZero: true, ticks: { color: 'white' } },
            x: { ticks: { color: 'white' } }
          },
          plugins: {
            legend: { labels: { color: 'white' } }
          }
        }
      });
    }
  }, [students, showDetails]);

  // Calculate the score distribution
  const getScoreDistribution = () => {
    const distribution = Array(5).fill(0);
    students.forEach(student => {
      const scoreIndex = Math.min(4, Math.max(0, student.marks - 1));
      distribution[scoreIndex]++;
    });
    return distribution.map((count, index) => ({ score: index + 1, count }));
  };

  return (
    <div className="min-h-screen p-4 text-white" style={{ background: 'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)' }}>
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-4">Exam Leaderboard</h1>
        
        <div className="mb-4 flex">
          <input
            type="text"
            placeholder="Enter Exam Code"
            value={examCode}
            onChange={(e) => setExamCode(e.target.value)}
            className="mr-2 px-3 py-2 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button onClick={handleExamSelect} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Select Exam
          </button>
        </div>

        {showDetails && (
          <>
            <div className="mb-4 fade-in bg-white/10 rounded-lg p-4">
              <h4 className="text-xl font-semibold mb-2">Leaderboard</h4>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left p-2">Position</th>
                      <th className="text-left p-2">SRN</th>
                      <th className="text-left p-2">Marks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, index) => (
                      <tr key={student.SRN} className="border-t border-white/20">
                        <td className="p-2">{index + 1}</td>
                        <td className="p-2">{student.SRN}</td>
                        <td className="p-2">{student.marks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mb-4 fade-in bg-white/10 rounded-lg p-4">
              <h4 className="text-xl font-semibold mb-2">Score Distribution</h4>
              <canvas ref={chartRef} className="w-full h-[300px]"></canvas>
            </div>

            <div className="fade-in">
              <p className="text-lg">Average Score: {averageMarks}</p>
              <p className="text-lg">Number of Students: {students.length}</p>
            </div>

          </>
        )}
      </div>
    </div>
  );
}
