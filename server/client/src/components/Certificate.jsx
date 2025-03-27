import React, { useContext } from 'react'
import logo from '../assets/lmsLogo.webp'
import MyContext from '../context api/MyContext'

const Certificate = ({certificateData}) => {














  return (
    <div className='custom_glassy_effect        h-max w-80 rounded-lg p-5 relative flex flex-col '>





    {/* background image of certificate */}
    <img
      className='w-[80%]  absolute translate-y-1/3 translate-1/2 opacity-30 select-none'
      src={logo}
      alt="" />







    {/* heading of certificate */}
    <div className="text-2xl w-full text-center text-zinc-800 font-bold underline">
      Certificate of Completion
    </div>








    {/* main body content of certificate */}
    <div className="mt-5  text-sm text-center ">
      This is to clarify that <span className='font-bold'>{certificateData.studentName}</span> has successfully completed the course of <span className='font-bold'>{certificateData.courseName}</span> by <span className='font-bold'>{certificateData.createrName} </span> with score of <span className='font-bold'>{certificateData.percentage}%</span>.
    </div>



    <div className="mt-10">
      {/* <h2 className='text-xl font-semibold underline'>Issued by:</h2> */}
      <div className="ml-2">
        <h3 className='text-sm text-gray-800 '><span className='font-bold text-lg underline'>Institute:</span> IK Learning Managment System</h3>
        <h3 className='text-sm text-gray-800 '><span className='font-bold text-lg underline'>ID:</span> {certificateData._id}</h3>
        <h3 className='text-sm text-gray-800 '><span className='font-bold text-lg underline'>Instructor:</span> {certificateData.createrName}</h3>
        <h3 className='text-sm text-gray-800 '><span className='font-bold text-lg underline'>Course Name:</span> {certificateData.courseName}</h3>
        <h3 className='text-sm text-gray-800 '><span className='font-bold text-lg underline'>Catagory:</span> {certificateData.courseId.catagory }</h3>
        <h3 className='text-sm text-gray-800 '><span className='font-bold text-lg underline'>Date:</span> {certificateData.createdAt}</h3>
      </div>
    </div>

  </div>
  )
}

export default Certificate