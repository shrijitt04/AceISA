const express = require('express')
const cors = require('cors')
const mysql2 = require('mysql2')
const nodemailer = require('nodemailer')

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

app.post('/marks', (req, res) => {
    const sql = "INSERT INTO marks (`SubjID`, `SRN`, `marks`) VALUES (?)";
    const values = [
        req.body.examCode,
        req.body.srn,
        req.body.correct_answers
    ];

    db.query(sql, [values], (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Message: "Error" });
        }
        res.json({ Message: "Marks inserted successfully!" });
    });
});

app.post('/check_marks',(req,res)=>{

    const sql = "SELECT * FROM marks where SubjID = (?) and SRN = (?)"
    const values = [
        SubjID = req.body.examCode,
        SRN = req.body.srn
    ]
    db.query(sql,values,(err,result)=>{
        if(err) throw err
        else{
            if(result.length>0){
                return res.json({Given: true})
            }
            else{
                return res.json({Given : false})
            }
        }
    });
});

app.post('/email', (req, res) => {
  const { srn, score, totalQuestions, examCode } = req.body;
  db.query(
    `SELECT name, email FROM students WHERE srn = ?`,
    [srn],
    (emailError, emailResults) => {
      if (emailError) {
        console.error('Error fetching email:', emailError);
        return res.status(500).send({ message: 'Failed to fetch email', error: emailError });
      }

      if (!emailResults || emailResults.length === 0) {
        return res.status(404).send({ message: 'No email found for this SRN' });
      }
      const name = emailResults[0].name
      const studentEmail = emailResults[0].email; 
      db.query(
        `SELECT q.Question, d.detailed_answer 
         FROM mcqs q
         JOIN detailed_answers d 
         ON q.QuestionID = d.QuestionID AND q.SubjID = d.SubjID
         WHERE q.SubjID = ?`,
        [examCode],
        (error, results) => {
          if (error) {
            console.error('Error fetching questions and answers:', error);
            return res.status(500).send({ message: 'Failed to fetch questions and answers', error });
          }

          console.log(results);
          if (!results || results.length === 0) {
            return res.status(404).send({ message: 'No questions or answers found for this exam' });
          }

          let emailContent = `Dear ${name},\n\nYou scored ${score} out of ${totalQuestions} in your ${examCode} test.\n\nHere are the exam questions and detailed answers:\n\n Absolutely disgrace!!! you gay man \n\n`;
          results.forEach((row, index) => {
            emailContent += `Q${index + 1}: ${row.Question}\nAnswer: ${row.detailed_answer}\n\n`;
          });
          emailContent += `Thank you for participating!\n\nBest Regards,\nAceISA Team`;

          const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: 'aceisa.pesu@gmail.com', 
              pass: 'nykm iuog xdcs dlmv' 
            },
          });

          const mailOptions = {
            from: 'aceisa.pesu@gmail.com', 
            to: studentEmail, 
            subject: 'Test Results and Answers',
            text: emailContent,
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error('Error sending email:', error);
              return res.status(500).send({ message: 'Failed to send email', error });
            } else {
              console.log('Email sent successfully:', info.response);
              return res.status(200).send({ message: 'Email sent successfully' });
            }
          });
        }
      );
    }
  );
});
app.listen(8081, () => {
  console.log("Server is running on port 8081");
});
