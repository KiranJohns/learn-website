import React, { Component } from 'react';
import Link from 'next/link';
import DashboardBar from '../Sidebar/DashboardBar';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'

class DashMain extends Component {

    render() {

        return (
         
            <Tabs
            defaultActiveKey="home"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="home" title="Home">
               
          <div className=''>
            <h3 style={{padding:"1.5rem", color: "#004b55"}}>Dashboard</h3>           
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
               
         
           
    <div className='col-sm-2 col-md-3'>
    <div className="card text-white  mb-3 dash " style={{backgroundColor:'#004b55'}}>
      <div className="card-header mx-auto">Total Assign Package</div>
       <div className="card-body">
      <h5 className=" d-flex fs-3 justify-content-center">0</h5>
      <p className="d-flex justify-content-center"></p>
    </div>
   </div>
  </div>        

  <div className='col-sm-2 col-md-3'>
    <div className="card text-white mb-3 dash" style={{backgroundColor:'#004b55'}}>
      <div className="card-header  mx-auto">Total Assign Single Course</div>
       <div className="card-body">
      <h5 className=" d-flex fs-3 justify-content-center">7</h5>
      <p className="d-flex justify-content-center"></p>
    </div>
   </div>
  </div>     


 
   <div className='col-sm-2 col-md-3 '>
    <div className="card text-white mb-3 dash" style={{backgroundColor:'#004b55'}}>
      <div className="card-header mx-auto">Total Individual</div>
       <div className="card-body">
      <h5 className=" d-flex fs-3 justify-content-center">2</h5>
      <p className="d-flex justify-content-center"></p>
    </div>
   </div>
   </div>    
                     
            </div>
           </div>
   
            </Tab>
            <Tab eventKey="profile" title="Profile">
            <Form>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>Address</Form.Label>
        <Form.Control placeholder="1234 Main St" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>Address 2</Form.Label>
        <Form.Control placeholder="Apartment, studio, or floor" />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>State</Form.Label>
          <Form.Select defaultValue="Choose...">
            <option>Choose...</option>
            <option>...</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Zip</Form.Label>
          <Form.Control />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" id="formGridCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
            </Tab>
            <Tab eventKey="contact" title="Contact" disabled>
              Tab content for Contact
            </Tab>
          </Tabs>
       
        )       
        }
    }
export default DashMain