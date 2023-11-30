import React, { Component } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Link from "next/link";
import BasicExample from "../About/button1";
import fetchData from "../../axios";

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

class ManageMyCourse extends Component {
  constructor() {
    super();
    this.state = {
      records: [],
      filterRecords: [],
    };

    this.handleStart = this.handleStart.bind(this);
  }

  handleFilter = (event) => {
    const newData = this.state.filterRecords.filter((row) =>
      row.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    this.setState({ records: newData });
  };

  async componentDidMount() {
    let makeRequest = fetchData();
    let onGoingCourseUrl = "/on-going-course/get-all-on-going-courses";
    let purchasedRes = await makeRequest(
      "GET",
      "/info/get-assigned-course-for-manager"
    );
    let assignedRes = await makeRequest("GET", "/course/get-bought-course");
    Promise.all([purchasedRes, assignedRes, onGoingCourseUrl])
      .then((res) => {
        console.log(res[0].data.response);
        console.log(res[0].data.response);
        console.log(res[1].data.response);
        let newRes = [
          ...res[0].data.response,
          ...res[1].data.response,
          ...res[2].data.response,
        ];
        this.setState({
          records: newRes?.filter((item) => item.course_count >= 1),
          filterRecords: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleStart = (id, from) => {
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

  render() {
    const columns = [
      {
        name: "No",
        selector: (row, idx) => ++idx,
       
        center:true,
      },
      {
        name: "Courses",
        selector: (row) => row.Name,
        sortable: true,
        center:true,
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
        name: "Actions",
        cell: () => (
          <>
            {/* {row?.progress ? (
              <Link
                href={{
                  pathname: "/learnCourse/coursepage",
                  query: { courseId: row.on_going_course_id },
                }}
              >
                <a className="btn btn-success">continue</a>
              </Link>
            ) : ( */}
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
            {/* )} */}
          </>
        ),
      },
      },
      {
        name: "Actions",
        selector: (row) => <a className="btn btn-success">Start</a>,
      },
    ];

    return (
      <div className="">
        <div className="dash-shadow">
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
              My Courses
            </h2>
            <div style={{ padding: "", backgroundColor: "" }}>
              {/* <div
            className="pb-2 smth"
            style={{ display: "flex", justifyContent: "left" }}
          >
            <input
              type="text"
              className=""
              placeholder="Search course..."
              onChange={this.handleFilter}
              style={{
                padding: "6px 10px",
                borderColor: "transparent",
                overflow: "hidden",
              }}
            />
          </div> */}
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
                    // value={searchString}
                    // onChange={handleSearch}
                  />
                  <button type="submit">
                    <i className="fas fa-search"></i>
                  </button>
                </form>
              </div>
              <DataTable
                columns={columns}
                data={this.state.records}
                customStyles={customStyles}
                pagination
                selectableRows
              />
            </div>
          </div>{" "}
        </div>
      </div>
    );
  }
}

export default ManageMyCourse;
