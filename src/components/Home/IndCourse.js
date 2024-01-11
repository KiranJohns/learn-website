import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Link from "next/link";
import BasicExample from "../About/button1";
import fetchData, { getUserType } from "../../axios";
import Modal from "react-responsive-modal";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";

const customStyles = {
  headRow: {
    style: {
      backgroundColor: "#212450",
      color: "white",
    },
  },
  headCells: {
    style: {
      fontSize: "16px",
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

const IndCourse = () => {
  const [records, setRecords] = useState([]);
  const [filterRecords, setFilterRecords] = useState([]);
  const [subUsers, setSubUsers] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const [pending, setPending] = React.useState(true);

  const makeRequest = fetchData();
  let sub_user_id = null;
  let course_id = null;
  let purchased_course_id = null;

  const handleFilter = (event) => {
    const newData = filterRecords.filter((row) =>
      row.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setRecords(newData);
  };

  const getData = async () => {
    try {
      // let onGoingCourseUrl = "/on-going-course/get-all-on-going-courses";
      let url1 = "/course/get-bought-course";
      let url2 = "/course/get-all-assigned-course";
      Promise.all([
        // makeRequest("GET", onGoingCourseUrl),
        makeRequest("GET", url1),
        makeRequest("GET", url2),
      ]).then((res) => {
        console.log(res[0].data.response, res[1].data.response);
        let arr = [
          // ...res[0].data.response,
          ...res[0].data.response.filter((item) => item?.course_count >= 1),
          ...res[1].data.response.filter((item) => item?.course_count >= 1),
        ];
        console.log(res);
        setRecords(arr.reverse());
        setFilterRecords(arr.reverse());
        setPending(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowModal = () => {
    setOpenModal(!openModal);
  };

  const handleStart = (id, from) => {
    let form = new FormData();
    form.append("from", from);
    form.append("course_id", id);
    makeRequest("POST", "/course/start-course", form)
      .then((res) => {
        console.log(res);
        location.href = `/learnCourse/coursepage/?courseId=${res.data.response.id}`;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      name: "No",
      selector: (row, idx) => idx + 1,
      width: "90px",
      center: true,
      hide:'md'
    },
    {
      name: "name",
      selector: (row) => row.name || row.Name,
      sortable: true,
      width: "280px",
      center: true,
    },

    {
      name: "category",
      selector: (row) => row.category,
      hide:'md'
    },

    {
      name: "validity",
      center: true,
      selector: (row) => row.validity,
    },
    {
      name: "Action",
      center: true,
      cell: (row) => {
        let validity = row.validity.split("/").reverse();
        return (
          <>
            {new Date(validity.join("-")) > new Date() ? (
              <>
                {row?.progress ? (
                  <Link
                    href={{
                      pathname: "/learnCourse/coursepage",
                      query: {
                        courseId: row.on_going_course_id,
                        from: "course",
                      },
                    }}
                  >
                    <a className="btn btn-success">
                      {row?.progress >= 80 ? "Completed" : "Start"}
                    </a>
                  </Link>
                ) : (
                  <a
                    onClick={() => {
                      if (row.from_purchased) {
                        handleStart(row.id, "purchased");
                      } else {
                        handleStart(row.id, "assigned");
                      }
                    }}
                    className="btn btn-success"
                  >
                    Start
                  </a>
                )}{" "}
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
      <div
        style={{ position: "relative" }}
        className=" row g-3  min-vh-100  d-flex justify-content-center dash-shadow mt-10"
      >
        <h2
          className=""
          style={{
            color: "#212450",
            display: "flex",
            justifyContent: "center",
            position: "absolute",
            fontSize: 36,
          }}
        >
          My Courses
        </h2>
        <div>
          <div
            className="reacttable-hidden"
            style={{ padding: "", backgroundColor: "" }}
          >
            <div
              style={{ float: "right", marginBottom: "1.4rem" }}
              className="p-relative d-inline header__search searchbar-hidden"
            >
              <form action="">
                <input
                  style={{ background: "#edeef3" }}
                  className="d-block  "
                  type="text"
                  placeholder="Search..."
                  value={searchData}
                  onChange={(e) => setSearchData(e.target.value)}
                />
                <button type="submit">
                  <i className="fas fa-search"></i>
                </button>
              </form>
            </div>
            <DataTable
              responsive={true}
              progressPending={pending}
              progressComponent={
                pending ? (
                  <div style={{ padding: "1rem" }}>
                    <Spinner animation="border" variant="primary" />
                  </div>
                ) : null
              }
              columns={columns}
              data={
                searchData
                  ? records.filter((item) =>
                      (item?.Name || item?.name)
                        .toLowerCase()
                        .startsWith(searchData.toLowerCase())
                    )
                  : records
              }
              customStyles={customStyles}
              pagination
              persistTableHead={true}
            />
          </div>
          <div style={{marginTop: '2rem'}}>
          {searchData
            ? records
                .filter((item) =>
                  (item?.Name || item?.name)
                    .toLowerCase()
                    .startsWith(searchData.toLowerCase())
                )
                .map((item) => {
                  return (
                    <div
                      style={{
                        paddingTop: "1rem",
                        marginTop: "0.2rem",
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
                            {item?.Name || item?.name}
                          </p>
                          <>
                            {new Date(
                              item?.validity.split("/").reverse().join("-")
                            ) > new Date() ? (
                              <>
                                {item?.progress ? (
                                  <Link
                                    href={{
                                      pathname: "/learnCourse/coursepage",
                                      query: {
                                        courseId: item.on_going_course_id,
                                        from: "course",
                                      },
                                    }}
                                  >
                                    <a
                                      style={{
                                        height: "35px",
                                        marginTop: "1rem",
                                        marginRight: ".4rem",
                                      }}
                                      className="btn btn-success"
                                    >
                                      {item?.progress >= 80
                                        ? "Completed"
                                        : "Start"}
                                    </a>
                                  </Link>
                                ) : (
                                  <a
                                    onClick={() => {
                                      if (item.from_purchased) {
                                        handleStart(item.id, "purchased");
                                      } else {
                                        handleStart(item.id, "assigned");
                                      }
                                    }}
                                    style={{
                                      height: "35px",
                                      marginTop: "1rem",
                                      marginRight: ".4rem",
                                    }}
                                    className="btn btn-success"
                                  >
                                    Start
                                  </a>
                                )}{" "}
                              </>
                            ) : (
                              <a
                                className="btn btn-danger"
                                style={{
                                  height: "35px",
                                  marginTop: "1rem",
                                  marginRight: ".4rem",
                                }}
                              >
                                Expired
                              </a>
                            )}
                          </>
                          {/* <button className="btn btn-success" style={{height:'35px',marginTop:"1rem", marginRight:'.4rem'}}>View</button> */}
                        </div>
                      </div>
                    </div>
                  );
                })
            : records.map((item) => {
                return (
                  <div
                    style={{
                      paddingTop: "1rem",
                      marginTop: "0.2rem",
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
                          {item?.Name || item?.name}
                        </p>
                        <>
                          {new Date(
                            item?.validity.split("/").reverse().join("-")
                          ) > new Date() ? (
                            <>
                              {item?.progress ? (
                                <Link
                                  href={{
                                    pathname: "/learnCourse/coursepage",
                                    query: {
                                      courseId: item.on_going_course_id,
                                      from: "course",
                                    },
                                  }}
                                >
                                  <a
                                    style={{
                                      height: "35px",
                                      marginTop: "1rem",
                                      marginRight: ".4rem",
                                    }}
                                    className="btn btn-success"
                                  >
                                    {item?.progress >= 80
                                      ? "Completed"
                                      : "Start"}
                                  </a>
                                </Link>
                              ) : (
                                <a
                                  onClick={() => {
                                    if (item.from_purchased) {
                                      handleStart(item.id, "purchased");
                                    } else {
                                      handleStart(item.id, "assigned");
                                    }
                                  }}
                                  style={{
                                    height: "35px",
                                    marginTop: "1rem",
                                    marginRight: ".4rem",
                                  }}
                                  className="btn btn-success"
                                >
                                  Start
                                </a>
                              )}{" "}
                            </>
                          ) : (
                            <a
                              className="btn btn-danger"
                              style={{
                                height: "35px",
                                marginTop: "1rem",
                                marginRight: ".4rem",
                              }}
                            >
                              Expired
                            </a>
                          )}
                        </>
                        {/* <button className="btn btn-success" style={{height:'35px',marginTop:"1rem", marginRight:'.4rem'}}>View</button> */}
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

export default IndCourse;
