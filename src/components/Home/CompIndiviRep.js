import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import fetchData from "../../axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
    setPending(true);
    makeRequest("GET", "/info/get-all-ind-reports")
      .then((res) => {
        console.log(res.data.response);
        setRecords(res.data.response);
        setFilterRecords(res.data);
        setPending(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []); // Run once when component mounts

  const columns = [
    {
      name: "SL No.",
      selector: (row, id) => ++id,
      width: "80px",
      center: true,
      hide: 1050,
    },
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
      hide: 640,
    },
    {
      name: "Bundles Assigned",
      selector: (row) => row.bundle,
      center: true,
      hide: 840,
    },
    {
      name: "Certificates",
      cell: (row) => row.certificates,
      center: "true",
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
              fontSize: 36,
              marginTop: "1.35rem",
            }}
          >
            Individual Report
          </h2>
          <div style={{ padding: "", backgroundColor: "" }}>
            <div
              style={{ float: "right", marginBottom: "1.4rem" }}
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
            <div className="reacttable-hidden">
              <Suspense fallback={<Spinner animation="border" />}>
                <DataTable
                  customStyles={customStyles}
                  progressPending={pending}
                  progressComponent={
                    pending ? (
                      <div style={{ padding: "1rem" }}>
                        <Spinner animation="border" variant="primary" />
                      </div>
                    ) : null
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
                  pagination
                />
                <DownloadCSV records={records}/>
              </Suspense>
            </div>
            {records.length <= 0 && !pending && (
              <h4
                className="no-record-hidden"
                style={{ textAlign: "center", marginTop: "5rem" }}
              >
                No records to display
              </h4>
            )}
            {pending && (
              <div
                className="no-record-hidden"
                style={{
                  textAlign: "center",
                  padding: "1rem",
                  marginTop: "4rem",
                }}
              >
                <Spinner animation="border" variant="primary" />
              </div>
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
                        {item.first_name + " " + item.last_name}
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
                        Course: {item.course}
                        <a className="my-dashlink"></a>
                      </p>
                      <p
                        style={{
                          color: "green",
                          marginRight: ".5rem",
                          fontWeight: "500",
                        }}
                      >
                        Certificates: {item.certificates}
                      </p>
                      <p
                        style={{
                          color: "green",
                          marginRight: ".5rem",
                          fontWeight: "500",
                        }}
                      >
                        Bundle: {item.bundle}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
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
