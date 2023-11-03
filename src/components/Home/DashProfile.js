import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import fetchData from "../../axios/index";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';

function DashProfile() {

 const handleImage =()=>{
 inputRef.current.click()
 }


  const inputRef = useRef(null);

  const [info, setInfo] = useState({
    username: "",
    email: "",
    address: "",
    city: "",
    state: "",
    phone: "",
  });

  useEffect(() => {
    const makeRequest = fetchData();
    console.log('hi');
    makeRequest("GET", "/info/data")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="">
      <h2
        style={{
          padding: "1.5rem",
          color: "#004b55",
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          fontSize: 46,
        }}
      >
        My Profile
      </h2>
      <div style={{ padding: "0 20px" }} onClick={handleImage}>
        <img style={{width:'70px',height:'70px',borderRadius:'70px',cursor:'pointer'}} src="/assets/img/testimonial/profilePic.webp" alt="" />
        <input type="file" ref={inputRef} style={{display:'none'}}/>
      </div>
      <Form style={{ padding: "0px 20px" }}>
        <Row className="mb-3 mt-3">
          <Form.Group as={Col} controlId="formGridEmail">
            {/* <Form.Label>Name</Form.Label> */}
            <Form.Control type="text" placeholder="First name" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            {/* <Form.Label>Email</Form.Label> */}
            <Form.Control type="email" placeholder="Last name" />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" placeholder="Email" />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Country</Form.Label>
            <Form.Control />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password"/>
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
    </div>
  );
}

export default DashProfile;
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
