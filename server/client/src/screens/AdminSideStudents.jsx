import React, { useContext, useEffect } from 'react'
import bgcImage from '../assets/bgcImage6.jpeg'
import AdminNavbar from '../components/AdminNavbar'
import MyContext from '../context api/MyContext'
import axios from 'axios'
import { axiosReqFunc } from '../Api/axiosReqFunction'

const AdminSideStudents = () => {



    let { allStudentsdata,
        setMainRole,
        setAllStudentsdata } = useContext(MyContext)









    useEffect(() => {
        setMainRole("admin")           // with the help of this, we detect the main role such as admin, teacher or student and logout and navigate to correct page effectiverly
    }, [])














    useEffect(() => {
        async function fetchAllStudentsData() {

            // let response = await axios.get(import.meta.env.VITE_backend_base_Url + "/api/v1/StudentRoutes/getAllStudentsData")

            let method = "get"
            let url = `/api/v1/StudentRoutes/getAllStudentsData`
            let data = null

            let response = await axiosReqFunc(method, url, data)


            

            if (response.data?.status == "success") {
                console.log(response.data.AllStudentsData)
                setAllStudentsdata(response.data.AllStudentsData)
            } else {
                console.log(response.data?.msg)
            }


        }


        fetchAllStudentsData()
    }, [])




















    return (
        <div className="min-h-[100vh] w-full  ">



            {/* Navbar component of Student profile*/}
            <AdminNavbar />












            {/* bgc image div of Student Profile*/}
            <img
                className='h-full w-full fixed top-0 left-0 z-[-999] object-cover '
                src={bgcImage} alt="" />

















            {/* The cards of Students on admin side */}
            <div className="h-max w-full absolute top-32 p-2 flex flex-wrap justify-center gap-x-2 gap-y-2">




                {

                    allStudentsdata.map((eachStudentData, index) => {
                        return (
                            <div key={index} className="custom_glassy_effect_low            h-max w-44 rounded-md p-2 ">
                                <img
                                    className='h-max w-full object-contain '
                                    src={bgcImage} alt="" />
                                <h1 className='text-sm mt-2 font-bold'>Name: <span className='font-normal'>{eachStudentData.username}</span></h1>
                                <h1 className='text-sm font-bold '>Phone No. <span className='font-normal'>{eachStudentData.phoneNo}</span></h1>
                            </div>
                        )
                    })

                }










            </div>



















        </div>
    )
}

export default AdminSideStudents