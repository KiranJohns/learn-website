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
  const [from, setFrom] = useState("");
  const [records, setRecords] = useState([]);
  const [searchString, setSearchString] = useState("");
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
  const [selectUserForAssignCourse, setSelectUserForAssignCourse] =
    useState("individual");

  const openModal = () => {
    setShowModal(!showModal);
  };

  const makeRequest = fetchData();
  async function getData() {
    let purchasedRes = await makeRequest("GET", "/course/get-bought-course");
    let assignedRes = await makeRequest(
      "GET",
      "/info/get-assigned-course-for-manager"
    );
    Promise.all([purchasedRes, assignedRes])
      .then((res) => {
        console.log("res[0].data.response ", res[0].data.response);
        console.log("res[1].data.response ", res[1].data.response);
        let newRes = [...res[0].data.response, ...res[1].data.response];
        setRecords(newRes?.filter((item) => item.course_count >= 1));
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

    console.log(assignData);
    makeRequest("POST", "/info/assign-course-to-manager-individual", form)
      .then((res) => {
        getData();
        console.log(res);
        toast("course assigned");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function assignCourseToManagerIndividualFromAssigned(id) {
    console.log(id);
    let form = new FormData();
    form.append("course_id", assignData.course_id);
    form.append("userId", id);
    form.append("count", 1);

    console.log(assignData);
    makeRequest(
      "POST",
      "/info/assign-course-to-manager-individual-from-manager-assigned",
      form
    )
      .then((res) => {
        getData();
        console.log(res);
        toast("course assigned");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const columns = [
    {
      name: "ID",
      selector: (row, idx) => ++idx,
      sortable: true,
    },
    {
      name: "course",
      selector: (row) => row.name || row.Name,
      sortable: true,
    },
    {
      name: "validity",
      selector: (row) => new Date(row.validity).toLocaleDateString(),
    },
    {
      name: "count",
      selector: (row) => row.course_count,
    },
    {
      name: "action",
      selector: (row) => (
        <a
          className="btn btn-primary"
          onClick={() => {
            openModal();
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
      <ToastContainer />
      <div className="dash-shadow">
        <div className=" row g-3  min-vh-100  d-flex justify-content-center mt-20">
          <h2
            style={{
              color: "#212450",
              display: "flex",
              justifyContent: "center",
              position: "absolute",
              fontSize: 42,
            }}
          >
            Assign Course
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
              <div style={{ maxHeight: "20rem" }}>
                <div>
                  <div className="form-control d-flex gap-3">
                    <div className="form-group">
                      <label for="exampleInputEmail1">Course Count</label>
                      <input
                        disabled
                        type="number"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="1"
                      />
                    </div>
                    <div className="form-group">
                      <label for="exampleInputEmail1">User Name</label>
                      <input
                        onChange={(e) =>
                          setFilteredCompanyIndividuals(
                            companyIndividuals.filter((item) =>
                              item.first_name
                                .toLocaleLowerCase()
                                .startsWith(e.target.value.toLocaleLowerCase())
                            )
                          )
                        }
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="enter user name"
                      />
                    </div>
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
                                  if (from == "purchased") {
                                    assignCourseToManagerIndividual(item.id);
                                  } else {
                                    assignCourseToManagerIndividualFromAssigned(item.id);
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
              selectableRows
            />
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default ManagerAssignCourse;