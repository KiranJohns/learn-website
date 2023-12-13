import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import fetchData from "../../axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

const CompIndReport = () => {
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

  const getData = () => {
    makeRequest("GET", "/info/get-all-ind-reports")
      .then((res) => {
        console.log(res.data.response);
        setRecords(res.data.response);
        setFilterRecords(res.data);
        setPending(false)
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []); // Run once when component mounts

  const columns = [
    {
      name: "Name",
      selector: (row) => row.first_name + " " + row.last_name,
      sortable: true,
      center: true,
    },
    {
      name: "Courses Assigned",
      selector: (row) => row.course,
      sortable: true,
      center: true,
    },
    {
      name: "Bundles Assigned",
      selector: (row) => row.bundle,
      center: true,
    },
    {
      name: "Certificates",
      cell: (row) => row.certificates,
      center: 'true'
    }
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
              fontSize: 36,
            }}
          >
            Individual Report
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
            <Suspense fallback={<Spinner animation="border" />}>
              <DataTable
              customStyles={customStyles}
               progressPending={pending}
               progressComponent={
                pending ? 
                (<div style={{ padding: "1rem" }}>
                  <Spinner animation="border" variant="primary" />
                </div>) : (null)
              }
                noDataComponent={" "}
                persistTableHead={true}
                columns={columns}
                data={
                  searchString
                    ? records.filter((item) =>
                        item.name.toLowerCase().includes(searchString.toLowerCase())
                      )
                    : records
                }
                pagination
              />
            </Suspense>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default CompIndReport;


function Loading() {
  return <h2>🌀 Loading...</h2>;
}