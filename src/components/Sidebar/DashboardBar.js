import React, { Component } from 'react';
import Link from 'next/link';
import 'bootstrap-icons/font/bootstrap-icons.css'

class DashboardBar extends Component{
    render(){
        return(
         <div className='bg-white'>  
          <div className='px-4'>
            <i className='bi bi-person-circle py-2 px-2' style={{color: "#142A89"}}></i>
           <span className='brand-name my-2 fs-5' style={{color: "#142A89"}}>Jamie Oliver</span>
          </div>
                <hr className='text-dark'/>
                <div className='list-group list-group-flush'>
                
                  {/* <a className='list-group-item py-2'>
                    <i className='bi bi-speedometer2 fs-6 me-2'>
                     <span>Dashboard</span>
                    </i>
                  </a> */}
                  <div className='list-group-item py-2 px-2'>
                    <i className='bi bi-house txttsml me-2' style={{color: "#142A89"}}></i>
                  {/* <Link className='fs-6 ' style={{color: "#142A89"}} href="/company/dashboard">Dashboard</Link> */}
                  <span  className='txttsml' style={{color: "#142A89"}}>
                      <Link href="/company/dashboard">
                    Dashboard
                    </Link></span>  
                  </div>

                  <div className='list-group-item py-2 px-2'>
                    <i className='bi bi-table txttsml me-2' style={{color: "#142A89"}}></i>
                    {/* <Link className='fs-6 ' style={{color: "#142A89"}} href="/company/myprofile">My Profile</Link>     */}
                    <span  className='txttsml' style={{color: "#142A89"}}>
                      <Link href="/company/myprofile">
                      My Profile
                      </Link></span>             
                  </div>

                  <div className='list-group-item py-2 px-2'>
                    <i className='bi bi-clipboard-data txttsml me-2' style={{color: "#142A89"}}></i>
                    {/* <span className='fs-6 ' style={{color: "#142A89"}}><Link href="/company/mycourses">My Courses</Link></span>   */}
                    <span  className='txttsml' style={{color: "#142A89"}}>
                      <Link href="/company/mycourses">
                      My Courses
                      </Link></span>                     
                  </div>

                  <div className='list-group-item py-2 px-2'>
                    <i className='bi bi bi-file txttsml me-2' style={{color: "#142A89"}}></i>
                   {/* <Link className='fs-6 ' style={{color: "#142A89"}} href="/company/mycourses">Certificates</Link> */}
                   <span  className='txttsml' style={{color: "#142A89"}}>
                      <Link href="/company/certificates">
                    Certificates
                    </Link></span>  
                  </div>

                  <div className='list-group-item py-2 px-2'>
                    <i className='bi bi-card-checklist txttsml me-2' style={{color: "#142A89"}}></i>
                    {/* <Link className='fs-6 ' style={{color: "#142A89"}} href="/company/availablecourses">Available Courses</Link> */}
                    <span  className='txttsml' style={{color: "#142A89"}}>
                      <Link href="/company/availablecourses">
                      All Courses
                      </Link></span>  
                  </div>

                  <div className='list-group-item py-2 px-2'>
                    <i className='bi bi-person-gear txttsml me-2' style={{color: "#142A89"}}></i>
                    {/* <Link className='fs-6 ' style={{color: "#142A89"}} href="/company/createuser">Create User</Link> */}
                    <span  className='txttsml' style={{color: "#142A89"}}>
                      <Link href="/company/createuser">
                      Create User
                      </Link></span>  
                  </div>

                  <div className='list-group-item py-2 px-2'>
                    <i className='bi bi-person-check txttsml me-2' style={{color: "#142A89"}}></i>
                      {/* <Link className='fs-6 ' style={{color: "#142A89"}} href="/company/showuser">Show User</Link> */}
                      <span  className='txttsml' style={{color: "#142A89"}}>
                      <Link href="/company/showuser">
                        Show User
                        
                        </Link>
                        </span>    
                  </div>

                  <div className='list-group-item py-2 px-2'>
                    <i className='bi bi-person-fill-slash txttsml me-2' style={{color: "#142A89"}}></i>
                     <span  className='txttsml' style={{color: "#142A89"}}>
                     <Link href="/company/archive">
                      Archive User
                      </Link>
                      </span>    
                  </div>

                  <div className='list-group-item py-2 px-2'>
                    <i className='bi bi-people txttsml me-2' style={{color: "#142A89"}}></i>
                     <span  className='txttsml' style={{color: "#142A89"}}>
                      <Link href="/company/assigncourse">
                         Assign Course
                        </Link>
                         </span> 
                   
                  </div>

                  
                  <div className='list-group-item py-2 px-2'>
                    <i className='bi bi-arrow-left-circle-fill txttsml me-2' style={{color: "#142A89"}}></i>
                      <span  className='txttsml' style={{color: "#142A89"}}>
                     <Link  href="/">Logout</Link></span>
                  </div>
                </div>
            </div>                 
        )
    }
} 
export default DashboardBar