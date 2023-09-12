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
                  {/* <Link className='fs-6 ' style={{color: "#142A89"}} href="/company/dashboard">Dashboard</Link> */}
                  <span  className='fs-6' style={{color: "#142A89"}}>Dashboard</span>  
                  </a>

                  <a className='list-group-item py-2 px-2'>
                    <i className='bi bi-table fs-6 me-2' style={{color: "#142A89"}}></i>
                    {/* <Link className='fs-6 ' style={{color: "#142A89"}} href="/company/myprofile">My Profile</Link>     */}
                    <span  className='fs-6' style={{color: "#142A89"}}>My Profile</span>             
                  </a>

                  <a className='list-group-item py-2 px-2'>
                    <i className='bi bi-clipboard-data fs-6 me-2' style={{color: "#142A89"}}></i>
                    {/* <span className='fs-6 ' style={{color: "#142A89"}}><Link href="/company/mycourses">My Courses</Link></span>   */}
                    <span  className='fs-6' style={{color: "#142A89"}}>My Courses</span>                     
                  </a>

                  <a className='list-group-item py-2 px-2'>
                    <i className='bi bi bi-file fs-6 me-2' style={{color: "#142A89"}}></i>
                   {/* <Link className='fs-6 ' style={{color: "#142A89"}} href="/company/mycourses">Certificates</Link> */}
                   <span  className='fs-6' style={{color: "#142A89"}}>Certificates</span>  
                  </a>

                  <a className='list-group-item py-2 px-2'>
                    <i className='bi bi-card-checklist fs-6 me-2' style={{color: "#142A89"}}></i>
                    {/* <Link className='fs-6 ' style={{color: "#142A89"}} href="/company/availablecourses">Available Courses</Link> */}
                    <span  className='fs-6' style={{color: "#142A89"}}>Available Courses</span>  
                  </a>

                  <a className='list-group-item py-2 px-2'>
                    <i className='bi bi-person-gear fs-6 me-2' style={{color: "#142A89"}}></i>
                    {/* <Link className='fs-6 ' style={{color: "#142A89"}} href="/company/createuser">Create User</Link> */}
                    <span  className='fs-6' style={{color: "#142A89"}}>Create User</span>  
                  </a>

                  <a className='list-group-item py-2 px-2'>
                    <i className='bi bi-person-check fs-6 me-2' style={{color: "#142A89"}}></i>
                      {/* <Link className='fs-6 ' style={{color: "#142A89"}} href="/company/showuser">Show User</Link> */}
                      <span  className='fs-6' style={{color: "#142A89"}}>Show User</span>    
                  </a>

                  <a className='list-group-item py-2 px-2'>
                    <i className='bi bi-person-fill-slash fs-6 me-2' style={{color: "#142A89"}}></i>
                     <span  className='fs-6' style={{color: "#142A89"}}>Archive User</span>    
                  </a>

                  <a className='list-group-item py-2 px-2'>
                    <i className='bi bi-people fs-6 me-2' style={{color: "#142A89"}}></i>
                     <span  className='fs-6' style={{color: "#142A89"}}>Assign Courses</span> 
                   
                  </a>

                  
                  <a className='list-group-item py-2 px-2'>
                    <i className='bi bi-arrow-left-circle-fill fs-6 me-2' style={{color: "#142A89"}}></i>
                     {/* <span  className='fs-6' style={{color: "#142A89"}}>Logout</span>  */}
                     <Link className='fs-6 ' style={{color: "#142A89"}} href="/">Logout</Link>
                  </a>
                </div>
            </div>                 
        )
    }
} 
export default DashboardBar