import React, { useState, useRef } from 'react';
import Link from 'next/link';
import 'bootstrap-icons/font/bootstrap-icons.css';

function DashboardBar() {
  const inputRef = useRef(null);

  const handleImage = () => {
    inputRef.current.click();
  };

  const handleLogout = () => {
    localStorage.removeItem("learnforcare_access");
    location.pathname = "/";
  };

  return (
    <div className='' style={{ padding: '16px', backgroundColor:'#212450' }}>
        <div  style={{backgroundColor:'white',padding:'1rem',borderRadius:'.5rem',height:'12rem', width:"11rem"}}>
      <div style={{display:'flex', justifyContent:'center' }} onClick={handleImage}>
        <img
          style={{ width: '70px', height: '70px', borderRadius: '70px', cursor: 'pointer' }}
          src="/assets/img/testimonial/profilePic.webp"
          alt=""
        />
        <input type="file" ref={inputRef} style={{ display: 'none' }} />
      </div>
    <div className='mt-4 ' style={{display:'flex',flexDirection:'column' }}>
      
      <h6 style={{color:"#212450", textAlign:'center'}}>User Name<br/></h6>
      <h6 style={{color:"#212450", textAlign:'center'}}>Company Name<br/></h6>
     
    </div>
    </div>
      <hr className='text-white' />
      <div className='list-group list-group-flush text-nowrap' style={{ overflow: 'hidden' }}>

        <Link href="/company/dashboard"><div className='list-group-item  py-2 px-2 text-center' >
          <i className='bi bi-house txttsml me-1' style={{ color: '#fff' }}></i>
          <span className='txttsml' style={{ color: '#fff' }}>
            Dashboard
          </span>
        </div></Link>

       <Link href="/company/myprofile"><div className='list-group-item py-2 px-2 text-center'>
          <i className='bi bi-person-circle txttsml me-1' style={{ color: '#fff' }}></i>
          <span className='txttsml' style={{ color: '#fff' }}>
          My Profile
          </span>
        </div></Link> 

        <Link href="/company/mycourses"><div className='list-group-item py-2 px-2 text-center'>
          <i className='bi bi-archive txttsml me-1' style={{ color: '#fff' }}></i>
          <span className='txttsml' style={{ color: '#fff' }}>
           My Courses
          </span>
        </div></Link>

       <Link href="/company/certificates"><div className='list-group-item py-2 px-2 text-center'>
          <i className='bi bi-patch-check-fill txttsml me-1' style={{ color: '#fff' }}></i>
          <span className='txttsml' style={{ color: '#fff' }}>
            Certificates
          </span>
        </div></Link> 

       <Link href="/company/availablecourses"><div className='list-group-item py-2 px-2 text-center'>
          <i className='bi bi-card-checklist txttsml me-1' style={{ color: '#fff' }}></i>
          <span className='txttsml' style={{ color: '#fff' }}>
           All Courses
          </span>
        </div></Link> 

        <Link href="/company/createuser"><div className='list-group-item py-2 px-2 text-center'>
          <i className='bi bi-person-check txttsml me-1' style={{ color: '#fff' }}></i>
          <span className='txttsml' style={{ color: '#fff' }}>
           Create User
          </span>
        </div></Link> 

       <Link href="/company/showuser"><div className='list-group-item py-2 px-2 text-center'>
          <i className='bi bi-person-check txttsml me-1' style={{ color: '#fff' }}></i>
          <span className='txttsml' style={{ color: '#fff' }}>
           Show User
          </span>
        </div></Link> 

      <Link href="/company/archive"><div className='list-group-item py-2 px-2 text-center'>
          <i className='bi bi-person-fill-slash txttsml me-1' style={{ color: '#fff' }}></i>
          <span className='txttsml' style={{ color: '#fff' }}>
           Archive User
          </span>
        </div></Link>  

        <Link href="/company/assigncourse"><div className='list-group-item py-2 px-2 text-center'>
          <i className='bi bi-person-fill-slash txttsml me-1' style={{ color: '#fff' }}></i>
          <span className='txttsml' style={{ color: '#fff' }}>
          Assign Course
          </span>
        </div></Link>  

  

       <div  onClick={handleLogout} className='list-group-item py-2 px-2 text-center'>
          <i className='bi bi-box-arrow-left txttsml me-2' style={{ color: '#fff' }}></i>
          <span className='txttsml' style={{ color: '#fff' }}>
            Logout
          </span>
        </div>

        <span className=' py-2 px-2'></span>
 

      </div>
    </div>
  );
}

export default DashboardBar;