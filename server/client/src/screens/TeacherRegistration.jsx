import React, { useContext, useEffect, useState } from 'react'
import bgcImage from '../assets/bgcImage6.jpeg'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import MyContext from '../context api/MyContext'
import Loader from '../components/Loader.jsx'










const TeacherRegistration = () => {


  let navigate = useNavigate()


  let { setCurrentRenderedPage,
    setMainRole,
    setTeacherProfileData
  } = useContext(MyContext)


  let [laoder, setLoader] = useState(null)
  let [formData, setFormData] = useState({
    teacherProfileImage: "",
    username: "",
    email: "",
    phoneNo: "",
    password: "",
    portfolioUrl: ""
  })

















  // set the current rendered page name and according which we render or hide some element
  useEffect(() => {
    setMainRole("teacher")
    setCurrentRenderedPage("TeacherRegistration")
  }, [])





















  function handleChange(e) {
    let { value, name, files } = e.target;
    if (name == "teacherProfileImage") {
      setFormData({ ...formData, [name]: files[0] })

    } else {
      setFormData({ ...formData, [name]: value })

    }


  }









  async function handleSubmit(e) {
    e.preventDefault()


    setLoader("visible")     // to make the loader visible when process is begin



    try {
      // console.log(import.meta.env.VITE_backend_base_Url)
      // console.log(formData)


      let formDataToUpload = new FormData()
      for (let key in formData) {
        if (formData[key]) {
          formDataToUpload.append(key, formData[key])
        }
      }

 


      let response = await axios.post(`${import.meta.env.VITE_backend_base_Url}/api/v1/TeacherRoutes/Registration`, formDataToUpload, { withCredentials: true })
      if (response.data) {
        console.log(response.data)
        setLoader(null)   //  to make the loader hide

        if (response.data.status == "success") {
          alert("Successfully Registered")
          setTeacherProfileData(response.data.createdTeacher)
          navigate("/TeacherProfile")
        } else {
          alert(response.data.msg)
        }
      }

    } catch (err) {
      console.log("from try and catch of submit function of TeacherRegistration", err)
    }


  }
























  function handleRegistrationSpanTagClick(e) {
    // console.log("enter in the function handleRegistrationSpanTagClick")
    navigate("/TeacherLogin")
  }


































  return (
    // main div of teacher registration
    <div className="min-h-[100vh] w-full flex items-center justify-center  ">










      {/* bgc image div of teacher registration  */}
      <img
        className='h-full w-screen fixed top-0 left-0 z-[-999] object-cover '
        src={bgcImage} alt="" />











      {/* The div which contains the heading and also form wo input the data for registration */}
      <div className="custom_glassy_effect             min-h-[40vh]  rounded-lg    flex flex-col 
      w-screen m-16 mx-3  p-6    sm:w-[50%] sm:m-20 sm:p-10  ">



        <h1 className='  text-blue-950 mb-10 font-bold text-center
        text-2xl     sm:text-3xl'>Teacher Registration</h1>





        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-7 '>








          <label
            htmlFor=""
            className='h-16 w-full flex flex-col  font-mono gap-0
            text-md   '>
            Image:

            <input
              type="file"
              placeholder='Enter the username...'
              className='custom_glassy_effect    h-full w-full rounded-lg px-5 text-base outline-none border-none text-zinc-600 font-semibold'
              name='teacherProfileImage'
              onChange={handleChange}
            />

          </label>
















          <label
            htmlFor=""
            className='h-16 w-full flex flex-col  font-mono gap-0
            text-md   '>
            Username:

            <input
              type="text"
              placeholder='Enter the username...'
              className='custom_glassy_effect    h-full w-full rounded-lg px-5 text-base outline-none border-none text-zinc-600 font-semibold'
              name='username'
              value={formData.username}
              onChange={handleChange}
              required
            />

          </label>













          <label
            htmlFor=""
            className=' h-16 w-full flex flex-col  font-mono gap-0
            text-md '>
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
            text-md '>
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
            text-md '>
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













          <label
            htmlFor=""
            className=' h-16 w-full flex flex-col  font-mono gap-0
            text-md  '>
            Portfolio Url:

            <input
              type="text"
              placeholder='Enter the Portfolio Url...'
              className='custom_glassy_effect    h-full w-full rounded-lg px-5 text-base outline-none border-none text-zinc-600 font-semibold'
              name='portfolioUrl'
              value={formData.portfolioUrl}
              onChange={handleChange}
            />

          </label>






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

export default TeacherRegistration