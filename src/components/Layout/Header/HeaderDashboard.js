

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/router';
import Head from 'next/head';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import SplitButton from 'react-bootstrap/SplitButton';
import Offcanvas from 'react-bootstrap/Offcanvas';

const HeaderDashboard = ({ Toggle }) => {

  // const handleToggleClick = () => {
  //   console.log("Toggle button clicked"); //  Check if the button click is registered
  //   if (Toggle) {
  //     Toggle(); // Call the Toggle function passed as a prop
  //   }
  // };

  return (
    <React.Fragment>
      <Head>
        <title>Learn for care</title>
        <link href="https://fonts.googleapis.com/css2?family=Hind:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="/assets/img/favicon.png" type="image/<generated>" sizes="<generated>" />
      </Head>
      <Navbar  expand=""  className="">

        <Navbar.Brand href="#home">
        <Nav.Link href="/">
          <div className="d-flex navheight">
        <img className=" p-2" src="/assets/img/logo/logo7.png" alt="image" />
        </div> </Nav.Link>  </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
        <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-lg`}
              aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title  style={{overflow:'hidden'}} id={`offcanvasNavbarLabel-expand-lg`}>
                  Mark Robinson
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="/">Logout</Nav.Link>
             
                </Nav>
              
              </Offcanvas.Body>
            </Navbar.Offcanvas>
        </Navbar.Collapse>

      </Navbar>
    </React.Fragment>
  )
}

export default HeaderDashboard



// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { useRouter } from 'next/router';
// import Head from 'next/head';
// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';

// const HeaderDashboard = ({Toggle}) => {

//   // const handleToggleClick = () => {
//   //   console.log("Toggle button clicked"); //  Check if the button click is registered
//   //   if (Toggle) {
//   //     Toggle(); // Call the Toggle function passed as a prop
//   //   }
//   // };

//   return(
//     <React.Fragment>
//     <Head>
//        <title>Learn for care</title>
//        <link href="https://fonts.googleapis.com/css2?family=Hind:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
//        <link rel="icon" href="/assets/img/favicon.png" type="image/<generated>" sizes="<generated>"/>
//     </Head>
//     <nav className="navbar navbar-expand-lg navbar-light " style={{borderColor:'#3E001F'}} >
//   <div className="container-fluid">
//     {/* <a className="navbar-brand bi bi-justify-left" style={{color:'#3E001F', visibility:'hidden'}} onClick={handleToggleClick}></a> */}

//     <div className="d-flex " id="dropdownId">
//       <ul className="navbar-nav  mb-2 mb-lg-0">
//      <li>
//       <div className="d-flex navheight">
//         <img className=" p-2" src="/assets/img/logo/logo7.png" alt="" />
//       </div>   
//       </li>



//       </ul>



//     </div>

//   </div>
// </nav>
//  </React.Fragment>
//   )
// }

// export default HeaderDashboard
