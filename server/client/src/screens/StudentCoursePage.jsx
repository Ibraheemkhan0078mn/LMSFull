import React, { useContext, useEffect } from 'react'
import bgcImage from '../assets/bgcImage6.jpeg'
import Navbar from '../components/Navbar.jsx'
import VideoAndInfo from '../components/VideoAndInfo'
import LectureList from '../components/LectureList'
import MyContext from '../context api/MyContext.jsx'
import { useNavigate } from 'react-router-dom'










const StudentCoursePage = () => {


    let { setCurrentRenderedPage,
        currentClickedCourseData,
        currentRenderedPage,
        setMainRole
     } = useContext(MyContext)

     let navigate= useNavigate()





    // set the current rendered page name and according which we render or hide some element
    useEffect(() => {
        setMainRole("student")
        setCurrentRenderedPage("StudentCoursePage")
    }, [])









   











    return (
        <div>





            {/* navbar of the user side  */}
            <Navbar />









            {/* bgc image div of landing page  */}
            <img
                className='h-full w-full fixed top-0 left-0 z-[-999] object-cover '
                src={bgcImage} alt="" />














            <div className="min-h-[75vh] w-full overflow-x-hidden 
            block py-5   sm:flex  sm:py-28 sm:mt-10">


                <div className="h-max flex flex-1 mb-5 ">
                    <VideoAndInfo />
                </div>


                <div className="min-h-[75vh] 
                w-full   sm:w-[25%] ">
                    <LectureList />
                </div>


            </div>












        </div>
    )
}









export default StudentCoursePage