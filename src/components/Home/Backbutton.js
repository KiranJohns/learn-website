import React from 'react';
import { useRouter } from 'next/router';
import { FaArrowAltCircleLeft } from "react-icons/fa";


const Backbutton = () => {
  return (
    <span style={{position:'absolute', marginLeft:"1.4rem", marginTop:"1.4rem", zIndex:"999"}} className=""><button style={{background:"white"}} onClick={() => history.back()}> <FaArrowAltCircleLeft className="back-fontsize"  style={{color:"#212a50", }}/></button></span >
  )
}

export default Backbutton