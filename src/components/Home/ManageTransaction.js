import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
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
      name: "SL",
      selector: (row, idx) => ++idx,
      center: true,
      width: "100px",
    },
    {
      name: "User",
      selector: (row, idx) => row.first_name.concat(" ", row.last_name),
      center: true,
      width: "100px",
    },
    {
      name: "Date",
      selector: (row) => row.date,
      center: true,
    },
    {
      name: "Time",
      selector: (row) => row.time,
      center: true,
      sortable: true,
    },
    {
      name: "Quantity",
      selector: (row) => row.count,
      center: true,
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
        <div className="relative row g-3  min-vh-100  d-flex justify-content-center mt-20">
          <h2
            style={{
              color: "#212450",
              display: "flex",
              justifyContent: "center",
              position: "absolute",
              fontSize: 36,
            }}
          >
            Transaction Report
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
              noDataComponent={" "}
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
        </div>{" "}
      </div>
    </div>
  );
};

export default ManTransaction;
