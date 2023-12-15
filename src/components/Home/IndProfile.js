import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import fetchData, { getUserType } from "../../axios/index";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function IndProfile() {
  const handleImage = () => {
    inputRef.current.click();
  };

  const inputRef = useRef(null);

  const [info, setInfo] = useState({
    email: "",
    address: "",
    city: "",
    phone: "",
    first_name: "",
    last_name: "",
  });

  const makeRequest = fetchData();
  useEffect(() => {
    getData();
  }, []);

  function getData() {
    makeRequest("GET", "/info/data")
      .then((res) => {
        setInfo(res.data.response[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleOnChange(e) {
    e.persist();
    setInfo((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    makeRequest("POST", "/info/update-user-data", {
      first_name: info.first_name,
      last_name: info.last_name,
      phone: info.phone,
      city: info.city,
    })
      .then((res) => {
        console.log(res);
        toast.success("Successfully Updated");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="">
      <h2
        style={{
          padding: "1.5rem",
          color: "#212450",
          display: "flex",
          justifyContent: "center",
          marginTop: "",
          fontSize: 36,
        }}
      >
        My Profile
      </h2>
      {/* <div style={{ padding: "0 20px" }} onClick={handleImage}>
        <img style={{width:'70px',height:'70px',borderRadius:'70px',cursor:'pointer'}} src="/assets/img/testimonial/profilePic.webp" alt="" />
        <input type="file" ref={inputRef} style={{display:'none'}}/>
      </div> */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Form
        className="courseBox-shadow"
        style={{ padding: "2rem", borderRadius: ".7rem" }}
      >
        <Row className="mb-4 mt-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              className="bg-light"
              type="text"
              name="first_name"
              placeholder="First name"
              value={info.first_name}
              onChange={handleOnChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              className="bg-light"
              type="text"
              name="last_name"
              placeholder="Last name"
              value={info.last_name}
              onChange={handleOnChange}
            />
          </Form.Group>
        </Row>
        <Row className=" mt-3">
          <Form.Group as={Col} className="mb-3" controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              disabled
              className="bg-light"
              type="text"
              placeholder="Email"
              value={info.email}
            />
          </Form.Group>
          <Form.Group as={Col} className="mb-3" controlId="formGridEmail">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              className="bg-light"
              type="text"
              name="phone"
              placeholder="Phone"
              value={info.phone}
              onChange={handleOnChange}
            />
          </Form.Group>
        </Row>

        <Row className="mt-3 mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              className="bg-light"
              type="text"
              name="city"
              placeholder="City"
              value={info.city}
              onChange={handleOnChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridCountry">
            <Form.Label>Country</Form.Label>
            <Form.Select
              className="bg-light"
              aria-label="Default select example"
            >
              <option style={{ color: "gray" }}>{info.country}</option>
              <option value="uk">United Kingdom</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button variant="primary" type="button" onClick={handleSubmit}>
            Save changes
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default IndProfile;
// import React, {Component} from "react";

// class DashProfile extends Component{
//     render(){
//         return(
//             <div className=''>
//                <h3 style={{padding:"1.5rem", color: "#212450"}}>My Profile</h3>
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
//   <button type="button" class="btn " style={{backgroundColor:'#212450', color:'white'}}>Save Changes</button>
//   </div>
//   </form>
//              </div>
//             </div>

//         )
//     }
// }

// export default DashProfile
