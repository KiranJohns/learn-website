import React, { Component } from 'react';
import Link from 'next/link';
import DashboardBar from '../Sidebar/DashboardBar';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';


class DashTest extends Component {

    render() {

        return (

         <div className='container' style={{padding:'10px'}}>

              {/* <div>  
                <Card style={{ width: '18rem', marginTop:'50px'}}>
      <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card>
    </div>    */}

           

         <div className="ag-format-container">
          <div className='d-flex justify-content-center' style={{padding:'px',margin:'1rem 0rem' }}><h2 style={{color:'#004B55'}}>Dashboard</h2></div>
  <div className="ag-courses_box">
   
    <div className="ag-courses_item">
      <a href="/company/myprofile" className="ag-courses-item_link">
        <div className="ag-courses-item_bg"></div>

        <div className="ag-courses-item_title">
        My Profile
        </div>

        <div className="bi bi-person-circle ag-courses-item_date-box">
          {/* Start:
          <span className="ag-courses-item_date">
            04.11.2022
          </span> */}
        </div>
      </a>
    </div>

    <div className="ag-courses_item">
      <a href="/company/mycourses" className="ag-courses-item_link">
        <div className="ag-courses-item_bg"></div>

        <div className="ag-courses-item_title">
        My Course
        </div>

        <div className="bi bi-archive ag-courses-item_date-box">
          {/* Start:
          <span className="ag-courses-item_date">
            04.11.2022
          </span> */}
        </div>
      </a>
    </div>

    

    <div className="ag-courses_item">
      <a href="#" className="ag-courses-item_link">
        <div className="ag-courses-item_bg"></div>

        <div className="ag-courses-item_title">
          Training Matrix
        </div>

        <div className="bi bi-file-earmark-spreadsheet ag-courses-item_date-box">
          {/* Start:
          <span className="ag-courses-item_date">
            04.11.202
          </span> */}
        </div>
      </a>
    </div>



  </div>
</div>

          

           </div>
        )       
        }
    }
export default DashTest