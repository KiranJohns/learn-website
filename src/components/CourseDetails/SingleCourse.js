import React from 'react'
import ReactPlayer from 'react-player'


const SingleCourse = () => {
  return (
    <div style={{}}>
      <div className='blog-box-shadow' style={{display:'flex',borderRadius:'.4rem', flexDirection:'column', margin:"3rem 0rem"}}>
        <h3 style={{padding:'1rem' , textAlign:'center'}}>Course name here</h3>
        <p style={{padding:'1rem'}}>Course Content: The course often covers a range of topics related to mental health and well-being, including stress management, coping skills, self-care, resilience, mindfulness, and emotional regulation.</p>
      </div>
      <div style={{display:'flex',justifyContent:"center"}}>

        <video className='course-player' controls src=""></video>

      {/* <ReactPlayer controls  className='course-player' url='https://www.youtube.com/watch?v=LXb3EKWsInQ' /> */}

      </div>
    </div>
    
  )
}

export default SingleCourse