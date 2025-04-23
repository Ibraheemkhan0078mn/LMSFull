import React, { useContext, useEffect } from 'react'
import bgcImage from '../assets/bgcImage6.jpeg'
import AdminNavbar from '../components/AdminNavbar'
import CoursesCardsContainer from '../components/CoursesCardsContainer'
import axios from 'axios'
import MyContext from '../context api/MyContext'
import { axiosReqFunc } from '../Api/axiosReqFunction'
















const AdminHome = () => {




  let { setCourseCardDataArray,
    setMainRole
   } = useContext(MyContext)














      useEffect(()=>{
          setMainRole("admin")           // with the help of this, we detect the main role such as admin, teacher or student and logout and navigate to correct page effectiverly
      },[])
  






















  useEffect(() => {
    try {


      async function fetchAllCourses() {
        // let response = await axios.get(import.meta.env.VITE_backend_base_Url + "/api/v1/TeacherRoutes/getAllCourses")


        let response= await axiosReqFunc("get", `/api/v1/TeacherRoutes/getAllCourses`, null)


        
        if (response) {
          // console.log(response.data)

          if (response.data.status == "success") {
            // let [courseCardDataArray, setCourseCardDataArray] = useState([])
            setCourseCardDataArray(response.data.allCourses)

          }
        }
      }

      fetchAllCourses()

    } catch (error) {
      console.log("From AdminHome", error)
    }
  }, [])







  return (
    <div className="min-h-[100vh] w-full  ">



      {/* Navbar component of Student profile*/}
      <AdminNavbar />












      {/* bgc image div of Student Profile*/}
      <img
        className='h-full w-full fixed top-0 left-0 z-[-999] object-cover '
        src={bgcImage} alt="" />

















      {/* courses cards on admin page */}
      <CoursesCardsContainer />

































    </div>
  )
}

export default AdminHome