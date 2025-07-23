# AceISA - Online Exam Management Portal

AceISA is a full-stack online examination system built to provide a smooth and secure assessment experience for both students and educators. Designed as part of a DBMS mini-project, AceISA features exam creation, submission, evaluation, performance analytics, and leaderboard generation in a centralized, web-based platform.

---

## Features

### Students:
- View and attempt subject-specific MCQ exams.
- Instant result computation after submission.
- Receive email with score, questions, and detailed explanations.
- View performance analytics and leaderboards.
- Access a personal profile page and exam history.

### Staff:
- Create new exams with dynamic question input.
- View, manage, and delete existing exams.
- Generate leaderboards for student performance.
- Track detailed student answers and statistics.

### System:
- Unique student and staff ID (SRN/SID) generation.
- Secure session control to prevent test resubmission.
- Backend triggers, stored procedures, and functions for data integrity.

---

## 💻 Tech Stack

| Layer       | Technology            |
|-------------|------------------------|
| Frontend    | ReactJS                |
| Backend     | Node.js with ExpressJS |
| Database    | MySQL                  |
| Emailing    | Nodemailer (or similar) |
| Styling     | CSS / Bootstrap (optional) |
| Charts      | Chart.js / Recharts    |

---

## 🗃️ Database Tables

| Table Name         | Description                                |
|--------------------|--------------------------------------------|
| `students`         | Student info and login credentials         |
| `staff`            | Teacher/staff details                      |
| `courses`          | Exam/course metadata                       |
| `mcqs`             | Exam questions, options, and answers       |
| `marks`            | Marks obtained by students per exam        |
| `detailed_answers` | Explanations linked to each question       |
| `student_srns`     | Unique SRNs assigned to students           |

Additional:
- Stored procedures and triggers to automate leaderboard generation and secure operations.

---

