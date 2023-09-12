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
                  
                  <a className='list-group-item py-2 px-2'>
                    <i className='bi bi-house fs-6 me-2' style={{color: "#142A89"}}></i>
                   <span className='fs-6 ' style={{color: "#142A89"}}><Link href="/company/dashboard"><a>Dashboard</a></Link></span>
                    
                  </a>

                  <a className='list-group-item py-2 px-2'>
                    <i className='bi bi-table fs-6 me-2' style={{color: "#142A89"}}></i>
                    <span className='fs-6 ' style={{color: "#142A89"}}><Link href="/company/myprofile"><a>My Profile</a></Link></span>                   
                  </a>

                  <a className='list-group-item py-2 px-2'>
                    <i className='bi bi-clipboard-data fs-6 me-2' style={{color: "#142A89"}}></i>
                    <span className='fs-6 ' style={{color: "#142A89"}}><Link href="/company/mycourses"><a>My Courses</a></Link></span>                     
                  </a>

                  <a className='list-group-item py-2 px-2'>
                    <i className='bi bi bi-file fs-6 me-2' style={{color: "#142A89"}}></i>
                    <span className='fs-6 ' style={{color: "#142A89"}}><Link href="/company/mycourses"><a>Certificates</a></Link></span>  
                  </a>

                  <a className='list-group-item py-2 px-2'>
                    <i className='bi bi-card-checklist fs-6 me-2' style={{color: "#142A89"}}></i>
                     <span className='fs-6 ' style={{color: "#142A89"}}><Link href="/company/availablecourses"><a>Available Courses</a></Link></span>
                  </a>

                  <a className='list-group-item py-2 px-2'>
                    <i className='bi bi-person-gear fs-6 me-2' style={{color: "#142A89"}}></i>
                    <span className='fs-6 ' style={{color: "#142A89"}}><Link href="/company/createuser"><a>Create User</a></Link></span>
                  </a>

                  <a className='list-group-item py-2 px-2'>
                    <i className='bi bi-person-check fs-6 me-2' style={{color: "#142A89"}}></i>
                      <span className='fs-6 ' style={{color: "#142A89"}}><Link href="/company/showuser"><a>Show User</a></Link></span> 
                  </a>

                  <a className='list-group-item py-2 px-2'>
                    <i className='bi bi-person-fill-slash fs-6 me-2' style={{color: "#142A89"}}></i>
                     {/* <span  className='fs-6' style={{color: "#142A89"}}>Archive User</span>  */}
                     <span className='fs-6 ' style={{color: "#142A89"}}><Link href="/company/archive"><a>Archive User</a></Link></span> 
                  </a>

                  <a className='list-group-item py-2 px-2'>
                    <i className='bi bi-people fs-6 me-2' style={{color: "#142A89"}}></i>
                     {/* <span  className='fs-6' style={{color: "#142A89"}}>Assign Courses</span>  */}
                     <span className='fs-6 ' style={{color: "#142A89"}}><Link href="/company/assigncourse"><a>Assign Courses</a></Link></span> 
                  </a>

                  
                  <a className='list-group-item py-2 px-2'>
                    <i className='bi bi-arrow-left-circle-fill fs-6 me-2' style={{color: "#142A89"}}></i>
                     {/* <span  className='fs-6' style={{color: "#142A89"}}>Logout</span>  */}
                     <span className='fs-6 ' style={{color: "#142A89"}}><Link href="/"><a>Logout</a></Link></span>
                  </a>
                </div>
            </div>                 
        )
    }
} 
export default DashboardBar