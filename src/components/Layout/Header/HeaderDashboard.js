

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
      <Navbar className="">

        <Navbar.Brand href="#home"><div className="d-flex navheight">
          <img className=" p-2" src="/assets/img/logo/logo7.png" alt="" />
        </div>   </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <div>

              <SplitButton
                key='start'
                id='dropdown-button-drop-start'
                drop='start'
                variant="transparent"
                title='Menu'
              >
                <Dropdown.Item href="/" eventKey="1">Home</Dropdown.Item>
                <Dropdown.Item href="/" eventKey="2">Logout</Dropdown.Item>
              </SplitButton>

            </div>
          </Navbar.Text>
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
