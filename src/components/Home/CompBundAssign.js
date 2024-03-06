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
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { jwtDecode } from "jwt-decode";
import { Suspense } from "react";
import Spinner from "react-bootstrap/Spinner";

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
    },
  },
  cells: {
    style: {
      fontSize: "15px",
    },
  },
};

const CompAssignBund = () => {
  const [records, setRecords] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [courseName, setCourseName] = useState("");
  const [companyIndividuals, setCompanyIndividuals] = useState([]);
  const [filteredCompanyIndividuals, setFilteredCompanyIndividuals] = useState(
    []
  );
  const [pending, setPending] = React.useState(true);
  const [allManagers, setAllManagers] = useState([]);
  const [filteredManagers, setFilteredManagers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [from, setFrom] = useState("");
  const [selectedBundleCount, setSelectedBundleCount] = useState(0);
  const [assignData, setAssignData] = useState({
    course_id: null, // purchased course id (purchased course table id)
    userId: null,
    count: null,
  });
  const makeRequest = fetchData();
  const [selectUserForAssignCourse, setSelectUserForAssignCourse] =
    useState("individual");
  const [user, setUser] = useState(() => {
    let token = localStorage.getItem(`learnforcare_access`);
    return jwtDecode(token);
  });

  const [key, setKey] = useState("individual");

  const openModal = () => {
    setShowModal(!showModal);
  };

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
        toast.success("Bundle Assigned");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function getData() {
    let purchasedRes = await makeRequest("GET", "/info/get-purchased-bundles");

    let assignedRes = await makeRequest(
      "GET",
      "/info/get-assigned-bundles-for-company"
    );
    Promise.all([purchasedRes, assignedRes])
      .then((res) => {
        let newRes = [...res[0].data.response, ...res[1].data.response]
          .filter((item) => item.owner != user.id)
          .reverse();
        // console.log(res[0].data.response,
        //   res[1].data.response);
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

    makeRequest("GET", "/info/get-all-managers")
      .then((res) => {
        setAllManagers(res.data.response);
        setFilteredManagers(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  function assignCourseToManager(id) {
    let form = new FormData();
    form.append("course_id", assignData.course_id);
    form.append("userId", id);
    form.append("count", assignData.count);

    makeRequest("POST", "/info/assign-course-to-manager", form)
      .then((res) => {
        getData();
        console.log(res);
        openModal();
        toast.success("Bundle Assigned");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function assignCourseToManagerIndividual(id) {
    let form = new FormData();
    form.append("course_id", assignData.course_id);
    form.append("userId", id);
    form.append("count", 1);

    // console.log(assignData);
    makeRequest("POST", "/info/assign-course-to-manager-individual", form)
      .then((res) => {
        getData();
        openModal();
        console.log(res);
        toast.success("Bundle Assigned");
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

    console.log(assignData);
    makeRequest(
      "POST",
      "/info/assign-course-to-manager-individual-from-assigned",
      form
    )
      .then((res) => {
        getData();
        // console.log(res);
        openModal();
        toast.success("Bundle Assigned");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function assignCourseToManagerFromAssigned(id) {
    let form = new FormData();
    form.append("course_id", assignData.course_id);
    form.append("userId", id);
    form.append("count", assignData.count);

    makeRequest("POST", "/info/assign-course-to-manager-from-assigned", form)
      .then((res) => {
        getData();
        // console.log(res);
        toast.success("Bundle Assigned");
        openModal();
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
      hide:'lg',
    },
    {
      name: "Bundle Name",
      selector: (row) => row.bundle_name,
      center: true,
      minWidth: "300px",
    },
    {
      name: "Purchased",
      selector: (row) => row.fake_count,
      center: true,
      hide:'sm',
    },
    {
      name: "Assigned",
      selector: (row) => row.fake_count - row.course_count,
      center: true,
      hide:'md',
    },

    {
      name: "Remaining",
      selector: (row) => row.course_count,
      center: true,
      id:"val"
    },
    {
      name: "action",
      center: true,
      selector: (row) => {
        let flag = false;
        let title = "Expired";
        let validity = row.validity.split("/").reverse();
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
                  setCourseName(row.bundle_name);
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
                Assign To
              </a>
            ) : (
              <>
                <a className="btn btn-danger">{title}</a>
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
      <div className="dash-shadow">
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
              marginTop: ".8rem",
            }}
          >
            Purchased Bundle
          </h2>
          <div style={{ padding: "", backgroundColor: "" }}>
            <Modal
              className=""
              styles={{ padding: "1rem" }}
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
                style={{ maxHeight: "220rem" }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h5 className="assign-cname" style={{ color: "#212a50", marginLeft: "1rem" }}>
                    {courseName}
                  </h5>{" "}
                  <h5 style={{ color: "#212a50", marginRight: "1rem" }}>
                    Available Bundle Count:{" "}{selectedBundleCount}
                  </h5>
                </div>

                <Tabs
                  id="controlled-tab-example"
                  activeKey={key}
                  onSelect={(k) => setKey(k)}
                  className="mb-3"
                >
                  <Tab className="assign-width" eventKey="individual" title="Individual">
                    <div  style={{ background: "white", }}>
                      <div className="form-control dash-shadow d-flex gap-3 p-3">
                        <div style={{display:"flex", flexDirection:"row", }}>
                          <span style={{}}>
                            {" "}
                            <label
                              style={{ fontSize: ".66rem", width:"6rem" }}
                              for="exampleInputEmail1"
                            >
                              Assign Bundle Count
                            </label>
                            <input 
                              style={{ width: "4rem", textAlign: "center", marginLeft:"1rem" }}
                              disabled
                              type="text"
                              className="form-control "
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                              placeholder="1"
                            />
                          </span>
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
                              className="form-control d-block mr-10 assign-search"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                              placeholder=" search name"
                            />
                            {/* <i
                              style={{
                                position: "absolute",
                               
                               bottom:"0"
                              }}
                              className="bi bi-search"
                            ></i> */}
                          </div>
                        </div>
                      </div>
                      <div className="list-group bg-white">
                        <ul className="list-group">
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
                            <span className="assign-modal" style={{ textAlign: "center", }}>Email</span>
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
                              {user.first_name + " " + user.last_name}
                            </span>
                            <span className="assign-modal">{user.email}</span>
                            <span
                              onClick={() => {
                                if (selectedBundleCount < assignData.count) {
                                  toast.warn(
                                    "Remaining Bundle Count: " +
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
                                  <span className="assign-modal">{item.email}</span>
                                  <span
                                    onClick={() => {
                                      if (
                                        selectedBundleCount < assignData.count
                                      ) {
                                        toast.warn(
                                          "Remaining Bundle Count: " +
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
                  </Tab>

                  <Tab className="assign-width" eventKey="manager" title="Manager">
                    <div style={{ background: "white" }}>
                      <div className="form-control dash-shadow d-flex gap-3 p-3">
                        <div className="form-group">
                          <small
                            style={{ fontSize: ".66rem" }}
                            for="exampleInputEmail1"
                          >
                            Assign Bundle Count
                          </small>
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
                              className="form-control d-block mr-10 assign-search"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                              placeholder="Search name"
                            />
                            {/* <i
                              style={{
                                position: "absolute",
                                left: "13.3rem",
                                top: "2.2rem",
                              }}
                              className="bi bi-search"
                            ></i> */}
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
                            <span className="assign-modal" style={{ textAlign: "center" }}>Email</span>
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
                                      textAlign: "center",
                                    }}
                                  >
                                    {item.first_name + " " + item.last_name}
                                  </span>
                                  <span className="assign-modal">{item.email}</span>
                                  <span
                                    style={{
                                      width: "fit-content",
                                      margin: "0rem .1rem",
                                    }}
                                    className="btn btn-success"
                                    onClick={() => {
                                      if (
                                        selectedBundleCount < assignData.count
                                      ) {
                                        toast.warn(
                                          "Remaining Bundle Count: " +
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
              style={{ float: "right", marginBottom: ".7rem" }}
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
                  noDataComponent={"No records to display"}
                  persistTableHead={true}
                  columns={columns}
                  data={
                    searchString
                      ? records.filter((item) =>
                          (item?.bundle_name)
                            .toLowerCase()
                            .startsWith(searchString.toLowerCase())
                        )
                      : records
                  }
                  customStyles={customStyles}
                  pagination
                  defaultSortFieldId="val"
                  defaultSortAsc= {false}
                />
              </Suspense>
            </div>
             {pending && (
              <div
                className="no-record-hidden"
                style={{ textAlign: "center", marginTop: "5rem" }}
              >
                <Spinner animation="border" variant="primary" />
              </div>
            )}
            {records.length <= 0 && !pending && ( <h4 className="no-record-hidden" style={{textAlign: 'center',marginTop:"5rem",}}>No records to display</h4> )}
            <div style={{marginTop:"3rem"}}>
            {searchString
              ? records
                  .filter((item) =>
                    (item?.bundle_name)
                      .toLowerCase()
                      .startsWith(searchString.toLowerCase())
                  )
                  .map((item) => {
                    let flag = false;
                    let title = "Expired";
                    let validity = item.validity.split("/").reverse();
                    if (new Date(validity) > new Date()) {
                      flag = true;
                    } else {
                      flag = false;
                    }
                    return <div
                      style={{
                        width: '100%',
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
                              marginRight: ".42rem",
                            }}
                          >
                            {item?.bundle_name}
                          </p>
                          {/* <button className="btn btn-success" style={{height:'35px',marginTop:"1rem", marginRight:'.4rem'}}>View</button> */}

                          <>
                            {flag ? (
                              <a
                                style={{
                                  height: "35px",
                                  marginTop: "1rem",
                                  marginRight: ".4rem",
                                }}
                                className="btn btn-primary"
                                onClick={() => {
                                  openModal();
                                  setCourseName(item.bundle_name);
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
                                  }}
                                  className="btn btn-danger"
                                >
                                  {title}
                                </a>
                              </>
                            )}
                          </>
                        </div>
                      </div>
                    </div>;
                  })
              : records
                  .filter((item) =>
                    (item?.bundle_name)
                      .toLowerCase()
                      .startsWith(searchString.toLowerCase())
                  )
                  .map((item) => {
                    let flag = false;
                    let title = "Expired";
                    let validity = item.validity.split("/").reverse();
                    if (item.valid) {
                      flag = true;
                    } else {
                      flag = false;
                    }
                    return <div
                      style={{
                        width: '100%',
                        // paddingTop: "1rem",
                        marginTop: ".5rem",
                        display: "flex",
                        flexDirection: "column",
                        padding:".5rem"
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
                            {item?.bundle_name}
                          </p>
                          {/* <button className="btn btn-success" style={{height:'35px',marginTop:"1rem", marginRight:'.4rem'}}>View</button> */}

                          <>
                            {flag ? (
                              <a
                                style={{
                                  height: "35px",
                                  marginTop: "1rem",
                                  marginRight: ".4rem",
                                  width: "6rem  !important",
                                }}
                                className="btn btn-primary"
                                onClick={() => {
                                  openModal();
                                  setCourseName(item.bundle_name);
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
                                    width: "6rem  !important",
                                  }}
                                  className="btn btn-danger"
                                >
                                  {title}
                                </a>
                              </>
                            )}
                          </>
                        </div>
                         
                      <div style={{ display: 'flex', justifyContent: "space-between" }}>
                        <p style={{ color: '#0d6efd', marginLeft: ".5rem", fontWeight: "500" }}>Purchased:{" "}{item?.fake_count }<a className="my-dashlink"></a></p>
                        <p style={{ color: '#0d6efd', marginRight: ".5rem", fontWeight: "500" }}>Assigned:{" "}{item?.fake_count-item?.course_count}</p>
                        <p style={{ color: '#0d6efd', marginRight: ".5rem", fontWeight: "500" }}>Remaining:{" "}{item?.course_count}</p>
                      </div>

                      </div>
                    </div>;
                  })}
                  </div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default CompAssignBund;

function Loading() {
  return <h2>🌀 Loading...</h2>;
}

{
  /* <div className="">
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
                        <div className="d-flex">
                          <span style={{}}>   <label style={{ fontSize: ".74rem" }} for="exampleInputEmail1">Bundle Count</label>
                            <input
                              style={{ width: '4rem', textAlign: "center" }}
                              disabled
                              type="text"
                              className="form-control"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                              placeholder="1"

                            /></span>
                        </div>
                        <div style={{ marginLeft: "16rem" }} className="form-group">
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
                              className="form-control d-block mr-10"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                              placeholder="search by name"
                            />
                            <i style={{ position: 'absolute', left: "13.3rem", top: "2.2rem" }} className="bi bi-search"></i>
                          </div>
                        </div>
                      </div>
                      <div className="list-group bg-white">
                        <ul className="list-group">

                          <li style={{ background: "#212a50", fontWeight: "700", borderRadius: '.3rem', color: 'white' }} class="list-group-item my-2  d-flex justify-content-between">
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
                          <li class="list-group-item bg-white text-black d-flex justify-content-between">
                            <span style={{ width: "fit-content" }}>
                              {user.first_name + " " + user.last_name}
                            </span>
                            <span>{user.email}</span>
                            <span

                              onClick={() => {
                                selfAssign()
                              }}
                              style={{ width: "fit-content", margin: "0rem .1rem" }}
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
                                      if (from == "assigned") {
                                        assignCourseToManagerIndividualFromAssigned(item.id)
                                      } else {
                                        assignCourseToManagerIndividual(item.id)
                                      }
                                    }}
                                    style={{ width: "fit-content", margin: "0rem .1rem" }}
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
                          <label style={{ fontSize: ".73rem" }} for="exampleInputEmail1">Bundle Count</label>
                          <input
                            style={{ width: '4rem', textAlign: "center" }}
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
                        <div style={{ marginLeft: "16rem" }} className="form-group">
                          <label style={{ visibility: 'hidden' }} for="exampleInputEmail1">Search</label>
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
                              className="form-control d-block mr-10"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                              placeholder="Search by name"
                            />
                            <i style={{ position: 'absolute', left: "13.3rem", top: "2.2rem" }} className="bi bi-search"></i>
                          </div>
                        </div>
                      </div>
                      <div className="list-group bg-white">
                        <ul class="list-group">

                          <li style={{ background: "#212a50", fontWeight: "700", borderRadius: '.3rem', color: 'white' }} class="list-group-item my-2  d-flex justify-content-between">
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
                                  <span style={{ width: "fit-content", textAlign: 'center' }}>
                                    {item.first_name + " " + item.last_name}
                                  </span>
                                  <span>{item.email}</span>
                                  <span
                                    style={{ width: "fit-content", margin: "0rem .1rem" }}
                                    className="btn btn-success"
                                    onClick={() => {
                                      if (from == "assigned") {
                                        assignCourseToManagerFromAssigned(item.id)
                                      } else {
                                        assignCourseToManager(item.id)
                                      }
                                    }
                                    }
                                  >
                                    Assign
                                  </span>
                                </li>
                              );
                            })}
                        </ul>
                      </div>

                    </div>
                  )}
                </div> */
}
