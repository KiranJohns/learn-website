
import React, {Component} from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
  

class DashProfile extends Component{
    render(){
        return(
            <div className=''>
               <h2 style={{padding:"1.5rem", color: "#004b55",display:"flex"}}>My Profile</h2> 
               <Form style={{padding:'20px'}}>
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

export default DashProfile



















// import React, {Component} from "react";

  

// class DashProfile extends Component{
//     render(){
//         return(
//             <div className=''>
//                <h3 style={{padding:"1.5rem", color: "#004b55"}}>My Profile</h3> 
//             <div className='row g-3  min-vh-100  d-flex justify-content-end align-items-center '>  
//             <form className="col-sm-10 col-md-8 d-block mx-auto">
//   <div className="form-group p-2 mb-4">
//     <label className="text-black" for="FormControlInput1">Name</label>
//     <input type="email" className="form-control border border-black" id="name" placeholder="name" value=""/>
//   </div>

//   <div className="form-group p-2 mb-4">
//     <label className="text-black" for="FormControlInput1">Email</label>
//     <input type="email" className="form-control border border-black" id="email" placeholder="name@example.com" value=""/>
//   </div>

//   <div className="form-group p-2 mb-4">
//     <label className="text-black" for="FormControlInput1">Country</label>
//     <input type="email" className="form-control border border-black" id="city" placeholder="Country" value=""/>
//   </div>

//   <div className="form-group p-2 mb-4">
//     <label className="text-black" for="FormControlInput1">City</label>
//     <input type="email" className="form-control border border-black" id="country" placeholder="City" value=""/>
//   </div>
//   <div className="form-group p-2 mb-4">
//   <button type="button" class="btn " style={{backgroundColor:'#004b55', color:'white'}}>Save Changes</button>
//   </div>
//   </form>
//              </div>
//             </div>
           
//         )
//     }
// }

// export default DashProfile