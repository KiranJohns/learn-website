import React, { Component } from 'react';
import Link from 'next/link';
import 'bootstrap-icons/font/bootstrap-icons.css'

class DashboardBar extends Component{
    render(){
        return(
         <div className='bg-white'>
            
          <div className='px-4'>
            <i className='bi bi-person-circle py-2 px-2'></i>
           <span className='brand-name my-2 fs-5'>Jamie Oliver</span>
          </div>
                <hr className='text-dark'/>
                <div className='list-group list-group-flush'>
                
                  {/* <a className='list-group-item py-2'>
                    <i className='bi bi-speedometer2 fs-6 me-2'>
                     <span>Dashboard</span>
                    </i>
                  </a> */}
                  
                  <a className='list-group-item py-2 px-2'>
                    <i className='bi bi-house fs-6 me-2'></i>
                     <span className='fs-6'>Dashboard</span>
                    
                  </a>

                  <a className='list-group-item py-2 px-2'>
                    <i className='bi bi-table fs-6 me-2'></i>
                     <span  className='fs-6'>My Profile</span>                    
                  </a>

                  <a className='list-group-item py-2 px-2'>
                    <i className='bi bi-clipboard-data fs-6 me-2'></i>
                     <span  className='fs-6'>My Courses</span>                   
                  </a>

                  <a className='list-group-item py-2 px-2'>
                    <i className='bi bi-people fs-6 me-2'></i>
                     <span  className='fs-6'>Certificates</span> 
                  </a>

                  <a className='list-group-item py-2 px-2'>
                    <i className='bi bi-people fs-6 me-2'></i>
                     <span  className='fs-6'>Available Courses</span> 
                  </a>

                  <a className='list-group-item py-2 px-2'>
                    <i className='bi bi-people fs-6 me-2'></i>
                     <span  className='fs-6'>Create User</span> 
                  </a>

                  <a className='list-group-item py-2 px-2'>
                    <i className='bi bi-people fs-6 me-2'></i>
                     <span  className='fs-6'>Show User</span> 
                  </a>

                  <a className='list-group-item py-2 px-2'>
                    <i className='bi bi-people fs-6 me-2'></i>
                     <span  className='fs-6'>Archive User</span> 
                  </a>

                  <a className='list-group-item py-2 px-2'>
                    <i className='bi bi-people fs-6 me-2'></i>
                     <span  className='fs-6'>Assign Courses</span> 
                  </a>

                  
                  <a className='list-group-item py-2 px-2'>
                    <i className='bi bi-people fs-6 me-2'></i>
                     <span  className='fs-6'>Logout</span> 
                  </a>
                </div>
            </div>                 
        )
    }
} 
export default DashboardBar