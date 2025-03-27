import React, { useContext, useEffect, useRef } from 'react'
import 'remixicon/fonts/remixicon.css'
import { gsap } from 'gsap'
import MyContext from '../context api/MyContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'







const LeftPanel = ({ mode }) => {

    let catagArray = ["All", "Html", "css", "javascript", "Socket.io", "Python", "c++", "c#", "React", "React Native", "Docker", "Full Stack Web"]
    let leftPanelMainDiv = useRef(null)
    let navigate = useNavigate()
    let { leftPanelVisibility,
        setleftPanelVisibility,
        currentRenderedPage,
        setCourseCardDataArray,
        setPreviousRenderedPage } = useContext(MyContext)







    useEffect(() => {

        if (leftPanelVisibility == "hide") {
            gsap.to(leftPanelMainDiv.current, {
                x: -250
            })
        } else {
            gsap.to(leftPanelMainDiv.current, {
                x: 0
            })
        }

    }, [leftPanelVisibility])


















    function handleDashboardBtnClick() {


        if (mode == "TeacherProfile") {
            navigate("/TeacherDashboard")
        } else if (mode == "TeacherCourseCreation") {
            navigate("/TeacherDashboard")
        }
    }









    async function handleEachCatagBtnClick(e) {
        // console.log("entered in HandleEach ")
        try {
            let catagory = e.target.value;

            let response;
            if (currentRenderedPage == "TeacherDashboard") {
                response = await axios.post(import.meta.env.VITE_backend_base_Url+"/api/v1/ProductRoutes/getTeacherCatagWiseCourses", { catagory: catagory }, { withCredentials: true })
            } else {
                response = await axios.post(import.meta.env.VITE_backend_base_Url+"/api/v1/ProductRoutes/getCatagWiseCourses", { catagory: catagory }, { withCredentials: true })

            }



            if (response.data) {
                // console.log(response.data.catagWiseCoursesArray)

                if (response.data.status == "success") {
                    setCourseCardDataArray(response.data.catagWiseCoursesArray)
                } else {
                    setCourseCardDataArray([])
                }
            }


        } catch (error) {
            console.log("error from tryCatch of HandleEachCatagBtnClick of LeftPanel.jsx")
        }

    }

















    function handleCertificateBtnClick() {
        navigate("/StudentCertificate")
    }






























    return (
        <div ref={leftPanelMainDiv}
            style={{ transform: "translateX(-250px)" }}
            className='custom_glassy_effect       min-h-[100vh] w-60 z-[999] fixed top-32 left-0 p-5'>









            {/* for dashboard button and use condition wise (not displayed when on landingpage) */}
            {currentRenderedPage == "TeacherProfile" ?

                <div
                    onClick={handleDashboardBtnClick}
                    className='custom_glassy_effect_low        h-12 w-full  mt-14 px-5 text-xl rounded-md flex items-center justify-center select-none cursor-pointer'>
                    Dashboard
                </div>


                :



                currentRenderedPage == "StudentProfile" ?


                    <div
                        onClick={handleCertificateBtnClick}
                        className="custom_glassy_high_white      h-10 w-max select-none cursor-pointer  font-semibold  rounded-lg flex items-center justify-center text-lg px-5 mt-10 bg-blue-300 "
                    >
                        Certificate
                    </div>


                    :


                    null


            }










            {/* Contain the filter text and its icon */}
            <div className="h-16 w-full flex gap-4 items-center mb-5">
                <h2 className='text-2xl font-semibold'>Filter</h2>
                <i className="ri-filter-off-line      text-2xl font-light text-zinc-800"></i>
            </div>










            {/* this div contains the catagories option  */}
            {catagArray.map((eachCatag, index) => {
                return (<button
                    key={index}
                    value={eachCatag}
                    onClick={handleEachCatagBtnClick}
                    className='h-10 w-full bg-transparent flex justify-start mb-2 items-center text-md ml-2 font-semibold text-zinc-700'
                >
                    {eachCatag}
                </button>
                )
            })}













            {/* cross button to exit the filter panel */}
            <button
                onClick={() => { setleftPanelVisibility("hide") }}
                className='custom_glassy_effect           h-6 w-6 rounded-full absolute top-5 right-5 flex items-center justify-center text-[12px] text-zinc-600 '>
                X
            </button>


















        </div>
    )
}

export default LeftPanel