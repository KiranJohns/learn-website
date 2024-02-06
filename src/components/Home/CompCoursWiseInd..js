import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaLock, FaUnlock } from "react-icons/fa";
import fetchData from "../../axios";
import BasicExample from "../About/button1";
import Link from "next/link";
import { Suspense } from "react";
import Spinner from "react-bootstrap/Spinner";
import Backbutton from "./Backbutton";
import DownloadCSV from "../button/DownloadCSV";

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
      fontSize: "14px",
    },
  },
};

const CWIndReport = () => {
  const [records, setRecords] = useState([]);
  const [newRecords, setNewRecords] = useState([]);
  const [filterRecords, setFilterRecords] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [makeRequest, setMakeRequest] = useState(() => fetchData());
  const [pending, setPending] = React.useState(true);

  const handleFilter = (event) => {
    const newData = filterRecords.filter((row) =>
      row.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setRecords(newData);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    makeRequest("GET", "/info/get-course-wise-individual-reports")
      .then((res) => {
        console.log(res.data.response);
        let arr = []
        res.data.response.map((item,id => {
          arr.push({
            "SL No.": ++idx,
            "CODE": item.code,
            "Course Name": item.course_name,
            "Individuals Count": item.count,      
          })
        }))
        setNewRecords(arr)
        setRecords(res.data.response);
        setFilterRecords(res.data);
        setPending(false);
      })
      .catch((err) => console.log(err));
  };

  const columns = [
    {
      name: "SL No.",
      selector: (row, id) => ++id,
      center: true,
      width: "80px",
      hide: 940,
    },
    {
      name: "CODE",
      selector: (row, id) => row.code,
      center: true,
      hide: 700,
    },
    {
      name: "Course Name",
      selector: (row) => row.course_name,
      center: true,
    },
    {
      name: "Individuals Count",
      cell: (row) => row.count,
      center: true,
    },
  ];

  return (
    <div className="">
      <div className="dash-shadow">
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
              fontSize: 31,
              marginTop: "1.4rem",
            }}
          >
            Course Wise Individual
          </h2>
          <div style={{ padding: "", backgroundColor: "" }}>
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
            <div className="reacttable-hidden">
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
                  columns={columns}
                  data={
                    searchString
                      ? records.filter((item) =>
                          item.course_name
                            .toLowerCase()
                            .startsWith(searchString.toLowerCase())
                        )
                      : records
                  }
                  customStyles={customStyles}
                  pagination
                  persistTableHead={true}
                />
                 <DownloadCSV records={newRecords}/>
              </Suspense>
            </div>
            <div>
              {records.length <= 0 && (
                <h4
                  className="no-record-hidden"
                  style={{ textAlign: "center", marginTop: "5rem" }}
                >
                  No records to display
                </h4>
              )}
              {records.map((item) => {
                return (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      padding: ".5rem",
                    }}
                  >
                    <div className="new-table-shadow new-table-hidden">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <p
                          style={{
                            paddingTop: ".5rem",
                            paddingLeft: ".4rem",
                            color: "#212a50",
                            fontWeight: "bold",
                          }}
                        >
                          {/* Rahul */}
                          {item.course_name}
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <p
                          style={{
                            color: "green",
                            marginLeft: ".5rem",
                            fontWeight: "500",
                          }}
                        >
                          Course Code: {item.code}
                          <a className="my-dashlink"></a>
                        </p>
                        <p
                          style={{
                            color: "green",
                            marginRight: ".5rem",
                            fontWeight: "500",
                          }}
                        >
                          Course Count: {item.count}
                        </p>
                        {/* <p
                        style={{
                          color: "green",
                          marginRight: ".5rem",
                          fontWeight: "500",
                        }}
                      >
                        Bundle: {item.bundle}
                      </p> */}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default CWIndReport;

function Loading() {
  return <h2>🌀 Loading...</h2>;
}
