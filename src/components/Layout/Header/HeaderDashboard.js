import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/router';
import Head from 'next/head';


const HeaderDashboard = ({Toggle}) => {
 
  const handleToggleClick = () => {
    console.log("Toggle button clicked"); //  Check if the button click is registered
    if (Toggle) {
      Toggle(); // Call the Toggle function passed as a prop
    }
  };

  return(
    <React.Fragment>
    <Head>
       <title>Learn for care</title>
       <link href="https://fonts.googleapis.com/css2?family=Hind:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
       <link rel="icon" href="/assets/img/favicon.png" type="image/<generated>" sizes="<generated>"/>
    </Head>
    <nav className="navbar navbar-expand-lg navbar-light " style={{borderColor:'#3E001F'}} >
  <div className="container-fluid">
    <a className="navbar-brand bi bi-justify-left" style={{color:'#3E001F', visibility:'hidden'}} onClick={handleToggleClick}></a>
    
    <div className="" id="dropdownId">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        
      

      
      </ul>
      {/* <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form> */}
      <div className="d-flex navheight">
        <img className=" p-2" src="/assets/img/logo/logo7.png" alt="" />
      </div>
    </div>
  </div>
</nav>
 </React.Fragment>
  )
}

export default HeaderDashboard