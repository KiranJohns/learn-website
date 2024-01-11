import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import fetchData from "../../axios";
import Spinner from "react-bootstrap/Spinner";

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
      fontSize: "15px",
    },
  },
};

const ManIndReport = () => {
  const [pending, setPending] = React.useState(true);
  const [records, setRecords] = useState([]);
  const [filterRecords, setFilterRecords] = useState([]);
  const [searchString, setSearchString] = useState("");

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
    makeRequest("GET", "/info/get-all-individual-report")
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
      name: "Name",
      selector: (row) => row.first_name + " " + row.last_name,
      center: true,
    },
    {
      name: "Courses Assigned",
      selector: (row) => row.course_count,
      sortable: true,
      center: true,
      hide:"sm",
    },
    {
      name: "Bundles Assigned",
      selector: (row) => row.bundle_count,
      center: true,
      hide:"sm",
    },
    {
      name: "Certificates",
      cell: (row) => row.certificates,
      center: true,
    
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
        <div style={{ position: "relative" }} className=" row g-3  min-vh-100  d-flex justify-content-center mt-20">
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
            <div style={{ float: "right", marginBottom: "1.4rem" }} className="p-relative d-inline header__search searchbar-hidden2">
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
           persistTableHead={true}
              noDataComponent={"No records to display"}
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
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default ManIndReport;
