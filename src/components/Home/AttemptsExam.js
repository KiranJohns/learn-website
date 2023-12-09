import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Link from "next/link";
import BasicExample from "../About/button1";
import fetchData from "../../axios";
import Modal from "react-responsive-modal";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
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

const AttemptsExam = () => {
  const [records, setRecords] = useState([]);
  const [filterRecords, setFilterRecords] = useState([]);
  const [subUsers, setSubUsers] = useState([]);
  const [user, setUser] = useState(jwtDecode(localStorage.getItem(`learnforcare_access`)));
  const [searchData, setSearchData] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const makeRequest = fetchData();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const courseId = searchParams.get("courseId");

    makeRequest("GET", `/on-going-course/get-attempts/${courseId}`)
      .then((res) => {
        console.log(res.data.response);
        setRecords(res.data.response);
        setFilterRecords(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });

    getData();
  }, []);

  const getData = () => {
    try {
      // makeRequest("GET", "/course/get-all-assigned-course")
      //   .then((res) => {
      //     const filteredRecords = res.data.response.reverse().filter(item => item?.owner == user?.id);
      //     setRecords(filteredRecords);
      //     setFilterRecords(res.data);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });

      // makeRequest("GET", "/info/get-all-sub-users")
      //   .then((res) => {
      //     setSubUsers(res.data.response);
      //   })
      //   .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowModal = () => {
    setOpenModal(!openModal);
  };

  const assignCourse = (e, subUser) => {
    e.persist();
    makeRequest("POST", "/info/assign-course-to-sub-user", {
      sub_user_id: subUser.id,
      course_id: courseId,
      purchased_course_id: purchased_course_id,
    })
      .then((res) => {
        toast.success("course assigned");
        getData();
        setOpenModal(!openModal);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const handleStart = (id, from) => {
    const makeRequest = fetchData();
    const form = new FormData();
    form.append("from", from);
    form.append("course_id", id);
    makeRequest("POST", "/course/start-course", form)
      .then((res) => {
        location.href = `/learnCourse/coursepage/?courseId=${res.data.response.id}`;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columns = [
    {
      name: "Attempt",
      selector: (row, idx) => row.attempts,
      center: true,
      width: "170px",
    },
    {
      name: "status",
      selector: (row) => row.status,
      sortable: true,
      center: true,
      width: "400px",
    },
    {
      name: "Date",
      center: true,
      selector: (row) => new Date(row.date).toLocaleDateString(),
    },
    {
      name: "Marks Obtained",
      selector: (row) => row.percentage,
    }
  ];

  return (
    <div className="">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Modal open={openModal} onClose={handleShowModal}>
        <div style={{ padding: "", width: "40rem", height: "20rem" }}>
          <h3>Sub Users</h3>
          <ul className="list-group bg-white" style={{}}>
            {subUsers &&
              subUsers.map((item) => {
                if (!item.block) {
                  return (
                    <li className="list-group-item bg-white text-black d-flex justify-content-between align-items-center">
                      <h5>{item.first_name + " " + item.last_name}</h5>
                      <a
                        className="btn btn-primary"
                        onClick={(e) => assignCourse(e, item)}
                      >
                        Assign
                      </a>
                    </li>
                  );
                }
              })}
          </ul>
        </div>
      </Modal>
      <div className=" row g-3  min-vh-100  d-flex justify-content-center dash-shadow mt-10">
        <div style={{ padding: "", backgroundColor: "" }}>
          <h2
            className="dash-head-center"
            style={{
              padding: "",
              color: "#212450",
              fontSize: 36,
            }}
          >
            Exam Results
          </h2>
          <div
            style={{ float: "right", marginBottom: "1.4rem" }}
            className="p-relative d-inline header__search"
          >
            <form action="">
              <input
                style={{ background: "#edeef3" }}
                className="d-block  "
                type="text"
                placeholder="Search..."
                onChange={(e) => setSearchData(e.target.value)}
              />
              <button type="submit">
                <i className="fas fa-search"></i>
              </button>
            </form>
          </div>
          <DataTable
            persistTableHead={true}
            columns={columns}
            data={records}
            customStyles={customStyles}
            pagination
          />
        </div>
      </div>
    </div>
  );
};

export default AttemptsExam;
