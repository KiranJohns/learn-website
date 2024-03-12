import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Link from "next/link";
import BasicExample from "../About/button1";
import fetchData from "../../axios";
import Modal from "react-responsive-modal";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { FaEye } from "react-icons/fa";
import { Spinner } from "react-bootstrap";
import { TbDownload } from "react-icons/tb";
import { TbDownloadOff } from "react-icons/tb";
import Backbutton from "./Backbutton";

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
      fontSize: "14px",
      justifyContent: "center",
    },
  },
};

const AttemptsExam = () => {
  const [records, setRecords] = useState([]);
  const [filterRecords, setFilterRecords] = useState([]);
  const [subUsers, setSubUsers] = useState([]);
  const [user, setUser] = useState(
    jwtDecode(localStorage.getItem(`learnforcare_access`))
  );
  const [searchData, setSearchData] = useState("");
  const [courseName, setCourseName] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [pending, setPending] = useState(true);

  const makeRequest = fetchData();

  function compareDates(a, b) {
    var dateA = a.date.split("/").reverse().join("/");
    var dateB = b.date.split("/").reverse().join("/");
    return dateB.localeCompare(dateA); // Reverse the comparison
  }

  // Sort the array of objects
  
 


  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const courseId = searchParams.get("courseId");
    const bundleId = searchParams.get("bundleId");
    const courseName = searchParams.get("course_name");
    setCourseName(courseName);

    setPending(true);
    if (bundleId) {
      console.log('bundle');
      makeRequest("POST", `/bundle/get-single-bundle-attempts`,{
        course_id: courseId,
        bundle_id: bundleId
      })
        .then((res) => {
          setPending(false);
          console.log(res.data.response);
          setRecords(res.data.response.reverse());
          setFilterRecords(res.data.response);
        })
        .catch((err) => {
          setPending(false);
          console.log(err);
        });
    } else {
      console.log('course');
      makeRequest("GET", `/on-going-course/get-attempts/${courseId}`)
        .then((res) => {
          setPending(false);
          console.log(res.data.response);
          let data = res.data.response;
          data.sort(compareDates);
          setRecords(data);
          setFilterRecords(res.data.response);
        })
        .catch((err) => {
          setPending(false);
          console.log(err);
        });
    }

    getData();
  }, []);

  const getData = () => {
    try {
      // makeRequest("GET", "/course/get-all-assigned-course")
      //   .then((res) => {
      //     const filteredRecords = res.data.response.reverse().filter(item => item?.owner == user?.id);
      //     setRecords(filteredRecords);
      //     setFilterRecords(res.data);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      // makeRequest("GET", "/info/get-all-sub-users")
      //   .then((res) => {
      //     setSubUsers(res.data.response);
      //   })
      //   .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowModal = () => {
    setOpenModal(!openModal);
  };

  const assignCourse = (e, subUser) => {
    e.persist();
    makeRequest("POST", "/info/assign-course-to-sub-user", {
      sub_user_id: subUser.id,
      course_id: courseId,
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
    const makeRequest = fetchData();
    const form = new FormData();
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
      name: "NO.",
      selector: (row, idx) => ++idx,
      center: true,
      width: "80px",
      hide: 374,
    },
    {
      name: "Date",
      center: true,
      selector: (row) => row.date,
      width: "100px",
      hide: 640,
    },
    {
      name: "Time",
      center: true,
      selector: (row) => row.time,
      hide: 640,
    },
    {
      name: "Course Name",
      center: true,
      selector: (row) => courseName,
      hide: 640,
    },
    {
      name: "Marks Obtained",
      selector: (row) => (row?.percentage ? row?.percentage : 0),
    },
    {
      name: "status",
      selector: (row) => (
        <span style={{ textTransform: "capitalize" }}>{row.status}</span>
      ),
      center: true,
      width: "80px",
    },
    {
      name: "Action",
      width: "90px",
      selector: (row) => {
        return (
          <>
            {row.certificate ? (
              <a title="Download"
                className="btn btn-success"
                target="_blank"
                href={row.certificate}
              >
                <TbDownload />
              </a>
            ) : (
              <span title="No Download" className="btn btn-success">
                <TbDownloadOff />
              </span>
            )}
          </>
        );
      },
      center: true,
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
          <ul className="list-group bg-white" style={{}}>
            {subUsers &&
              subUsers.map((item) => {
                if (!item.block) {
                  return (
                    <li className="list-group-item bg-white text-black d-flex justify-content-between align-items-center">
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
      <div
        style={{ position: "relative" }}
        className=" row g-3  min-vh-100  d-flex justify-content-center dash-shadow mt-10"
      >
        <Backbutton/>
        <h2
          style={{
            color: "#212450",
            display: "flex",
            justifyContent: "center",
            position: "absolute",
            fontSize: 36,
            marginTop: "1.2rem",
          }}
        >
          Exam Results
        </h2>
        <div
          className="reacttable-hidden"
          style={{ padding: "", backgroundColor: "" }}
        >
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
          <DataTable
            noDataComponent={"No records to display"}
            persistTableHead={true}
            columns={columns}
            data={records}
            customStyles={customStyles}
            pagination
          />
        </div>
        {pending && (
          <div
            className="no-record-hidden"
            style={{ textAlign: "center", padding: "1rem", marginTop: "5rem" }}
          >
            <Spinner animation="border" variant="primary" />
          </div>
        )}
        <div style={{ marginTop: "5rem" }}>
          {records.length <= 0 && !pending && (
            <h4
              className="no-record-hidden"
              style={{ textAlign: "center", padding: "1rem" }}
            >
              No records to display
            </h4>
          )}
          {/* <div style={{ marginTop: "3rem" }}> */}
          {records.map((item) => {
            return (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  padding: ".5rem",
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
                        paddingTop: ".5rem",
                        paddingLeft: ".4rem",
                        color: "#212a50",
                        fontWeight: "bold",
                      }}
                    >
                      {courseName}
                    </p>
                    <p
                      style={{
                        color: "#212a50",
                        marginRight: ".5rem",
                        fontWeight: "500",
                        paddingTop: ".5rem",
                      }}
                    >
                      {item.certificate ? (
                        <a
                          className="btn btn-success"
                          target="_blank"
                          href={item.certificate}
                        >
                          <TbDownload />
                        </a>
                      ) : (
                        <span className="btn btn-success">
                          <TbDownloadOff />
                        </span>
                      )}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    {/* <p
                        style={{
                          color: "green",
                          marginLeft: ".5rem",
                          fontWeight: "500",
                        }}
                      >
                        Course: {item?.course_count}
                        <a className="my-dashlink"></a>
                      </p> */}
                    <p
                      style={{
                        color: "green",
                        marginLeft: ".5rem",
                        fontWeight: "500",
                      }}
                    >
                      Date: {item?.date}
                    </p>
                    <p
                      style={{
                        color: "green",
                        marginRight: ".5rem",
                        fontWeight: "500",
                      }}
                    >
                      Time: {item?.time}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    {/* <p
                        style={{
                          color: "green",
                          marginLeft: ".5rem",
                          fontWeight: "500",
                        }}
                      >
                        Course: {item?.course_count}
                        <a className="my-dashlink"></a>
                      </p> */}
                    <p
                      style={{
                        color: "green",
                        marginLeft: ".5rem",
                        fontWeight: "500",
                      }}
                    >
                      Status: {item?.status}
                    </p>
                    <p
                      style={{
                        color: "green",
                        marginRight: ".5rem",
                        fontWeight: "500",
                      }}
                    >
                      Marks: {item?.percentage ? item?.percentage : 0}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default AttemptsExam;
