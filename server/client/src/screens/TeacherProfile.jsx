import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar.jsx'
import bgcImage from '../assets/bgcImage6.jpeg'
import LeftPanel from '../components/LeftPanel.jsx'
import CoursesCardsContainer from '../components/CoursesCardsContainer.jsx'
import MyContext from '../context api/MyContext'











const TeacherProfile = () => {




    let { setleftPanelVisibility,
        setCourseCardDataArray,
        setCurrentRenderedPage,
        setMainRole
    } = useContext(MyContext)





    // set the current rendered page name and according which we render or hide some element
    useEffect(() => {
        setMainRole("teacher")
        setCurrentRenderedPage("TeacherProfile")
    }, [])









    useEffect(() => {
        try {

            async function fetchAllCourses() {
                let response = await axios.get(import.meta.env.VITE_backend_base_Url + "/api/v1/TeacherRoutes/getAllCourses")
                if (response.data) {
                    // console.log(response.data)
                    if (response.data.status == "success") {
                        setCourseCardDataArray(response.data.allCourses)
                    } else {
                        console.log("Something went wrong in fetching all Courses from database")
                    }
                }
            }
            fetchAllCourses()

        } catch (err) {
            console.log("Error from try and catch of landing page in getting course data from backend")
        }
    }, [])












    return (
        // Main Div of Teacher Profile of LMS
        <div className="min-h-[100vh] w-full  ">







            {/* Navbar component of Teacher profile*/}
            <Navbar mode={"TeacherProfile"} />









            {/* bgc image div of Teacher Profile*/}
            <img
                className='h-full w-full fixed top-0 left-0 z-[-999] object-cover '
                src={bgcImage} alt="" />














            {/* This Div contains the left side filter box and also the right side courses cards container */}
            <div className="min-h-[100vh] w-full overflow-x-hidden flex pt-32 ">
                <LeftPanel mode={"TeacherProfile"} />
                <CoursesCardsContainer mode={"TeacherProfile"} heading={"Teacher Profile"} />
            </div>







            {/* This icon control the left side filter panel visibility */}
            <button
                onClick={() => { setleftPanelVisibility("visible") }}
                className='custom_glassy_effect          h-16 w-20 rounded-3xl fixed top-[20%] left-[-40px] flex items-center justify-center  '>
                <i className="ri-arrow-right-wide-line            ml-3 text-[40px] fixed  right-0 " ></i>
            </button>








        </div>
    )
}









export default TeacherProfile