import React, { Component } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import DataTable from 'react-data-table-component'; // Make sure to import DataTable
import axios from 'axios'; // Import axios for HTTP requests
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';


class DashCAvail extends Component {
  constructor() {
    super();
    this.state = {
      records: [],
      filterRecords: [],
    };
  }

  customStyles = {
    headRow: {
      style: {
        backgroundColor: '#212450',
        color: 'white',
      },
    },
    headCells: {
      style: {
        fontSize: '16px',
        fontWeight: '600',
        textTransform: 'uppercase',
      },
    },
    cells: {
      style: {
        fontSize: '15px',
      },
    },
  };

  handleFilter = (event) => {
    const newData = this.state.filterRecords.filter((row) =>
      row.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    this.setState({ records: newData });
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((res) =>
        this.setState({ records: res.data, filterRecords: res.data })
      )
      .catch((err) => console.log(err));
  };

  render() {
    
    return (
      <Tabs
        defaultActiveKey="home"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="home" title="Home">
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

      </Row>

      <Form.Group className="mb-3" id="formGridCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
        </Tab>
        <Tab eventKey="profile" title="Profile">
          Tab content for Profile
        </Tab>
        <Tab eventKey="contact" title="Contact" disabled>
          Tab content for Contact
        </Tab>
      </Tabs>
    );
  }
}

export default DashCAvail;




// import React, { Component } from 'react';
// import axios from 'axios';
// import DataTable from 'react-data-table-component';
// import Link from 'next/link';

// const customStyles = {
//   headRow:{
//     style:{
//       backgroundColor : '#212450',
//       color:'white'
//     }
//   },
//   headCells:{
//     style:{
//       fontSize:'16px',
//       fontWeight:'600',
//       textTransform:'uppercase'
//     }
//   },
//   cells:{
//     style:{
//       fontSize: "15px",
//     }
//   }
// }



// class DashCAvail extends Component {
//   constructor() {
//     super();
//     this.state = {
//       records: [],
//       filterRecords: [],
//     };
//   }

//   handleFilter = (event) => {
//     const newData = this.state.filterRecords.filter((row) =>
//     row.name.toLowerCase().includes(event.target.value.toLowerCase())
//   );
//     this.setState({ records: newData });
//   }

//   componentDidMount() {
//     this.fetchData();
//   }

//   fetchData = () => {
//     axios
//       .get('https://jsonplaceholder.typicode.com/users')
//       .then((res) =>
//         this.setState({ records: res.data, filterRecords: res.data })
//       )
//       .catch((err) => console.log(err));
//   };
 


//   render() {
//     const columns = [
//       {
//         name: 'ID',
//         selector: (row) => row.id,
//         sortable:true
//       },
//       {
//         name: 'Courses',
//         selector: (row) => row.name,
//         sortable:true
//       },
//       {
//         name: 'Email',
//         selector: (row) => row.email,
//       },
//       {
//         name: 'City',
//         selector: (row) => row.address.city,
//       },
      
//     ];

//     return (
    //   <div className=''>
    //     <h3 style={{padding:"1.5rem", color: "#212450"}}>All Courses</h3>
    //     <div className=' row g-3  min-vh-100  d-flex justify-content-center align-items-center '>
    //       <div style={{padding:"50px 10%", backgroundColor: ""}}>
    //         <div className='pb-2' style={{display:'flex', justifyContent:'left' }}>
    //           <input type="text"  placeholder='Search course...' onChange={this.handleFilter} style={{padding:'6px 10px', borderColor:'transparent'}}/></div>
    //       <DataTable 
    //       columns={columns} 
    //       data={this.state.records} 
    //       customStyles={customStyles}
    //       pagination
    //       selectableRows
    //       />
    //       </div>
    //     </div>
    //   </div>
//     );
//   }
// }

// export default DashCAvail;