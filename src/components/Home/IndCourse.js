import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Link from "next/link";
import BasicExample from "../About/button1";
import fetchData, { getUserType } from "../../axios";
import Modal from "react-responsive-modal";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

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

const IndCourse = () => {
  const [records, setRecords] = useState([]);
  const [filterRecords, setFilterRecords] = useState([]);
  const [subUsers, setSubUsers] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const makeRequest = fetchData();
  let sub_user_id = null;
  let course_id = null;
  let purchased_course_id = null;

  const handleFilter = (event) => {
    const newData = filterRecords.filter((row) =>
      row.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setRecords(newData);
  };

  const getData = async () => {
    try {
      let onGoingCourseUrl = "/on-going-course/get-all-on-going-courses";
      let url1 = "/course/get-bought-course";
      let url2 = "/course/get-all-assigned-course";
      Promise.all([
        makeRequest("GET", onGoingCourseUrl),
        makeRequest("GET", url1),
        makeRequest("GET", url2),
      ]).then((res) => {
        let arr = [
          ...res[0].data.response,
          ...res[1].data.response,
          ...res[2].data.response,
        ];
        console.log(res);
        setRecords(arr);
        setFilterRecords(arr);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowModal = () => {
    setOpenModal(!openModal);
  };

  const handleStart = (id, from) => {
    let form = new FormData();
    form.append("from", from);
    form.append("course_id", id);
    makeRequest("POST", "/course/start-course", form)
      .then((res) => {
        console.log(res);
        location.href = `/learnCourse/coursepage/?courseId=${res.data.response.id}`;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      name: "No",
      selector: (row, idx) => idx + 1,
      sortable: true,
    },
    {
      name: "name",
      selector: (row) => row.name || row.Name,
      sortable: true,
    },
    {
      name: "description",
      selector: (row) => row?.description?.slice(0, 25),
    },
    {
      name: "category",
      selector: (row) => row.category,
    },
    {
      name: "validity",
      selector: (row) => {
        let newDt = new Date(row.validity).toLocaleDateString().split('/').map(d=> d.length <= 1 ? '0'+d : d )
         return newDt[1]+'/'+newDt[0] +'/'+newDt[2]
        },
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          {row?.progress ? (
            <Link
              href={{
                pathname: "/learnCourse/coursepage",
                query: { courseId: row.on_going_course_id },
              }}
            >
              <a className="btn btn-success">continue</a>
            </Link>
          ) : (
            <a
              onClick={() => {
                if (row.from_purchased) {
                  handleStart(row.id, "purchased");
                } else {
                  handleStart(row.id, "assigned");
                }
              }}
              className="btn btn-success"
            >
              start
            </a>
          )}
        </>
      ),
    },
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
      <div className=" row g-3  min-vh-100  d-flex justify-content-center dash-shadow mt-10">
        <div style={{ padding: "", backgroundColor: "" }}>
          <h2
            className="dash-head-center"
            style={{
              padding: "",
              color: "#212450",
              fontSize: 38,
            }}
          >
            My Courses
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
                value={searchData}
                onChange={(e) => setSearchData(e.target.value)}
              />
              <button type="submit">
                <i className="fas fa-search"></i>
              </button>
            </form>
          </div>
          <DataTable
            columns={columns}
            data={
              searchData
                ? records.filter((item) =>
                    item.Name.toLowerCase().includes(searchData.toLowerCase())
                  )
                : records
            }
            customStyles={customStyles}
            pagination
            selectableRows
          />
        </div>
      </div>
    </div>
  );
};

export default IndCourse;
