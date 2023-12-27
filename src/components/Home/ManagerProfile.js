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

function ManagerProfile() {
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
    phone: "",
    city: "",
  });

  const makeRequest = fetchData();
  useEffect(() => {
    getData()
  }, []);

  function getData() {
    let url = "/info/data"
    makeRequest("GET", url)
      .then((res) => {
        // console.log(res.data.response[0]);
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
          fontSize: 38,
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
              value={info?.first_name}
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
              value={info?.last_name}
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
              value={info?.email}
            />
          </Form.Group>
          <Form.Group as={Col} className="mb-3" controlId="formGridEmail">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              className="bg-light"
              type="text"
              name="phone"
              placeholder="Phone"
              value={info?.phone}
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
              value={info?.city}
              onChange={handleOnChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridCountry">
            <Form.Label>Country</Form.Label>
            <Form.Select
              className="bg-light"
              aria-label="Default select example"
            >
              <option style={{ color: "gray" }}>{info?.country}</option>
              <option value="uk">United Kingdom</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button variant="primary" type="button" onClick={handleSubmit}>
            Save Changes
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default ManagerProfile;