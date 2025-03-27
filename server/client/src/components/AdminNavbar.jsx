import React, { useContext } from 'react'
import { useState, useEffect, useRef } from 'react'
import logo from '../assets/lmsLogo.webp'
import 'remixicon/fonts/remixicon.css'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import axios from 'axios'
import MyContext from '../context api/MyContext'




const AdminNavbar = () => {





    let signinPanelRef = useRef(null)
    let navigate = useNavigate()
    let { currentRenderedPage,
        signinPanelVisibility,
        setSigninPanelVisibility,
        setleftPanelVisibility,
        setCurrentNavigation,
        currentNavigation } = useContext(MyContext)

























    // this only request the api in backend with generally remove it jwt token and also block this jwt
    async function handleLogoutIconClick() {
        try {

            let response = await axios.get(import.meta.env.VITE_backend_base_Url + "/api/v1/AdminRoutes/Logout", { withCredentials: true })

            if (response.data) {

                console.log(response.data)

                if (response?.data.status == "success") {
                    alert("The admin is successfully logout")
                    navigate("/")
                } else {
                    alert("Somethings went wrong in logout")
                }

            }


        } catch (err) {
            console.log("error from trycatch of frontend logout request", err)
        }
    }








































    return (
        // Main div of the navbar of landing page
        <div className=' custom_glassy_effect      h-max w-full  flex justify-between fixed top-0 left-0 z-[999] overflow-x-hidden
         py-3 px-3    sm:px-10 xl:px-8 custom500:items-center'>








            {/* logo of navbar of landing page */}
            <img
                className=' h-12 w-12 ml-2 mt-1 sm:h-14 sm:w-14 md:h-14 md:w-14  lg:w-14 lg:h-14 
                '
                src={logo} alt="" />


















            <ul className='        h-full w-max flex gap-x-4 text-sm text-gray-900 mt-16 custom500:mt-0 '>
                <li
                    className='cursor-pointer'
                    onClick={
                        () => {
                            setCurrentNavigation("home");
                            navigate("/AdminHome")
                        }}
                    style={currentNavigation == "home" ? { paddingBottom: "3px", borderBottom: "2px solid gray" } : null}
                >
                    Home
                </li>


                <li
                    className='cursor-pointer'
                    onClick={
                        () => {
                            setCurrentNavigation("teachers");
                            navigate("/AdminSideTeachers")
                        }
                    }
                    style={currentNavigation == "teachers" ? { paddingBottom: "1px", borderBottom: "2px solid gray" } : null}
                >
                    Teachers
                </li>


                <li
                    className='cursor-pointer'
                    onClick={() => {
                        setCurrentNavigation("students");
                        navigate("/AdminSideStudents")
                    }}
                    style={currentNavigation == "students" ? { paddingBottom: "1px", borderBottom: "2px solid gray" } : null}
                >
                    Students
                </li>


                <li
                    className='cursor-pointer'
                    onClick={() => {
                        setCurrentNavigation("about");
                        navigate("/AdminAbout")
                    }}
                    style={currentNavigation == "about" ? { paddingBottom: "1px", borderBottom: "2px solid gray" } : null}
                >
                    About
                </li>


            </ul>






















            {/*  constains the logout and menu icon  */}
            <div className="h-max w-max flex items-center ml-[-25px] mt-2 
                gap-3   sm:gap-5">
                <i
                    onClick={handleLogoutIconClick}
                    className="ri-logout-box-line        text-zinc-800 cursor-pointer
                        text-2xl       custom500:text-xl  ">

                </i>
                <i
                    className="ri-menu-line           text-zinc-800 
                    text-2xl       sm:text-xl   ">

                </i>
            </div>















        </div>
    )
}












export default AdminNavbar