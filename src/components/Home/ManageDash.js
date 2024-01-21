import React, { Component } from "react";
import Link from "next/link";
import ManageBar from "../Sidebar/ManagerBar";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import fetchData from "../../axios";
import DataTable from "react-data-table-component";
import { BsSearch } from "react-icons/bs";
import { IoHandLeft } from "react-icons/io5";
import Button from "react-bootstrap/Button";
import { FaEye } from "react-icons/fa";
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

class ManageDash extends Component {
  constructor() {
    super();
    this.state = {
      records: [],
      filterRecords: [],
      searchString: "",
      info: {},
    };
  }

  handleFilter = (event) => {
    const newData = this.state.filterRecords.filter((row) =>
      row.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    this.setState({ records: newData });
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    try {
      const makeRequest = fetchData();
      makeRequest("GET", "/on-going-course/get-all-on-going-courses")
        .then((res) => {
          console.log(res);
          this.setState({
            records: res.data.response,
            filterRecords: res.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });

      makeRequest("GET", "/info/data")
        .then((res) => {
          this.setState({ ...this.state, info: res.data.response[0] });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const columns = [
      {
        name: "No",
        selector: (row, idx) => idx + 1,
        center: true,
        width: "80px",
        hide: "lg",
      },
      {
        name: "Name",
        selector: (row) => (row.name ? row.name : row.Name),
        center: true,
      },
      // {
      //   name: "category",
      //   selector: (row) => row.category,
      //   center: true,
      //   hide: "md",
      // },
      {
        name: "Attempts",
        selector: (row) => (
          <a href={`/learnCourse/examAttempts/?courseId=${row.id}`}>
            {row.attempts + "/20"}
          </a>
        ),
        center: true,
      },
      {
        name: "validity",
        selector: (row) => row.validity,
        hide: "md",
        center: "true",
      },
      {
        name: "Action",
        compact: true,
        cell: (row) => {
          // if (new Date(validity) > new Date()) {
          //   if (row.progress <= 80) {
          //     if (row.attempts < 20) {
          //       flag = true;
          //       title = "Start";
          //     } else {
          //       flag = false;
          //       title = "Expired";
          //     }
          //   } else {
          //     title = "Expired";
          //     flag = false;
          //   }
          // } else {
          //   title = "Completed";
          //   flag = false;
          // }
          // let validity = row.validity.split("/").reverse();
          let flag = false;
          let title = "Start";
          if (!row.valid) {
            title = "Expired";
            flag = false;
          } else {
            title = "Start";
            flag = true;
            if (row.progress >= 80) {
              title = "Completed";
              flag = false;
            }
          }

          return (
            <>
              {flag ? (
                <a
                  style={{ width: "7rem" }}
                  onClick={() => {
                    location.href = `/learnCourse/coursepage/?courseId=${row.id}`;
                  }}
                  className="btn btn-success"
                >
                  {title}
                </a>
              ) : (
                <>
                  {title == "Completed" ? (
                    <a
                      style={{ width: "7rem" }}
                      href={"/manager/certificates"}
                      className={`btn ${
                        title == "Completed" ? "btn-success" : "btn-danger"
                      }`}
                    >
                      {title}
                    </a>
                  ) : (
                    <a
                      style={{ width: "7rem" }}
                      className={`btn ${
                        title == "Completed" ? "btn-success" : "btn-danger"
                      }`}
                    >
                      {title}
                    </a>
                  )}
                </>
              )}
            </>
          );
        },
      },
    ];

    return (
      <div className="container " style={{ padding: "10px" }}>
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
            {this.state.info.first_name && this.state.info.last_name
              ? this.state.info.first_name + " " + this.state.info.last_name
              : " "}{" "}
            <IoHandLeft style={{ color: "#f1c27d", marginBottom: ".5rem" }} />
          </h3>
          <div className="dashboard-hidden" style={{}}>
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

        <div className="ag-format-container" style={{ marginTop: "1rem" }}>
          <div className="team-shadow">
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
                  href="/bundle/all-bundles"
                  className="ag-courses-item_link-comp"
                >
                  <div className="ag-courses-item_bg-comp"></div>
                  <div
                    className="bi bi-stack ag-courses-item_date-box-new"
                    style={{ fontSize: "1.85rem" }}
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
                    Buy Bundles
                  </div>
                </a>
              </div>

              <div
                className="ag-courses_item-comp"
                style={{ marginLeft: ".5rem" }}
              >
                <a href="/all-courses" className="ag-courses-item_link-comp">
                  <div className="ag-courses-item_bg-comp"></div>
                  <div
                    className="bi bi-book ag-courses-item_date-box-new"
                    style={{ fontSize: "1.85rem" }}
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
                    Buy Courses
                  </div>
                </a>
              </div>

              <div
                className="ag-courses_item-comp"
                style={{ marginLeft: ".5rem" }}
              >
                <a
                  href="/manager/individuals"
                  className="ag-courses-item_link-comp"
                >
                  <div className="ag-courses-item_bg-comp"></div>
                  <div
                    className="bi bi-person-circle ag-courses-item_date-box-new"
                    style={{ fontSize: "1.85rem" }}
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
                    Individuals
                  </div>
                </a>
              </div>
            </div>
            <div
              className=""
              style={{
                padding: ".7rem",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div className="ag-courses_item-comp" style={{ marginLeft: "" }}>
                <a
                  href="/manager/certificates"
                  className="ag-courses-item_link-comp"
                >
                  <div className="ag-courses-item_bg-comp"></div>
                  <div
                    className="bi bi-patch-check-fill  ag-courses-item_date-box-new"
                    style={{ fontSize: "1.85rem" }}
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
                    Certificates
                  </div>
                </a>
              </div>

              <div
                className="ag-courses_item-comp"
                style={{ marginLeft: ".5rem" }}
              >
                <a
                  href="/manager/myCourses"
                  className="ag-courses-item_link-comp"
                >
                  <div className="ag-courses-item_bg-comp"></div>
                  <div
                    className="bi bi-book ag-courses-item_date-box-new"
                    style={{ fontSize: "1.85rem" }}
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
                className="ag-courses_item-comp "
                style={{ marginLeft: ".5rem" }}
              >
                <a
                  href="/manager/myBundle"
                  className="ag-courses-item_link-comp"
                >
                  <div className="ag-courses-item_bg-comp"></div>
                  <div
                    className="bi bi-stack ag-courses-item_date-box-new"
                    style={{ fontSize: "1.85rem" }}
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
            </div>
          </div>

          <div className="dash-shadow">
            <div className=" row g-3  min-vh-100  d-flex justify-content-center mt-30">
              <div
                  className="search-center-new"
                style={{
                  // display: "flex",
                  marginTop: "2.5rem",
                  // justifyContent: "space-between",
                  // alignItems: "center",
                }}
              >
                <h4
                  style={{
                    margin: 0,
                    color: "#212450",
                    fontSize: 35,
                    marginLeft: "1.2rem",
                  }}
                >
                  Ongoing Courses
                </h4>

                {/* <div
                className="reacttable-hidden"
                style={{ padding: "", backgroundColor: "" }}
              > */}

                <div className="p-relative d-inline header__search">
                  <form className="your-element" action="">
                    <input
                      className="d-block mr-25"
                      type="text"
                      placeholder="Search..."
                      value={this.state.searchString}
                      onChange={(e) =>
                        this.setState({
                          ...this.state,
                          searchString: e.target.value,
                        })
                      }
                      style={{ background: "#edeef3" }}
                    />
                    <button type="submit">
                      <i className="fas fa-search"></i>
                    </button>
                  </form>
                </div>
              </div>

              <div className="row g-3  min-vh-100 ag-format-container">
                <div style={{}}>
                  <div
                    className="pb-2"
                    style={{ display: "flex", justifyContent: "right" }}
                  >
                    {/* <input
                    type="text"
                    className=""
                    placeholder="Search course"
                    onChange={this.handleFilter}
                    style={{
                      padding: "6px 10px",
                      border: "blue",
                      borderRadius: ".15rem",
                      overflow: "hidden",
                      marginRight: ".4rem",
                      background: "#EDEEF3",
                    }}
                  /> */}
                  </div>
                  <div className="reacttable-hidden">
                    <DataTable
                      noDataComponent={"No records to display"}
                      persistTableHead={true}
                      columns={columns}
                      data={
                        this.state.searchString
                          ? this.state.records.filter((item) =>
                              (item.Name || item.name)
                                .toLowerCase()
                                .startsWith(
                                  this.state.searchString.toLowerCase()
                                )
                            )
                          : this.state.records
                      }
                      customStyles={customStyles}
                      pagination
                    />
                  </div>
                  
                  {this.state.records?.length <= 0 && <h4 className="no-record-hidden" style={{textAlign: 'center',marginTop:"1rem",}}>No records to display</h4>}
                  {this.state.searchString
                    ? this.state.records
                        .filter((item) =>
                          (item.Name || item.name)
                            .toLowerCase()
                            .startsWith(this.state.searchString.toLowerCase())
                        )
                        .map((item) => {
                          let validity = item.validity.split("/").reverse();
                          let flag = false;
                          let title = "Start";
                          if (
                            !item.valid ||
                            item?.attempts >= 20
                          ) {
                            title = "Expired";
                            flag = false;
                          } else {
                            title = "Start";
                            flag = true;
                            if (item.progress >= 80) {
                              title = "Completed";
                              flag = false;
                            }
                          }
                          return (
                            <div
                              style={{
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
                                    {item.Name || item.name}
                                  </p>
                                  <>
                                    {flag ? (
                                      <a
                                        onClick={() => {
                                          location.href = `/learnCourse/coursepage/?courseId=${item.id}`;
                                        }}
                                        className="btn btn-success"
                                        style={{
                                          width: "7rem",
                                          height: "35px",
                                          marginTop: "1rem",
                                          marginRight: ".4rem",
                                        }}
                                      >
                                        {title}
                                      </a>
                                    ) : (
                                      <>
                                        {title == "Completed" ? (
                                          <a
                                            href={"/manager/certificates"}
                                            className="btn btn-success"
                                            style={{
                                              width: "7rem",
                                              height: "35px",
                                              marginTop: "1rem",
                                              marginRight: ".4rem",
                                            }}
                                          >
                                            {title}
                                          </a>
                                        ) : (
                                          <a
                                            className="btn btn-danger"
                                            style={{
                                              width: "7rem",
                                              height: "35px",
                                              marginTop: "1rem",
                                              marginRight: ".4rem",
                                            }}
                                          >
                                            {title}
                                          </a>
                                        )}
                                      </>
                                    )}
                                  </>
                                </div>
                              </div>
                            </div>
                          );
                        })
                    : this.state.records.map((item) => {
                        let validity = item.validity.split("/").reverse();
                        let flag = false;
                        let title = "Start";
                        if (
                          !item.valid ||
                          item?.attempts >= 20
                        ) {
                          title = "Expired";
                          flag = false;
                        } else {
                          title = "Start";
                          flag = true;
                          if (item.progress >= 80) {
                            title = "Completed";
                            flag = false;
                          }
                        }
                        return (
                          <div
                            style={{
                              paddingTop: "1rem",
                              marginTop: ".4rem",
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <div className="new-table-shadow  new-table-hidden">
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
                                  {item.Name || item.name}
                                </p>
                                <>
                                  {flag ? (
                                    <a
                                      onClick={() => {
                                        location.href = `/learnCourse/coursepage/?courseId=${item.id}`;
                                      }}
                                      className="btn btn-success"
                                      style={{
                                        width: "6rem  !important",
                                        height: "35px",
                                        marginTop: "1rem",
                                        marginRight: ".4rem",
                                      }}
                                    >
                                      {title}
                                    </a>
                                  ) : (
                                    <>
                                      {title == "Completed" ? (
                                        <a
                                          href={"/manager/certificates"}
                                          className="btn btn-success"
                                          style={{
                                            width: "6rem  !important",
                                            height: "35px",
                                            marginTop: "1rem",
                                            marginRight: ".4rem",
                                          }}
                                        >
                                          {title}
                                        </a>
                                      ) : (
                                        <a
                                          className="btn btn-danger"
                                          style={{
                                            width: "6rem  !important",
                                            height: "35px",
                                            marginTop: "1rem",
                                            marginRight: ".4rem",
                                          }}
                                        >
                                          {title}
                                        </a>
                                      )}
                                    </>
                                    // <>
                                    //   <a
                                    //     className="btn btn-danger"
                                    //     style={{
                                    //       width: "7rem",
                                    //       height: "35px",
                                    //       marginTop: "1rem",
                                    //       marginRight: ".4rem",
                                    //     }}
                                    //   >
                                    //     {title}
                                    //   </a>
                                    // </>
                                  )}
                                </>
                              </div>

                              <div style={{ display: 'flex', justifyContent: "space-between" }}>
                        <p style={{ color: 'green', marginLeft: ".5rem", fontWeight: "500" }}>Attempts:{" "}{item?.attempts || 0}{"/20"}<a className="my-dashlink"></a></p>
                        <p style={{ color: 'green', marginRight: ".5rem", fontWeight: "500" }}>Validity:{" "}{item?.validity}</p>
                      </div>

                            </div>
                          </div>
                        );
                      })}
                </div>
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ManageDash;

// <div  className="ag-courses_box dash-neww">
// <div className="ag-courses_item" style={{ marginLeft: ".5rem" }}>
//   <a href="/company/myprofile" className="ag-courses-item_link">
//     <div className="ag-courses-item_bg"></div>
//     <div
//       className="bi bi-person-circle ag-courses-item_date-box"
//       style={{ fontSize: "2rem" }}
//     ></div>
//     <div
//       className="ag-courses-item_title"
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       Buy Bundles
//     </div>
//   </a>
// </div>

// <div className="ag-courses_item">
//   <a href="/company/mycourses" className="ag-courses-item_link">
//     <div className="ag-courses-item_bg"></div>
//     <div
//       className="bi bi-book ag-courses-item_date-box"
//       style={{ fontSize: "2rem" }}
//     ></div>
//     <div
//       className="ag-courses-item_title"
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       Buy Course
//     </div>
//   </a>
// </div>

// <div className="ag-courses_item">
//   <a href="/company/certificates" className="ag-courses-item_link">
//     <div className="ag-courses-item_bg"></div>
//     <div
//       className="bi bi-patch-check-fill ag-courses-item_date-box"
//       style={{ fontSize: "2rem" }}
//     >
//       <div
//         className="ag-courses-item_title"
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         My Courses
//       </div>

//     </div>
//   </a>
// </div>

// <div className="ag-courses_item" style={{ marginRight: ".5rem" }}>
//   <a href="#" className="ag-courses-item_link">
//     <div className="ag-courses-item_bg"></div>
//     <div
//       className="bi bi-file-earmark-spreadsheet ag-courses-item_date-box"
//       style={{ fontSize: "2rem" }}
//     >
//       <div
//         className="ag-courses-item_title"
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         My Bundles
//       </div>

//     </div>
//   </a>
// </div>
// </div>
