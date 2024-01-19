import React, { Component } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Link from "next/link";
import BasicExample from "../About/button1";
import fetchData from "../../axios";
import Modal from "react-responsive-modal";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { Suspense } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useState, useEffect } from "react";

const customStyles = {
  headRow: {
    style: {
      backgroundColor: "#212450",
      color: "white",
    },
  },
  headCells: {
    style: {
      fontSize: "14px",
      fontWeight: "600",
      textTransform: "uppercase",
      justifyContent: "center",
    },
  },
  cells: {
    style: {
      fontSize: "15px",
      justifyContent: "center",
    },
  },
};

const DashCourse = () => {
  const [records, setRecords] = useState([]);
  const [filterRecords, setFilterRecords] = useState([]);
  const [subUsers, setSubUsers] = useState([]);
  const [user, setUser] = useState(
    jwtDecode(localStorage.getItem("learnforcare_access"))
  );
  const [searchData, setSearchData] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const [pending, setPending] = React.useState(true);

  const makeRequest = fetchData();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const [assignedCourses, onGoingCourse] = await Promise.all([
        makeRequest("GET", "/course/get-all-assigned-course"),
        makeRequest("GET", "/on-going-course/get-all-on-going-courses"),
      ]);
      setPending(false);
      console.log(assignedCourses.data.response, onGoingCourse.data.response);
      setRecords(
        [
          ...onGoingCourse.data.response,
          ...assignedCourses.data.response.filter(
            (item) => item?.owner == user?.id && item?.course_count >= 1
          ),
        ].reverse()
      );
      setFilterRecords(assignedCourses.data);

      // Uncomment the following block if "get-all-sub-users" endpoint is needed
      // const subUsersRes = await makeRequest("GET", "/info/get-all-sub-users");
      // setSubUsers(subUsersRes.data.response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilter = (event) => {
    const newData = filterRecords.filter((row) =>
      row.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setRecords(newData);
  };

  const handleShowModal = () => {
    setOpenModal(!openModal);
  };

  const assignCourse = (e, subUser) => {
    e.persist();
    makeRequest("POST", "/info/assign-course-to-sub-user", {
      sub_user_id: subUser.id,
      course_id: course_id,
      purchased_course_id: purchased_course_id,
    })
      .then((res) => {
        toast.success("Course Assigned");
        getData();
        setOpenModal(!openModal);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const handleStart = (id, from) => {
    let form = new FormData();
    form.append("from", from);
    form.append("course_id", id);
    makeRequest("POST", "/course/start-course", form)
      .then((res) => {
        location.href = `/learnCourse/coursepage/?courseId=${res.data.response.id}`;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columns = [
    {
      name: "Sl No.",
      selector: (row, idx) => idx + 1,
      center: true,
      width: "80px",
      hide: "md",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      center: true,
      width: "340px",
    },
    {
      name: "validity",
      center: true,
      selector: (row) => row.validity,
      hide: 750,
    },
    {
      name: "Attempts",
      selector: (row) => (row?.attempts || 0) + "/20",
      center: true,
    },
    {
      name: "Action",
      center: true,
      width: "150px",
      cell: (row) => {
        // console.log(row)
        let validity = row.validity.split("/").reverse();
        return (
          <>
            {new Date(validity.join("-")) > new Date() ? (
              <>
                {row.attempts < 20 ? (
                  <>
                    {row?.progress ? (
                      <>
                        {row.progress < 80 ? (
                          <Link
                            href={{
                              pathname: "/learnCourse/coursepage",
                              query: { courseId: row?.on_going_course_id },
                            }}
                          >
                            <a
                              style={{ width: "7rem" }}
                              className="btn btn-success"
                            >
                              Start
                            </a>
                          </Link>
                        ) : (
                          <Link
                            href={{
                              pathname: "/company/certificates",
                            }}
                          >
                            <a
                              style={{ width: "7rem" }}
                              className="btn btn-success"
                            >
                              Completed
                            </a>
                          </Link>
                        )}
                      </>
                    ) : (
                      <button
                        onClick={() => {
                          handleStart(row?.id, "assigned");
                        }}
                        className="btn btn-success"
                        style={{ width: "7rem" }}
                      >
                        Start
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    {row.attempts >= 20 ? (
                      <a className="btn btn-danger">Expired</a>
                    ) : (
                      <button
                        onClick={() => {
                          handleStart(row?.id, "assigned");
                        }}
                        className="btn btn-success"
                        style={{ width: "7rem" }}
                      >
                        Start
                      </button>
                    )}
                  </>
                )}
              </>
            ) : (
              <a className="btn btn-danger">Expired</a>
            )}
          </>
        );
      },
    },
  ];

  return (
    <div className="">
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
      <Modal open={openModal} onClose={handleShowModal}>
        <div style={{ padding: "", width: "40rem", height: "20rem" }}>
          <h3>Sub Users</h3>
          <ul class="list-group bg-white" style={{}}>
            {subUsers &&
              subUsers.map((item) => {
                if (!item.block) {
                  return (
                    <li class="list-group-item bg-white text-black d-flex justify-content-between align-items-center">
                      <h5>{item.first_name + " " + item.last_name}</h5>
                      <a
                        className="btn btn-primary"
                        onClick={(e) => assignCourse(e, item)}
                      >
                        Assign
                      </a>
                    </li>
                  );
                }
              })}
          </ul>
        </div>
      </Modal>
      <div className="dash-shadow">
        <div
          style={{ position: "relative" }}
          className=" row g-3  min-vh-100  d-flex justify-content-center  mt-10"
        >
          {/* <div  style={{  position:"relative" }}> */}
          <h2
            style={{
              color: "#212450",
              display: "flex",
              justifyContent: "center",
              position: "absolute",
              fontSize: 35,
            }}
          >
            My Courses
          </h2>
          <div className="reacttable-hidden">
            <div
              style={{ float: "right", marginBottom: "1.4rem" }}
              className="p-relative d-inline header__search searchbar-hidden3"
            >
              <form action="">
                <input
                  style={{ background: "#edeef3" }}
                  className="d-block  "
                  type="text"
                  placeholder="Search..."
                  onChange={(e) => setSearchData(e.target.value)}
                />
                <button type="submit">
                  <i className="fas fa-search"></i>
                </button>
              </form>
            </div>
            <Suspense fallback={<Loading />}>
              <DataTable
                progressPending={pending}
                progressComponent={
                  pending ? (
                    <div style={{ padding: "1rem" }}>
                      <Spinner animation="border" variant="primary" />
                    </div>
                  ) : null
                }
                persistTableHead={true}
                noDataComponent={"No records to display"}
                columns={columns}
                data={
                  searchData
                    ? records.filter((item) =>
                        item?.name
                          .toLowerCase()
                          .startsWith(searchData.toLowerCase())
                      )
                    : records
                }
                customStyles={customStyles}
                pagination
              />
            </Suspense>
          </div>
          <div style={{ marginTop: "2.9rem", paddingTop: "1rem" }}>
            {searchData
              ? records
                  .filter((item) =>
                    item?.name
                      .toLowerCase()
                      .startsWith(searchData.toLowerCase())
                  )
                  .map((item) => {
                    let validity = item.validity.split("/").reverse();
                    return (
                      <div
                        style={{
                          // paddingTop: "1rem",
                          // marginTop: "3rem",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <div className="new-table-shadow new-table-res new-table-hidden">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <p
                              style={{
                                paddingTop: "1.5rem",
                                paddingLeft: ".4rem",
                                color: "#212a50",
                                fontWeight: "bold",
                              }}
                            >
                              {item?.name}
                            </p>
                            {/* <button className="btn btn-success" style={{height:'35px',marginTop:"1rem", marginRight:'.4rem'}}>View</button> */}
                            <>
                              {new Date(validity.join("-")) > new Date() ? (
                                <>
                                  {item.attempts < 20 ? (
                                    <>
                                      {item?.progress ? (
                                        <>
                                          {item?.progress < 80 ? (
                                            <Link
                                              href={{
                                                pathname:
                                                  "/learnCourse/coursepage",
                                                query: {
                                                  courseId:
                                                    item?.on_going_course_id,
                                                },
                                              }}
                                            >
                                              <a
                                                style={{
                                                  width: "7rem",
                                                  height: "35px",
                                                  marginTop: "1rem",
                                                  marginRight: ".4rem",
                                                }}
                                                // style={{ width: "7rem" }}
                                                className="btn btn-success"
                                              >
                                                Start
                                              </a>
                                            </Link>
                                          ) : (
                                            <Link
                                              href={{
                                                pathname:
                                                  "/company/certificates",
                                              }}
                                            >
                                              <a
                                                style={{
                                                  width: "7rem",
                                                  height: "35px",
                                                  marginTop: "1rem",
                                                  marginRight: ".4rem",
                                                }}
                                                // style={{ width: "7rem" }}
                                                className="btn btn-success"
                                              >
                                                Completed
                                              </a>
                                            </Link>
                                          )}
                                        </>
                                      ) : (
                                        // <Link
                                        //   href={{
                                        //     pathname: "/learnCourse/coursepage",
                                        //     query: {
                                        //       courseId:
                                        //         item?.on_going_course_id,
                                        //     },
                                        //   }}
                                        // >
                                        //   <a
                                        // style={{
                                        //   width: "7rem",
                                        //   height: "35px",
                                        //   marginTop: "1rem",
                                        //   marginRight: ".4rem",
                                        // }}
                                        //     className="btn btn-success"
                                        //   >
                                        //     {item.progress < 80
                                        //       ? "Start"
                                        //       : "Completed"}
                                        //   </a>
                                        // </Link>
                                        <button
                                          style={{
                                            width: "7rem",
                                            height: "35px",
                                            marginTop: "1rem",
                                            marginRight: ".4rem",
                                          }}
                                          onClick={() => {
                                            handleStart(item?.id, "assigned");
                                          }}
                                          className="btn btn-success"
                                        >
                                          Start
                                        </button>
                                      )}
                                    </>
                                  ) : (
                                    <>
                                      {item.attempts >= 20 ? (
                                        <a className="btn btn-danger">
                                          Expired
                                        </a>
                                      ) : (
                                        <button
                                          style={{
                                            width: "7rem",
                                            height: "35px",
                                            marginTop: "1rem",
                                            marginRight: ".4rem",
                                          }}
                                          onClick={() => {
                                            handleStart(item?.id, "assigned");
                                          }}
                                          className="btn btn-success"
                                        >
                                          Start
                                        </button>
                                      )}
                                    </>
                                  )}
                                </>
                              ) : (
                                <a
                                  style={{
                                    width: "7rem",
                                    height: "35px",
                                    marginTop: "1rem",
                                    marginRight: ".4rem",
                                  }}
                                  className="btn btn-danger"
                                >
                                  Expired
                                </a>
                              )}
                            </>
                          </div>
                        </div>
                      </div>
                    );
                  })
              : records.map((item) => {
                  let validity = item.validity.split("/").reverse();
                  return (
                    <div
                      style={{
                        // paddingTop: "1rem",
                        // marginTop: "3rem",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div className="new-table-shadow new-table-hidden">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <p
                            style={{
                              paddingTop: "1.5rem",
                              paddingLeft: ".4rem",
                              color: "#212a50",
                              fontWeight: "bold",
                            }}
                          >
                            {item?.name}
                          </p>
                          {/* <button className="btn btn-success" style={{height:'35px',marginTop:"1rem", marginRight:'.4rem'}}>View</button> */}
                          <>
                            {new Date(validity.join("-")) > new Date() ? (
                              <>
                                {item.attempts < 20 ? (
                                  <>
                                    {item?.progress ? (
                                      <>
                                        {item?.progress < 80 ? (
                                          <Link
                                            href={{
                                              pathname:
                                                "/learnCourse/coursepage",
                                              query: {
                                                courseId:
                                                  item?.on_going_course_id,
                                              },
                                            }}
                                          >
                                            <a
                                              style={{
                                                width: "7rem",
                                                height: "35px",
                                                marginTop: "1rem",
                                                marginRight: ".4rem",
                                              }}
                                              // style={{ width: "7rem" }}
                                              className="btn btn-success"
                                            >
                                              Start
                                            </a>
                                          </Link>
                                        ) : (
                                          <Link
                                            href={{
                                              pathname: "/company/certificates",
                                            }}
                                          >
                                            <a
                                              style={{
                                                width: "7rem",
                                                height: "35px",
                                                marginTop: "1rem",
                                                marginRight: ".4rem",
                                              }}
                                              // style={{ width: "7rem" }}
                                              className="btn btn-success"
                                            >
                                              Completed
                                            </a>
                                          </Link>
                                        )}
                                      </>
                                    ) : (
                                      // <Link
                                      //   href={{
                                      //     pathname: "/learnCourse/coursepage",
                                      //     query: {
                                      //       courseId: item?.on_going_course_id,
                                      //     },
                                      //   }}
                                      // >
                                      //   <a
                                      //     style={{
                                      //       width: "7rem",
                                      //       height: "35px",
                                      //       marginTop: "1rem",
                                      //       marginRight: ".4rem",
                                      //     }}
                                      //     className="btn btn-success"
                                      //   >
                                      //     {item.progress < 80
                                      //       ? "Start"
                                      //       : "Completed"}
                                      //   </a>
                                      // </Link>
                                      <button
                                        style={{
                                          width: "7rem",
                                          height: "35px",
                                          marginTop: "1rem",
                                          marginRight: ".4rem",
                                        }}
                                        onClick={() => {
                                          handleStart(item?.id, "assigned");
                                        }}
                                        className="btn btn-success"
                                      >
                                        Start
                                      </button>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    {item.attempts >= 20 ? (
                                      <a className="btn btn-danger">Expired</a>
                                    ) : (
                                      <button
                                        style={{
                                          width: "7rem",
                                          height: "35px",
                                          marginTop: "1rem",
                                          marginRight: ".4rem",
                                        }}
                                        onClick={() => {
                                          handleStart(item?.id, "assigned");
                                        }}
                                        className="btn btn-success"
                                      >
                                        Start
                                      </button>
                                    )}
                                  </>
                                )}
                              </>
                            ) : (
                              <a
                                style={{
                                  width: "7rem",
                                  height: "35px",
                                  marginTop: "1rem",
                                  marginRight: ".4rem",
                                }}
                                className="btn btn-danger"
                              >
                                Expired
                              </a>
                            )}
                          </>
                        </div>


                        <div style={{ display: 'flex', justifyContent: "space-between" }}>
                        <p style={{ color: '#0d6efd', marginLeft: ".5rem", fontWeight: "500" }}>Validity:{" "} {item?.validity}</p>
                        <p style={{ color: '#0d6efd', marginRight: ".5rem", fontWeight: "500" }}>Attempts:{" "}<a href={`/learnCourse/examAttempts/?courseId=${item?.id}`} className="my-dashlink">{item?.attempts || 0}</a>{"/20"}</p>
                       
                      </div>


                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashCourse;
function Loading() {
  return <h2>🌀 Loading...</h2>;
}

// import React from 'react'
// import axios from 'axios'
// import { useEffect } from 'react'
// import { useState } from 'react'
// import DataTable from 'react-data-table-component'

// const DashCourse = () => {
//   const column=[
//     {
//       name:"ID",
//       selector: row => row.id
//     },{
//       name:"Name",
//       selector: row => row.name
//     },{
//       name:'Email',
//     },{
//       name:"City"
//     }
// ]

//    useEffect(()=>{
//     const fetData =async ()=>{
//       axios.get('https://jsonplaceholder.typicode.com/users')
//       .then(res=>setRecords(res.data)
// setFilterRecords(res.data))
//       .catch(err=>console.log(err));
//     }
//     fetData();
//    })
//     const[records, setRecords]=useState([])
//     const [filterRecords, setRecords] = useState([])
//  const handleFilter = (event) => {
//   const newData = filterRecords.filter(
//     (row) => row.name.toLowerCase().includes(event.target.value.toLowerCase())
//   );
//   setRecords(newData);
// }
//   return (
//     <div className=''>
//     <div className=' row g-3  min-vh-100  d-flex justify-content-center align-items-center '>

// <input type="text"  placeholder='Search course...' onChange={this.handleFilter} style={{padding:'6px 10px', borderColor:'transparent'}}/></div>
// <DataTable
//  columns={columns}
//  data={this.state.records}
//  customStyles={customStyles}
//  pagination
//  selectableRows
//  >
//      </div>
//     </div>
//   )
// }

// export default DashCourse
