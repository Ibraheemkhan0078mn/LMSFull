import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useContext, useEffect } from 'react'
import MyContext from '../context api/MyContext'
import axios from 'axios'
import Loader from './Loader'

const LectureCreationForm = () => {






    let navigate = useNavigate()

    let [loader, setLoader]= useState(null)

    let { setCourseCreationFormVisibility,
        setLectureCreationFormVisibility,
        currentClickedCourseData,
        setQuestionCreationFormVisibility,
        setCurrentClickedCourseData
    } = useContext(MyContext)


    let [formData, setFormData] = useState({
        lectureVideo: "",
        lectuerName: '',
        lectuerDiscription: '',
        courseId: ''
    })








    async function handleSubmit(e) {
        e.preventDefault()

        setLoader("visible")     // to make the loader visible when process is begin

        try {

            // console.log(formData)

            let formDataToSend = new FormData()
            for (let key in formData) {
                formDataToSend.append(key, formData[key])
            }

            let response = await axios.post(import.meta.env.VITE_backend_base_Url+"/api/v1/TeacherRoutes/createLecture", formDataToSend, {
                onUploadProgress: (progressEvent) => {
                    console.log(progressEvent)
                }
            })



            if (response.data) {

                setLoader(null)     // to make the loader hide
                setLectureCreationFormVisibility("hide")
                // we rendered the current clicked course lecture in lecture list with the help of lecture
                // therefore i get the entire course data which is currently clicked to prevent my self in trouble
                setCurrentClickedCourseData(response.data.currentClickedCourseWithNewLec)
                // 
                // console.log(response.data)
            }


        } catch (err) {
            console.log("From trycatch of handlesubmit of lecture creation form ", err)
        }
    }







    useEffect(() => {
        // for setting the course id in the usestate
        if (currentClickedCourseData) {
            setFormData({ ...formData, courseId: currentClickedCourseData._id })
        } else {
            navigate("/TeacherCoursePage")
        }
    }, [])




    function handleChange(e) {
        let { name, value } = e.target;

        // for setting the other keys and properties in usestate
        if (name == "lectureVideo" || name == "lectureTumbnail") {
            setFormData({ ...formData, [name]: e.target.files[0] })
        } else {
            setFormData({ ...formData, [name]: value })
        }
    }






    function handleLectureCreationFormCrossBtnClick() {
        setLectureCreationFormVisibility("hide")
        // console.log("enter in handleLectureCreationFormCrossBtnClick")
    }





























    return (
            <div className="custom_glassy_effect             min-h-[40vh] rounded-lg   p-8 flex flex-col my-32 mx-10 relative 
            w-full   sm:w-[50%] ">










                {/* Heading of course creation form */}
                <h1 className=' text-3xl text-blue-950 mb-10 font-semibold text-center'>Create Lecture</h1>














                {/* cross button to hide again the course creation form */}
                <div
                    onClick={handleLectureCreationFormCrossBtnClick}
                    className=" custom_glassy_effect          h-7 w-7 select-none cursor-pointer rounded-full flex items-center justify-center   absolute top-5 right-5 ">X</div>












                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col gap-7 '
                >











                    {/* input for course name */}
                    <label
                        htmlFor=""
                        className=' h-16 w-full flex flex-col text-md font-mono gap-0 '>
                        Lecture Video:

                        <input
                            type="file"
                            className='custom_glassy_effect    h-full w-full rounded-lg px-5 text-base outline-none border-none text-zinc-600 font-semibold'
                            name='lectureVideo'
                            onChange={handleChange}
                            required
                        />

                    </label>










                    {/* input for course name */}
                    <label
                        htmlFor=""
                        className=' h-16 w-full flex flex-col text-md font-mono gap-0 '>
                        Lecture Name:

                        <input
                            type="text"
                            placeholder='Enter the Course name...'
                            className='custom_glassy_effect    h-full w-full rounded-lg px-5 text-base outline-none border-none text-zinc-600 font-semibold'
                            name='lectureName'
                            value={formData.courseName}
                            onChange={handleChange}
                            required
                        />

                    </label>












                    {/* for description */}
                    <label
                        htmlFor=""
                        className=' h-16 w-full flex flex-col text-md font-mono gap-0 '>
                        Lecture Description

                        <input
                            type="text"
                            placeholder='Enter the description...'
                            className='custom_glassy_effect    h-full w-full rounded-lg px-5 text-base outline-none border-none text-zinc-600 font-semibold'
                            name='lectureDiscription'
                            value={formData.courseDiscription}
                            onChange={handleChange}
                            required
                        />

                    </label>













                    {/* button for submit  */}
                    <button
                        type='submit'
                        className='h-10 w-full mx-auto rounded-lg text-zinc-300 bg-blue-600 text-md mt-5 relative '
                    >
                        Create Lecture



                        
            {
              loader ?
                <div className="absolute right-[30%] top-3">
                  <Loader hw={20} />
                </div> :
                null
            }




                    </button>















                </form>







            </div>
    )
}

export default LectureCreationForm