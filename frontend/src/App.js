// import logo from './logo.svg';
import './App.css';
import './Components/Home_page';
import Home from './Components/Home_page';
// import Layout from './Components/Layout';
import Login from './Components/Login';
import Signup from './Components/SignUp';
import Student from './Components/Student_page';
import Exam from './Components/Exam_page';
import {BrowserRouter, Routes, Route} from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
  
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/student' element={<Student />}></Route>
        <Route path="/exam/:subjectcode" element={<Exam />} />

      </Routes>
     
    </BrowserRouter>
  );
}

export default App;
