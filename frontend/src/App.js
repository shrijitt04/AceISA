// import logo from './logo.svg';
import './App.css';
import './Components/Home_page';
import Home from './Components/Home_page';
// import Layout from './Components/Layout';
import Login from './Components/Login';
import Signup from './Components/SignUp';
import Student from './Components/Student_page';
import Exam from './Components/Exam_page';
import ThankYouPage from './Components/Thankyou';
import TeacherHomePage from './Components/Teacherhome';
import TeacherExamPage from './Components/TeacherExamPage';
// import Staff from './Components/Staff';
import StudentDetailsPage from './Components/Student_proile';
import ExamCreationPage from './Components/Teacherexamcreation';
import LeaderboardPage from './Components/Leaderboard';
import {BrowserRouter, Routes, Route} from 'react-router-dom';



function App() {
  return (
    <BrowserRouter>
  
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/student' element={<Student />}></Route>
        {/* <Route path='/staff' element={<Staff />}> </Route> */}
        <Route path="/exam/:subjectcode" element={<Exam />} />
        <Route path='/thankyou' element={<ThankYouPage />} />
        <Route path='/teacherhome' element={<TeacherHomePage />} />
        <Route path='/teacherexampage/:subjectcode' element={<TeacherExamPage />} />
        <Route path='/createnewexam' element={<ExamCreationPage />} />
        <Route path='/studentprofile' element={<StudentDetailsPage />}/>
        <Route path='/leaderboard' element={<LeaderboardPage />} />

      </Routes>
     
    </BrowserRouter>
  );
}

export default App;
