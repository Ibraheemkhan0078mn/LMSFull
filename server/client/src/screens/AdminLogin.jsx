import React, { useContext, useEffect, useState } from 'react'
import bgcImage from '../assets/bgcImage6.jpeg'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import MyContext from '../context api/MyContext'
import Loader from '../components/Loader'











const AdminLogin = () => {

  let { setCurrentRenderedPage,
    setMainRole,
    setAdminProfileData
  } = useContext(MyContext)


  let navigate = useNavigate()
  let [loader, setLoader] = useState(null)
  let [formData, setFormData] = useState({
    phoneNo: "",
    password: "",
  })








  // set the current rendered page name and according which we render or hide some element
  useEffect(() => {
    setCurrentRenderedPage("AdminLogin")
    // this is admin login page therefore we set the mainRole when login successfully
  }, [])












  function handleChange(e) {
    let { value, name } = e.target;
    setFormData({ ...formData, [name]: value })

  }

















  async function handleSubmit(e) {
    e.preventDefault()


    setLoader("visible")     // to make the loader visible when process is begin



    try {


      let response = await axios.post(`${import.meta.env.VITE_backend_base_Url}/api/v1/AdminRoutes/Login`, formData, { withCredentials: true })


      if (response.data) {

        setLoader(null)    // to make the loader hide

        console.log(response.data)

        if (response.data.status == "success") {
          alert(response.data.msg)
          setAdminProfileData(response.data.existingAdmin)
          navigate("/AdminHome")
        } else if (response.data.status == "error") {
          console.error(response.data)
        } else if (response.data.status == "failed") {
          alert(response.data.msg)
        }

        else {
          alert(response.data.msg)
        }
      }

    } catch (err) {
      console.log("from try and catch of submit function of TeacherRegistration", err)
    }



  }









  function handleLoginSpanTagClick() {
    navigate("/AdminRegistration")
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
      my-10 mx-2 w-full   sm:m-18 sm:w-[50%] ">










        {/* Heading of Teacher lOgin page */}
        <h1 className=' text-3xl text-blue-950 mb-10 font-bold text-center'>
          Admin Login
        </h1>














        {/* Form of Teacher Login page */}
        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-7 '>














          <label
            htmlFor=""
            className='h-16 w-full flex flex-col  font-mono gap-0
            text-md  sm:text-md  '>
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
            className='h-16 w-full flex flex-col  font-mono gap-0
            text-md  sm:text-md  '>
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
            className='h-10 w-full mx-auto rounded-lg text-zinc-300 bg-blue-600 font-bold text-xl mt-3 relative '
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
          <div className="ml-1 select-none">
            <h1 className=' font-normal '>No Account ?
              <span className='text-blue-800 cursor-pointer' onClick={handleLoginSpanTagClick}> Register</span>
            </h1>
          </div>








        </form>
      </div>











    </div>
  )
}

export default AdminLogin