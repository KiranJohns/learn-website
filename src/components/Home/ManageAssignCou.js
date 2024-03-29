import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Link from "next/link";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import BasicExample from "../About/button1";
import fetchData from "../../axios";
import Modal from "react-responsive-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tab } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { jwtDecode } from "jwt-decode";
import Backbutton from "./Backbutton";
import { FaArrowAltCircleLeft } from "react-icons/fa";



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
    },
  },
  cells: {
    style: {
      fontSize: "15px",
    },
  },
};

const ManagerAssignCourse = () => {
  const [pending, setPending] = React.useState(true);
  const [from, setFrom] = useState("");
  const [records, setRecords] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [courseName, setCourseName] = useState("");
  const [companyIndividuals, setCompanyIndividuals] = useState([]);
  const [filteredCompanyIndividuals, setFilteredCompanyIndividuals] = useState(
    []
  );
  const [allManagers, setAllManagers] = useState([]);
  const [filteredManagers, setFilteredManagers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBundleCount, setSelectedBundleCount] = useState(0);
  const [assignData, setAssignData] = useState({
    course_id: null, // purchased course id (purchased course table id)
    userId: null,
    count: null,
  });
  const [user, setUser] = useState(() => {
    let token = localStorage.getItem(`learnforcare_access`);
    return jwtDecode(token);
  });
  const [selectUserForAssignCourse, setSelectUserForAssignCourse] =
    useState("individual");

  const openModal = () => {
    setShowModal(!showModal);
  };

  const makeRequest = fetchData();
  async function getData() {
    setPending(true);
    let purchasedRes = await makeRequest("GET", "/course/get-bought-course");
    let assignedRes = await makeRequest(
      "GET",
      "/info/get-assigned-course-for-manager"
    );
    Promise.all([purchasedRes, assignedRes])
      .then((res) => {
        console.log(res[0].data.response);
        console.log(res[1].data.response);
        let newRes = [
          ...res[0].data.response,
          ...res[1].data.response.filter((item) => item.owner != user.id),
        ];
        console.log(newRes);
        function compareDates(a, b) {
          var dateA = a.validity.split("/").reverse().join("/");
          var dateB = b.validity.split("/").reverse().join("/");
          return dateB.localeCompare(dateA); // Reverse the comparison
        }
        
        // Sort the array of objects
        newRes.sort(compareDates);
        setRecords(newRes);
        setPending(false);
      })
      .catch((err) => {
        console.log(err);
      });

    makeRequest("GET", "/info/get-all-manager-individual")
      .then((res) => {
        setFilteredCompanyIndividuals(res.data.response);
        setCompanyIndividuals(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  function assignCourseToManagerIndividual(id) {
    let form = new FormData();
    form.append("course_id", assignData.course_id);
    form.append("userId", id);
    form.append("count", 1);

    console.log("course_id ", "from");
    console.log("id ", id);
    console.log(1);
    makeRequest("POST", "/info/assign-course-to-manager-individual", form)
      .then((res) => {
        getData();
        setSelectedBundleCount((prev) => --prev);
        console.log(res);
        toast("Course Assigned");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function assignCourseToManagerIndividualFromAssigned(id) {
    let form = new FormData();
    form.append("course_id", assignData.course_id);
    form.append("userId", id);
    form.append("count", 1);

    console.log("from ", assignData.course_id);
    console.log("id ", id);
    console.log(1);
    makeRequest(
      "POST",
      "/info/assign-course-to-manager-individual-from-manager-assigned",
      form
    )
      .then((res) => {
        getData();
        setSelectedBundleCount((prev) => --prev);
        console.log(res);
        toast("Course Assigned");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function selfAssign() {
    console.log("from ", from);
    let form = new FormData();
    form.append("id", assignData.course_id);
    form.append(
      "from",
      from == "purchased" ? "manager-purchased" : "manager-assigned"
    );
    form.append("count", 1);

    makeRequest("POST", "/info/manager-self-assign-course", form)
      .then((res) => {
        getData();
        openModal();
        console.log(res);
        toast("Course Assigned");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const columns = [
    {
      name: "Sl No.",
      selector: (row, idx) => ++idx,
      center: true,
      width: "80px",
      hide: 1000,
    },
    {
      name: "course",
      selector: (row) => row.name || row.Name,
      sortable: true,
      center: true,
      width: "310px",
    },
    {
      name: "validity",
      selector: (row) => row.validity,
      center: true,
      hide: 708,
    },
    {
      name: "count",
      selector: (row) => (row.course_count <= 0) ? 0 : row.course_count,
      center: true,
    },
    {
      name: "action",
      center: true,
      selector: (row) => {
        let validity = row.validity.split("/").reverse();
        let flag = false;
        let title = "Start";
        if (row.valid) {
          flag = true;
        } else {
          flag = false;
        }
        return (
          <>
            {flag ? (
              <a
                className="btn btn-primary"
                onClick={() => {
                  openModal();
                  setCourseName(row.Name || row.name);
                  console.log("row", row.id);
                  setAssignData((prev) => {
                    return {
                      ...prev,
                      course_id: row.id,
                    };
                  });
                  if (row.from_purchased) {
                    setFrom("purchased");
                  } else {
                    setFrom("assigned");
                  }
                  setSelectedBundleCount(row.course_count);
                }}
              >
                Assign To
              </a>
            ) : (
              <>
                <a className="btn btn-danger">Expired</a>
              </>
            )}
          </>
        );
      },
    },
  ];

  return (
    <div className="">
      <ToastContainer />
      <div className="dash-shadow">
        <div
          style={{ position: "relative" }}
          className=" row g-3  min-vh-100  d-flex justify-content-center mt-20"
        >
           <span style={{position:'absolute', marginLeft:"1.25rem", marginTop:"1.2rem", zIndex:"99"}} className=""><button style={{background:"white"}} onClick={() => history.back()}> <FaArrowAltCircleLeft className="back-fontsize"  style={{color:"#212a50", }}/></button></span >
          <h2 className="purchased-font"
            style={{
              color: "#212450",
              display: "flex",
              justifyContent: "center",
              position: "absolute",
              marginTop: "1.2rem",             
            }}
          >
            Purchased Course
          </h2>
          <div style={{ padding: "", backgroundColor: "" }}>
            <Modal
              styles={{ padding: "2rem" }}
              open={showModal}
              onClose={() => {
                setShowModal(false);
                setAssignData((prev) => {
                  return {
                    ...prev,
                    count: 1,
                  };
                });
              }}
            >
              <div
                style={{ maxHeight: "220rem" }}
                className="dash-shadow p-3 mt-4 assign-width"
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h5
                    className="assign-cname"
                    style={{ color: "#212a50", marginLeft: "1rem" }}
                  >
                    {courseName}
                  </h5>{" "}
                  <h5 style={{ color: "#212a50", marginRight: "1rem" }}>
                    Available Course Count:{selectedBundleCount}
                  </h5>
                </div>
                <div>
                  <div className="form-control dash-shadow d-flex gap-3 p-3">
                    <div className="form-group">
                      <label
                        style={{ fontSize: ".66rem" }}
                        for="exampleInputEmail1"
                      >
                        Assign Course Count
                      </label>
                      <input
                        style={{ width: "5.9rem", textAlign: "center" }}
                        disabled
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="1"
                      />
                    </div>
                    <div className="form-group assign-ml">
                      <label
                        style={{ visibility: "hidden" }}
                        for="exampleInputEmail1"
                      >
                        Search
                      </label>
                      <div className="p-relative d-inline ">
                        <input
                          style={{ width: "18rem" }}
                          onChange={(e) =>
                            setFilteredCompanyIndividuals(
                              companyIndividuals.filter((item) =>
                                item.first_name
                                  .toLocaleLowerCase()
                                  .startsWith(
                                    e.target.value.toLocaleLowerCase()
                                  )
                              )
                            )
                          }
                          type="text"
                          className="form-control assign-search"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="enter user name"
                        />
                        <i
                          style={{
                            position: "absolute",
                            left: "13.3rem",
                            top: "2.2rem",
                          }}
                          className="bi bi-search"
                        ></i>
                      </div>
                    </div>
                  </div>
                  <div className="list-group bg-white">
                    <ul classNAm="list-group">
                      <li
                        style={{
                          background: "#212a50",
                          fontWeight: "700",
                          borderRadius: ".3rem",
                          color: "white",
                        }}
                        class="list-group-item my-2  d-flex justify-content-between"
                      >
                        <span
                          style={{ width: "fit-content", marginLeft: ".7rem" }}
                        >
                          Name
                        </span>
                        <span
                          className="assign-modal"
                          style={{ textAlign: "center" }}
                        >
                          Email
                        </span>
                        <span
                          style={{ width: "fit-content", marginRight: "1rem" }}
                        >
                          Action
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="list-group bg-white">
                    <ul class="list-group">
                      <li class="list-group-item bg-white text-black d-flex justify-content-between">
                        <span style={{ width: "fit-content" }}>
                          {user.first_name + " " + user.last_name}
                        </span>
                        <span className="assign-modal">{user.email}</span>
                        <span
                          onClick={() => {
                            if (selectedBundleCount < 1) {
                              toast.warn(
                                "Remaining Course Count: " + selectedBundleCount
                              );
                              return;
                            } else {
                              selfAssign();
                            }
                          }}
                          style={{
                            width: "fit-content",
                            margin: "0rem .1rem",
                          }}
                          className="btn btn-success"
                        >
                          Assign
                        </span>
                      </li>
                      {filteredCompanyIndividuals &&
                        filteredCompanyIndividuals.map((item) => {
                          return (
                            <li class="list-group-item bg-white text-black d-flex justify-content-between">
                              <span style={{ width: "fit-content" }}>
                                {item.first_name + " " + item.last_name}
                              </span>
                              <span className="assign-modal">{item.email}</span>
                              <span
                                onClick={() => {
                                  if (selectedBundleCount < 1) {
                                    toast.warn(
                                      "Remaining Course Count: " +
                                        selectedBundleCount
                                    );
                                    return;
                                  } else {
                                    if (from == "purchased") {
                                      assignCourseToManagerIndividual(item.id);
                                    } else {
                                      assignCourseToManagerIndividualFromAssigned(
                                        item.id
                                      );
                                    }
                                  }
                                }}
                                style={{ width: "fit-content" }}
                                className="btn btn-success"
                              >
                                Assign
                              </span>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </div>
              </div>
            </Modal>
            <div className="reacttable-hidden">
              <div
                style={{ float: "right", marginBottom: "1.4rem" }}
                className="p-relative d-inline header__search searchbar-hidden"
              >
                <form action="">
                  <input
                    style={{ background: "#edeef3" }}
                    className="d-block mr-10"
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
              <DataTable
                progressPending={pending}
                progressComponent={
                  pending ? (
                    <div style={{ padding: "1rem" }}>
                      <Spinner animation="border" variant="primary" />
                    </div>
                  ) : null
                }
                noDataComponent={"No records to display"}
                persistTableHead={true}
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
              />
            </div>
            {records.length <= 0 && !pending && (
              <h4
                className="no-record-hidden"
                style={{ textAlign: "center", marginTop: "4rem" }}
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
            <div style={{ paddingTop: "1rem", marginTop: "3rem" }}>
              {searchString
                ? records
                    .filter((item) =>
                      (item.name || item.Name)
                        .toLowerCase()
                        .startsWith(searchString.toLowerCase())
                    )
                    .map((item) => {
                      let validity = item.validity.split("/").reverse();
                      let flag = false;
                      let title = "Start";
                      if (item.valid) {
                        flag = true;
                      } else {
                        flag = false;
                      }
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
                                {flag ? (
                                  <a
                                    className="btn btn-primary"
                                    onClick={() => {
                                      openModal();
                                      setCourseName(item.Name || item.name);
                                      setAssignData((prev) => {
                                        return {
                                          ...prev,
                                          course_id: item.id,
                                        };
                                      });
                                      if (item.from_purchased) {
                                        setFrom("purchased");
                                      } else {
                                        setFrom("assigned");
                                      }
                                      setSelectedBundleCount(item.course_count);
                                    }}
                                  >
                                    Assign To
                                  </a>
                                ) : (
                                  <>
                                    <a className="btn btn-danger">Expired</a>
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
                    let validity = item.validity.split("/").reverse();
                    let flag = false;
                    let title = "Start";
                    if (item.valid) {
                      flag = true;
                    } else {
                      flag = false;
                    }
                    return (
                      <div
                        style={{
                          marginTop: ".7rem",
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
                                marginRight: ".44rem",
                              }}
                            >
                              {item.name || item.Name}
                            </p>
                            <>
                              {flag ? (
                                <a
                                  className="btn btn-primary"
                                  onClick={() => {
                                    openModal();
                                    setCourseName(item.Name || item.name);
                                    setAssignData((prev) => {
                                      return {
                                        ...prev,
                                        course_id: item.id,
                                      };
                                    });
                                    if (item.from_purchased) {
                                      setFrom("purchased");
                                    } else {
                                      setFrom("assigned");
                                    }
                                    setSelectedBundleCount(item.course_count);
                                  }}
                                  style={{
                                    height: "35px",
                                    marginTop: "1rem",
                                    marginRight: ".4rem",
                                    width: "6rem !important",
                                  }}
                                >
                                  Assign To
                                </a>
                              ) : (
                                <>
                                  <a
                                    style={{
                                      height: "35px",
                                      marginTop: "1rem",
                                      marginRight: ".4rem",
                                      width: "6rem !important",
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
                       Time: {item.time}
                        <a className="my-dashlink"></a>
                      </p> */}
                            <p
                              style={{
                                color: "green",
                                marginLeft: ".5rem",
                                fontWeight: "500",
                              }}
                            >
                              Validity: {item.validity}
                            </p>
                            <p
                              style={{
                                color: "green",
                                marginRight: ".5rem",
                                fontWeight: "500",
                              }}
                            >
                             Count: {(item.course_count <= 0) ? 0 : item.course_count}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default ManagerAssignCourse;
