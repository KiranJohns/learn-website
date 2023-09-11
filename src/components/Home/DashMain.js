import React, { Component } from 'react';
import Link from 'next/link';
import DashboardBar from '../Sidebar/DashboardBar';

class DashMain extends Component {

    render() {

        return (
         
          <div className=''>           
           <div className='row g-3  min-vh-100  d-flex justify-content-end align-items-center '>
            <div className='col-md-3'>
               <div className='p-3 bg-white border border-primary shadow-sm d-flex justify-content-around align-items-center rounded'>
                <div className='p-2'>
                    <h3 className='fs-2 d-flex'>230</h3>
                    <p className='fs-5 mx-auto'>courses</p>
                </div>
                <i className='bi bi-cart-plus p-3'></i>
               </div>        
            </div>

            <div className='col-md-3'>
               <div className='p-3 bg-white border border-primary shadow-sm d-flex justify-content-around align-items-center rounded'>
                <div className='p-2'>
                    <h3 className='fs-2 d-flex'>230</h3>
                    <p className='fs-5 mx-auto'>courses</p>
                </div>
                <i className='bi bi-cart-plus p-3'></i>
               </div>          
            </div>
               
            <div className='col-md-3'>
               <div className='p-3 bg-white border border-primary shadow-sm d-flex justify-content-around align-items-center rounded'>
                <div className='p-2'>
                    <h3 className='fs-2 d-flex'>230</h3>
                    <p className='fs-5 mx-auto'>courses</p>
                </div>
                <i className='bi bi-cart-plus p-3'></i>
               </div>                   
            </div>
           
   <div className='col-md-3'>
    <div className="card text-white bg-primary mb-3 dash" >
      <div className="card-header mx-auto">Header</div>
       <div className="card-body">
      <h5 className=" d-flex justify-content-center">Primary card title</h5>
      <p className="d-flex justify-content-center">Some quick example text.</p>
    </div>
   </div>
 </div>        
                     
            </div>
           </div>
   
       
        )       
        }
    }
export default DashMain