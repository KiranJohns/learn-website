import React, { useState, useRef } from 'react';
import Link from 'next/link';
import 'bootstrap-icons/font/bootstrap-icons.css';

function DashboardBar() {
  const inputRef = useRef(null);

  const handleImage = () => {
    inputRef.current.click();
  };

  return (
    <div className='bg-primary' style={{ padding: '16px' }}>
        <div  style={{backgroundColor:'white',padding:'1rem',borderRadius:'.5rem'}}>
      <div style={{display:'flex', justifyContent:'center' }} onClick={handleImage}>
        <img
          style={{ width: '70px', height: '70px', borderRadius: '70px', cursor: 'pointer' }}
          src="/assets/img/testimonial/profilePic.webp"
          alt=""
        />
        <input type="file" ref={inputRef} style={{ display: 'none' }} />
      </div>
    <div className='mt-4 ' style={{display:'flex', justifyContent:'center' }}><h6 style={{color:"#004b55"}}>Company Name</h6>
   
    </div>
    </div>
      <hr className='text-white' />
      <div className='list-group list-group-flush text-nowrap' style={{ overflow: 'hidden' }}>

        <div className='list-group-item  py-2 px-2'>
          <i className='bi bi-house txttsml me-2' style={{ color: '#fff' }}></i>
          <span className='txttsml' style={{ color: '#fff' }}>
            <Link href="/company/dashboard">Dashboard</Link>
          </span>
        </div>

        <div className='list-group-item py-2 px-2'>
          <i className='bi bi-person-circle txttsml me-2' style={{ color: '#fff' }}></i>
          <span className='txttsml' style={{ color: '#fff' }}>
            <Link href="/company/myprofile">My Profile</Link>
          </span>
        </div>

        <div className='list-group-item py-2 px-2'>
          <i className='bi bi-archive txttsml me-2' style={{ color: '#fff' }}></i>
          <span className='txttsml' style={{ color: '#fff' }}>
            <Link href="/company/mycourses">My Courses</Link>
          </span>
        </div>

        <div className='list-group-item py-2 px-2'>
          <i className='bi bi-patch-check-fill txttsml me-2' style={{ color: '#fff' }}></i>
          <span className='txttsml' style={{ color: '#fff' }}>
            <Link href="/company/certificates">Certificates</Link>
          </span>
        </div>

        <div className='list-group-item py-2 px-2'>
          <i className='bi bi-card-checklist txttsml me-2' style={{ color: '#fff' }}></i>
          <span className='txttsml' style={{ color: '#fff' }}>
            <Link href="/company/availablecourses">All Courses</Link>
          </span>
        </div>

        <div className='list-group-item py-2 px-2'>
          <i className='bi bi-person-gear txttsml me-2' style={{ color: '#fff' }}></i>
          <span className='txttsml' style={{ color: '#fff' }}>
            <Link href="/company/createuser">Create User</Link>
          </span>
        </div>

        <div className='list-group-item py-2 px-2'>
          <i className='bi bi-person-check txttsml me-2' style={{ color: '#fff' }}></i>
          <span className='txttsml' style={{ color: '#fff' }}>
            <Link href="/company/showuser">Show User</Link>
          </span>
        </div>

        <div className='list-group-item py-2 px-2'>
          <i className='bi bi-person-fill-slash txttsml me-2' style={{ color: '#fff' }}></i>
          <span className='txttsml' style={{ color: '#fff' }}>
            <Link href="/company/archive">Archive User</Link>
          </span>
        </div>

        <div className='list-group-item py-2 px-2'>
          <i className='bi bi-people txttsml me-2' style={{ color: '#fff' }}></i>
          <span className='txttsml' style={{ color: '#fff' }}>
            <Link href="/company/assigncourse">Assign Course</Link>
          </span>
        </div>
        <span className=' py-2 px-2'></span>
 

      </div>
    </div>
  );
}

export default DashboardBar;