import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Link from "next/link";
import BasicExample from "../About/button1";
import fetchData from "../../axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaLock } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";
import { Suspense } from "react";
import Spinner from 'react-bootstrap/Spinner';


const customStyles = {
  headRow: {
    style: {
      backgroundColor: "#212450",
      color: "white",
    },
  },
  headCells: {
    style: {
      fontSize: "15px",
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

const ManagerReport = () => {
  const [records, setRecords] = useState([]);
  const [filterRecords, setFilterRecords] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [pending, setPending] = React.useState(true);

  const makeRequest = fetchData();

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
    makeRequest("GET", "/info/get-all-manager-reports")
      .then((res) => {
        console.log(res.data.response);
        setRecords(res.data.response);
        setFilterRecords(res.data);
        setPending(false)
      })
      .catch((err) => console.log(err));
  };

  const handleBlock = (block, id) => { };

  const columns = [
    {
      name: "Sl No.",
      selector: (row, idx) => ++idx,
      width: "80px",
      center: true,
      hide:1000,
    },
    {
      name: "Name",
      selector: (row) => row.first_name + " " + row.last_name,
      maxWidth: "320px",
      center: true,
    },
    {
      name: "Courses Assigned",
      selector: (row) => row.course_count,
      sortable: true,
      center: true,
      hide:670,
    },
    {
      name: "Bundles Assigned",
      selector: (row) => row.bundle_count,
      center: true,
      hide:800,
    },
    {
      name: "Individuals",
      cell: (row) => row.individuals_count,
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
          <h2
            style={{
              color: "#212450",
              display: "flex",
              justifyContent: "center",
              position: "absolute",
              fontSize: 35,
            }}
          >
            Manager Report
          </h2>
          <div style={{ padding: "", backgroundColor: "" }}>
            <div
              style={{
                float: "right",
                marginBottom: "1.4rem",
              }}
              className="p-relative d-inline header__search searchbar-hidden"
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
            <Suspense fallback={<Loading />}>
              <DataTable
                progressPending={pending}
                progressComponent={
                  pending ?
                    (<div style={{ padding: "1rem" }}>
                      <Spinner animation="border" variant="primary" />
                    </div>) : (null)
                }
                noDataComponent={"No records to display"}
                persistTableHead={true}
                columns={columns}
                data={
                  searchString
                    ? records.filter((item) =>
                      item.first_name
                        .toLowerCase()
                        .startsWith(searchString.toLowerCase())
                    )
                    : records
                }
                customStyles={customStyles}
                pagination
              />
            </Suspense>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default ManagerReport;


function Loading() {
  return <h2>🌀 Loading...</h2>;
}