import React, { Component } from 'react';
import Link from 'next/link';
import 'bootstrap-icons/font/bootstrap-icons.css'

class IndividualBar extends Component{
    render(){
        return(
         <div className='bg-white' style={{padding:"16px"}}>  
          {/* <div className='px-4 mt-4  text-nowrap' style={{overflow:'hidden'}}>
            <i className='bi bi-person-circle py-2' style={{color: "#004b55"}}></i>
           <span className='brand-name my-2 fs-5 px-2 ' style={{color: "#004b55",width:'240px'}}>Jamie Oliver</span>
          </div> */}
                <hr className='text-white'/>
                <div className='list-group list-group-flush text-nowrap' style={{overflow:'hidden'}}>
                
                  {/* <a className='list-group-item py-2'>
                    <i className='bi bi-speedometer2 fs-6 me-2'>
                     <span>Dashboard</span>
                    </i>
                  </a> */}
                  
                  <div className='list-group-item py-2 px-2'>
                    <i className='bi bi-house txttsml me-2' style={{color: "#004b55"}}></i>
                  {/* <Link className='fs-6 ' style={{color: "#3E001F"}} href="/company/dashboard">Dashboard</Link> */}
                  <span  className='txttsml' style={{color: "#004b55"}}>
                      <Link href="/individual/dashboard">
                    Dashboard
                    </Link></span>  
                  </div>

                  <div className='list-group-item py-2 px-2'>
                    <i className='bi bi-person-circle txttsml me-2' style={{color: "#004b55"}}></i>
                    {/* <Link className='fs-6 ' style={{color: "#3E001F"}} href="/company/myprofile">My Profile</Link>     */}
                    <span  className='txttsml' style={{color: "#004b55"}}>
                      <Link href="/individual/myprofile">
                      My Profile
                      </Link></span>             
                  </div>

                  <div className='list-group-item py-2 px-2'>
                    <i className='bi bi-archive txttsml me-2' style={{color: "#004b55"}}></i>
                    {/* <span className='fs-6 ' style={{color: "#3E001F"}}><Link href="/company/mycourses">My Courses</Link></span>   */}
                    <span  className='txttsml' style={{color: "#004b55"}}>
                      <Link href="/individual/mycourses">
                      My Courses
                      </Link></span>                     
                  </div>

                  <div className='list-group-item py-2 px-2'>
                    <i className='bi bi-patch-check-fill txttsml me-2' style={{color: "#004b55"}}></i>
                   {/* <Link className='fs-6 ' style={{color: "#3E001F"}} href="/company/mycourses">Certificates</Link> */}
                   <span  className='txttsml' style={{color: "#004b55"}}>
                      <Link href="/individual/certificates">
                    Certificates
                    </Link></span>  
                  </div>

                  <div className='list-group-item py-2 px-2'>
                    <i className='bi bi-card-checklist txttsml me-2' style={{color: "#004b55"}}></i>
                    {/* <Link className='fs-6 ' style={{color: "#3E001F"}} href="/company/availablecourses">Available Courses</Link> */}
                    <span  className='txttsml' style={{color: "#004b55"}}>
                      <Link href="/individual/availablecourses">
                      All Courses
                      </Link></span>  
                  </div>  

                  <div className='list-group-item py-2 px-2'>
                    <i className='bi bi-envelope txttsml me-2' style={{color: "#004b55"}}></i>
                    {/* <Link className='fs-6 ' style={{color: "#3E001F"}} href="/company/availablecourses">Available Courses</Link> */}
                    <span  className='txttsml' style={{color: "#004b55"}}>
                      <Link href="/individual/availablecourses">
                      Contact Us
                      </Link></span>  
                  </div>  

                  <div className='list-group-item py-2 px-2'>
                    <i className='bi bi-question txttsml me-2' style={{color: "#004b55"}}></i>
                    {/* <Link className='fs-6 ' style={{color: "#3E001F"}} href="/company/availablecourses">Available Courses</Link> */}
                    <span  className='txttsml' style={{color: "#004b55"}}>
                      <Link href="/individual/availablecourses">
                      FAQ
                      </Link></span>  
                  </div>  
                 
                  <span  className='txttsml' style={{color: "#004b55"}}>  </span> 
                  
                      
                </div>
            </div>                 
        )
    }
} 
export default IndividualBar