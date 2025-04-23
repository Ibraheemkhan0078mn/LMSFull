import React, { useContext, useEffect } from 'react'
import MyContext from '../context api/MyContext'
import { useState } from 'react'







const VideoAndInfo = () => {


  let { currentClickedCourseData,
    lectureData
  } = useContext(MyContext)

  const [courseName, setCourseName] = useState("courseName")
  const [courseDiscription, setCourseDiscription] = useState("Due to some reason the discription is not showing the default one is displayed. The Developers will fix this very soon")
  const [courseTumbnailUrl, setCourseTumbnailUrl] = useState('')











  useEffect(() => {
    if (currentClickedCourseData) {
      setCourseDiscription(currentClickedCourseData.disc)
      setCourseName(currentClickedCourseData.name)
      setCourseTumbnailUrl(currentClickedCourseData.tumbnailUrl)
    }
  }, [currentClickedCourseData])

















  return (
    <div className=' custom_glassy_effect_low          h-full w-full  py-10  rounded-xl 
      pt-20 px-5              sm:pl-24 sm:pt-10 sm:px-10'>










      {/* It check that if lectureData usestate in Context api have value and it contain the videoUrl then display the video tag with video of this url otherwise display the tumbnail of course  */}
      {lectureData.videoUrl ?

        <video
          src={lectureData.videoUrl}
          controls
          className='  mt-10 mb-8 object-cotain rounded-lg
          h-full w-full  sm:min-h-56 sm:max-h-96'
        ></video>

        :

        // if no lecture in course is present then the tumbnail of course will show only on the screen
        <img src={courseTumbnailUrl}
          className='min-h-56  mt-10 mb-8 object-cotain rounded-lg'
          alt="" />
      }









      {/* The div which contain the name and discription of video */}
      <div className="pl-5 sm:pl-0">


        {/* name of lecture */}
        <h2 className=' font-bold
         text-xl    sm:ml-5 sm:text-2xl'>
          {lectureData.name
          }</h2>





        {/* discription of this lecture */}
        <p className=' text-zinc-700  
        mt-2 text-md      sm:text-md sm:mt-0 sm:ml-5'>
          {lectureData.discription}
        </p>




      </div>

    </div>
  )
}

export default React.memo(VideoAndInfo)