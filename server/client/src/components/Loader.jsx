import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

const Loader = ({hw}) => {


  let loaderMainDiv= useRef(null);

  // useEffect(()=>{
  //   if(loaderMainDiv){
  //     gsap.to(loaderMainDiv.current, {
  //       rotation:360,
  //       duration:2,
  //       repeat:-1,
  //       ease:"none"
        
  //     })
  //   }
  // },[loaderMainDiv.current])





  return (
    <div ref={loaderMainDiv} className=' custom_loader_anim   rounded-full bg-transparent  border-4 border-t-blue-950 '
    style={{height:hw, width:hw}}>
        <div className=""></div>
    </div>
  )
}

export default Loader