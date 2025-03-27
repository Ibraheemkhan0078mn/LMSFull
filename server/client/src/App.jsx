import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './screens/LandingPage.jsx'
import TeacherProfile from './screens/TeacherProfile.jsx'
import TeacherDashboard from './screens/TeacherDashboard.jsx'
import TeacherRegistration from './screens/TeacherRegistration.jsx'
import TeacherLogin from './screens/TeacherLogin.jsx'
import StudentRegistration from './screens/StudentRegistration.jsx'
import StudentLogin from './screens/StudentLogin.jsx'
import TeacherCoursePage from './screens/TeacherCoursePage.jsx'
import StudentProfile from './screens/StudentProfile.jsx'
import StudentDashbaord from './screens/StudentDashbaord.jsx'
import StudentCoursePage from './screens/StudentCoursePage.jsx'
import TeacherQuizPage from './screens/TeacherQuizPage.jsx'
import StudentCertificatePage from './screens/StudentCertificatePage.jsx'
import StudentQuizPage from './screens/StudentQuizPage.jsx'
import AdminRegistration from './screens/AdminRegistration.jsx'
import AdminLogin from './screens/AdminLogin.jsx'
import AdminHome from './screens/AdminHome.jsx'
import AdminSideTeachers from './screens/AdminSideTeachers.jsx'
import AdminSideStudents from './screens/AdminSideStudents.jsx'
import AdminAbout from './screens/AdminAbout.jsx'











const App = () => {
  return (
    <>


      <Routes>




        <Route path='/'  element={<LandingPage/>}     />


        <Route path='/TeacherRegistration' element={<TeacherRegistration/>}  />
        <Route path='/TeacherLogin' element={<TeacherLogin/>}    />
        <Route path='/TeacherProfile' element={<TeacherProfile/>}  />
        <Route path='/TeacherDashboard' element={<TeacherDashboard/>}  />
        <Route path='/TeacherCoursePage' element={<TeacherCoursePage/> }  />
        <Route path='/TeacherQuizPage' element={<TeacherQuizPage/>}    />



        <Route path='/StudentRegistration' element={<StudentRegistration/>}   />
        <Route path='/StudentLogin'   element={<StudentLogin/>}    />
        <Route path='/StudentProfile' element={<StudentProfile/>}    />
        <Route path='/StudentDashboard' element={<StudentDashbaord/>}     />
        <Route path='/StudentCoursePage' element={<StudentCoursePage/>}    />
        <Route path="/StudentCertificate" element={<StudentCertificatePage/>}    />
        <Route path='/StudentQuizPage' element={<StudentQuizPage/>}  />





        <Route path='/AdminRegistration' element={<AdminRegistration/>}   />
        <Route path='/AdminLogin' element={<AdminLogin/>}  />
        <Route path='/AdminHome' element={<AdminHome/>}  />
        <Route path='/AdminSideTeachers' element={<AdminSideTeachers/>} />
        <Route path='/AdminSideStudents' element={<AdminSideStudents/>}  />
        <Route path='/AdminAbout' element={<AdminAbout/>}  />
        

        

      </Routes>

    
    </>
  )
}

export default App