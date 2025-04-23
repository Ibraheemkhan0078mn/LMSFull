import React, { useContext, useEffect, useState } from 'react'
import MyContext from '../context api/MyContext'
import axios from 'axios'
import 'remixicon/fonts/remixicon.css'
import { useNavigate } from 'react-router-dom'
import Loader from './Loader'
import { axiosReqFunc } from '../Api/axiosReqFunction'









const LectureList = ({ mode }) => {



    let { setLectureCreationFormVisibility,
        currentClickedCourseData,
        setLectureData,
        currentRenderedPage,
        lectureData,
        completedLecturesIdsArray,
        setCompletedLecturesIdsArray,
        setQuestionCreationFormVisibility,
        questionCreationFormVisibility,
        previousRenderedPage } = useContext(MyContext)

    let navigate = useNavigate()
    let [markAsCompleteLoaderDisplay, setMarkAsCompleteLoaderDisplay] = useState(null)


















    // when the lecture is clicked then it take its data and set it in the usestate "lectureData" in context api.
    // and then in the videoAndInfo component, we give its videoUrl to video tag to display the video
    function handleEachLectureClick(eachLecture) {
        setLectureData(eachLecture)
    }








    // to send request to backend to add the id of current lecture in completedLectures id's array of current logged in student and then get the new updated completedLectures id's array
    async function handleLectureCompletedBtnClick(e) {
        try {

            setMarkAsCompleteLoaderDisplay("visible")

            // let response = await axios.post(import.meta.env.VITE_backend_base_Url + "/api/v1/StudentRoutes/markAsCompleteLecture", { lectureId: lectureData._id }, { withCredentials: true })


            let method= "post"
            let url= `/api/v1/StudentRoutes/markAsCompleteLecture`
            let data= { lectureId: lectureData._id }

            let response= await axiosReqFunc(method, url, data)




            if (response.data) {
                setMarkAsCompleteLoaderDisplay(null)
                if (response.data.status == "success") {
                    setCompletedLecturesIdsArray(response.data.completedLecturesIds)
                }
            }


        } catch (err) {
            console.log("Error from try and catch of request to mark the lecture as completed")
        }

    }














    async function handleRemoveCompletionMark(lectureId) {

        try {
            // let response = await axios.post(import.meta.env.VITE_backend_base_Url + "/api/v1/StudentRoutes/removeLectureId", { lectureId }, { withCredentials: true })
           

            let response= await axiosReqFunc("post", `/api/v1/StudentRoutes/removeLectureId`,  { lectureId })
           
            if (response.data) {
                // console.log(response.data)
                setCompletedLecturesIdsArray(response.data.completedLectureids)
            }
        } catch (err) {
            console.log("error from trycatch of handleRemoveCompletionMark in LectureList.jsx component", err)
        }

    }





















    // The form to create the new lecture on TeacherDashboard. which become visible when we click on new lecture button on Teacher course page
    function handleNewLectureBtnClick() {
        setLectureCreationFormVisibility("visible")
    }













    function handleQuizTestBtnClick() {
        console.log("handleQuizTestBtnClick")
        if (currentRenderedPage == "StudentCoursePage") {
            navigate("/StudentQuizPage")
        } else if (currentRenderedPage == "TeacherCoursePage") {
            navigate("/TeacherQuizPage")
        }
    }


















    return (
        // Main component of lecture list component
        <div className='          h-full w-full px-5 py-10 flex flex-col items-center '>











            {/* with the help of this, we only rendered the new lecture button when we are only on Teacher course page */}
            {currentRenderedPage == "TeacherCoursePage"
                ?

                <div className="h-max flex flex-wrap justify-center  gap-3">


                    {/* new lecture button */}

                    {
                        previousRenderedPage == "TeacherDashboard" ?
                            <div
                                onClick={handleNewLectureBtnClick}
                                className="custom_glassy_high_white      h-10 w-max select-none cursor-pointer  font-semibold  rounded-lg flex items-center justify-center text-lg px-5 " >
                                New Lecture
                            </div>

                            :
                            null

                    }



                    {/* Quiz test button */}
                    <div
                        onClick={handleQuizTestBtnClick}
                        className="custom_glassy_high_white      h-10 w-max select-none cursor-pointer  font-semibold  rounded-lg flex items-center justify-center text-lg px-5 "
                    >
                        Quiz Test
                    </div>






                </div>



                :

                <div className="h-max flex flex-wrap gap-3
                flex-col   sm:flex-row">


                    {/* mark as completed button */}
                    <button
                        onClick={handleLectureCompletedBtnClick}
                        className="custom_glassy_greenish_effect      h-10 w-max select-none cursor-pointer  font-semibold  rounded-lg flex items-center justify-center gap-2 text-lg px-5  "
                        style={{ boxShadow: "0 0.3 0.4rcap green" }} >
                        Mark as Complete
                        {
                            markAsCompleteLoaderDisplay ?
                                <Loader hw={15} /> :
                                null
                        }
                    </button>



                    {/* Quiz test button */}
                    <div
                        onClick={handleQuizTestBtnClick}
                        className="custom_glassy_high_white      h-10 w-max select-none cursor-pointer  font-semibold  rounded-lg flex items-center justify-center text-lg px-5 "
                    >
                        Quiz Test
                    </div>







                </div>
            }





















            {/* The list of lecture present in current course */}
            {/* when course card is clicked then its all data is stored in the usestate of context api. and here we take the data and in this we render the lectures with the help of lectures array in course data */}
            {/* we also apply the onclick on each lecture and when clicked some lecture then the data of clicked lecture stored in usestate in context api. from where we show the video and names etc in videoAndInfo components.
             and also when the mark as completed button is clicked then id from this usestate goes and set in completedLecture array in current logged in student data */}

            <div className="h-max w-full pt-10">

                {
                    currentClickedCourseData ?





                        (
                            currentClickedCourseData.lectures.length > 0


                                ?


                                currentClickedCourseData.lectures.map((eachLecture, index) => {
                                    return (
                                        <div
                                            key={index}
                                            onClick={() => { handleEachLectureClick(eachLecture) }}
                                            className='custom_glassy_effect     h-max w-full mb-5 py-2  pl-5 pr-1 rounded-lg flex items-center text-lg select-none cursor-pointer relative'
                                            style={eachLecture._id == lectureData._id ? { border: "1px solid black", boxShadow: "0 0  0.7rcap black" } : null}>

                                            {/* name of lecture */}
                                            <h2 className='flex flex-1'>{eachLecture.name}</h2>


                                            {/* icon of check which appears for those lectures which id's are present in completedLectures array of student model*/}
                                            {completedLecturesIdsArray.includes(eachLecture._id) ?
                                                <i className="ri-checkbox-circle-line         h-10 w-10 text-3xl text-green-700 flex items-center justify-center"
                                                    onClick={() => { handleRemoveCompletionMark(eachLecture._id) }} ></i>
                                                : null}

                                        </div>)
                                })


                                :
                                <div>No lectures are present yet</div>
                        )









                        :
                        null
                }



            </div>























        </div>
    )
}

export default React.memo(LectureList)