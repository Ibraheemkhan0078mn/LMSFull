import React, { useContext, useEffect, useState } from 'react'
import bgcImage from '../assets/bgcImage6.jpeg'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import MyContext from '../context api/MyContext'
import Loader from '../components/Loader'
import { axiosReqFunc } from '../Api/axiosReqFunction'











const StudentLogin = () => {

    let navigate = useNavigate()

    let [loader, setLoader]= useState(null)

    let [formData, setFormData] = useState({
        phoneNo: "",
        password: "",
    })



    let {setCurrentRenderedPage,
        setMainRole
    }= useContext(MyContext)

























    // set the current rendered page name and according which we render or hide some element
    useEffect(() => {
        setMainRole("student")
        setCurrentRenderedPage("StudentLogin")
    }, [])





















    function handleChange(e) {
        let { value, name } = e.target;
        setFormData({ ...formData, [name]: value })

    }

















    async function handleSubmit(e) {
        e.preventDefault()


        setLoader("visible")    // to make the laoder visible when process is start

        try{

            // let response= await axios.post(import.meta.env.VITE_backend_base_Url+"/api/v1/StudentRoutes/Login", formData, {withCredentials:true})
          
            let method= "post"
            let url = `/api/v1/StudentRoutes/Login`
            let data= formData

            let response= await axiosReqFunc(method, url, data)
          
            if(response.data){

                setLoader(null)    // to make the laoder hide when response is reached

                if(response.data.status=="success"){
                    setMainRole("student")
                    navigate("/StudentProfile")
                }else if(response.data.status=="error"){
                    alert("Server Internel Error")
                }else[
                    alert("Something went wrong. Please try Again")
                ]
            }
        }catch(err){
            console.log("Error from trycatch of student login handle submit function in frontend")
        }
    }









    function handleLoginSpanTagClick() {
        navigate("/StudentRegistration")
    }





























    return (
        // main div of teacher registration
        <div className="min-h-[100vh] w-full flex items-center justify-center  ">










            {/* bgc image div of teacher registration  */}
            <img
                className='h-full w-full fixed top-0 left-0 z-[-999] object-cover '
                src={bgcImage} alt="" />











            {/* The div which contains the heading and also form wo input the data for registration */}
            <div className="custom_glassy_effect             min-h-[40vh] p-8 py-16 rounded-lg flex flex-col  
            w-full my-10 mx-3       sm:w-[50%] sm:m-32">



                <h1 className=' text-3xl text-blue-950 mb-10 font-semibold text-center'>Student Login</h1>





                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col gap-7 '>














                    <label
                        htmlFor=""
                        className=' h-16 w-full flex flex-col  font-mono gap-0
                        text-md    '>
                                                    Phone Number:

                        <input
                            type="Number"
                            placeholder='Enter the Phone number...'
                            className='custom_glassy_effect    h-full w-full rounded-lg px-5 text-base outline-none border-none text-zinc-600 font-semibold'
                            name='phoneNo'
                            value={formData.phoneNo}
                            onChange={handleChange}
                            required
                        />

                    </label>













                    <label
                        htmlFor=""
                        className=' h-16 w-full flex flex-col  font-mono gap-0
                        text-md    '>
                                                    Password:

                        <input
                            type="text"
                            placeholder='Enter the Password...'
                            className='custom_glassy_effect    h-full w-full rounded-lg px-5 text-base outline-none border-none text-zinc-600 font-semibold'
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            required />

                    </label>

















                    {/* button for submit  */}
                    <button
                        type='submit'
                        className='h-10 w-full font-bold mx-auto rounded-lg text-zinc-300 bg-blue-600 text-lg '
                    >
                        Login



                        {
              loader ?
                <div className="absolute right-[30%] top-3">
                  <Loader hw={20} />
                </div> :
                null
            }




                    </button>









                    {/* for redirecting to teacher login page */}
                    <div className="">
                        <h1 className=' font-normal '>No Account ?
                            <span className='text-blue-800 cursor-pointer' onClick={handleLoginSpanTagClick}> Register</span>
                        </h1>
                    </div>








                </form>
            </div>











        </div>
    )
}

export default StudentLogin