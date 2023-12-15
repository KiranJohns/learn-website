import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Button from 'react-bootstrap/Button';
import { FaEye } from "react-icons/fa";
import fetchData from "../../axios";
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

const CompInvoice = () => {
  const [records, setRecords] = useState([]);
  const [filterRecords, setFilterRecords] = useState([]);
 
  const [pending, setPending] = React.useState(true);
  const handleFilter = (event) => {
    const newData = filterRecords.filter((row) =>
      row.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setRecords(newData);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        console.clear()
        let makeRequest = fetchData();
        const res = await makeRequest("GET", "/cart/get-invoice");
        setRecords(res.data.response.reverse());
        setFilterRecords(res.data);
        setPending(false)
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []); // Run once when component mounts

  const columns = [
    {
      name: "NO",
      selector: (row, idx) => ++idx,
      center: true,
      width: "130px",
    },
    {
      name: "Date",
      selector: (row) => new Date(row.date).toLocaleDateString(),
      center: true,
      sortable: true,
    },
    {
      name: "Time",
      selector: (row) => new Date(row.date).toLocaleTimeString("en-GB", { timeZone: "Europe/London", hour12: true }),
      center: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <Button style={{ background: "#212a50", color: "white" }} variant="success btn-icon-xxs">
          <a target="_blank" href={row.img}><FaEye /></a>
        </Button>
      ),
      center: true,
    },
  ];

  return (
    <div className="">
      <div className="dash-shadow">
        <div style={{position:"relative"}} className=" row g-3  min-vh-100  d-flex justify-content-center mt-20">
          <h2
            style={{
              color: "#212450",
              display: "flex",
              justifyContent: "center",
              position: 'absolute',
              fontSize: 36,
            }}
          >
            Invoice
          </h2>
          <div style={{ padding: "", backgroundColor: "" }}>
            <div
              style={{ float: "right", marginBottom: "1.4rem" }}
              className="p-relative d-inline header__search"
            >
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
             progressPending={pending}
             progressComponent={
              pending ? 
              (<div style={{ padding: "1rem" }}>
                <Spinner animation="border" variant="primary" />
              </div>) : (null)
            }
              persistTableHead={true}
              columns={columns}
              data={records}
              customStyles={customStyles}
              pagination
              
              noDataComponent={" "}
            />
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default CompInvoice;


