import React, { useContext, useEffect, useState } from 'react'
import bgcImage from '../assets/bgcImage6.jpeg'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import MyContext from '../context api/MyContext'
import Loader from '../components/Loader'
import { axiosReqFunc } from '../Api/axiosReqFunction'











const StudentRegistration = () => {


  let navigate = useNavigate()



  let { setCurrentRenderedPage,
    setMainRole,
    setStudentProfileData
  } = useContext(MyContext)


  let [loaderVisibility, setLoaderVisibility] = useState(null)


  let [formData, setFormData] = useState({
    studentProfileImage: "",
    username: "",
    email: "",
    phoneNo: "",
    password: "",
  })









  // set the current rendered page name and according which we render or hide some element
  useEffect(() => {
    setMainRole("student")
    setCurrentRenderedPage("StudentRegistration")
    setLoaderVisibility(null)
    // setLoaderVisibility("visible")
  }, [])













  function handleChange(e) {
    let { value, name, files } = e.target;
    if (name == "studentProfileImage") {
      setFormData({ ...formData, [name]: files[0] })
    } else {
      setFormData({ ...formData, [name]: value })
    }

  }


















  async function handleSubmit(e) {
    e.preventDefault()

    setLoaderVisibility("visible")

    try {

      let formDataToSend = new FormData()

      for (let key in formData) {
        formDataToSend.append(key, formData[key])
      }




      // let response = await axios.post(import.meta.env.VITE_backend_base_Url + "/api/v1/StudentRoutes/Registration", formDataToSend, { withCredentials: true })

      let method = "post"
      let url = `/api/v1/StudentRoutes/Registration`
      let data = formDataToSend

      let response = await axiosReqFunc(method, url, data)





      

      if (response.data) {

        setLoaderVisibility(null)

        if (response.data.status == "success") {
          setMainRole("student")
          // setStudentProfileData(response.data)
          navigate("/StudentProfile")
        } else if (response.data.status == "error") {
          alert("Server internel error")
        } else {
          alert(response.data.msg)
        }
      }

    } catch (err) {
      console.log("From Trycatch of Registration of student", err)
    }
  }














  function handleRegistrationSpanTagClick(e) {
    navigate("/StudentLogin")
  }





























  return (
    // main div of teacher registration
    <div className="min-h-[100vh] w-full flex items-center justify-center  ">










      {/* bgc image div of teacher registration  */}
      <img
        className='h-full w-full fixed top-0 left-0 z-[-999] object-cover '
        src={bgcImage} alt="" />











      {/* The div which contains the heading and also form wo input the data for registration */}
      <div className="custom_glassy_effect             min-h-[40vh] rounded-lg   p-8 flex flex-col 
      w-full my-10 mx-3    sm:m-20 sm:w-[50%]">



        <h1 className=' text-2xl text-blue-950 mb-10 font-bold text-center'>Student Registration</h1>





        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-7 '>








          <label
            htmlFor=""
            className=' h-16 w-full flex flex-col  font-mono gap-0
            text-md    '>
            Image:

            <input
              type="file"
              placeholder='Enter the username...'
              className='custom_glassy_effect    h-full w-full rounded-lg px-5 text-base outline-none border-none text-zinc-600 font-semibold'
              name='studentProfileImage'
              onChange={handleChange}
            // required
            />

          </label>













          <label
            htmlFor=""
            className=' h-16 w-full flex flex-col  font-mono gap-0
            text-md    '>
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
            text-md    '>
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
            className='h-10 w-full mx-auto rounded-lg font-bold  text-zinc-300 bg-blue-600 text-lg mt-0  relative '
          >
            Register

            {loaderVisibility ?

              <div className="absolute right-20 top-3">
                <Loader hw={20} />
              </div>
              :
              null}
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

export default StudentRegistration