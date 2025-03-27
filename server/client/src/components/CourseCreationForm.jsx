import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MyContext from '../context api/MyContext'
import axios from 'axios'
import Loader from './Loader'



















const CourseCreationForm = () => {




    let navigate = useNavigate()


    let { setCourseCreationFormVisibility,
        setCourseCardDataArray ,
     } = useContext(MyContext)


    let [loaderVisibility, setLoaderVisibility] = useState(null)

    let [formData, setFormData] = useState({
        courseImage: "",
        courseName: '',
        courseDiscription: '',
        courseCatagory: "Html"
    })


















    async function handleSubmit(e) {
        e.preventDefault()
        try {

            setLoaderVisibility("visible")

            let fromDataToSend = new FormData()
            for (let key in formData) {
                fromDataToSend.append(key, formData[key])
            }

            let response = await axios.post(import.meta.env.VITE_backend_base_Url+"/api/v1/TeacherRoutes/createCourse", fromDataToSend, { withCredentials: true })

            if (response.data) {

                setLoaderVisibility(null)     // to make the laoder hide
                setCourseCreationFormVisibility("hide")

                if (response.data.status == "success") {
                    setCourseCardDataArray(response.data.teacherRelatedCourses)
                    // console.log(response.data.status)
                } else if (response.data.status == "error") {
                    alert("Server internal error. Try again later")
                } else {
                    // console.log(response.data)
                    alert("Something went wront in course creation. please try again")
                }
            }

        } catch (err) {
            console.log("From tryCatch of course creation form submit function", err)
        }
    }










    function handleChange(e) {
        let { name, value } = e.target;
        if (name == "courseImage") {
            setFormData({ ...formData, [name]: e.target.files[0] })
        } else {
            setFormData({ ...formData, [name]: value })
        }
    }













    function handleCourseCreationFormCrossBtnClick() {
        setCourseCreationFormVisibility("hide")
    }



























    return (
        <div className="custom_glassy_effect             min-h-[40vh]  rounded-lg   p-8 flex flex-col my-32 mx-10 relative 
        w-full    sm:w-[50%]">





            {/* Heading of course creation form */}
            <h1 className=' text-3xl text-blue-950 mb-10 font-semibold text-center'>Create Course</h1>







            {/* cross button to hide again the course creation form */}
            <div
                onClick={handleCourseCreationFormCrossBtnClick}
                className=" custom_glassy_effect          h-7 w-7 select-none cursor-pointer rounded-full flex items-center justify-center   absolute top-5 right-5 ">X</div>









            <form
                onSubmit={handleSubmit}
                className='flex flex-col gap-7 '
            >











                {/* input for course name */}
                <label
                    htmlFor=""
                    className=' h-20 w-full flex flex-col  text-xl font-mono gap-0 '>
                    Course Image:

                    <input
                        type="file"
                        className='custom_glassy_effect    h-full w-full p-4 rounded-lg px-5 text-base outline-none border-none text-zinc-600 font-semibold'
                        name='courseImage'
                        onChange={handleChange}
                        required
                    />

                </label>












                {/* input for course name */}
                <label
                    htmlFor=""
                    className=' h-20 w-full flex flex-col text-xl font-mono gap-0 '>
                    Course Name:

                    <input
                        type="text"
                        placeholder='Enter the Course name...'
                        className='custom_glassy_effect    h-full w-full rounded-lg px-5 text-base outline-none border-none text-zinc-600 font-semibold'
                        name='courseName'
                        value={formData.courseName}
                        onChange={handleChange}
                        required
                    />

                </label>












                {/* for description */}
                <label
                    htmlFor=""
                    className=' h-20 w-full flex flex-col text-xl font-mono gap-0 '>
                    Course Description

                    <input
                        type="text"
                        placeholder='Enter the description...'
                        className='custom_glassy_effect    h-full w-full rounded-lg px-5 text-base outline-none border-none text-zinc-600 font-semibold'
                        name='courseDiscription'
                        value={formData.courseDiscription}
                        onChange={handleChange}
                        required
                    />

                </label>









                {/* the dropdown which is use to select the catagory of course */}
                <div className="">
                    <h2 className=' h-auto w-full  text-xl font-mono '>Course Catagory</h2>
                    <select
                        name='courseCatagory'
                        onChange={handleChange}
                        className='custom_glassy_effect    h-14 w-full rounded-lg px-5 text-base outline-none border-none text-zinc-600 font-semibold'
                    >




                        {["Html", "css", "javascript", "Reach", "Nodejs", "Socket.io"].map((eachCatag, index) => {
                            return (<option
                                key={index}
                                value={eachCatag}>
                                {eachCatag}
                            </option>)
                        })}
                    </select>
                </div>




















                {/* button for submit  */}
                <button
                    type='submit'
                    className='h-12 w-full mx-auto rounded-lg text-zinc-300 bg-blue-600 text-xl mt-10 relative '
                >
                    Create Course


                    {loaderVisibility ?
                        <div className="absolute top-2  right-10 ">
                            <Loader hw={20} />
                        </div>
                        :
                        null}


                </button>















            </form>
        </div>
    )
}

export default CourseCreationForm