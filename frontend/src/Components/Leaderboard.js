"use client"

import React, { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer } from "@/components/ui/chart"

// Mock data - replace with actual API calls in a real application
const examData = {
  "EXAM001": { code: "EXAM001", subject: "Mathematics", students: [
    { srn: "SRN001", name: "John Doe", score: 4 },
    { srn: "SRN002", name: "Jane Smith", score: 5 },
    { srn: "SRN003", name: "Alice Johnson", score: 3 },
    { srn: "SRN004", name: "Bob Brown", score: 2 },
    { srn: "SRN005", name: "Charlie Davis", score: 5 },
  ]},
  "EXAM002": { code: "EXAM002", subject: "Physics", students: [
    { srn: "SRN001", name: "John Doe", score: 3 },
    { srn: "SRN002", name: "Jane Smith", score: 4 },
    { srn: "SRN003", name: "Alice Johnson", score: 5 },
    { srn: "SRN004", name: "Bob Brown", score: 2 },
    { srn: "SRN005", name: "Charlie Davis", score: 4 },
  ]},
}

export default function LeaderboardPage() {
  const [examCode, setExamCode] = useState("")
  const [selectedExam, setSelectedExam] = useState(null)
  const [showDetails, setShowDetails] = useState(false)
  const [sortOrder, setSortOrder] = useState("desc")
  const [sortedStudents, setSortedStudents] = useState([])

  useEffect(() => {
    if (selectedExam) {
      const sorted = [...selectedExam.students].sort((a, b) => 
        sortOrder === "desc" ? b.score - a.score : a.score - b.score
      )
      setSortedStudents(sorted)
    }
  }, [selectedExam, sortOrder])

  const handleExamSelect = () => {
    const exam = examData[examCode]
    if (exam) {
      setSelectedExam(exam)
      setShowDetails(false)
      setTimeout(() => setShowDetails(true), 100)
    } else {
      alert("Exam not found")
    }
  }

  const getScoreDistribution = () => {
    const distribution = [0, 0, 0, 0, 0]
    selectedExam.students.forEach(student => {
      distribution[student.score - 1]++
    })
    return distribution.map((count, index) => ({ score: index + 1, count }))
  }

  const getAverage = () => {
    const sum = selectedExam.students.reduce((acc, student) => acc + student.score, 0)
    return (sum / selectedExam.students.length).toFixed(2)
  }

  return (
    <div className="min-h-screen p-4 text-white" style={{
      background: 'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)',
    }}>
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-4">Exam Leaderboard</h1>
        
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Enter Exam Code"
            value={examCode}
            onChange={(e) => setExamCode(e.target.value)}
            className="mr-2 bg-white text-black"
          />
          <Button onClick={handleExamSelect} variant="secondary">Select Exam</Button>
        </div>

        {selectedExam && showDetails && (
          <>
            <div className="mb-4 fade-in-left">
              <h2 className="text-2xl font-semibold">Exam Code: {selectedExam.code}</h2>
              <h3 className="text-xl">Subject: {selectedExam.subject}</h3>
            </div>

            <Card className="mb-4 fade-in bg-white/10 text-white">
              <CardHeader>
                <CardTitle>Leaderboard</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-white">Position</TableHead>
                      <TableHead className="text-white">SRN</TableHead>
                      <TableHead className="text-white">Name</TableHead>
                      <TableHead className="text-white">
                        Score
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
                          className="text-white"
                        >
                          {sortOrder === "desc" ? "▼" : "▲"}
                        </Button>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedStudents.map((student, index) => (
                      <TableRow key={student.srn}>
                        <TableCell className="text-white">{index + 1}</TableCell>
                        <TableCell className="text-white">{student.srn}</TableCell>
                        <TableCell className="text-white">{student.name}</TableCell>
                        <TableCell className="text-white">{student.score}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="mb-4 fade-in bg-white/10 text-white">
              <CardHeader>
                <CardTitle>Score Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    count: {
                      label: "Number of Students",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={getScoreDistribution()}>
                      <XAxis dataKey="score" stroke="#ffffff" />
                      <YAxis stroke="#ffffff" />
                      <Bar dataKey="count" fill="rgba(255, 255, 255, 0.7)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <div className="fade-in">
              <p className="text-lg">Average Score: {getAverage()}</p>
              <p className="text-lg">Number of Students: {selectedExam.students.length}</p>
            </div>
          </>
        )}

        <style jsx>{`
          .fade-in-left {
            animation: fadeInLeft 0.5s ease-out;
          }
          .fade-in {
            animation: fadeIn 0.5s ease-out;
          }
          @keyframes fadeInLeft {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}</style>
      </div>
    </div>
  )
}