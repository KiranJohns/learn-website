import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Link from "next/link";
import fetchData from "../../axios";
import { Suspense } from "react";
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

const ManageMyCourse = () => {
  const [records, setRecords] = useState([]);
  const [filterRecords, setFilterRecords] = useState([]);
  const [searchString, setSearchString] = useState("");

  const makeRequest = fetchData();
  const [pending, setPending] = React.useState(true);
  const handleFilter = (event) => {
    const newData = filterRecords.filter((row) =>
      row.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setRecords(newData);
  };
  const [user, setUser] = useState(() => {
    let token = localStorage.getItem(`learnforcare_access`);
    return jwtDecode(token);
  });

  const handleStart = (id, from) => {
    let form = new FormData();
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

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        let assignedRes = await makeRequest(
          "GET",
          "/info/get-assigned-course-for-manager"
        );
        let onGoingCourse = await makeRequest(
          "GET",
          "/on-going-course/get-all-on-going-courses"
        );

        console.log(assignedRes.data.response, onGoingCourse.data.response);
        let newRes = [
          ...assignedRes.data.response.filter(
            (item) => item.owner == user.id && item.count >= 1
          ),
          ...onGoingCourse.data.response,
        ];

        setRecords(newRes);
        setFilterRecords(newRes);
        setPending(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchDataAsync();
  }, []); // Run once when component mounts

  const columns = [
    {
      name: "No",
      selector: (row, idx) => ++idx,
      center: true,
      width: "70px",
    },
    {
      name: "Courses",
      selector: (row) => row?.Name || row?.name,
      sortable: true,
      center: true,
      width: "400px",
    },
    {
      name: "validity",
      selector: (row) => row?.validity,
      center: true,
    },
    {
      name: "progress",
      selector: (row) => (row?.progress || "0") + "%",
      center: true,
    },
    {
      name: "Actions",
      cell: (row) => {
        let validity = row.validity.split("/").reverse();
        let flag = false;
        let title = "Start";
        
        if (new Date(validity) <= new Date() || row?.attempts >= 20) {
          title = "Expired";
          flag = false;
        } else {
          title = "Finished";
          flag = true;
        }

        
        return (
          <>
            {flag ? (
              <>
                {row?.progress ? (
                  <Link
                    href={{
                      pathname: "/learnCourse/coursepage",
                      query: { courseId: row?.on_going_course_id },
                    }}
                  >
                    <a style={{ width: "7rem" }} className="btn btn-success">
                      Start
                    </a>
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      if (row?.from_purchased) {
                        handleStart(row?.id, "purchased");
                      } else {
                        handleStart(row?.id, "manager");
                      }
                    }}
                    className="btn btn-success"
                    style={{ width: "7rem" }}
                  >
                    Start
                  </button>
                )}
              </>
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
              progressPending={pending}
              progressComponent={
                pending ? (
                  <div style={{ padding: "1rem" }}>
                    <Spinner animation="border" variant="primary" />
                  </div>
                ) : null
              }
              noDataComponent={"No records to display"}
              columns={columns}
              data={
                searchString
                  ? records.filter((item) =>
                      (item.Name || item.name)
                        .toLowerCase()
                        .startsWith(searchString.toLowerCase())
                    )
                  : records
              }
              customStyles={customStyles}
              pagination
              persistTableHead={true}
            />
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default ManageMyCourse;
