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
        console.log(res[0].data.response);
        console.log(res[1].data.response);
        let newRes = [...res[0].data.response, ...res[1].data.response].filter((item) => item?.course_count >= 1);
        console.log(newRes);
        setRecords(newRes);
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

    console.log('course_id ', 'from');
    console.log('id ',id);
    console.log(1);
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
    let form = new FormData();
    form.append("course_id", assignData.course_id);
    form.append("userId", id);
    form.append("count", 1);

    console.log('from ',assignData.course_id);
    console.log('id ',id);
    console.log(1);
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
      name: "No",
      selector: (row, idx) => ++idx,
      center:true,
      width:"70px",
    },
    {
      name: "course",
      selector: (row) => row.name || row.Name,
      sortable: true,
      center:true,
      width:"400px",
    },
    {
      name: "validity",
      selector: (row) => {
        let newDt = new Date(row.validity).toLocaleDateString().split('/').map(d=> d.length <= 1 ? '0'+d : d )
         return newDt[1]+'/'+newDt[0] +'/'+newDt[2]
        },
      center:true,
    },
    {
      name: "count",
      selector: (row) => row.course_count,
      center:true,
    },
    {
      name: "action",
      center:true,
      selector: (row) => (
        <a
          className="btn btn-primary"
          onClick={() => {
            openModal();
            setCourseName(row.Name || row.name)
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
        <div style={{position:"relative"}} className=" row g-3  min-vh-100  d-flex justify-content-center mt-20">
          <h2
            style={{
              color: "#212450",
              display: "flex",
              justifyContent: "center",
              position: "absolute",
              fontSize: 36,
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
              <div style={{ maxHeight: "220rem" }} className="dash-shadow p-3 mt-4 ">
                <h5>{courseName}</h5>
                <div>
                  <div className="form-control dash-shadow d-flex gap-3 p-3">
                    <div className="form-group">
                      <label style={{ fontSize: ".73rem" }} for="exampleInputEmail1">Course Count</label>
                      <input
                        style={{ width: '4rem',textAlign:"center" }}
                        disabled
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="1"
                      />
                    </div>
                    <div style={{marginLeft:"16rem"}} className="form-group">
                    <label style={{visibility:'hidden'}} for="exampleInputEmail1">Search</label>
                    <div className="p-relative d-inline ">
                      <input
                       style={{ width: "18rem" }}
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

export default ManagerAssignCourse;
