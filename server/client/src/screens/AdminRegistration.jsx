import React, { useContext, useEffect, useState } from 'react'
import bgcImage from '../assets/bgcImage6.jpeg'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import MyContext from '../context api/MyContext'
import Loader from '../components/Loader.jsx'










const AdminRegistration = () => {


    let navigate = useNavigate()

    
    let { setCurrentRenderedPage,
        setAdminProfileData
    } = useContext(MyContext)


    let [laoder, setLoader] = useState(null)
    let [formData, setFormData] = useState({
        adminImage: "",
        fullname: "",
        email: "",
        phoneNo: "",
        password: ""
    })







    // set the current rendered page name and according which we render or hide some element
    useEffect(() => {
        setCurrentRenderedPage("AdminRegistration")
        // here we set the main role when register successfully
    }, [])















    function handleChange(e) {
        let { value, name, files } = e.target;
        if (name == "adminImage") {
            setFormData({ ...formData, [name]: files[0] })
        } else {
            setFormData({ ...formData, [name]: value })
        }

    }









    async function handleSubmit(e) {
        e.preventDefault()

        setLoader("visible")     // to make the loader visible when process is begin



        try {

            let formDataToUpload= new FormData()

            for(let key in formData){
                formDataToUpload.append(key, formData[key])
            }


            let response = await axios.post(`${import.meta.env.VITE_backend_base_Url}/api/v1/AdminRoutes/Registration`, formDataToUpload, { withCredentials: true })

            if (response.data) {
                console.log(response.data)

                setLoader(null)   //  to make the loader hide

                if (response.data.status == "success") {
                    alert("Successfully Registered")
                    setAdminProfileData(response.data)
                    navigate("/AdminHome")
                } else {
                    alert(response.data.msg)
                }
            }

        } catch (err) {
            console.log("from try and catch of submit function of TeacherRegistration", err)
        }


    }
























    function handleRegistrationSpanTagClick(e) {
        navigate("/AdminLogin")
    }


































    return (
        // main div of Admin registration
        <div className="min-h-[100vh] w-full flex items-center justify-center  ">










            {/* bgc image div of Admin registration  */}
            <img
                className='h-full w-screen fixed top-0 left-0 z-[-999] object-cover '
                src={bgcImage} alt="" />











            {/* The div which contains the heading and also form wo input the data for registration */}
            <div className="custom_glassy_effect             min-h-[40vh]  rounded-lg    flex flex-col 
      w-screen m-10 mx-3  p-6    sm:w-[50%] sm:m-20 sm:p-10   ">



                <h1 className='  text-blue-950 mb-10 font-bold text-center
        text-2xl     sm:text-2xl'>Admin Registration</h1>













                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col gap-7 '>








                    <label
                        htmlFor=""
                        className='h-16 w-full flex flex-col  font-mono gap-0
            text-md       sm:text-sm   '>
                        Image:

                        <input
                            type="file"
                            placeholder='Enter the Fullname...'
                            className='custom_glassy_effect    h-full w-full rounded-lg px-5 text-base outline-none border-none text-zinc-600 font-semibold'
                            name='adminImage'
                            value={formData.image}
                            onChange={handleChange}
                            required
                        />

                    </label>













                    <label
                        htmlFor=""
                        className='h-16 w-full flex flex-col  font-mono gap-0
            text-md        sm:h-14 sm:text-sm '>
                        Fullname:

                        <input
                            type="text"
                            placeholder='Enter the Fullname...'
                            className='custom_glassy_effect    h-full w-full rounded-lg px-5 text-base outline-none border-none text-zinc-600 font-semibold'
                            name='fullname'
                            value={formData.fullname}
                            onChange={handleChange}
                            required
                        />

                    </label>













                    <label
                        htmlFor=""
                        className=' h-16 w-full flex flex-col  font-mono gap-0
            text-md        sm:text-sm '>
                        Email:

                        <input
                            type="text"
                            placeholder='Enter the Email...'
                            className='custom_glassy_effect    h-full w-full rounded-lg px-5 text-base outline-none border-none text-zinc-600 font-semibold'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                    </label>













                    <label
                        htmlFor=""
                        className=' h-16 w-full flex flex-col  font-mono gap-0
            text-md              sm:text-sm  '>
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
            text-md             sm:text-sm  '>
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











                    {/* 

          <label
            htmlFor=""
            className=' h-16 w-full flex flex-col  font-mono gap-0
            text-md  '>
                          Gst No:

            <input
              type="text"
              placeholder='Enter the Portfolio Url...'
              className='custom_glassy_effect    h-full w-full rounded-lg px-5 text-base outline-none border-none text-zinc-600 font-semibold'
              name='portfolioUrl'
              value={formData.portfolioUrl}
              onChange={handleChange}
            />

          </label> */}






                    {/* button for submit  */}
                    <button
                        type='submit'
                        className='h-10 w-full mx-auto rounded-lg text-zinc-300 bg-blue-600 text-lg font-bold mt-3 relative'
                    >
                        Register


                        {
                            laoder ?
                                <div className="absolute right-[30%] top-3">
                                    <Loader hw={20} />
                                </div> :
                                null
                        }



                    </button>









                    {/* for redirecting to teacher login page */}
                    <div className="">
                        <h1 className=' font-normal '>Already have an Account ?
                            <span className='text-blue-800 cursor-pointer' onClick={handleRegistrationSpanTagClick}> Login</span>
                        </h1>
                    </div>








                </form>
            </div>











        </div>
    )
}

export default AdminRegistration