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

const CompAssignBund = () => {
  const [records, setRecords] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [courseName, setCourseName] = useState("");
  const [companyIndividuals, setCompanyIndividuals] = useState([]);
  const [filteredCompanyIndividuals, setFilteredCompanyIndividuals] = useState(
    []
  );
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    let form = new FormData();
    form.append("id", assignData.course_id);
    form.append("count", 1);

    makeRequest("POST", "/info/manager-self-assign-course", form)
      .then((res) => {
        getData();
        console.log(res);
        toast("course assigned");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const makeRequest = fetchData();
  async function getData() {
    let purchasedRes = await makeRequest("GET", "/info/get-purchased-bundles");
    let assignedRes = await makeRequest(
      "GET",
      "/info/get-assigned-bundles-for-company"
    );
    Promise.all([purchasedRes, assignedRes])
      .then((res) => {
        console.log(res[0].data.response[0]);
        console.log(res[1].data.response[0]);
        let newRes = [...res[0].data.response, ...res[1].data.response];
        setRecords(newRes?.filter((item) => item.course_count >= 1).reverse());
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
    setLoading(true);
    let form = new FormData();
    form.append("course_id", assignData.course_id);
    form.append("userId", id);
    form.append("count", assignData.count);

    makeRequest("POST", "/info/assign-course-to-manager", form)
      .then((res) => {
        getData();
        console.log(res);
        openModal();
        toast("course assigned");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  function assignCourseToManagerIndividual(id) {
    setLoading(true);
    let form = new FormData();
    form.append("course_id", assignData.course_id);
    form.append("userId", id);
    form.append("count", 1);

    console.log(assignData);
    makeRequest("POST", "/info/assign-course-to-manager-individual", form)
      .then((res) => {
        getData();
        openModal();
        console.log(res);
        toast("course assigned");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  function assignCourseToManagerIndividualFromAssigned(id) {
    setLoading(true);
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
        console.log(res);
        setLoading(false);
        openModal();
        toast("course assigned");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  function assignCourseToManagerFromAssigned(id) {
    setLoading(true);
    let form = new FormData();
    form.append("course_id", assignData.course_id);
    form.append("userId", id);
    form.append("count", assignData.count);

    console.log(assignData);
    makeRequest("POST", "/info/assign-course-to-manager-from-assigned", form)
      .then((res) => {
        getData();
        setLoading(false);
        console.log(res);
        toast("course assigned");
        openModal();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }
  const columns = [
    {
      name: "No",
      selector: (row, idx) => ++idx,
      center: true,
      width: "70px",
    },
    {
      name: "Bundle Name",
      selector: (row) => row.bundle_name,
      center: true,
      width: "400px",
    },
    {
      name: "Purchased",
      selector: (row) => row.course_count,
      center: true,
    },
    {
      name: "Assigned",
      selector: (row) => row.course_count,
      center: true,
    },

    {
      name: "Remaining",
      selector: (row) => row.course_count,
      center: true,
    },
    {
      name: "Validity",
      center: true,
      selector: (row) => {
        let newDt = new Date(row.validity)
          .toLocaleDateString()
          .split("/")
          .map((d) => (d.length <= 1 ? "0" + d : d));
        return newDt[1] + "/" + newDt[0] + "/" + newDt[2];
      },
    },
    {
      name: "action",
      center: true,
      selector: (row) => (
        <a
          className="btn btn-primary"
          onClick={() => {
            openModal();
            setCourseName(row.name || row.Name);
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
      ),
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
          <div style={{ padding: "", backgroundColor: "" }}>
            <Modal
              className=""
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
                style={{ maxHeight: "220rem" }}
              >
                <Tabs
                  id="controlled-tab-example"
                  activeKey={key}
                  onSelect={(k) => setKey(k)}
                  className="mb-3"
                >
                  <Tab eventKey="individual" title="Individual">
                    <div style={{ background: "white" }}>
                      <div className="form-control dash-shadow d-flex gap-3 p-3">
                        <div className="d-flex">
                          <span style={{}}>
                            {" "}
                            <label
                              style={{ fontSize: ".74rem" }}
                              for="exampleInputEmail1"
                            >
                              Bundle Count
                            </label>
                            <input
                              style={{ width: "4rem", textAlign: "center" }}
                              disabled
                              type="text"
                              className="form-control"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                              placeholder="1"
                            />
                          </span>
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
                              className="form-control d-block mr-10"
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
                              {user.first_name + " " + user.last_name}
                            </span>
                            <span>{user.email}</span>
                            <span
                              onClick={() => {
                                if (loading) return;
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
                                      if (loading) return;
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
                  </Tab>

                  <Tab eventKey="manager" title="Manager">
                    <div style={{ background: "white" }}>
                      <div className="form-control dash-shadow d-flex gap-3 p-3">
                        <div className="form-group">
                          <label
                            style={{ fontSize: ".73rem" }}
                            for="exampleInputEmail1"
                          >
                            Bundle Count
                          </label>
                          <input
                            style={{ width: "4rem", textAlign: "center" }}
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
                              className="form-control d-block mr-10"
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
                                      textAlign: "center",
                                    }}
                                  >
                                    {item.first_name + " " + item.last_name}
                                  </span>
                                  <span>{item.email}</span>
                                  <span
                                    style={{
                                      width: "fit-content",
                                      margin: "0rem .1rem",
                                    }}
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
            <DataTable
              persistTableHead={true}
              columns={columns}
              data={
                searchString
                  ? records.filter((item) =>
                      item.name
                        .toLowerCase()
                        .includes(searchString.toLowerCase())
                    )
                  : records
              }
              customStyles={customStyles}
              pagination
            />
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default CompAssignBund;

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
