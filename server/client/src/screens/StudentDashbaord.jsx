import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import bgcImage from '../assets/bgcImage6.jpeg'
import LeftPanel from '../components/LeftPanel.jsx'
import CoursesCardsContainer from '../components/CoursesCardsContainer.jsx'
import MyContext from '../context api/MyContext'
import CourseCreationForm from '../components/CourseCreationForm.jsx'
import axios from 'axios'











const StudentDashbaord = () => {





    let { setleftPanelVisibility,
        courseCreationFormVisibility,
        setCourseCardDataArray,
        currentClickedCourseData,
        currentStudentData,
        setCurrentRenderedPage,
        setMainRole
    } = useContext(MyContext)










    // set the current rendered page name and according which we render or hide some element
    useEffect(() => {
        setMainRole("student")
        setCurrentRenderedPage("StudentDashboard")
    }, [])










    useEffect(() => {
        if (currentStudentData) {
            // currentStudentData.purchasedCourses
            setCourseCardDataArray(currentStudentData.purchasedCourses)

        }
    }, [currentStudentData])

































    return (
        // Main Div of Teacher Profile of LMS
        <div className="min-h-[100vh] w-full  ">







            {/* Navbar component of Teacher profile*/}
            <Navbar mode={"StudentDashboard"} />









            {/* bgc image div of Teacher Profile*/}
            <img
                className='h-full w-full fixed top-0 left-0 z-[-999] object-cover '
                src={bgcImage} alt="" />














            {/* This Div contains the left side filter box and also the right side courses cards container */}
            <div className="min-h-[100vh] w-full overflow-x-hidden flex pt-32 ">
                <LeftPanel mode={"StudentDashboard"} />
                <CoursesCardsContainer mode={"StudentDashboard"} heading={"Student Dashboard"} />
            </div>







            {/* This icon control the left side filter panel visibility */}
            <button
                onClick={() => { setleftPanelVisibility("visible") }}
                className='custom_glassy_effect          h-16 w-20 rounded-3xl fixed top-[20%] left-[-40px] flex items-center justify-center  '>
                <i className="ri-arrow-right-wide-line            ml-3 text-[40px] fixed  right-0 " ></i>
            </button>













            {/* The course creation form which appears on the screen as a popup when i click on create course button */}
            <div
                style={courseCreationFormVisibility == "hide" ? { visibility: "hidden" } : { visibility: "visible" }}
                className="min-h-[20vh] w-full fixed top-0 left-0 flex justify-center items-center   ">
                <CourseCreationForm />

            </div>














        </div>
    )
}

export default StudentDashbaord