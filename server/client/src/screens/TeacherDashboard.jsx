import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import bgcImage from '../assets/bgcImage6.jpeg'
import LeftPanel from '../components/LeftPanel.jsx'
import CoursesCardsContainer from '../components/CoursesCardsContainer.jsx'
import MyContext from '../context api/MyContext'
import CourseCreationForm from '../components/CourseCreationForm.jsx'
import axios from 'axios'












const TeacherDashboard = () => {





    let { setleftPanelVisibility,
        courseCreationFormVisibility,
        setCourseCardDataArray,
        currentClickedCourseData,
        setCurrentRenderedPage,
        setMainRole
    } = useContext(MyContext)









    // set the current rendered page name and according which we render or hide some element
    useEffect(() => {
        setMainRole("teacher")
        setCurrentRenderedPage("TeacherDashboard")
    }, [])




















    // This useeffect fetch the only data which is related to current logged in teacher from backend and store it in the usestate setCourseCardDataArray which is present in context api

    useEffect(() => {
        try {
            async function courseCardDataFetch() {

                let response = await axios.get(import.meta.env.VITE_backend_base_Url + "/api/v1/TeacherRoutes/getTeacherRelatedCourses", { withCredentials: true })
                if (response.data) {
                    if (response.data.status == "success") {
                        setCourseCardDataArray(response.data.teacherRelatedCourses)
                    } else if (response.data.status == "empty") {
                        setCourseCardDataArray([])
                        alert("No courses are created yet")
                    }

                } else {
                    console.log("No course is found for this Teacher")
                }
            }


            courseCardDataFetch()



        } catch (error) {
            console.log("Error from trycatch of getTeacherRelatedCourse data feching")
        }
    }, [])
























    return (
        // Main Div of Teacher Profile of LMS
        <div className="min-h-[100vh] w-full  ">







            {/* Navbar component of Teacher profile*/}
            <Navbar mode={"TeacherDashboard"} />









            {/* bgc image div of Teacher Profile*/}
            <img
                className='h-full w-full fixed top-0 left-0 z-[-999] object-cover '
                src={bgcImage} alt="" />














            {/* This Div contains the left side filter box and also the right side courses cards container */}
            <div className="min-h-[100vh] w-full overflow-x-hidden flex pt-32 ">
                <LeftPanel mode={"TeacherDashboard"} />
                <CoursesCardsContainer mode={"TeacherDashboard"} heading={"Teacher Dashboard"} />
            </div>







            {/* This icon control the left side filter panel visibility */}
            <button
                onClick={() => { setleftPanelVisibility("visible") }}
                className='custom_glassy_effect          h-16 w-20 rounded-3xl fixed top-[20%] left-[-40px] flex items-center justify-center  '>
                <i className="ri-arrow-right-wide-line            ml-3 text-[40px] fixed  right-0 " ></i>
            </button>













            {/* The course creation form which appears on the screen as a popup when i click on create course button */}
            <div
                style={courseCreationFormVisibility == "hide" ? { display: "none" } : { display: "flex" }}
                className="min-h-[20vh] w-full absolute top-0 left-0 flex justify-center items-center   ">
                <CourseCreationForm />

            </div>














        </div>

    )
}

export default TeacherDashboard