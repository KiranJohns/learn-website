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
import Backbutton from "./Backbutton";


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
  const [date, setDate] = useState();
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
    setPending(true)
    let assignedRes = await makeRequest(
      "GET",
      "/course/get-all-assigned-course"
    );
    let purchasedRes = await makeRequest("GET", "/course/get-bought-course");
    Promise.all([purchasedRes, assignedRes])
      .then((res) => {
        console.log(pending);
        setPending(false);
        console.log(res[0].data.response);
        console.log(res[1].data.response);
        // let today = res[1].data.response.date.split("-");
        // setDate(`${today[1]}-${today[0]}-${today[2]}`);
        let newRes = [
          ...res[0].data.response,
          ...res[1].data.response.filter(
            (item) => item?.course_count != 1
          ),
        ];
        let resArr = newRes?.reverse();
        // console.log(res[0].data.response, res[1].data.response);
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
    let form = new FormData();
    form.append("id", assignData.course_id);
    form.append(
      "from",
      from == "purchased" ? "company-purchased" : "company-assigned"
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
      name: "Sl No.",
      selector: (row, idx) => ++idx,
      width: "80px",
      center: true,
      hide: 1255,
    },
    {
      name: "name",
      selector: (row) => row.name || row.Name,
      sortable: true,
      center: true,
      width: "310px",
    },
    {
      name: "Purchased No",
      selector: (row) => row.fake_count,
      center: true,
      hide: 800,
    },
    {
      name: "Assigned No",
      selector: (row) => row.fake_count - row.course_count,
      center: true,
      hide: 960,
    },

    {
      name: "Remaining No",
      selector: (row) => row.course_count <= 0 ? 0 : row.course_count,
      center: true,
    },
    {
      name: "action",
      center: true,
      selector: (row) => {
        // let flag = false;
        // let title = "Start";

        // let validity = row.validity.split("/");
        // validity = new Date(`${validity[1]}-${validity[0]}-${validity[2]}`);
        // let valid_year = new Date(validity).getFullYear();
        // let valid_month = new Date(validity).getMonth();
        // let valid_day = new Date(validity).getDate();

        // let year = new Date().getFullYear();
        // let month = new Date().getMonth() + 1;
        // let day = new Date().getDate();
        // console.log(valid_day > day);
        // console.log(valid_day, day);

        // if (valid_year > year) {
        //   flag = true;
        // } else if (valid_year == year) {
        //   if (valid_month > month) {
        //     flag = true;
        //   } else if (valid_month == month) {
        //     if (valid_day > day) {
        //       flag = true;
        //     } else {
        //       flag = false;
        //     }
        //   } else {
        //     flag = false;
        //   }
        // } else {
        //   flag = false;
        // }

        return (
          <>
            {row.valid ? (
              <a
                className="btn btn-primary"
                onClick={() => {
                  openModal();
                  console.log(row);
                  setCourseName(row.name || row.Name);
                  setAssignData((prev) => {
                    return {
                      ...prev,
                      count: 1,
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
      <ToastContainer position="top-center" />

      <div className="dash-shadow ">
        <div
          style={{ position: "relative" }}
          className=" row g-3  min-vh-100  d-flex justify-content-center mt-20"
        >
           <Backbutton/>
          <h2
            style={{
              color: "#212450",
              display: "flex",
              justifyContent: "center",
              position: "absolute",
              fontSize: 35,
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
                className="dash-shadow p-2 m-3"
                style={{ maxHeight: "200rem" }}
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
                {/*course name */}
                <Tabs
                  id="controlled-tab-example"
                  activeKey={key}
                  onSelect={(k) => setKey(k)}
                  className="mb-3"
                >
                  <Tab
                    className="assign-width"
                    eventKey="individual"
                    title="Individual"
                  >
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
                          // style={{ marginLeft: "16rem" }}
                          className="form-group assign-ml"
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
                              className="form-control assign-search"
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
                              <span
                                className="assign-modal"
                                style={{ textAlign: "center" }}
                              >
                                Email
                              </span>
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
                              <span className="assign-modal">
                                {user?.email}
                              </span>
                              <span
                                onClick={() => {
                                  if (selectedBundleCount < assignData.count) {
                                    toast.warn(
                                      "Remaining Course Count: " +
                                        selectedBundleCount
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
                                    <span className="assign-modal">
                                      {item.email}
                                    </span>
                                    <span
                                      onClick={() => {
                                        if (
                                          selectedBundleCount < assignData.count
                                        ) {
                                          toast.warn(
                                            "Remaining Course Count: " +
                                              selectedBundleCount
                                          );
                                          return;
                                        } else {
                                          if (from == "assigned") {
                                            assignCourseToManagerIndividualFromAssigned(
                                              item.id
                                            );
                                          } else {
                                            assignCourseToManagerIndividual(
                                              item.id
                                            );
                                          }
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
                  <Tab
                    className="assign-width"
                    eventKey="manager"
                    title="Manager"
                  >
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
                                Number(e.target.value) <= selectedBundleCount &&
                                Number(e.target.value) >= 1
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
                          // style={{ marginLeft: "16rem" }}
                          className="form-group assign-ml"
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
                              className="form-control assign-search"
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
                            <span
                              className="assign-modal"
                              style={{ textAlign: "center" }}
                            >
                              Email
                            </span>
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
                                  <span className="assign-modal">
                                    {item.email}
                                  </span>
                                  <span
                                    style={{ width: "fit-content" }}
                                    className="btn btn-success"
                                    onClick={() => {
                                      if (
                                        selectedBundleCount < assignData.count
                                      ) {
                                        toast.warn(
                                          "Remaining Course Count: " +
                                            selectedBundleCount
                                        );
                                        return;
                                      } else {
                                        if (from == "assigned") {
                                          assignCourseToManagerFromAssigned(
                                            item.id
                                          );
                                        } else {
                                          assignCourseToManager(item.id);
                                        }
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
              </div>
            </Modal>
            <div
              style={{ float: "right", marginBottom: "1.4rem" }}
              className="p-relative d-inline header__search searchbar-hidden2"
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
            <div
              className="reacttable-hidden"
              style={{ padding: "", backgroundColor: "" }}
            >
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

            {records.length <= 0 && !pending && (
              <h4
              className="no-record-hidden"
              style={{ textAlign: "center", marginTop: "5rem" }}
              >
                No records to display
              </h4>
            )}
            {pending && (
              <div
                className="no-record-hidden"
                style={{ textAlign: "center", padding: "1rem", marginTop: '4rem' }}
              >
                <Spinner animation="border" variant="primary" />
              </div>
            )}
            <div style={{ marginTop: "2.8rem", paddingTop: "1rem" }}>
              {searchString
                ? records
                    .filter((item) =>
                      (item.name || item.Name)
                        .toLowerCase()
                        .startsWith(searchString.toLowerCase())
                    )
                    .map((item) => {
                      let validity_date = item.validity.split("/");
                      let validity = `${validity_date[1]}-${validity_date[0]}-${validity_date[2]}`;
                      let flag = false;
                      let title = "Start";
                      if (new Date(validity) > new Date(date)) {
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
                                {item?.name || item?.Name}
                              </p>
                              {/* <button className="btn btn-success" style={{height:'35px',marginTop:"1rem", marginRight:'.4rem'}}>View</button> */}
                              <>
                                {item.valid ? (
                                  <a
                                    className="btn btn-primary"
                                    onClick={() => {
                                      openModal();
                                      console.log(item);
                                      setCourseName(item.name || item.Name);
                                      setAssignData((prev) => {
                                        return {
                                          ...prev,
                                          count: 1,
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
                                      width: "6rem !important",
                                      marginTop: "1rem",
                                      marginRight: ".4rem",
                                    }}
                                  >
                                    Assign
                                  </a>
                                ) : (
                                  <>
                                    <a
                                      style={{
                                        height: "35px",
                                        width: "6rem !important",
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
                            </div>
                          </div>
                        </div>
                      );
                    })
                : records.map((item) => {
                    // let flag = false;
                    // let title = "Start";

                    // let validity = item.validity.split("/");
                    // validity = new Date(
                    //   `${validity[1]}-${validity[0]}-${validity[2]}`
                    // );
                    // let valid_year = new Date(validity).getFullYear();
                    // let valid_month = new Date(validity).getMonth();
                    // let valid_day = new Date(validity).getDate();

                    // let year = new Date().getFullYear();
                    // let month = new Date().getMonth() + 1;
                    // let day = new Date().getDate();
                    // if (valid_year > year) {
                    //   flag = true;
                    // } else if (valid_year == year) {
                    //   if (valid_month > month) {
                    //     flag = true;
                    //   } else if (valid_month == month) {
                    //     if (valid_day > day) {
                    //       flag = true;
                    //     } else {
                    //       flag = false;
                    //     }
                    //   } else {
                    //     flag = false;
                    //   }
                    // } else {
                    //   flag = false;
                    // }

                    return (
                      <div style={{ display: "flex", flexDirection: "column", padding:'.45rem' }}>
                        <div className="new-table-shadow  new-table-hidden">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <p
                              style={{
                                paddingTop: "1.3rem",
                                paddingLeft: ".4rem",
                                color: "#212a50",
                                fontWeight: "bold",
                                marginRight:".42rem"
                              }}
                            >
                              {item?.name || item?.Name}
                            </p>
                            {/* <button className="btn btn-success" style={{height:'35px',marginTop:"1rem", marginRight:'.4rem'}}>View</button> */}
                            <>
                              {item.valid ? (
                                <a
                                  className="btn btn-primary"
                                  onClick={() => {
                                    openModal();
                                    console.log(item);
                                    setCourseName(item.name || item.Name);
                                    setAssignData((prev) => {
                                      return {
                                        ...prev,
                                        count: 1,
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
                                    width: "6rem !important",
                                    marginTop: "1rem",
                                    marginRight: ".4rem",
                                  }}
                                >
                                  Assign
                                </a>
                              ) : (
                                <>
                                  <a
                                    style={{
                                      height: "35px",
                                      width: "6rem !important",
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
                                color: "#0d6efd",
                                marginLeft: ".5rem",
                                fontWeight: "500",
                              }}
                            >
                              Purchased: {item.fake_count}
                            </p>
                            <p
                              style={{
                                color: "#0d6efd",
                                marginRight: ".5rem",
                                fontWeight: "500",
                              }}
                            >
                              Assigned: {item.fake_count-item.course_count}
                            </p>
                            <p
                              style={{
                                color: "#0d6efd",
                                marginRight: ".5rem",
                                fontWeight: "500",
                              }}
                            >
                              Remaining: {(item.course_count <= 0) ? 0 : item.course_count}
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

export default CompAssignCourse;

function Loading() {
  return <h2>🌀 Loading...</h2>;
}

{
  /* 
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
                )} */
}
