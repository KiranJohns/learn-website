import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Link from "next/link";
import BasicExample from "../About/button1";
import fetchData from "../../axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaLock } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";
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

const CompListManager = () => {
  const [records, setRecords] = useState([]);
  const [searchString, setSearchString] = useState("");

  const makeRequest = fetchData();

  useEffect(() => {
    getData();
  }, []);

  const handleFilter = (event) => {
    const newData = records.filter((row) =>
      row.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setRecords(newData);
  };

  

  const getData = () => {
    makeRequest("GET", "/info/get-all-managers")
      .then((res) => {
        console.log(res.data.response);
        setRecords(res.data.response.reverse());
        setPending(false)
      })
      .catch((err) => console.log(err));
  };

  const [pending, setPending] = React.useState(true);
	


  const handleBlock = (block, id) => {
    let url = null;
    let message = null;
    console.log(id);
    if (block) {
      url = "/info/unblock-user";
      message = "User Unblocked";
    } else {
      message = "User Blocked";
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

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      width:"110px",
      center:'true',
    },
    {
      name: "Name",
      selector: (row) => row.first_name + " " + row.last_name,
      sortable: true,
      center:'true',
    },
    {
      name: "City",
      selector: (row) => row.city,
      center:'true',
    },
    {
      name: "Email",
      selector: (row) => row.email,
      center:'true'
    },
    {
      name: "Action",
      center:'true',
      cell: (row) => (
        <a
          onClick={() => handleBlock(row.block, row.id)}
          className={row.block ? "btn btn-danger" : "btn btn-success"}
        >
          {row.block ? <FaLock /> : <FaUnlock />}
        </a>
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
        <div style={{position:"relative"}} className=" row g-3  min-vh-100  d-flex justify-content-center mt-20">
          <h2
            style={{
              color: "#212450",
              display: "flex",
              justifyContent: "center",
              position: "absolute",
              fontSize: 36,
            }}
          >
         Managers
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
            <Suspense fallback={<Spinner animation="border" variant="primary" />}>
              <DataTable
                progressPending={pending}
                progressComponent={
                  pending ? 
                  (<div style={{ padding: "1rem" }}>
                    <Spinner animation="border" variant="primary" />
                  </div>) : (null)
                }
                columns={columns}
                data={
                  searchString
                    ? records.filter((item) =>
                        item.first_name.toLowerCase().startsWith(searchString.toLowerCase())
                      )
                    : records
                }
                customStyles={customStyles}
                pagination
                persistTableHead={true}
              />
            </Suspense>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default CompListManager;

function Loading() {
  return <h2>🌀 Loading...</h2>;
}