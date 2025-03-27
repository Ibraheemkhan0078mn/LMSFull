import React, { useContext } from 'react'
import { useState, useEffect, useRef } from 'react'
import logo from '../assets/lmsLogo.webp'
import 'remixicon/fonts/remixicon.css'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import axios from 'axios'
import MyContext from '../context api/MyContext'




const Navbar = () => {





    let signinPanelRef = useRef(null)
    let navigate = useNavigate()
    let { currentRenderedPage,
        signinPanelVisibility,
        setSigninPanelVisibility,
        setleftPanelVisibility,
        mainRole
    } = useContext(MyContext)






    // useEffect(() => {
    //     console.log(currentRenderedPage)
    // }, [currentRenderedPage])















    useEffect(() => {
        if (signinPanelRef.current) {


            if (signinPanelVisibility == "hide") {
                gsap.to(signinPanelRef.current, {
                    scale: 0
                })
            } else {
                gsap.to(signinPanelRef.current, {
                    scale: 1
                })
            }



        }


    }, [signinPanelVisibility, signinPanelRef.current])






















    function handleSignInBtnClick(e) {

        setleftPanelVisibility("hide")

        if (e.target == e.currentTarget) {
            if (signinPanelVisibility == "hide") {
                setSigninPanelVisibility("visible")
            } else {
                setSigninPanelVisibility("hide")
            }
        }

    }




















    // this only request the api in backend with generally remove it jwt token and also block this jwt
    async function handleLogoutIconClick() {
        try {

            if (mainRole == "teacher") {

                let response = await axios.get(import.meta.env.VITE_backend_base_Url + "/api/v1/TeacherRoutes/Logout", { withCredentials: true })
                if (response.data) {
                    alert("Successfully logout!")
                    navigate("/")
                }

            } else if (mainRole == "student") {
                let response = await axios.get(import.meta.env.VITE_backend_base_Url + "/api/v1/StudentRoutes/Logout", { withCredentials: true })
                if (response.data) {
                    alert("Successfully logout@")
                    navigate("/")
                }
            }



        } catch (err) {
            console.log("error from trycatch of frontend logout request", err)
        }
    }








































    return (
        // Main div of the navbar of landing page
        <div className=' custom_glassy_effect      h-max w-full  flex items-center justify-between fixed top-0 left-0 z-[999]
         py-3 px-5    sm:px-10 xl:px-8'>

















            {/* logo of navbar of landing page */}
            <img
                className=' h-12 w-12 sm:h-14 sm:w-14 md:h-14 md:w-14  lg:w-14 lg:h-14 
                '
                src={logo} alt="" />
























            {/* rendering of signin button or logout and menu icons according condition */}
            {currentRenderedPage == "LandingPage"

                ?



                // contains the signin btn and also the panel which open when the sign in is clicked
                <div className="h-max w-max flex items-center gap-5">


                    <div className='custom_glassy_effect_low         h-max w-max  rounded-lg shadow-md shadow-blue-950 text-blue-900   border-none outline-none flex items-center justify-center cursor-pointer relative
                    p-2 px-3 font-normal text-sm   sm:p-2 sm:px-5 sm:font-semibold sm:text-md'
                        onClick={handleSignInBtnClick}>
                        Sign-in


                        <div
                            ref={signinPanelRef}
                            style={{ scale: 0 }}
                            className="custom_glassy_high_white       min-h-10 absolute top-12 right-0 rounded-lg">
                            <button className='  h-12 w-full   ' onClick={() => { navigate("/AdminRegistration") }}>Admin</button>
                            <button className='  h-12 w-full  ' onClick={() => { navigate("/TeacherRegistration") }}>Teacher</button>
                            <button className='  h-12 w-full  ' onClick={() => { navigate("/StudentRegistration") }}>Student</button>
                        </div>


                    </div>


                    {/* <button className='custom_glassy_effect_low          h-10 w-24 rounded-lg shadow-md shadow-green-700 text-green-950 text-xl font-semibold'>Log-in</button> */}
                </div>


                :


                // constains the logout and menu icon 
                <div className="h-max w-max flex items-center 
                gap-3   sm:gap-5">
                    <i
                        onClick={handleLogoutIconClick}
                        className="ri-logout-box-line        text-zinc-800 cursor-pointer
                        text-2xl       sm:text-3xl  "></i>
                    <i className="ri-menu-line           text-zinc-800 
                    text-2xl       sm:text-3xl   "></i>
                </div>


            }




        </div>
    )
}












export default Navbar