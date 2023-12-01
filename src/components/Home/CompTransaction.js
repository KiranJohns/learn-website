import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import BasicExample from "../About/button1";
import fetchData from "../../axios";
import Button from 'react-bootstrap/Button';

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

const CompTransaction = () => {
  const [records, setRecords] = useState([]);
  const [filterRecords, setFilterRecords] = useState([]);

  const handleFilter = (event) => {
    const newData = filterRecords.filter((row) =>
      row.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setRecords(newData);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        let makeRequest = fetchData();
        const res = await makeRequest("GET", "/info/get-all-transactions");
        console.log(res);
        setRecords(res.data.response);
        setFilterRecords(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []);

  const columns = [
    {
      name: "Sl",
      selector: (row, idx) => ++idx,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.bundle_name,
      sortable: true,
    },
    {
      name: "Time",
      selector: (row) => row.bundle_name,
      sortable: true,
    },
    {
      name: "Quantity",
      selector: (row) => row.course_count,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
    },
  ];

  return (
    <div className="">
      <div className="dash-shadow">
        <div className="row g-3 min-vh-100 d-flex justify-content-center mt-20">
          <h2
            style={{
              color: "#212450",
              display: "flex",
              justifyContent: "center",
              position: 'absolute',
              fontSize: 38,
            }}
          >
            Transactions
          </h2>
          <div style={{ padding: "", backgroundColor: "" }}>
            <div style={{ float: 'right', marginBottom: '1.4rem' }} className="p-relative d-inline header__search">
              <form action="">
                <input
                  style={{ background: '#edeef3', }}
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
              persistTableHead={true}
              columns={columns}
              data={records}
              customStyles={customStyles}
              pagination
              selectableRows
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompTransaction;
