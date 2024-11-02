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
import ExamCreationPage from './Components/ExamCreation';
import {BrowserRouter, Routes, Route} from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
  
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/student' element={<Student />}></Route>
        {/* <Route path='/staff' element={<Staff />}> </Route> */}
        <Route path="/exam/:subjectcode" element={<Exam />} />
        <Route path='/thankyou' element={<ThankYouPage />} />
        <Route path='/teacherhome' element={<TeacherHomePage />} />
        <Route path='/teacherexampage/:subjectcode' element={<TeacherExamPage />} />
        <Route path='/createnewexam' element={<ExamCreationPage />} />

      </Routes>
     
    </BrowserRouter>
  );
}

export default App;
