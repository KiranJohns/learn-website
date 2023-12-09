import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BiSolidDashboard } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { useRouter } from "next/router";
import { MdVerifiedUser } from "react-icons/md";
import fetchData, { getUserType } from "../../axios";

// import {imgg} from '../../../public/assets/img'

const links = [
  {
    name: "Dashboard",
    link: "/individual/dashboard",
    icon: "bi bi-ui-checks-grid",
  },
  {
    name: "My Profile",
    link: "/individual/myprofile",
    icon: "bi bi-person-circle",
  },
  // { name: "My Bundles", link: "/individual/mybundles", icon: "bi bi-book" },

  {
    name: "Bundles",
    link: "bundle",
    icon: "bi bi-stack",
    drop: "bi bi-caret-down-fill",
    display: false,
    show: function (link) {
      this.display = !this.display;
    },
    subLinks: [
      {
        name: "My Bundles",
        link: "/individual/mybundles",
      },
      {
        name: "Buy Bundles",
        link: "/bundle/bundle-all",
      },
      {
        name: "Purchased Bundles",
        link: "/individual/purchasedbundles",
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
        link: "/individual/mycourses",
      },
      {
        name: "Buy Course",
        link: "/course-all/",
      },
      {
        name: "Purchased Courses",
        link: "/individual/purchasedCourses",
      },
   
    ],
  },

  
  {
    name: "Certificates",
    link: "/individual/certificates",
    icon: "bi bi-patch-check-fill",
  },
  
  {
    name: "Reports",
    link: "reports",
    icon: "bi bi-info-circle-fill",
    drop: "bi bi-caret-down-fill",
    display: false,
    show: function (link) {
      this.display = !this.display;
    },
    subLinks: [
      {
        name: "Transaction Report",
        link: "/individual/transactions",
      },
      {
        name: "Monthly Report",
        link: "/individual/monthlyReport",
      },
      
   
    ],
  },
  






 
  // {
  //   name: "Contact Us",
  //   link: "/contact",
  //   icon: "bi bi-envelope",
  // },

  // {
  //   name: " FAQ",
  //   link: "#",
  //   icon: "bi bi-question-circle",
  // },
];
function NewInDash() {
  const makeRequest = fetchData();
  const router = useRouter();
  const inputRef = useRef(null);
  const [info, setInfo] = useState({});
  const [linksArr, setLinksArr] = useState(links);

  const handleImage = () => {
    inputRef.current.click();
  };

  const handleLogout = () => {
    localStorage.removeItem("learnforcare_access");
    location.pathname = "/";
  };

  useEffect(() => {
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
        } else {
          li.display = false;
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
            {(info.first_name && info.last_name)?(info.first_name + " " + info.last_name):" "}{" "}
            <MdVerifiedUser color="green" style={{ height: "1rem" }} />
            <br />
            <span className="mt-2">
              {getUserType() == "individual"
                ? "Individual"
                : "Company Individual"}
            </span>
          </h5>
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

export default NewInDash;
