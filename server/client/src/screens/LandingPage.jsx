import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import bgcImage from '../assets/bgcImage6.jpeg'
import LeftPanel from '../components/LeftPanel.jsx'
import CoursesCardsContainer from '../components/CoursesCardsContainer.jsx'
import MyContext from '../context api/MyContext'
import axios from 'axios'











const LandingPage = () => {




    let { setleftPanelVisibility,
        setCourseCardDataArray,
        setCurrentRenderedPage,
        setSigninPanelVisibility,
        setMainRole
    } = useContext(MyContext)





    useEffect(() => {
        setCurrentRenderedPage("LandingPage")
        setMainRole("landingPage")
        setSigninPanelVisibility("hide")
    }, [])












    useEffect(() => {
        try {

            async function fetchAllCourses() {
                let response = await axios.get(`/api/v1/TeacherRoutes/getAllCourses`)
                if (response.data) {
                    console.log(response.data)

                    if (response.data.status == "success") {
                        setCourseCardDataArray(response.data.allCourses)
                    } else {
                        alert("Something went wrong in fetching all Courses from database")
                    }
                }
            }
            fetchAllCourses()

        } catch (err) {
            console.log("Error from try and catch of landing page in getting course data from backend")
        }
    }, [])


























    return (
        // Main Div of landing page of LMS
        <div className="min-h-[100vh] w-full  ">







            {/* Navbar component of landing page */}
            <Navbar />









            {/* bgc image div of landing page  */}
            <img
                className='h-full w-full fixed top-0 left-0 z-[-999] object-cover '
                src={bgcImage} alt="" />














            {/* This Div contains the left side filter box and also the right side courses cards container */}
            <div className="min-h-[100vh] w-full overflow-x-hidden flex pt-32 ">
                <LeftPanel mode={"landingPage"} />
                <CoursesCardsContainer mode={"landingPage"} />
            </div>







            {/* This icon control the left side filter panel visibility */}
            <button
                onClick={() => { setleftPanelVisibility("visible"); setSigninPanelVisibility("hide") }}
                className='custom_glassy_effect          h-16 w-20 rounded-3xl fixed top-[20%] left-[-40px] flex items-center justify-center  '>
                <i className="ri-arrow-right-wide-line            ml-3 text-[40px] fixed  right-0 " ></i>
            </button>








        </div>
    )
}









export default LandingPage