import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Link from "next/link";
import BasicExample from "../About/button1";
import fetchData from "../../axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

const ManageIndList = () => {
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

  const getData = () => {
    makeRequest("GET", "/info/get-all-manager-individual")
      .then((res) => {
        console.log(res.data.response);
        setRecords(res.data.response);
        setFilterRecords(res.data);
        setPending(false)
      })
      .catch((err) => console.log(err));
  };

  const handleBlock = (block, id) => {
    let url = null;
    let message = null;
    console.log(id);
    if (block) {
      url = "/info/unblock-user";
      message = "user unblocked";
    } else {
      message = "user blocked";
      url = "/info/block-user";
    }
    makeRequest("POST", url, {
      userId: id,
    })
      .then((res) => {
        getData();
        toast.success(message);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []); // Run once when component mounts

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "User",
      selector: (row) => row.first_name + " " + row.last_name,
      sortable: true,
    },
    {
      name: "City",
      selector: (row) => row.city,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Action",
      cell: (row) => (
        <button
          onClick={() => handleBlock(row.block, row.id)}
          className={row.block ? `btn btn-danger` : `btn btn-success`}
        >
          {row.block ? "unblock" : "block"}
        </button>
      ),
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
        <div className=" row g-3  min-vh-100  d-flex justify-content-center mt-20">
          <h2
            style={{
              color: "#212450",
              display: "flex",
              justifyContent: "center",
              position: "absolute",
              fontSize: 37,
            }}
          >
            Individuals
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
             persistTableHead={true}
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
                      item.first_name.toLowerCase()
                        .startsWith(searchString.toLowerCase())
                    )
                  : records
              }
              customStyles={customStyles}
              pagination
              selectableRows
            />
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default ManageIndList;
