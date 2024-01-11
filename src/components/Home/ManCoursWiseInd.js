import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaLock, FaUnlock } from "react-icons/fa";
import fetchData from "../../axios";
import BasicExample from "../About/button1";
import Spinner from "react-bootstrap/Spinner";
import Link from "next/link";



const customStyles = {
  headRow: {
    style: {
      backgroundColor: "#212450",
      color: "white",
    },
  },
  headCells: {
    style: {
      fontSize: "13px",
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

const ManCWIndReport = () => {
  const [records, setRecords] = useState([]);
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
    makeRequest("GET", "/info/get-course-wise-individual-manager-reports")
      .then((res) => {
        console.log(res.data.response);
        setRecords(res.data.response);
        setFilterRecords(res.data);
        setPending(false)
      })
      .catch((err) => console.log(err));
  };

  const columns = [
    {
      name: "no",
      selector: (row,id) => id,
      width:"100px",
      center: true,
      hide:"md",
    },
    {
      name: "CODE",
      selector: (row,id) => row.code,
      hide:"sm",
      center: true,
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
        <div style={{ position: "relative" }} className=" row g-3  min-vh-100  d-flex justify-content-center mt-20">
          <h2
            style={{
              color: "#212450",
              display: "flex",
              justifyContent: "center",
              position: "absolute",
              fontSize: 32,
            }}
          >
           Course Wise Individual
          </h2>
          <div style={{ padding: "", backgroundColor: "" }}>
            <div style={{ float: "right", marginBottom: "1.4rem" }} className="p-relative d-inline header__search searchbar-hidden3">
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
               pending ? 
               (<div style={{ padding: "1rem" }}>
                 <Spinner animation="border" variant="primary" />
               </div>) : (null)
             }
              noDataComponent={"No records to display"}
              columns={columns}
              data={
                searchString
                  ? records.filter((item) =>
                      item.course_name.toLowerCase().startsWith(searchString.toLowerCase())
                    )
                  : records
              }
              customStyles={customStyles}
              pagination
              persistTableHead ={true}
            />
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default ManCWIndReport;