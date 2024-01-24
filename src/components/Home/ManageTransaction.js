import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import fetchData from "../../axios";
import Backbutton from "./Backbutton";

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

const ManTransaction = () => {
  const [records, setRecords] = useState([]);
  const [filterRecords, setFilterRecords] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [pending, setPending] = React.useState(true);

  const handleFilter = (event) => {
    const newData = filterRecords.filter((row) =>
      row.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setRecords(newData);
  };

  useEffect(() => {
    console.clear();
    let makeRequest = fetchData();
    setPending(true);
    makeRequest("GET", "/info/get-all-transactions")
      .then((res) => {
        console.log(res);
        setRecords(res.data.response.reverse());
        setFilterRecords(res.data);
        setPending(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); // Empty dependency array to run the effect only once on mount

  const columns = [
    {
      name: "SL No.",
      selector: (row, idx) => ++idx,
      center: true,
      width: "80px",
      hide:"md",
    },
    {
      name: "User",
      selector: (row, idx) => row.first_name.concat(" ", row.last_name),
      center: true,
      width: "250px",
      hide:"sm",
    },
    {
      name: "Date",
      selector: (row) => row.date,
      center: true,
      sortable: true,
    },
    {
      name: "Time",
      selector: (row) => row.time,
      center: true,
      hide:"md",
    },
    {
      name: "Quantity",
      selector: (row) => row.count,
      center: true,
      hide:"sm",
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
      center: true,
    },
  ];

  return (
    <div className="">
      <div className="dash-shadow">
        <div style={{position:'relative'}} className="row g-3  min-vh-100  d-flex justify-content-center mt-20">
        <Backbutton/>
          <h2
            style={{
              color: "#212450",
              display: "flex",
              justifyContent: "center",
              position: "absolute",
              fontSize: 35,
            }}
          >
            Transaction Report
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
            </div>

            {(records.length <= 0 && !pending) && (
              <h4
                className="no-record-hidden"
                style={{ textAlign: "center", marginTop: "4.5rem" }}
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
            <div style={{marginTop:"3rem"}}>
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
                        justifyContent: "space-between",
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
                      <p
                        style={{
                          color: "#212a50",
                          marginRight: ".5rem",
                          fontWeight: "500",
                          paddingTop: ".5rem",
                        }}
                      >
                        Date: {item.date}
                        <a className=""></a>
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      {/* <p
                        style={{
                          color: "green",
                          marginLeft: ".5rem",
                          fontWeight: "500",
                        }}
                      >
                       Time: {item.time}
                        <a className="my-dashlink"></a>
                      </p> */}
                     <p
                        style={{
                          color: "green",
                          marginLeft: ".5rem",
                          fontWeight: "500",
                        }} 
                      >
                        Quantity: {item.count}
                      </p>
                      <p
                        style={{
                          color: "green",
                          marginRight: ".5rem",
                          fontWeight: "500",
                        }}
                      >
                        Amount: {item.amount}
                      </p>
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

export default ManTransaction;
