import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BiSolidDashboard } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { useRouter } from "next/router";
import { MdVerifiedUser } from "react-icons/md";
import fetchData from "../../axios";
import { MdArrowDropDownCircle } from "react-icons/md";


// import {imgg} from '../../../public/assets/img'

const links = [
  {
    name: "Dashboard",
    link: "/company/dashboard",
    icon: "bi bi-ui-checks-grid",
  },
  {
    name: "My Profile",
    link: "/company/myprofile",
    icon: "bi bi-person-circle",
    // display: false,
    // show: function (link) {
    //   this.display = !this.display;
    // },
    // subLinks: [
    //   {
    //     name: "Profile Information",
    //   },
    //   {
    //     name: "New Profile",
    //   },
    // ],
  },
  {
    name: "Bundles",
    link: "bundle",
    icon: "bi bi-person-circle",
    drop: "bi bi-caret-down-fill",
    display: false,
    show: function (link) {
      this.display = !this.display;
    },
    subLinks: [
      {
        name: "My Bundles",
        link: "/company/mybundle",
      },
      {
        name: "Buy Bundles",
        link: "/bundle/bundle-all",
      },
   
      {
        name: "Purchased Bundles",
        link: "/company/assignBundle",
      },
    ],
  },
  {
    name: "Courses",
    link: "courses",
    icon: "bi bi-book",
    drop: "bi bi-caret-down-fill",
    display: false,
    show: function (link) {
      this.display = !this.display;
    },
    subLinks: [
      {
        name: "My Courses",
        link: "/company/mycourses",
      },
      {
        name: "Buy Course",
        link: "/course-all/",
      },
      // {
      //   name: "Purchased Courses",
      //   link: "/company/purchasedCourses",
      // },
      {
        name: "Purchased Courses",
        link: "/company/assignCourses",
      },
    ],
  },
  
  // { name: "My Course", link: "/company/mycourses", icon: "bi bi-book" },
  // {
  //   name: "Certificates",
  //   link: "/company/certificates",
  //   icon: "bi bi-patch-check-fill",
  // },
  // {
  //   name: "All Courses",
  //   link: "/company/availablecourses",
  //   icon: "bi bi-card-checklist",
  // },
  {
    name: "Create User",
    link: "/company/createuser",
    icon: "bi bi-person-check ",
  },

  
  { name: "Managers", link: "/company/managers", icon: "bi bi-person-check" },

  { name: "Individuals", link: "/company/showuser", icon: "bi bi-person-check" },
  {
    name: "Matrix",
    link: "matrix",
    icon: "bi bi-book",
    drop: "bi bi-caret-down-fill",
    display: false,
    show: function (link) {
      this.display = !this.display;
    },
    subLinks: [
      {
        name: "Courses Matrix",
        link: "/company/courseMatrix",
      },
      {
        name: "Bundle Matrix",
        link: "/company/bundleMatrix",
      },
  
    ],
  },
  
  // {
  //   name: " Archive User",
  //   link: "/company/archive",
  //   icon: "bi bi-person-fill-slash",
  // },

];
function DashboardBar() {
  const router = useRouter();
  const inputRef = useRef(null);
  const [info, setInfo] = useState({});
  const [linksArr, setLinksArr] = useState(links);
  const makeRequest = fetchData();

  const handleImage = () => {
    inputRef.current.click();
  };

  const handleLogout = () => {
    localStorage.removeItem("learnforcare_access");
    location.pathname = "/";
  };

  useEffect(() => {
    openSubLink(location.pathname)
    console.log(location.pathname);
    makeRequest("GET", "/info/data")
      .then((res) => {
        setInfo(res.data.response[0]);
        console.log(res.data.response[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleProfileChange(e) {
    const file = new FormData();
    console.log(e.target.files[0]);
    setInfo({ ...info, profile_image: e.target.files[0] });
    file.append("image", e.target.files[0]);
    setTimeout(() => {
      makeRequest("POST", "/info/set-profile-image", file)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 3000);
  }

  function openSubLink(link) {
    setLinksArr((l) => {
      return l.filter((li) => {
        if (li.link == link) {
          li.display = !li.display;
        }
        return li;
      });
    });
  }

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
          height: "16.2rem",
          position: "relative",
          // borderRadius: '10px'
        }}
      >
        <div
          onClick={handleImage}
          style={{
            background: "url(/assets/img/course/updat.png)",
            position: "absolute",
            top: "0px",
            left: "0px",
            backgroundRepeat: "no-repeat",
            height: "4rem",
            width: "4rem",
            margin: "1rem",
            cursor: "pointer",
          }}
        ></div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          <div
            style={{
              background: "url(/assets/img/course/bmg.png)",
              height: "6.5rem",
              width: "6.5rem",
              backgroundRepeat: "no-repeat",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              style={{
                width: "88px",
                height: "88px",
                marginRight: ".15rem",
                borderRadius: "88px",
              }}
              src={
                info.profile_image
                  ? typeof info.profile_image === "string"
                    ? info.profile_image
                    : URL.createObjectURL(info.profile_image)
                  : "/assets/img/testimonial/profilePic.webp"
              }
              alt=""
            />
          </div>
          <input
            type="file"
            ref={inputRef}
            onChange={handleProfileChange}
            style={{ display: "none" }}
          />
        </div>
        <div
          className="mt-2 "
          style={{ display: "flex", flexDirection: "column" }}
        >
          <h5 style={{ color: "#212450", textAlign: "center", marginLeft: "" }}>
            {info.first_name + " " + info.last_name}{" "}
            <MdVerifiedUser color="green" style={{ height: "1rem" }} />
            <br />
          </h5>
          <h6 style={{ color: "#212450", textAlign: "center", marginLeft: "" }}>
            Company
            <br />
          </h6>
        </div>
      </div>
      {/* <hr className="" /> */}
      <div className=" text-nowrap" style={{ overflow: "hidden", }}>
        {linksArr.map((link) => {
          return (
            <>
              <span
                onClick={(e) => {
                  console.log(link.link);
                  if (!link?.subLinks) {
                    router.push(link.link);
                  }
                  openSubLink(link.link);
                }}
              >
                <div
                  style={{ margin: ".8rem", borderRadius: "8px",}}
                  className={`list-group-item  ${
                    link.subLinks?.find((link) => link.link == router.pathname)
                      ? "activate-sidebar"
                      : router.pathname == link.link
                      ? "activate-sidebar"
                      : ""
                  }  py-3 px-2`}
                >
                  <i className={`${link.icon} txttsml me-2 ml-50`}></i>
                  <span className="txttsml ">
                    {" "}
                    &nbsp;{link.name}{" "}
                    {link.drop && (
                      <span
                        style={{ marginLeft: "1rem", marginTop: ".2rem" }}
                        className={link.drop}
                      ></span>
                    )}
                  </span>
                </div>
              </span>
              {link?.display &&
                link?.subLinks?.map((item, id) => {
                  return (
                    <div
                      className=" text-nowrap my-1"
                      style={{
                        transition: "all ease 0.5s",
                        overflow: "hidden",
                        height: "0 !important",
                        padding: "0.1rem 1rem !important",
                        textAlign: "center",
                        width: "100%",
                        display: "flex",
                        justifyContent: "left",
                      }}
                    >
                      <a
                        className="list-group-items my-2"
                        style={{
                          width: "max-content",
                          marginLeft: "4.5rem",
                          padding: "0.3rem 1rem !important",
                          borderRadius: "5px",
                        }}
                        key={item.id}
                        href={item.link}
                      >
                        {item.name}
                      </a>
                    </div>
                  );
                })}
            </>
          );
        })}

        <div
          onClick={handleLogout}
          style={{ margin: ".8rem", borderRadius: "8px",  }}
          className="list-group-item py-3 px-2 "
        >
          <i  className="bi bi-box-arrow-left txttsml me-2 ml-50"></i>
          <span className="txttsml">{"  "}&nbsp;Logout</span>
        </div>

        <span className="txttsml" style={{ color: "#212450" }}>
          {" "}
        </span>
      </div>
    </div>
  );
}

export default DashboardBar;

{
  /* <Link href="/company/myprofile"><div className='list-group-item py-3 px-2 text-center'>
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
        </div></Link>   */
}

// {
//   name: "My Profile",
//   link: "/company/myprofile",
//   icon: "bi bi-person-circle",
//   display: false,
//   show: function (link) {
//     this.display = !this.display;
//   },
//   subLinks: [
//     {
//       name: "Profile Information",
//     },
//     {
//       name: "New Profile",
//     },
//   ],
// },
