import React, { useEffect, useState } from "react";
import Link from "next/link";
import DashboardBar from "../Sidebar/DashboardBar";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import fetchData, { getUserType } from "../../axios";
import DataTable from "react-data-table-component";
import { useRouter } from "next/router";
import { IoHandLeft } from "react-icons/io5";
import { decryptData } from "../../utils/crtyper";
import { Spinner } from "react-bootstrap";

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

function DashIndividual() {
  const [records, setRecords] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [filterRecords, setFilterRecords] = useState([]);
  const [pending, setPending] = useState(true);
  const [info, setInfo] = useState({});
  const route = useRouter();

  const handleFilter = (event) => {
    const newData = filterRecords.filter((row) =>
      row.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setRecords(newData);
  };

  useEffect(() => {
    makeRequest("GET", "/info/data")
      .then((res) => {
        setInfo(res.data.response[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  function handleSearch() {}

  const makeRequest = fetchData();

  const getData = () => {
    setPending(true);
    try {
      makeRequest("GET", "/on-going-course/get-all-on-going-courses")
        .then((res) => {
          console.log(res.data.response);
          setRecords(res.data.response.reverse());
          setFilterRecords(res.data);
          setPending(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // const handleStart = (id, from) => {
  //   let form = new FormData();
  //   form.append("from", from);
  //   form.append("course_id", id);
  //   makeRequest("POST", "/course/start-course", form)
  //     .then((res) => {
  //       console.log(res);
  //       location.pathname = `/learnCourse/coursepage/?courseId=${id}`;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  function startCourse(id) {
    console.log(id);
    // makeRequest("GET", `/course/start-course/${id}`)
    //   .then((res) => {
    //     route.push(`/company/course-learn/${res.data.response.id}`);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  useEffect(() => {
    getData();
  }, []);

  // useEffect(() => {
  //   if(searchString) {
  //     setRecords((prev) => {
  //       return
  //     })
  //   }
  // }, [searchString]);

  const columns = [
    {
      name: "No",
      selector: (row, idx) => idx + 1,
      center: true,
      width: "70px",
      hide: "lg",
    },
    {
      name: "Name",
      selector: (row) => (row.name ? row.name : row.Name),
      center: true,
      width: "320px",
    },
    {
      name: "category",
      selector: (row) => row.category,
      center: true,
      hide: "md",
    },
    {
      name: "Attempts",
      selector: (row) => (
        <a href={`/learnCourse/examAttempts/?courseId=${row.id}&course_name=${(row.name ? row.name : row.Name)}`}>
          {row.attempts + "/20"}
        </a>
      ),
      center: true,
      hide: "sm",
    },
    {
      name: "validity",
      selector: (row) => row.validity,
      hide: "md",
    },
    {
      name: "Action",
      cell: (row) => {
        let validity = row.validity.split("/").reverse();
        return (
          <>
            {row.valid ? (
              <>
                {row.progress < 80 ? (
                  <span
                    style={{ width: "7rem" }}
                    onClick={() => {
                      location.href = `/learnCourse/coursepage/?courseId=${row.id}`;
                    }}
                    className="btn btn-success"
                  >
                    Start
                  </span>
                ) : (
                  <>
                    <a
                      style={{ width: "7rem" }}
                      onClick={() => {
                        location.href = `/individual/certificates`;
                      }}
                      className="btn btn-success"
                    >
                      Completed
                    </a>
                  </>
                )}
              </>
            ) : (
              <>
                <a style={{ width: "7rem" }} className="btn btn-danger">
                  Expired
                </a>
              </>
            )}
          </>
        );
      },
    },
  ];

  return (
    <div className="container" style={{ padding: "10px" }}>
      {/* Your JSX content here */}
      <div className="ag-format-container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h3
            style={{ color: "#212450", marginTop: ".3rem", display: "inline" }}
          >
            Hello{" "}
            {info.first_name && info.last_name
              ? info.first_name + " " + info.last_name
              : " "}{" "}
            <IoHandLeft style={{ color: "#f1c27d", marginBottom: ".5rem" }} />
          </h3>
          <div className="headd-element" style={{}}>
            <h2
              style={{
                padding: "0",
                color: "#212450",
                display: "flex",
                justifyContent: "center",
                margin: ".3rem",
              }}
            >
              Dashboard
            </h2>
          </div>
        </div>
        <div
          className="team-shadow container"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div
            className=""
            style={{
              padding: ".7rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div className="ag-courses_item-comp " style={{ marginLeft: "" }}>
              <a
                href="/individual/mycourses"
                className="ag-courses-item_link-comp"
              >
                <div className="ag-courses-item_bg-comp"></div>
                <div
                  className="dash-box-h bi bi-stack ag-courses-item_date-box-new "
                  style={{ fontSize: "2rem" }}
                ></div>
                <div
                  className="ag-courses-item_title-comp dash-box-h"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "",
                    marginTop: "1rem",
                  }}
                >
                  My Courses
                </div>
              </a>
            </div>

            <div
              className="ag-courses_item-comp"
              style={{ marginLeft: ".5rem" }}
            >
              <a href="/individual/mybundles" className="ag-courses-item_link-comp">
                <div className="ag-courses-item_bg-comp"></div>
                <div
                  className="bi bi-book ag-courses-item_date-box-new"
                  style={{ fontSize: "2rem" }}
                ></div>
                <div
                  className="ag-courses-item_title-comp dash-box-h"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "",
                    marginTop: "1rem",
                  }}
                >
                  My Bundles
                </div>
              </a>
            </div>

            <div
              className="ag-courses_item-comp"
              style={{ marginLeft: ".5rem" }}
            >
              <a
                href="/individual/certificates"
                className="ag-courses-item_link-comp"
              >
                <div className="ag-courses-item_bg-comp"></div>
                <div
                  className="bi bi-patch-check-fill ag-courses-item_date-box-new"
                  style={{ fontSize: "1.8rem" }}
                ></div>
                <div
                  className="ag-courses-item_title-comp dash-box-h"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "",
                    marginTop: "1rem",
                    zIndex: "",
                  }}
                >
                  My Certificates
                </div>
              </a>
            </div>
          </div>
          <div
            className=""
            style={{
              padding: ".7rem",
              display: "flex",
              justifyContent: "center",
              flexWrap: "nowrap",
            }}
          >
            <div className="ag-courses_item-sec " style={{ marginLeft: "" }}>
              <a
                href="/all-courses"
                className="ag-courses-item_link-sec"
              >
                <div className="ag-courses-item_bg-sec"></div>
                <div
                  className="bi bi-book ag-courses-item_date-box-new"
                  style={{ fontSize: "1.8rem" }}
                ></div>
                <div
                  className="ag-courses-item_title-sec dash-box-h"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "",
                    marginTop: "1rem",
                  }}
                >
                  Buy Courses
                </div>
              </a>
            </div>

            {/* <div className="dash-box-res">
            
            </div> */}

            <div
              className="ag-courses_item-sec "
              style={{ marginLeft: "2.5rem" }}
            >
              <a
                href="/bundle/all-bundles"
                className="ag-courses-item_link-sec"
              >
                <div className="ag-courses-item_bg-sec"></div>
                <div
                  className="bi bi-stack ag-courses-item_date-box-new"
                  style={{ fontSize: "1.8rem" }}
                ></div>
                <div
                  className="ag-courses-item_title-sec dash-box-h"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "",
                    marginTop: "1rem",
                  }}
                >
                  Buy Bundles
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* <div className="ag-courses_box dash-shadow">
          <div className="ag-courses_item">
            <a href="/individual/myprofile" className="ag-courses-item_link">
              <div className="ag-courses-item_bg"></div>

              <div className="ag-courses-item_title">My Profile</div>

              <div className="bi bi-person-circle ag-courses-item_date-box">
               
              </div>
            </a>
          </div>

          <div className="ag-courses_item">
            <a href="/individual/mycourses" className="ag-courses-item_link">
              <div className="ag-courses-item_bg"></div>

              <div className="ag-courses-item_title">My Course</div>

              <div className="bi bi-archive ag-courses-item_date-box">
              
              </div>
            </a>
          </div>

          <div className="ag-courses_item">
            <a href="/individual/certificates" className="ag-courses-item_link">
              <div className="ag-courses-item_bg"></div>
              <div className="ag-courses-item_title">
                My Certificate
              </div>
              <div className="bi bi-patch-check-fill ag-courses-item_date-box">
              
              </div>
            </a>
          </div>
          
        </div> */}
        <div className="dash-shadow ">
          <div className=" row g-3  min-vh-100  d-flex justify-content-center mt-30">
            <div style={{}}>
              <div
                className="search-center-new"
                style={{
                  // display: "flex",
                  // alignItems: "center",
                  // justifyContent: "center",
                  margin: "1rem 2rem",
                }}
              >
                <h4
                  style={{
                    margin: 0,
                    color: "#212450",
                    fontSize: 35,
                  }}
                >
                  Ongoing Courses
                </h4>
                <div style={{}} className="p-relative d-inline header__search ">
                  <form className="your-element" action="">
                    <input
                      style={{ background: "#edeef3" }}
                      className="d-block  "
                      type="text"
                      placeholder="Search..."
                      value={searchString}
                      onChange={(e) => setSearchString(e.target.value)}
                    />
                    <button type="submit">
                      <i className="fas fa-search"></i>
                    </button>
                  </form>
                </div>
              </div>

              <div className="" style={{ padding: "", backgroundColor: "" }}>
                <div className="reacttable-hidden" style={{ padding: ".2rem" }}>
                  <DataTable
                    noDataComponent={"No records to display"}
                    columns={columns}
                    data={
                      searchString
                        ? records.filter((item) =>
                            (item.name || item.Name)
                              .toLowerCase()
                              .startsWith(searchString.toLowerCase())
                          )
                        : records
                    }
                    customStyles={customStyles}
                    pagination
                    persistTableHead={true}
                  />
                </div>
              </div>
              {records.length <= 0 && !pending && (
                <h4
                  className="no-record-hidden"
                  style={{ textAlign: "center", marginTop: "2rem" }}
                >
                  No records to display
                </h4>
              )}
              {pending && (
                <div
                  className="no-record-hidden"
                  style={{
                    textAlign: "center",
                    padding: "1rem",
                    marginTop: "4rem",
                  }}
                >
                  <Spinner animation="border" variant="primary" />
                </div>
              )}
              {searchString
                ? records
                    .filter((item) =>
                      (item.name || item.Name)
                        .toLowerCase()
                        .startsWith(searchString.toLowerCase())
                    )
                    .map((item) => {
                      return (
                        <div
                          style={{
                            paddingTop: "1rem",
                            marginTop: "3rem",
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
                                {item.name || item.Name}
                              </p>
                              <>
                                {item.valid ? (
                                  <>
                                    {item?.progress < 80 ? (
                                      <span
                                        onClick={() => {
                                          location.href = `/learnCourse/coursepage/?courseId=${item?.id}`;
                                        }}
                                        style={{
                                          height: "35px",
                                          marginTop: "1rem",
                                          marginRight: ".4rem",
                                        }}
                                        className="btn btn-success"
                                      >
                                        Start
                                      </span>
                                    ) : (
                                      <>
                                        <a
                                          className="btn btn-success"
                                          onClick={() => {
                                            location.href =
                                              "/individual/certificates";
                                          }}
                                          style={{
                                            height: "35px",
                                            marginTop: "1rem",
                                            marginRight: ".4rem",
                                          }}
                                        >
                                          Completed
                                        </a>
                                      </>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    <a
                                      style={{
                                        height: "35px",
                                        marginTop: "1rem",
                                        marginRight: ".4rem",
                                      }}
                                      className="btn btn-danger"
                                    >
                                      Expired
                                    </a>
                                  </>
                                )}
                              </>
                              {/* <button className="btn btn-success" style={{height:'35px',marginTop:"1rem", marginRight:'.4rem'}}>View</button> */}
                            </div>
                          </div>
                        </div>
                      );
                    })
                : records.map((item) => {
                    console.log(item);
                    return (
                      <div
                        style={{
                          paddingTop: "1rem",
                          marginTop: "0.5rem",
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
                              {item.name || item.Name}
                            </p>
                            <>
                              {item.valid ? (
                                <>
                                  {item?.progress < 80 ? (
                                    <span
                                      onClick={() => {
                                        location.href = `/learnCourse/coursepage/?courseId=${item?.id}`;
                                      }}
                                      style={{
                                        height: "35px",
                                        marginTop: "1rem",
                                        marginRight: ".4rem",
                                      }}
                                      className="btn btn-success"
                                    >
                                      Start
                                    </span>
                                  ) : (
                                    <>
                                      <a
                                        href={"/individual/certificates"}
                                        style={{
                                          height: "35px",
                                          marginTop: "1rem",
                                          marginRight: ".4rem",
                                        }}
                                        className="btn btn-success"
                                      >
                                        Completed
                                      </a>
                                    </>
                                  )}
                                </>
                              ) : (
                                <>
                                  <a
                                    style={{
                                      height: "35px",
                                      marginTop: "1rem",
                                      marginRight: ".4rem",
                                    }}
                                    className="btn btn-danger"
                                  >
                                    Expired
                                  </a>
                                </>
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
    </div>
  );
}

export default DashIndividual;
