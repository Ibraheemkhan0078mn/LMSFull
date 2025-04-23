import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useContext, useEffect } from 'react'
import MyContext from '../context api/MyContext'
import axios from 'axios'
import Loader from './Loader'
import { axiosReqFunc } from '../Api/axiosReqFunction'












const QuestionCreationForm = () => {








    let navigate = useNavigate()

    let [loader, setLoader] = useState(null)

    let {
        setQuestionCreationFormVisibility,
        currentClickedCourseData,
        setQuizQuestionArray,
        setCurrentRenderedPage
    } = useContext(MyContext)


    let [question, setQuestion] = useState("")
    let [option1, setOption1] = useState("")
    let [option2, setOption2] = useState("")
    let [option3, setOption3] = useState("")
    let [option4, setOption4] = useState("")
    let [correctOptionIndex, setCorrectOptionIndex] = useState("0")

    //  console.log(correctOptionIndex)










    async function handleSubmit(e) {
        e.preventDefault()



        setLoader("visible")    // to make the laoder visible when process is start


        try {


            // console.log("Entered in handle submit of question creation from")

            let formData;

            if (currentClickedCourseData && question && question != "" && option1 && option1 != "" && option2 && option2 !== "" && option3 && option3 != "" && option4 && option4 != "" && correctOptionIndex) {

                formData = {
                    question,
                    optionArray: [option1, option2, option3, option4],
                    correctOptionIndex,
                    currentClickedCourseId: currentClickedCourseData._id
                }

            } else {
                alert("All fields are required")
            }




            // let response = await axios.post(import.meta.env.VITE_backend_base_Url+"/api/v1/TeacherRoutes/quizQuestionCreation", formData,{withCredentials:true})

            let method = "post";
            let url = `/api/v1/TeacherRoutes/quizQuestionCreation`
            let data = formData

            let response = await axiosReqFunc(method, url, data)





            if (response.data) {


                setLoader(null) // to make the laoder hide


                if (response.data.status == "success") {
                    // console.log("successfully question is created")
                    setQuestionCreationFormVisibility("hide")
                    navigate("/TeacherQuizPage")
                    console.log(response.data.quizQuestionsArray)
                    setQuizQuestionArray(response.data.quizQuestionsArray)
                } else if (response.data.status == "failed") {
                    alert(response.data.msg)
                } else if (response.data.status == "error") {
                    console.log(response.data)
                    alert(response.data.msg)
                }

            }


        } catch (err) {
            console.log("From trycatch of handlesubmit of quiz creation form ", err)
        }
    }

























    function handleQuestionCreationFormCrossBtnClick() {
        setQuestionCreationFormVisibility("hide")
        // console.log("enter in handleLectureCreationFormCrossBtnClick")
    }























    return (
        <div className="custom_glassy_effect             min-h-[40vh]  rounded-lg   p-8  flex flex-col m-5 relative 
        w-full pt-14   sm:w-[50%] sm:pt-8 ">










            {/* Heading of course creation form */}
            <h1 className=' text-2xl text-blue-950  font-bold text-center
            mb-4      sm:mb-4'>
                Create Question</h1>














            {/* cross button to hide again the course creation form */}
            <div
                onClick={handleQuestionCreationFormCrossBtnClick}
                className=" custom_glassy_effect          h-7 w-7 select-none cursor-pointer rounded-full flex items-center justify-center   absolute top-5 right-5 ">
                X
            </div>












            <form
                onSubmit={handleSubmit}
                className='flex flex-col gap-7 '
            >



















                {/* input for course name */}
                <label
                    htmlFor=""
                    className='  max-h-28   flex flex-1 flex-col text-lg font-mono gap-0  '>
                    Question:

                    <textarea
                        type="text"
                        placeholder='Enter the Course name...'
                        className='custom_glassy_effect    min-h-10  w-full rounded-lg px-5 text-base outline-none border-none text-zinc-600 font-semibold pt-2'
                        name='lectureName'
                        value={question}
                        onChange={(e) => { setQuestion(e.target.value) }}
                        required
                    />

                </label>












                {/* option inputs start */}


                <div className="min-h-8 w-full flex flex-wrap justify-between px-5 ">





                    <label
                        htmlFor=""
                        className=' h-5 my-2 flex items-center   text-xl font-mono gap-0 '>
                        A:

                        <input
                            type="text"
                            placeholder='Option A...'
                            className='custom_glassy_effect    h-8 w-40 rounded-lg px-5 text-base outline-none border-none text-zinc-600 font-semibold'
                            name='lectureDiscription'
                            value={option1}
                            onChange={(e) => { setOption1(e.target.value) }}
                            required
                        />

                    </label>





                    <label
                        htmlFor=""
                        className=' h-5 my-2  flex items-center  text-xl font-mono gap-0 '>
                        B:

                        <input
                            type="text"
                            placeholder='Option B...'
                            className='custom_glassy_effect    h-8 w-40 rounded-lg px-5 text-base outline-none border-none text-zinc-600 font-semibold'
                            name='lectureDiscription'
                            value={option2}
                            onChange={(e) => { setOption2(e.target.value) }}
                            required
                        />

                    </label>






                    <label
                        htmlFor=""
                        className=' h-5 my-2  flex items-center  text-xl font-mono gap-0 '>
                        C:

                        <input
                            type="text"
                            placeholder='Option C...'
                            className='custom_glassy_effect    h-8 w-40 rounded-lg px-5 text-base outline-none border-none text-zinc-600 font-semibold'
                            name='lectureDiscription'
                            value={option3}
                            onChange={(e) => { setOption3(e.target.value) }}
                            required
                        />

                    </label>









                    <label
                        htmlFor=""
                        className=' h-5 my-2  flex items-center text-xl font-mono gap-0 '>
                        D:

                        <input
                            type="text"
                            placeholder='Option D...'
                            className='custom_glassy_effect    h-8 w-40 rounded-lg px-5 text-base outline-none border-none text-zinc-600 font-semibold'
                            name='lectureDiscription'
                            value={option4}
                            onChange={(e) => { setOption4(e.target.value) }}
                            required
                        />

                    </label>






                </div>

                {/* option inputs end */}



















                {/* correct option start */}

                <label
                    className='h-max w-full flex gap-3 items-center justify-center pr-24'
                    htmlFor="">

                    Correct Answer:

                    <select
                        value={correctOptionIndex}
                        onChange={(e) => { setCorrectOptionIndex(e.target.value) }}
                        name="options"
                        id=""
                        className='custom_glassy_effect    h-8 w-max rounded-lg px-5 text-base outline-none border-none text-zinc-600 font-semibold'
                    >
                        <option value="0">A</option>
                        <option value="1">B</option>
                        <option value="2">C</option>
                        <option value="3">D</option>
                    </select>
                </label>


                {/* correct option end */}












                {/* button for submit  */}
                <button
                    type='submit'
                    className='h-12 w-full mx-auto rounded-lg text-zinc-300 bg-blue-600 text-xl mt-0 '
                >
                    Create Question



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

export default QuestionCreationForm