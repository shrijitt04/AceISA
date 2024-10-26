const express = require('express')
const cors = require('cors')
const mysql2 = require('mysql2')

const app = express()
app.use(cors())
app.use(express.json())

const db = mysql2.createConnection({
    host:"localhost",
    user:"root",
    password:"shrijit123",
    database:'aceisa'
})
db.connect((err) => {
    if (err) {
        console.error("Database connection failed: ", err.stack);
        return;
    }
    console.log("Connected to the database as ID " + db.threadId);
});


app.post('/signup',(req,res)=>{

        console.log(req);
        const sql = "Insert into students (`srn`,`name`,`email`,`Phone_num`,`password`) VALUES (?)";
        const values = [
            req.body.srn,
            req.body.name,
            req.body.email,
            req.body.number,
            req.body.password,
            // req.body.userType
        ]
        db.query(sql,[values],(err,result)=>{
            if(err)
                console.error(err)
                return res.json({Message: "Error "});
            return res.json(result);
        })
        console.log("After values")
    
})

app.post('/login', (req, res) => {
    console.log(req.body);

    let sql;
    if (req.body.userType === "student") {
        sql = "SELECT * FROM students WHERE `srn` = ? AND `password` = ?";
    } else if (req.body.userType === "staff") {
        sql = "SELECT * FROM staff WHERE `SID` = ? AND `password` = ?";
    } else {
        return res.json({ Message: "Please select student/staff" });
    }

    db.query(sql, [req.body.srn, req.body.password], (err, result) => {
        if (err) return res.json({ Message: "Internal Server Error" });
        
        if (result.length > 0) {
            return res.json({ Login: true });
        } else {
            return res.json({ Login: false });
        }
    });
});


app.get('/exams', (req, res) => {
    const sql = "SELECT * FROM courses"; // Query to fetch all exams
    db.query(sql, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch exams' });
      }
      return res.json(result); // Send the fetched exams as JSON
    });
  });
  
app.get('/questions', (req, res) => {
    const subjectcode = req.query.subjID; // Match the query parameter name
    const sql = "SELECT QuestionID, Question, Option1, Option2, Option3, Option4, Answer FROM mcqs WHERE SubjID = ?"; // Adjust your column names as needed
    db.query(sql, [subjectcode], (err, result) => {
        if (err) {
            console.error("Internal Server Error:", err);
            return res.status(500).json({ error: 'Internal Server Error' }); // Send an error response
        }
        if (result.length === 0) {
            console.log("No questions found");
            return res.status(404).json({ message: "No questions found" }); // Return a 404 if no questions
        }
        console.log("Fetched questions:", result); // Log the result for debugging
        res.json(result); // Send the fetched questions as JSON
    });
});


app.listen(8081,()=>{
    console.log("Connected")
})
