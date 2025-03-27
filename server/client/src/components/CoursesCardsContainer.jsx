import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MyContext from '../context api/MyContext'
import axios from 'axios'












const CoursesCardsContainer = ({ mode, heading }) => {







  // let emptyArray = new Array(10).fill(0)

  let {
    setCourseCreationFormVisibility,
    courseCardDataArray,
    setCurrentClickedCourseData,
    setLectureData,
    currentRenderedPage,
    setSigninPanelVisibility,
    setleftPanelVisibility,
    setPreviousRenderedPage } = useContext(MyContext)

  let navigate = useNavigate()


























  // when card of course is clicked in teacher dashboard then it set some import data like clicked course data and its first lecture etc in the usestate to display on TeacherCoursePage and then navigate to TeacherCoursepage
  function handleCourseCardClick(courseData) {


    // to hide left side animated panel
    setleftPanelVisibility("hide")




    // to save the currentRenderedPage in variabe and whenever i navigate to another next page then i know and i detect from this state that from which state the user is comming means from TeacherSide ro form student side
    if (currentRenderedPage == "TeacherDashboard") {
      setPreviousRenderedPage("TeacherDashboard")
    }








    if (courseData) {
      // console.log(courseData)

      setCurrentClickedCourseData(courseData)

      if (courseData.lectures.length != 0) {
        setLectureData(courseData.lectures[0])
      } else {
        setLectureData('')
      }


      if (currentRenderedPage == "StudentProfile" || currentRenderedPage == "StudentDashboard") {
        navigate("/StudentCoursePage")
      } else if (currentRenderedPage == "TeacherProfile" || currentRenderedPage == "TeacherDashboard") {
        navigate("/TeacherCoursePage")
      } else if (currentRenderedPage == "LandingPage") {
        alert("First Register or Login yourself to access the Courses")
        setSigninPanelVisibility("visible")
      }



    }
  }






















  function handleCreateCourseBtnClick() {
    setCourseCreationFormVisibility("visible")
    // navigate("/TeacherCourseCreation")
  }



































  return (
    // Main div of Course card container
    <div className=" custom_glassy_high_blur           min-h-[70vh] w-full flex  flex-col pt-3
    gap-x-2 gap-y-3 p-0 items-start           sm:gap-5 sm:p-6 sm:items-center   ">











      {/* heading and also the button to create the new course */}

      {
        currentRenderedPage == "LandingPage"
          ?
          null :



          <div className="h-max w-full  flex justify-center items-center  relative 
          mb-10 pt-0   sm:mb-10">






            {/* Heading of Course Cards Container */}
            <h1 className='custom_glassy_effect_low        text-blue-950 font-bold p-3 rounded-lg     
            text-lg mt-10 my-5  sm:text-xl sm:mt-3 sm:my-0 '>
              {heading}
            </h1>









            {/* in this place , we check that the prop with name "mode" is equal to "Teacher Dashboard" value.  */}
            {currentRenderedPage == "TeacherDashboard"
              ?
              // button to create the course
              <div
                onClick={handleCreateCourseBtnClick}
                className=" custom_glassy_greenish_effect        rounded-lg absolute top-3 right-0   text-md flex items-center justify-center  cursor-pointer select-none
                h-8 w-max px-2 mr-2        sm:h-10 sm:w-max sm:px-4 sm:mr-0
                ">
                Create Course
              </div>


              :




              null



            }


          </div>






      }

























      {/* cards are rendered according to length and data of array */}
      <div className="h-max w-full flex flex-wrap   
        justify-center p-5 pt-0 gap-3     sm:pt-5 sm:gap-5 sm:justify-center sm:p-0">



        {courseCardDataArray ?

          courseCardDataArray.length == 0
            ?
            <div>No courses are present yet</div>
            :

            courseCardDataArray.map((eachCourse, index) => {
              return (
                <div key={index}
                  onClick={() => { handleCourseCardClick(eachCourse) }}
                  className="custom_glassy_effect_low        p-2 rounded-md pb-5 flex flex-col items-center 
                     h-max w-max     custom500:w-max custom500:h-max  sm:h-max sm:w-max ">



                  <img
                    src={eachCourse.tumbnailUrl}
                    className='  bg-zinc-500 rounded-md mb-2
                  h-max w-max    custom500:h-40  sm:h-40 sm:w-full'
                    alt="" />


                  <div className="flex gap-5">
                    <img src={eachCourse.createrImgUrl} 
                    className='w-10 h-10 rounded-full'
                    alt="" />
                    <h2 className=' text-sm    sm:text-sm text-zinc-900 '>{eachCourse.name}</h2>
                  </div>

                </div>)
            })



          :
          <div>No course are present yet{mode}</div>

        }






      </div>













    </div>
  )
}











export default CoursesCardsContainer