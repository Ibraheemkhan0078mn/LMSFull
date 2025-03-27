import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar.jsx'
import bgcImage from '../assets/bgcImage6.jpeg'
import LeftPanel from '../components/LeftPanel.jsx'
import CoursesCardsContainer from '../components/CoursesCardsContainer.jsx'
import MyContext from '../context api/MyContext'
import QuizQuestionDisplayComp from '../components/QuizQuestionDisplayComp.jsx'
import { useNavigate } from 'react-router-dom'
import QuestionCreationForm from '../components/QuestionCreationForm.jsx'











const TeacherQuizPage = () => {


    let navigate = useNavigate()


    let { setleftPanelVisibility,
        setCourseCardDataArray,
        setCurrentRenderedPage,
        currentClickedCourseData,
        questionCreationFormVisibility,
        quizQuestionArray,
        setQuizQuestionArray,
        setMainRole
    } = useContext(MyContext)












    // set the current rendered page name and according which we render or hide some element
    useEffect(() => {
        setMainRole("teacher")
        setCurrentRenderedPage("TeacherQuizPage")
    }, [])













    useEffect(() => {
        if (!currentClickedCourseData) {
            navigate("/TeacherDashboard")
        }
    }, [currentClickedCourseData])












    useEffect(() => {
        try {

            if (currentClickedCourseData) {


                async function quizQuestionFetch() {

                    let response = await axios.post(import.meta.env.VITE_backend_base_Url + "/api/v1/TeacherRoutes/getCourseQuizQuestions",
                        { currentClickedCourseId: currentClickedCourseData._id },
                        { withCredentials: true })


                    if (response.data) {
                        if (response.data.quizQuestionArray) {
                            setQuizQuestionArray(response.data.quizQuestionArray)
                        }
                    }
                }

                quizQuestionFetch()


            }

        } catch (error) {
            console.log("Error from trycatch of quiztaking data feching")
        }

    }, [currentClickedCourseData])































    return (
        // Main Div of Teacher Profile of LMS
        <div className="min-h-[100vh] w-full  ">







            {/* Navbar component of Teacher profile*/}
            <Navbar mode={"TeacherProfile"} />









            {/* bgc image div of Teacher Profile*/}
            <img
                className='h-full w-full fixed top-0 left-0 z-[-999] object-cover '
                src={bgcImage} alt="" />








            {/* This check that if usestate for visibility of question form is visible then show the question with display flex and on the center of page otherwise does not show this */}
            {
                questionCreationFormVisibility == "hide" ?
                    null :
                    <div className="min-h-[70vh] w-full absolute flex justify-center   z-[999]
                     top-[100px]           sm:top-[30px] 
                    ">
                        <QuestionCreationForm />
                    </div>

            }











            {/* This component is for to display the msq quiz */}
            <div className=" custom_glassy_effect   min-h-70vh w-full ">
                <QuizQuestionDisplayComp quizQuestionArray={quizQuestionArray} />
            </div>










            {/* This icon control the left side filter panel visibility
            <button
                onClick={() => { setleftPanelVisibility("visible") }}
                className='custom_glassy_effect          h-16 w-20 rounded-3xl fixed top-[20%] left-[-40px] flex items-center justify-center  '>
                <i className="ri-arrow-right-wide-line            ml-3 text-[40px] fixed  right-0 " ></i>
            </button> */}








        </div>
    )
}









export default TeacherQuizPage