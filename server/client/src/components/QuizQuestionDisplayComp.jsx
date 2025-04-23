import React, { useContext, useEffect, useState } from 'react'
import MyContext from '../context api/MyContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { axiosReqFunc } from '../Api/axiosReqFunction'

const QuizQuestionDisplayComp = () => {




    let [quizQuestionArrayToSend, setQuizQuestionArrayToSend] = useState([])

    let navigate= useNavigate()

    let {
        setQuestionCreationFormVisibility,
        quizQuestionArray,
        currentClickedCourseData,
        currentRenderedPage,
        setCurrentRenderedPage
    } = useContext(MyContext)











    useEffect(() => {
        setQuizQuestionArrayToSend(quizQuestionArray)
    }, [quizQuestionArray])













    async function handleTestSubmition() {
        try {

            // let response = await axios.post(import.meta.env.VITE_backend_base_Url+"/api/v1/TeacherRoutes/quizMarking",
            //     {
            //         submitedQuizArray: quizQuestionArrayToSend,
            //         currentClickCourseId: currentClickedCourseData._id
            //     },
            //     { withCredentials: true }
            // )


            let response= await axiosReqFunc("post", `/api/v1/TeacherRoutes/quizMarking`,
                {
                    submitedQuizArray: quizQuestionArrayToSend,
                    currentClickCourseId: currentClickedCourseData._id
                }
            )




            
            if (response.data) {
                console.log(response.data)
                if(response.data.status=="success" && response.data.createdCertificate){
                    navigate("/StudentCertificate")
                }else if(response.data.status =="success" && !response.data.createdCertificate){
                    alert("Percentage: "+ response.data.percentage +"%")
                }else if(response.data.status== "error"){
                    alert(response.data.msg)
                }else if(response.data.status== "failed"){
                    alert(response.data.msg)
                }
            }



        } catch (error) {
            console.error("Error from trycatch of quizQuestionDisplayComp.jsx", error)
        }
    }












    function handleNewQuestionBtnClick() {
        setQuestionCreationFormVisibility("visible")
    }












    function handleFormDataChange(questionIndex, optionIndex) {
        let updatedQuizQuestionArrayToSend = [...quizQuestionArrayToSend];
        updatedQuizQuestionArrayToSend[questionIndex] = { ...updatedQuizQuestionArrayToSend[questionIndex], selectedOption: optionIndex }

        // we cannot directly change in original usestate becuase when we only change some part of usestate instead of changing the entire value then it cannot rerender properly the associated thing with it.
        setQuizQuestionArrayToSend(updatedQuizQuestionArrayToSend)
    }









    // useEffect(() => {
    //     console.log(quizQuestionArrayToSend)
    // }, [quizQuestionArrayToSend])






































    return (
        <div className='custom_glassy-effect        min-h-[70vh] w-full mt-40 relative pb-32' >



            {/* The button to create the question of quiz for current clicked course */}

            {
                currentRenderedPage == "TeacherQuizPage"
                    ?

                    <div
                        onClick={handleNewQuestionBtnClick}
                        className="custom_glassy_high_white      h-10 w-max absolute top-5 right-5 select-none cursor-pointer  font-semibold  rounded-lg flex items-center justify-center text-lg px-5 "
                    >
                        New Question
                    </div>


                    :


                    null

            }












            {/* inside this div, the mcq question is rendered according to array of mcq , comming from the backend */}
            <div className="h-max w-screen overflow-x-hidden flex flex-wrap justify-center gap-x-5 gap-y-8 p-10 pt-24">

                {/* applying map loop on array of question which comes from the backend */}
                {
                    quizQuestionArray.map((eachQuestion, MainIndex) => {




                        return (
                            <div
                                key={MainIndex}
                                className="custom_glassy_effect_low            h-max w-max p-5 rounded-2xl">

                                {/* main question of each mcq */}
                                
                                <h1
                                    className='min-h-10  w-80 text-xl font-bold '
                                >{eachQuestion.question}</h1>

                                <hr/>


                                {/* for option of each mcq question */}
                                {
                                    eachQuestion.optionArray.map((eachOption, index) => {


                                        return (
                                            <div
                                                key={index}
                                                onClick={() => { handleFormDataChange(MainIndex, index) }}
                                                className="flex gap-3 cursor-pointer">

                                                <input type="radio" id={`${MainIndex}+${index}`} name={MainIndex} value={eachOption} />
                                                <label
                                                    htmlFor={`${MainIndex}+${index}`}
                                                    className='text-lg'
                                                >
                                                    {eachOption}
                                                </label>

                                            </div>
                                        )


                                    })
                                }




                            </div>
                        )





                    })
                }




            </div>






















            {/* first check that if questin is not present or if this wan rendered in teacher side then dont show submit buttom and show message that not mcq are present yet */}
            {

                // first check
                quizQuestionArray.length == 0

                    ?

                    <h2 className='w-full text-center text-xl'>No Mcq's are present yet</h2>

                    :


                    // second check
                    setCurrentRenderedPage == "/TeacherQuizPage"

                        ?

                        null

                        :


                        <div className="h-max w-full flex justify-center mt-10">
                            <button
                                className='h-max w-max py-2 px-5 bg-blue-600 text-xl  text-zinc-200 rounded-lg'
                                onClick={handleTestSubmition}>
                                Submit Test
                            </button>
                        </div>

            }












        </div>
    )





}



















export default React.memo(QuizQuestionDisplayComp)