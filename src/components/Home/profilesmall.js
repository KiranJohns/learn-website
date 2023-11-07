import React, { Component } from 'react';
import Link from 'next/link';
import DashboardBar from '../Sidebar/DashboardBar';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';


class Profilesmall extends Component {

    render() {

        return (

         <div className='container' style={{padding:'10px'}}>
                     <h2 style={{padding:"1.5rem", color: "#212450"}}>My Profile</h2> 
               <Form>
      <Row className="mb-3 mt-4">
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
          <Form.Label>Phone</Form.Label>
          <Form.Control />
        </Form.Group>
      </Row>

      

      <Button variant="primary" type="submit">
        Update
      </Button>
    </Form>

           </div>
        )       
        }
    }
export default Profilesmall