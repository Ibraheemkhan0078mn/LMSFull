import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import bgcImage from '../assets/bgcImage6.jpeg'
import LeftPanel from '../components/LeftPanel.jsx'
import CoursesCardsContainer from '../components/CoursesCardsContainer.jsx'
import MyContext from '../context api/MyContext'
import VideoAndInfo from '../components/VideoAndInfo.jsx'
import LectureList from '../components/LectureList.jsx'
import LectureCreationForm from '../components/LectureCreationForm.jsx'
import { useNavigate } from 'react-router-dom'
import QuestionCreationForm from '../components/QuestionCreationForm.jsx'











const TeacherCoursePage = () => {




  let { setleftPanelVisibility,
    lectureCreationFormVisibility,
    currentClickedCourseData,
    setCurrentRenderedPage,
    questionCreationFormVisibility,
  setMainRole } = useContext(MyContext)

  let navigate = useNavigate()






  // set the current rendered page name and according which we render or hide some element
  useEffect(() => {
    setMainRole("teacher")
    setCurrentRenderedPage("TeacherCoursePage")
  }, [])












  useEffect(() => {
    if (!currentClickedCourseData) {
      navigate("/TeacherDashboard")
    }
  }, [currentClickedCourseData])























  return (
    // main div of Teacher course creation component
    <div className="min-h-[100vh] w-full  ">






      {/* Navbar component of Teacher course creation*/}
      <Navbar mode={"TeacherCourseCreation"} />











      {/* bgc image div of Teacher course creation*/}
      <img
        className='h-full w-full fixed top-0 left-0 z-[-999] object-cover '
        src={bgcImage} alt="" />









      {/* contains the vidio, name and decription as well as also the lecture list of selected course */}
      <div className="min-h-[75vh] w-full overflow-x-hidden 
            block py-5   sm:flex  sm:py-28 sm:mt-10">



        <div className="h-max flex flex-1 flex-col  ">
          <VideoAndInfo />
        </div>


        <div className="min-h-[75vh] mt-10
        w-full    sm:w-[25%] ">
          <LectureList mode={"TeacherCoursePage"} />
        </div>


      </div>














      {/* This icon control the left side filter panel visibility
      <button
        onClick={() => { setleftPanelVisibility("visible") }}
        className='custom_glassy_effect          h-16 w-20 rounded-3xl fixed top-[20%] left-[-40px] flex items-center justify-center  '>
        <i className="ri-arrow-right-wide-line            ml-3 text-[40px] fixed  right-0 " ></i>
      </button>
 */}














      {/* The form which show when the new lecture button is clicked in teacher course page */}
      <div
        // style={lectureCreationFormVisibility == "hide" ? { visibility: "hidden" } : { visibility: "visible" }}
        className="h-max w-full fixed top-[-40px] left-0 flex justify-center   items-center   "
      >

        {
          lectureCreationFormVisibility == "hide"
            ?


            null



            :


            <LectureCreationForm />
        }

        {/* */}
      </div>











    </div>
  )
}

export default TeacherCoursePage