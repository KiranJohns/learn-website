import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import BasicExample from "../About/button1";
import fetchData, { getUserType } from "../../axios";
import Button from 'react-bootstrap/Button';

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
      display: "flex",
      justifyContent: "center",
    },
  },
  cells: {
    style: {
      fontSize: "15px",
      display: "flex",
      justifyContent: "center",
    },
  },
};

const IndCAvail = () => {
  const [records, setRecords] = useState([]);
  const [filterRecords, setFilterRecords] = useState([]);

  const makeRequest = fetchData();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    let onGoingCourseUrl = "/on-going-course/get-all-on-going-courses";
    let url1 = "/course/get-all-bought-course";
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
      setRecords(() => {
        return [arr.filter((course) => course.course_count > 0)];
      });
    });
  };

  const continueCourse = (id) => {
    location.pathname = `/company/course-learn/${id}`;
  };

  const startCourse = (id) => {
    makeRequest("GET", `/course/start-course/${id}`)
      .then((res) => {
        location.pathname = `/company/course-learn/${res.data.response.id}`;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columns = [
    {
      name: "ID",
      selector: (row, idx) => ++idx,
      sortable: true,
    },
    {
      name: "Courses",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "validity",
      selector: (row) => row.validity,
    },
    {
      name: "catagory",
      selector: (row) => row.category,
    },
    {
      name: "Actions",
      cell: (id) => <a href="https://test.learnforcare.co.uk/course-all"><Button style={{background:"#212a50", color:'#fff'}} variant="">View</Button></a> ,
    },
  ];

  return (
    <div className="">
      <div className="dash-shadow">
        <div style={{position:'relative'}} className=" row g-3  min-vh-100  d-flex justify-content-center mt-20">
          <h2
            style={{
              color: "#212450",
              display: "flex",
              justifyContent: "center",
              position: "absolute",
              fontSize: 38,
            }}
          >
           Purchased Courses
          </h2>
          <div style={{ padding: "", backgroundColor: "" }}>
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
                />
                <button type="submit">
                  <i className="fas fa-search"></i>
                </button>
              </form>
            </div>
            <DataTable
              columns={columns}
              data={records}
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

export default IndCAvail;
