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

const ManAssignBund = () => {
  const [records, setRecords] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [pending, setPending] = React.useState(true);
  const [companyIndividuals, setCompanyIndividuals] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [filteredCompanyIndividuals, setFilteredCompanyIndividuals] = useState(
    []
  );
  const [fromAssignedTable, setFromAssignedTable] = useState(false);
  const [filteredManagers, setFilteredManagers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBundleCount, setSelectedBundleCount] = useState(0);
  const [user, setUser] = useState(() => {
    let token = localStorage.getItem(`learnforcare_access`);
    return jwtDecode(token);
  });
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

  const makeRequest = fetchData();
  function getData() {
    makeRequest("GET", "/info/get-purchased-bundles")
      .then((purchasedRes) => {
        makeRequest("GET", "/info/get-assigned-bundle")
          .then((res) => {
            setRecords((prev) => {
              return [
                ...purchasedRes.data.response.filter(
                  (item) => item.course_count >= 1
                ),
                ...res.data.response.filter(
                  (item) => item.course_count >= 1 && item.owner != user.id
                ),
              ];
            });
            console.log(
              purchasedRes.data.response,
              res.data.response.filter(
                (item) => item.course_count >= 1 && item.owner != user.id
              )
            );
          })
          .catch((err) => {
            console.log(err);
          });
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
    setRecords();
    getData();
  }, []);

  function assignCourseToManagerIndividualFromManager(id) {
    let form = new FormData();
    form.append("course_id", assignData.course_id);
    form.append("userId", id);
    form.append("count", 1);
    form.append("from_assigned_table", fromAssignedTable);

    makeRequest(
      "POST",
      "/info/assign-course-to-manager-individual-from-manager",
      form
    )
      .then((res) => {
        getData();
        setShowModal();
        console.log(res);
        toast("Bundle Assigned");
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
    form.append("from_assigned_table", fromAssignedTable);

    console.log("from manager individual");
    makeRequest("POST", "/info/assign-course-to-manager-individual", form)
      .then((res) => {
        getData();
        setShowModal();
        console.log(res);
        toast("Bundle Assigned");
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
      fromAssignedTable ? "manager-assigned" : "manager-purchased"
    );
    form.append("count", 1);

    makeRequest("POST", "/info/manager-self-assign-course", form)
      .then((res) => {
        getData();
        openModal();
        console.log(res);
        toast("Bundle Assigned");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const columns = [
    {
      name: "ID",
      selector: (row, idx) => ++idx,
      width: "70px",
      center: true,
    },
    {
      name: "bundle name",
      selector: (row) => row.bundle_name,
      width: "350px",
      sortable: true,
      center: true,
    },
    {
      name: "validity",
      selector: (row) => row.validity,
      center: true,
    },
    {
      name: "count",
      selector: (row) => row.course_count,
      center: true,
    },
    {
      name: "action",
      center: true,
      selector: (row) => {
        let flag = false;
        let title = "Expired";
        let validity = row.validity.split("/").reverse();
        if (new Date(validity) > new Date()) {
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
                      course_id: row.id,
                    };
                  });

                  if (row?.from_assigned_table) {
                    setFromAssignedTable(true);
                  } else {
                    setFromAssignedTable(false);
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
      <ToastContainer />
      <div className="dash-shadow">
        <div
          style={{ position: "relative" }}
          className=" row g-3  min-vh-100  d-flex justify-content-center mt-20"
        >
          <h2
            style={{
              color: "#212450",
              display: "flex",
              justifyContent: "center",
              position: "absolute",
              fontSize: 36,
            }}
          >
            Purchased Bundle
          </h2>
          <div
            className="reacttable-hidden"
            style={{ padding: "", backgroundColor: "" }}
          >
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
                className="dash-shadow p-3 mt-4 "
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h5 style={{ color: "#212a50", marginLeft: "1rem" }}>
                    {courseName}
                  </h5>{" "}
                  <h5 style={{ color: "#212a50", marginRight: "1rem" }}>
                    Available Bundle Count: {selectedBundleCount}
                  </h5>
                </div>
                <div>
                  <div className="form-control dash-shadow d-flex gap-3 p-3">
                    <div className="form-group">
                      <label
                        style={{ fontSize: ".66rem" }}
                        for="exampleInputEmail1"
                      >
                        Assign Bundle Count
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
                    <div style={{ marginLeft: "16rem" }} className="form-group">
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
                          placeholder="Search by name"
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
                        <span style={{ textAlign: "center" }}>Email</span>
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
                            if (selectedBundleCount < 1) {
                              toast.warn(
                                "Remaining Bundle Count: " + selectedBundleCount
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
                              <span>{item.email}</span>
                              <span
                                onClick={() => {
                                  // ABC
                                  if (selectedBundleCount < 1) {
                                    toast.warn(
                                      "Remaining Bundle Count: " +
                                        selectedBundleCount
                                    );
                                    return;
                                  } else {
                                    if (fromAssignedTable) {
                                      assignCourseToManagerIndividualFromManager(
                                        item.id
                                      );
                                    } else {
                                      assignCourseToManagerIndividual(item.id);
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
                      item.bundle_name
                        .toLowerCase()
                        .startsWith(searchString.toLowerCase())
                    )
                  : records
              }
              customStyles={customStyles}
              pagination
              responsive={true}
            />
          </div>

          {/* mobile component */}

          {searchString
            ? records
                .filter((item) =>
                  item.bundle_name
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
                      paddingTop: "1rem",
                      marginTop: "2.7rem",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div className="new-table-shadow new-table-res new-table-hidden mt-2">
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
                          {item.bundle_name}
                        </p>
                        <>
                          {flag ? (
                            <a
                              style={{height:'35px',marginTop:"1rem", marginRight:'.4rem'}}
                              className="btn btn-primary"
                              onClick={() => {
                                openModal();
                                setCourseName(item.bundle_name);
                                setAssignData((prev) => {
                                  return {
                                    ...prev,
                                    course_id: item.id,
                                  };
                                });

                                if (item?.from_assigned_table) {
                                  setFromAssignedTable(true);
                                } else {
                                  setFromAssignedTable(false);
                                }
                                setSelectedBundleCount(item.course_count);
                              }}
                            >
                              Assign To
                            </a>
                          ) : (
                            <>
                              <a style={{height:'35px',marginTop:"1rem", marginRight:'.4rem'}} className="btn btn-danger">{title}</a>
                            </>
                          )}
                        </>
                      </div>
                    </div>
                  </div>;
                })
            : records?.map((item) => {
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
                    paddingTop: "1rem",
                    marginTop: "2.7rem",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div className="new-table-shadow new-table-res new-table-hidden mt-2">
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
                        {item.bundle_name}
                      </p>
                      <>
                        {flag ? (
                          <a
                            style={{height:'35px',marginTop:"1rem", marginRight:'.4rem'}}
                            className="btn btn-primary"
                            onClick={() => {
                              openModal();
                              setCourseName(item.bundle_name);
                              setAssignData((prev) => {
                                return {
                                  ...prev,
                                  course_id: item.id,
                                };
                              });

                              if (item?.from_assigned_table) {
                                setFromAssignedTable(true);
                              } else {
                                setFromAssignedTable(false);
                              }
                              setSelectedBundleCount(item.course_count);
                            }}
                          >
                            Assign To
                          </a>
                        ) : (
                          <>
                            <a style={{height:'35px',marginTop:"1rem", marginRight:'.4rem'}} className="btn btn-danger">{title}</a>
                          </>
                        )}
                      </>
                    </div>
                  </div>
                </div>;
              })}
        </div>{" "}
      </div>
    </div>
  );
};

export default ManAssignBund;
