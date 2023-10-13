import React, { Component } from 'react';
import Link from 'next/link';
import DashboardBar from '../Sidebar/DashboardBar';
import Accordion from 'react-bootstrap/Accordion';

class DashMain extends Component {

    render() {

        return (
         
          <div className='' >
            <p class="h2" style={{padding:"1rem", color: "#004b55"}}>Overview</p>
            {/* <h2 style={{padding:"1.5rem", color: "#004b55"}}>Overview</h2>            */}
           <div className=' row g-3  min-vh-100  d-flex justify-content-center align-items-around my-5'>

            {/* <div className='col-md-3'>
               <div className='p-3 bg-white border border-primary shadow-sm d-flex justify-content-around align-items-center rounded'>
                <div className='p-2'>
                    <h3 className='fs-2 d-flex'>230</h3>
                    <p className='fs-5 mx-auto'>courses</p>
                </div>
                <i className='bi bi-cart-plus p-3'></i>
               </div>          
            </div> */}
               
         
           
          <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Total Package</Accordion.Header>
        <Accordion.Body>
        <div className='col-sm-2 col-md-3 mx-auto'>
    <div className="card text-white  mb-3 dash " style={{backgroundColor:'#004b55'}}>
      <div className="card-header mx-auto">Total Assign Package</div>
       <div className="card-body">
      <h5 className=" d-flex fs-3 justify-content-center">0</h5>
      <p className="d-flex justify-content-center"></p>
    </div>
   </div>
  </div>  
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Single Course</Accordion.Header>
        <Accordion.Body>
        <div className='col-sm-2 col-md-3 mx-auto'>
    <div className="card text-white mb-3 dash" style={{backgroundColor:'#004b55'}}>
      <div className="card-header  mx-auto">Total Assign Single Course</div>
       <div className="card-body">
      <h5 className=" d-flex fs-3 justify-content-center">7</h5>
      <p className="d-flex justify-content-center"></p>
    </div>
   </div>
  </div>    
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Individuals</Accordion.Header>
        <Accordion.Body>
        <div className='col-sm-2 col-md-3 mx-auto'>
    <div className="card text-white mb-3 dash" style={{backgroundColor:'#004b55'}}>
      <div className="card-header mx-auto">Total Individual</div>
       <div className="card-body">
      <h5 className=" d-flex fs-3 justify-content-center">2</h5>
      <p className="d-flex justify-content-center"></p>
    </div>
   </div>
   </div>   
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
                     
            </div>
           </div>
   
       
        )       
        }
    }
export default DashMain





// import React, { Component } from 'react';
// import Link from 'next/link';
// import DashboardBar from '../Sidebar/DashboardBar';
// import Accordion from 'react-bootstrap/Accordion';

// class DashMain extends Component {

//     render() {

//         return (
         
//           <div className=''>
//             <h3 style={{padding:"1.5rem", color: "#004b55"}}>Dashboard</h3>           
//            <div className=' row g-3  min-vh-100  d-flex justify-content-center align-items-around my-5'>

//             {/* <div className='col-md-3'>
//                <div className='p-3 bg-white border border-primary shadow-sm d-flex justify-content-around align-items-center rounded'>
//                 <div className='p-2'>
//                     <h3 className='fs-2 d-flex'>230</h3>
//                     <p className='fs-5 mx-auto'>courses</p>
//                 </div>
//                 <i className='bi bi-cart-plus p-3'></i>
//                </div>          
//             </div> */}
               
         
           
  //   <div className='col-sm-2 col-md-3'>
  //   <div className="card text-white  mb-3 dash " style={{backgroundColor:'#004b55'}}>
  //     <div className="card-header mx-auto">Total Assign Package</div>
  //      <div className="card-body">
  //     <h5 className=" d-flex fs-3 justify-content-center">0</h5>
  //     <p className="d-flex justify-content-center"></p>
  //   </div>
  //  </div>
  // </div>        

  // <div className='col-sm-2 col-md-3'>
  //   <div className="card text-white mb-3 dash" style={{backgroundColor:'#004b55'}}>
  //     <div className="card-header  mx-auto">Total Assign Single Course</div>
  //      <div className="card-body">
  //     <h5 className=" d-flex fs-3 justify-content-center">7</h5>
  //     <p className="d-flex justify-content-center"></p>
  //   </div>
  //  </div>
  // </div>     


 
  //  <div className='col-sm-2 col-md-3 '>
  //   <div className="card text-white mb-3 dash" style={{backgroundColor:'#004b55'}}>
  //     <div className="card-header mx-auto">Total Individual</div>
  //      <div className="card-body">
  //     <h5 className=" d-flex fs-3 justify-content-center">2</h5>
  //     <p className="d-flex justify-content-center"></p>
  //   </div>
  //  </div>
  //  </div>    
                     
//             </div>
//            </div>
   
       
//         )       
//         }
//     }
// export default DashMain