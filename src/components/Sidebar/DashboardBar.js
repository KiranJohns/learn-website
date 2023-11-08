import React, { useState, useRef } from "react";
import Link from "next/link";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BiSolidDashboard } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { useRouter } from "next/router";
import { MdVerifiedUser } from "react-icons/md";

// import {imgg} from '../../../public/assets/img'

const arr = [
  { name: "Dashboard", link: "/company/dashboard", icon: "bi bi-ui-checks-grid" },
  {
    name: "My Profile",
    link: "/company/myprofile",
    icon: "bi bi-person-circle",
  },
  { name: "My Course", link: "/company/mycourses", icon: "bi bi-book" },
  {
    name: "Certificates",
    link: "/company/certificates",
    icon: "bi bi-patch-check-fill",
  },
  {
    name: "All Courses",
    link: "/company/availablecourses",
    icon: "bi bi-card-checklist",
  },
  {
    name: "Create User",
    link: "/company/createuser",
    icon: "bi bi-person-check ",
  },
  { name: "Show user", link: "/company/showuser", icon: "bi bi-person-check" },
  {
    name: "Archive User",
    link: "/company/archive",
    icon: "bi bi-person-fill-slash",
  },
  {
    name: "Assign Course",
    link: "/company/assigncourse",
    icon: "bi bi-person-check-fill",
  },
];
function DashboardBar() {
  const router = useRouter();
  const inputRef = useRef(null);

  const handleImage = () => {
    inputRef.current.click();
  };

  const handleLogout = () => {
    localStorage.removeItem("learnforcare_access");
    location.pathname = "/";
  };

  return (
    <div className="" style={{ padding: "", backgroundColor: "#212450" }}>
    
      <div
        style={{
          boxSizing: "border-box !important",
          backgroundColor: "white",
          height: "",
          margin: "0.6rem",
          width: "",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 1rem",
         height:"20rem",
         position:'relative'
          // borderRadius: '10px'
        }}
      >
          <div  onClick={handleImage} style={{background:'url(/assets/img/course/updat.png)',position:"absolute",top:'0px', left:'0px',
          backgroundRepeat:'no-repeat',height:'4rem',width:'4rem', margin:'1rem', cursor:'pointer'}}></div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",
          }}
         
        >
          <div
            style={{
          background:'url(/assets/img/course/bmg.png)',height:'6.5rem',width:'6.5rem',
          backgroundRepeat:'no-repeat',display:'flex',justifyContent:'center',alignItems:'center'
            }}
          >
            <img
              style={{
                width: "83px",
               marginRight:'.15rem',
                borderRadius: "83px",
                
              }}
              src="/assets/img/testimonial/profilePic.webp"
              alt=""
            /> 
          </div>
          <input type="file" ref={inputRef} style={{ display: "none" }} />
        </div>
        <div
          className="mt-4 "
          style={{ display: "flex", flexDirection: "column" }}
        >
          <h6 style={{ color: "#212450", textAlign: "center", marginLeft: "" }}>
            User Name <MdVerifiedUser color="green"/>
            <br />
          </h6>
          <h6 style={{ color: "#212450", textAlign: "center", marginLeft: "" }}>
            Company
            <br />
          </h6>
        </div>
      </div>
      {/* <hr className="" /> */}
      <div className=" text-nowrap" style={{ overflow: "hidden" }}>
        {arr.map((link) => (
          <Link href={link.link}>
            <div
            style={{margin: ".8rem",borderRadius: '8px'}}
              className={`list-group-item ${
                router.pathname.startsWith(link.link) ? "activate-sidebar" : ""
              }  py-3 px-2 text-center`}
            >
              <i className={`${link.icon} txttsml me-1`} ></i>
              <span className="txttsml">{' '}{link.name}</span>
            </div>
          </Link>
        ))}

        {/* <Link href="/company/myprofile"><div className='list-group-item py-3 px-2 text-center'>
          <i className='bi bi-person-circle txttsml me-1' style={{ color: '#fff' }}></i>
          <span className='txttsml' style={{ color: '#fff' }}>
          My Profile
          </span>
        </div></Link> 

        <Link href="/company/mycourses"><div className='list-group-item py-3 px-2 text-center'>
          <i className='bi bi-book txttsml me-1' style={{ color: '#fff' }}></i>
          <span className='txttsml' style={{ color: '#fff' }}>
           My Courses
          </span>
        </div></Link>

       <Link href="/company/certificates"><div className='list-group-item py-3 px-2 text-center'>
          <i className='bi bi-patch-check-fill txttsml me-1' style={{ color: '#fff' }}></i>
          <span className='txttsml' style={{ color: '#fff' }}>
            Certificates
          </span>
        </div></Link> 

       <Link href="/company/availablecourses"><div className='list-group-item py-3 px-2 text-center'>
          <i className='bi bi-card-checklist txttsml me-1' style={{ color: '#fff' }}></i>
          <span className='txttsml' style={{ color: '#fff' }}>
           All Courses
          </span>
        </div></Link> 

        <Link href="/company/createuser"><div className='list-group-item py-3 px-2 text-center'>
          <i className='bi bi-person-check txttsml me-1' style={{ color: '#fff' }}></i>
          <span className='txttsml' style={{ color: '#fff' }}>
           Create User
          </span>
        </div></Link> 

       <Link href="/company/showuser"><div className='list-group-item py-3 px-2 text-center'>
          <i className='bi bi-person-check txttsml me-1' style={{ color: '#fff' }}></i>
          <span className='txttsml' style={{ color: '#fff' }}>
           Show User
          </span>
        </div></Link> 

      <Link href="/company/archive"><div className='list-group-item py-3 px-2 text-center'>
          <i className='bi bi-person-fill-slash txttsml me-1' style={{ color: '#fff' }}></i>
          <span className='txttsml' style={{ color: '#fff' }}>
           Archive User
          </span>
        </div></Link>  

        <Link href="/company/assigncourse"><div className='list-group-item py-3 px-2 text-center'>
          <i className='bi bi-person-check-fill txttsml me-1' style={{ color: '#fff' }}></i>
          <span className='txttsml' style={{ color: '#fff' }}>
          Assign Course
          </span>
        </div></Link>   */}

        <div
          onClick={handleLogout}  style={{margin: "1rem",borderRadius: '8px'}}
          className="list-group-item py-3 px-2 text-center"
        >
          <i className="bi bi-box-arrow-left txttsml me-2"></i>
          <span className="txttsml">{' '}Logout</span>
        </div>

        <span className="txttsml" style={{ color: "#212450" }}>
          {" "}
        </span>
      </div>
    </div>
  );
}

export default DashboardBar;
