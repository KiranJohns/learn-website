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
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Tabs from "react-bootstrap/Tabs";
import Table from "react-bootstrap/Table";
import { jwtDecode } from "jwt-decode";
import Spinner from "react-bootstrap/Spinner";
import { Suspense } from "react";

const customStyles = {
  headRow: {
    style: {
      backgroundColor: "#212450",
      color: "white",
      display: "flex",
      justifyContent: "center",
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

const CompAssignCourse = () => {
  const [pending, setPending] = React.useState(true);

  const [records, setRecords] = useState([]);
  const [user, setUser] = useState(() => {
    let token = localStorage.getItem(`learnforcare_access`);
    return jwtDecode(token);
  });
  const [searchString, setSearchString] = useState("");
  const [companyIndividuals, setCompanyIndividuals] = useState([]);
  const [filteredCompanyIndividuals, setFilteredCompanyIndividuals] = useState(
    []
  );
  const [allManagers, setAllManagers] = useState([]);
  const [filteredManagers, setFilteredManagers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [from, setFrom] = useState("");
  const [courseName, setCourseName] = useState("");
  const [selectedBundleCount, setSelectedBundleCount] = useState(0);
  const [assignData, setAssignData] = useState({
    course_id: null, // purchased course id (purchased course table id)
    userId: null,
    count: null,
  });
  const [selectUserForAssignCourse, setSelectUserForAssignCourse] =
    useState("individual");

  const openModal = () => {
    setShowModal(!showModal);
  };
  const [key, setKey] = useState("individual");

  const makeRequest = fetchData();

  useEffect(() => { 
    getData();
  }, []);

  async function getData() {
    console.clear();
    let purchasedRes = await makeRequest(
      "GET",
      "/course/get-all-assigned-course"
    );
    let assignedRes = await makeRequest("GET", "/course/get-bought-course");
    Promise.all([purchasedRes, assignedRes])
      .then((res) => {
        console.log(pending);
        setPending(false);
        // console.log(res[0].data.response);
        // console.log(res[1].data.response);
        let newRes = [...res[0].data.response, ...res[1].data.response].filter(
          (item) => item?.owner != user?.id
        );
        let resArr = newRes?.reverse();
        console.log(resArr);
        setRecords(resArr);
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

    makeRequest("GET", "/info/get-all-managers")
      .then((res) => {
        setAllManagers(res.data.response);
        setFilteredManagers(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function selfAssign() {
    console.log("hi ");
    let form = new FormData();
    form.append("id", assignData.course_id);
    form.append("from", from == "purchased" ? "company-purchased" : "company-assigned");
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

  // function selfAssignToCompany() {
  //   let form = new FormData();
  //   form.append("type", assignData.course_id);
  //   form.append("count", id);
  //   form.append("user_id", assignData.count);
  //   form.append("bundle_id", assignData.count);

  //   makeRequest("POST", "/info/assign-course-or-bundle", form)
  //     .then((res) => {
  //       getData();
  //       console.log(res);
  //       toast.success("Course Assigned");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  function assignCourseToManager(id) {
    // setLoading(true);
    let form = new FormData();
    form.append("course_id", assignData.course_id);
    form.append("userId", id);
    form.append("count", assignData.count);

    makeRequest("POST", "/info/assign-course-to-manager", form)
      .then((res) => {
        getData();
        console.log(res);
        setLoading(false);
        openModal();
        toast("Course Assigned");
      })
      .catch((err) => {
        openModal();
        // toast.success("Course Assigned");
        setLoading(false);
        console.log(err);
      });
  }

  // assign course to manager individual
  function assignCourseToManagerIndividual(id) {
    let form = new FormData();

    console.log("from assigned");
    form.append("course_id", assignData.course_id);
    form.append("userId", id);
    form.append("count", 1);
    form.append("assigned", from == "assigned" ? true : false);

    console.log("from ", from);
    console.log("course_id", from);
    makeRequest("POST", "/info/assign-course-to-manager-individual", form) // purchased
      .then((res) => {
        getData();
        setLoading(false);
        console.log(res);
        toast("Course Assigned");
        openModal();
      })
      .catch((err) => {
        console.log(err);
        openModal();
        // toast.success("Course Assigned");
        setLoading(false);
      });
  }

  // assign course to individual
  function assignCourseToManagerIndividualFromAssigned(id) {
    console.log("FROM", true);
    let form = new FormData();
    form.append("course_id", assignData.course_id);
    form.append("userId", id);
    form.append("count", 1);
    // setLoading(true);
    makeRequest(
      "POST",
      "/info/assign-course-to-manager-individual-from-assigned",
      form
    )
      .then((res) => {
        getData();
        openModal();
        console.log(res);
        setLoading(false);
        toast("Course Assigned");
      })
      .catch((err) => {
        setLoading(false);
        // toast.success("Course Assigned");
        console.log(err);
      });
  }

  function assignCourseToManagerFromAssigned(id) {
    let form = new FormData();
    form.append("course_id", parseInt(assignData.course_id));
    form.append("userId", id);
    form.append("count", parseInt(assignData.count));
    // setLoading(true);
    console.log("assignData.count ", assignData.count);

    makeRequest("POST", "/info/assign-course-to-manager-from-assigned", form)
      .then((res) => {
        getData();
        console.log(res);
        openModal();
        setLoading(false);
        toast("Course Assigned");
      })
      .catch((err) => {
        // toast.success("Course Assigned");
        setLoading(false);
        console.log(err);
      });
  }

  // function selfAssign() {
  //   console.log("from self assigned ", from);
  //   let form = new FormData();
  //   form.append("id", assignData.course_id);
  //   form.append("count", 1);
  //   form.append("from", from);
  //   // setLoading(true);

  //   makeRequest("POST", "/info/manager-self-assign-course", form)
  //     .then((res) => {
  //       getData();
  //       console.log(res);
  //       // setLoading(true);
  //       openModal();
  //       toast("Course Assigned");
  //     })
  //     .catch((err) => {
  //       setLoading(false);

  //       console.log(err);
  //     });
  // }
  const columns = [
    {
      name: "No",
      selector: (row, idx) => ++idx,
      width: "70px",
      center: true,
    },
    {
      name: "name",
      selector: (row) => row.name || row.Name,
      sortable: true,
      center: true,
      width: "420px",
    },
    {
      name: "Purchased No",
      selector: (row) => row.fake_count,
      center: true,
    },
    {
      name: "Assigned No",
      selector: (row) => row.fake_count - row.course_count,
      center: true,
    },

    {
      name: "Remaining No",
      selector: (row) => row.course_count,
      center: true,
    },
    // {
    //   name: "validity",
    //   selector: (row) => {
    //     let newDt = new Date(row.validity).toLocaleDateString().split('/').map(d=> d.length <= 1 ? '0'+d : d )
    //      return newDt[1]+'/'+newDt[0] +'/'+newDt[2]

    //     },
    // },
    {
      name: "action",
      center: true,
      selector: (row) => (
        <a
          className="btn btn-primary"
          onClick={() => {
            openModal();
            console.log(row);
            setCourseName(row.name || row.Name);
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
          Assign
        </a>
      ),
    },
  ];

  return (
    <div className="">
      <ToastContainer position="top-center" />

      <div className="dash-shadow ">
        <div className=" row g-3  min-vh-100  d-flex justify-content-center mt-20">
          <h2
            style={{
              color: "#212450",
              display: "flex",
              justifyContent: "center",
              position: "absolute",
              fontSize: 36,
            }}
          >
            Purchased Courses
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
                className="dash-shadow p-3 m-3"
                style={{ maxHeight: "200rem" }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h5 style={{ color: "#212a50", marginLeft: "1rem" }}>
                    {courseName}
                  </h5>{" "}
                  <h5 style={{ color: "#212a50", marginRight: "1rem" }}>
                    Available Course Count:{selectedBundleCount}
                  </h5>
                </div>
                {/*course name */}
                <Tabs
                  id="controlled-tab-example"
                  activeKey={key}
                  onSelect={(k) => setKey(k)}
                  className="mb-3"
                >
                  <Tab eventKey="individual" title="Individual">
                    <div style={{ background: "white" }}>
                      <div className="form-control dash-shadow d-flex gap-3 p-3">
                        <div className="form-group">
                          <label
                            style={{ fontSize: ".65rem" }}
                            for="exampleInputEmail1"
                          >
                            Assign Course Count
                          </label>
                          <input
                            style={{ width: "5.9rem", textAlign: "center" }}
                            disabled
                            type="number"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="1"
                          />
                        </div>
                        <div
                          style={{ marginLeft: "16rem" }}
                          className="form-group"
                        >
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
                              className="form-control"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                              placeholder="search by name"
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

                      <div>
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
                                style={{
                                  width: "fit-content",
                                  marginLeft: ".7rem",
                                }}
                              >
                                Name
                              </span>
                              <span style={{ textAlign: "center" }}>Email</span>
                              <span
                                style={{
                                  width: "fit-content",
                                  marginRight: "1rem",
                                }}
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
                                {user?.first_name + " " + user?.last_name}
                              </span>
                              <span>{user?.email}</span>
                              <span
                                onClick={() => {
                                  selfAssign();
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
                                    <span>{item.email}</span>
                                    <span
                                      onClick={() => {
                                        console.log(from);
                                        if (from == "assigned") {
                                          assignCourseToManagerIndividualFromAssigned(
                                            item.id
                                          );
                                        } else {
                                          assignCourseToManagerIndividual(
                                            item.id
                                          );
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
                                );
                              })}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Tab>
                  {/* manager */}
                  <Tab eventKey="manager" title="Manager">
                    <div style={{ background: "white" }}>
                      <div className="form-control dash-shadow d-flex gap-3 p-3">
                        <div className="form-group">
                          <label
                            style={{ fontSize: ".65rem" }}
                            for="exampleInputEmail1"
                          >
                            Assign Course Count
                          </label>
                          <input
                            style={{ width: "5.9rem", textAlign: "center" }}
                            onChange={(e) => {
                              if (
                                Number(e.target.value) <= selectedBundleCount
                              ) {
                                setAssignData((prev) => {
                                  return {
                                    ...prev,
                                    count: e.target.value,
                                  };
                                });
                              }
                            }}
                            type="number"
                            value={assignData.count}
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="0"
                          />
                        </div>
                        <div
                          style={{ marginLeft: "16rem" }}
                          className="form-group"
                        >
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
                                setFilteredManagers(
                                  allManagers.filter((item) =>
                                    item.first_name
                                      .toLocaleLowerCase()
                                      .startsWith(
                                        e.target.value.toLocaleLowerCase()
                                      )
                                  )
                                )
                              }
                              type="text"
                              className="form-control"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                              placeholder="search by name"
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
                        <ul class="list-group">
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
                              style={{
                                width: "fit-content",
                                marginLeft: ".7rem",
                              }}
                            >
                              Name
                            </span>
                            <span style={{ textAlign: "center" }}>Email</span>
                            <span
                              style={{
                                width: "fit-content",
                                marginRight: "1rem",
                              }}
                            >
                              Action
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div className="list-group bg-white">
                        <ul class="list-group">
                          {filteredManagers &&
                            filteredManagers.map((item) => {
                              return (
                                <li class="list-group-item bg-white text-black d-flex justify-content-between">
                                  <span
                                    style={{
                                      width: "fit-content",
                                      marginLeft: ".1rem",
                                    }}
                                  >
                                    {item.first_name + " " + item.last_name}
                                  </span>
                                  <span>{item.email}</span>
                                  <span
                                    style={{ width: "fit-content" }}
                                    className="btn btn-success"
                                    onClick={() => {
                                      if (from == "assigned") {
                                        assignCourseToManagerFromAssigned(
                                          item.id
                                        );
                                      } else {
                                        assignCourseToManager(item.id);
                                      }
                                    }}
                                  >
                                    Assign
                                  </span>
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                    </div>
                  </Tab>
                </Tabs>
                {/* 
                <div className=" d-flex mb-5">
                <ButtonGroup aria-label="Basic example">
                  <strong
                    className={`btn ${selectUserForAssignCourse == "individual"
                        ? "btn-success"
                        : "btn-secondary"
                      }`}
                    onClick={() => {
                      setSelectUserForAssignCourse("individual");
                      setAssignData((prev) => {
                        return {
                          ...prev,
                          count: 1,
                        };
                      });
                    }}
                  >
                    Individual
                  </strong>
                  <strong
                    className={`btn ${selectUserForAssignCourse == "manager"
                        ? "btn-success"
                        : "btn-secondary"
                      }`}
                    onClick={() => {
                      setAssignData((prev) => {
                        return {
                          ...prev,
                          count: 1,
                        };
                      });
                      setSelectUserForAssignCourse("manager");
                    }}
                  >
                    Manager
                  </strong>
                  </ButtonGroup>
                </div>
                {selectUserForAssignCourse === "individual" ? (
                  <div>
                    <div className="form-control dash-shadow d-flex gap-3 p-3">
                      <div className="form-group">
                        <label  style={{ fontSize: ".74rem" }} for="exampleInputEmail1">Course Count</label>
                        <input
                         style={{ width: '4rem',textAlign:"center" }}
                          disabled
                          type="number"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="1"
                        />
                      </div>
                      <div style={{marginLeft:"16rem"}} className="form-group">
                        <label style={{ visibility: "hidden" }} for="exampleInputEmail1">Search</label>
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
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="search by name"
                        />
                        <i style={{ position: 'absolute', left: "13.3rem", top: "2.2rem" }} className="bi bi-search"></i>
                        </div> 
                      </div>
                    </div>

                    <div className="list-group bg-white">
                      <ul classNAm="list-group">

                      <li style={{background:"#212a50", fontWeight:"700", borderRadius:'.3rem',color:'white'}} class="list-group-item my-2  d-flex justify-content-between">
                          <span style={{ width: "fit-content", marginLeft: '.7rem' }}>
                            Name
                          </span>
                          <span style={{ textAlign: 'center' }}>Email</span>
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
                        {filteredCompanyIndividuals &&
                          filteredCompanyIndividuals.map((item) => {
                            return (
                              <li class="list-group-item bg-white text-black d-flex justify-content-between">
                                <span style={{ width: "fit-content" }}>
                                  {item.first_name + " " + item.last_name}
                                </span>
                                <span>{item.email}</span>
                                <span
                                  onClick={() => {
                                    if (from == "assigned") {
                                      assignCourseToManagerIndividualFromAssigned(
                                        item.id
                                      );
                                    } else {
                                      assignCourseToManagerIndividual(item.id);
                                    }
                                  }}
                                  style={{ width: "fit-content",margin:"0rem .1rem" }}
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
                ) : (
                  <div>
                    <div className="form-control dash-shadow d-flex gap-3 p-3">
                      <div className="form-group">
                        <label style={{ fontSize: ".73rem" }} for="exampleInputEmail1">Course Count</label>
                        <input
                          style={{ width: '4rem',textAlign:"center" }}
                          onChange={(e) => {
                            if (Number(e.target.value) <= selectedBundleCount) {
                              setAssignData((prev) => {
                                return {
                                  ...prev,
                                  count: e.target.value,
                                };
                              });
                            }
                          }}
                          type="number"
                          value={assignData.count}
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="0"
                        />
                      </div>
                      <div style={{marginLeft:"16rem"}} className="form-group">
                        <label style={{visibility:'hidden'}} for="exampleInputEmail1">Search</label>
                        <div className="p-relative d-inline ">
                        <input
                         style={{ width: "18rem" }}
                          onChange={(e) =>
                            setFilteredManagers(
                              allManagers.filter((item) =>
                                item.first_name
                                  .toLocaleLowerCase()
                                  .startsWith(
                                    e.target.value.toLocaleLowerCase()
                                  )
                              )
                            )
                          }
                          type="text"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="search by name"
                        />
                         <i style={{ position: 'absolute', left: "13.3rem", top: "2.2rem" }} className="bi bi-search"></i>
                        </div>
                      </div>
                    </div>
                    <div className="list-group bg-white">
                      <ul class="list-group">

                      <li style={{background:"#212a50", fontWeight:"700", borderRadius:'.3rem',color:'white'}} class="list-group-item my-2  d-flex justify-content-between">
                          <span style={{ width: "fit-content", marginLeft: '.7rem' }}>
                            Name
                          </span>
                          <span style={{ textAlign: 'center' }}>Email</span>
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
                        {filteredManagers &&
                          filteredManagers.map((item) => {
                            return (
                              <li class="list-group-item bg-white text-black d-flex justify-content-between">
                                <span style={{ width: "fit-content", marginLeft: '.1rem' }}>
                                  {item.first_name + " " + item.last_name}
                                </span>
                                <span>{item.email}</span>
                                <span
                                  style={{ width: "fit-content" }}
                                  className="btn btn-success"
                                  onClick={() => {
                                    if (from == "assigned") {
                                      assignCourseToManagerFromAssigned(
                                        item.id
                                      );
                                    } else {
                                      assignCourseToManager(item.id);
                                    }
                                  }}
                                >
                                  Assign
                                </span>
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  </div>
                )} */}
              </div>
            </Modal>
            <div
              style={{ float: "right", marginBottom: "1.4rem" }}
              className="p-relative d-inline header__search"
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
                noDataComponent={" "}
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
            </Suspense>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default CompAssignCourse;

function Loading() {
  return <h2>🌀 Loading...</h2>;
}
