import React from 'react'
import MyContext from './MyContext'
import { useState } from 'react'















const ContextProvider = ({ children }) => {

  // this store the page name which is currently rendered on the screen and according to which we display or hide some elements etc
  const [currentRenderedPage, setCurrentRenderedPage] = useState(null)

  // we can store the main role such as admin, teacher or student in it to make the logout reuasability effectice
  const [mainRole, setMainRole] = useState(null)

  // The small panel which appears when we click the signin button in landing page visibility is handled by this usestate
  let [signinPanelVisibility, setSigninPanelVisibility] = useState("hide")

  // For hide and show of sliding panel on left side 
  const [leftPanelVisibility, setleftPanelVisibility] = useState("hide")

  // For form visibility on Teacher Dashboard 
  let [courseCreationFormVisibility, setCourseCreationFormVisibility] = useState("hide")

  // For form visibility on Teacher Course  page
  let [lectureCreationFormVisibility, setLectureCreationFormVisibility] = useState("hide")

  // this control the visibility of question creation page
  let [questionCreationFormVisibility, setQuestionCreationFormVisibility] = useState("hide")

  // when the array courses is fetched from backend then stored in this usestate. with the help of this data,  the courses card are displayed
  let [courseCardDataArray, setCourseCardDataArray] = useState([])

  // when some course card is clicked then it id is stored in this usestate
  let [currentClickedCourseData, setCurrentClickedCourseData] = useState(null)

  // This usestate contains the url to show the video on course pages. in this, when the some course data is fetched from backend then the intro is fitted and then change when we click on some lecture
  let [lectureData, setLectureData] = useState('')

  // contains the data of current logged in student all data
  let [currentStudentData, setCurrentStudentData] = useState(null)

  // this contain the array of id's of lectures which is marked as completed
  let [completedLecturesIdsArray, setCompletedLecturesIdsArray] = useState(["dummyIndex"])

  // mcq question array which contain the question only of currentClickedCourse. i try to make it in component direct and pass its values as a prop because 
  // when we send the usestate value as a prop then it does not auto update when some change occurs in it and do not do its work well (rerendering of associated value) completely for which i use it mainly instead of useref
  let [quizQuestionArray, setQuizQuestionArray] = useState([])

  // this contain the data in form of array of certificate of current loggedin user
  let [certificateData, setCertificateData] = useState([])

  // this contain the name of previous rendered page. i make this because i want dynamical redering of some elements. means for example, new lecture button is appear only when previous page is TeacherDashboard.
  const [previousRenderedPage, setPreviousRenderedPage] = useState("none")

  // used to detect the current navigated page on admin side
  const [currentNavigation, setCurrentNavigation] = useState("home")

  // store the all teacher data
  const [allTeacherdata, setAllTeacherdata] = useState([])

  // store the all Students data
  const [allStudentsdata, setAllStudentsdata] = useState([])

  // store the admin profile data
  let [adminProfileData, setAdminProfileData] = useState(null)

  // store the admin profile data
  let [teacherProfileData, setTeacherProfileData] = useState(null)

    // store the admin profile data
    let [studentProfileData, setStudentProfileData] = useState(null)










  return (
    <MyContext.Provider

      value={{
        currentRenderedPage, setCurrentRenderedPage,
        previousRenderedPage, setPreviousRenderedPage,
        mainRole, setMainRole,


        signinPanelVisibility, setSigninPanelVisibility,
        leftPanelVisibility, setleftPanelVisibility,
        courseCreationFormVisibility, setCourseCreationFormVisibility,
        lectureCreationFormVisibility, setLectureCreationFormVisibility,
        questionCreationFormVisibility, setQuestionCreationFormVisibility,


        courseCardDataArray, setCourseCardDataArray,
        currentClickedCourseData, setCurrentClickedCourseData,
        lectureData, setLectureData,
        currentStudentData, setCurrentStudentData,
        completedLecturesIdsArray, setCompletedLecturesIdsArray,
        quizQuestionArray, setQuizQuestionArray,
        certificateData, setCertificateData,
        currentNavigation, setCurrentNavigation,
        allTeacherdata, setAllTeacherdata,
        allStudentsdata, setAllStudentsdata,

        adminProfileData, setAdminProfileData,
        teacherProfileData, setTeacherProfileData,
        studentProfileData, setStudentProfileData

      }}>




      {children}
    </MyContext.Provider>
  )
}















export default ContextProvider