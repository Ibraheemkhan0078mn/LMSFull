import React, { useContext, useEffect } from 'react'
import AdminNavbar from '../components/AdminNavbar'
import bgcImage from '../assets/bgcImage6.jpeg'
import MyContext from '../context api/MyContext'







const AdminAbout = () => {






    let {setMainRole,
        adminProfileData
    }= useContext(MyContext)













    useEffect(()=>{
        setMainRole("admin")
    },[])










    return (
        <div>

            <div className="min-h-[110vh] w-full  ">



                {/* Navbar component of Student profile*/}
                <AdminNavbar />












                {/* bgc image div of Student Profile*/}
                <img
                    className='h-full w-full fixed top-0 left-0 z-[-999] object-cover '
                    src={bgcImage} alt="" />















            <div className="custom_glassy_effect_low             h-max w-full absolute top-32 p-10 
            block    custom500:flex custom500:gap-10 custom500:top-24">

                <div className="h-full w-full flex justify-center mb-10 mt-5">
                    <img 
                    className=' w-full sm:w-64 rounded-lg'
                    src={adminProfileData?.imageUrl} alt="" />
                </div>


                <div className="h-max w-full ">
                    <h1 className='font-bold text-xl '>ID: <span className='text-sm font-semibold sm: text-gray-900'>id1242hf683nhjf73hh3438</span></h1>
                    <h1 className='font-bold text-xl '>Name: <span className='text-sm font-semibold sm: text-gray-900'>Ibrahim</span></h1>
                    <h1 className='font-bold text-xl '>Email: <span className='text-sm font-semibold sm: text-gray-900'>ikkhan007@gmail.com</span></h1>
                    <h1 className='font-bold text-xl '>Phone No: <span className='text-sm font-semibold sm: text-gray-900'>03361917812</span></h1>
                    <h1 className='font-bold text-xl '>Introduction: <span className='text-sm font-semibold sm: text-gray-900'>Hi. I am Ibrahim and I am mern stack developer. I know to code in Html, Css, Javascript, React, Node.js, Express.js, Mongodb and socket.io. I also know to play with jwt tokens, cookies, cors etc. I have experience to deploy the mern servereless website on render and also the frontend on netlify. I have three project as a proof of my work which are chatting webapp, E-commerce webapp and current Learning Management System. </span></h1>

                </div>

            </div>














            </div>



        </div>




    )
}

export default AdminAbout