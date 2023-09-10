import React, {Component} from "react";

  

class DashProfile extends Component{
    render(){
        return(
            <div className=''>
            <div className='row g-3  min-vh-100  d-flex justify-content-end align-items-center '>
             <div className='col-md-3 col-sm-2'>
                <div className='p-3 bg-white border border-primary shadow-sm d-flex justify-content-around align-items-center rounded'>
                 <div className='p-2'>
                     <h3 className='fs-2 d-flex'>230</h3>
                     <p className='fs-5'>courses</p>
                 </div>
                 <i className='bi bi-cart-plus p-3'></i>
                </div>
              
                
             </div>
             <div className='col-md-3'>
                <div className='p-3 bg-white border border-primary shadow-sm d-flex justify-content-around align-items-center rounded'>
                 <div className='p-2'>
                     <h3 className='fs-2'>230</h3>
                     <p className='fs-5'>courses</p>
                 </div>
                 <i className='bi bi-cart-plus p-3'></i>
                </div>
 
                
             </div> <div className='col-md-3 '>
                <div className='p-3 bg-white border border-primary shadow-sm d-flex justify-content-around align-items-center rounded'>
                 <div className='p-2'>
                     <h3 className='fs-2'>230</h3>
                     <p className='fs-5'>courses</p>
                 </div>
                 <i className='bi bi-cart-plus p-3'></i>
                </div>
 
                
             </div>
            </div>
           </div>
        )
    }
}

export default DashProfile