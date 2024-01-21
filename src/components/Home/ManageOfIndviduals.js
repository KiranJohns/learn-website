import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Link from "next/link";
import BasicExample from "../About/button1";
import fetchData from "../../axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "react-bootstrap/Spinner";
import { FaLock } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";
import { useRouter } from "next/router";

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
  const router = useRouter();

  const makeRequest = fetchData();

  const handleFilter = (event) => {
    const newData = filterRecords.filter((row) =>
      row.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setRecords(newData);
  };

  const getData = () => {
    setPending(true)
    makeRequest("GET", "/info/get-all-manager-individual")
      .then((res) => {
        console.log(res.data.response);
        setRecords(res.data.response);
        setFilterRecords(res.data);
        setPending(false);
      })
      .catch((err) => console.log(err));
  };

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

  useEffect(() => {
    getData();
  }, []); // Run once when component mounts

  const columns = [
    {
      name: "Sl No.",
      selector: (row, idx) => ++idx,
      center: true,
      hide: "lg",
    },
    {
      name: "User",
      selector: (row) => (
        <span
          onClick={() => {
            router.push({
              pathname: "/viewUser/editUser",
              query: { id: row.id, from: "manager-individual" },
            });
          }}
        >
          {row.first_name + " " + row.last_name}
        </span>
      ),

      center: true,
    },
    {
      name: "City",
      selector: (row) => row.city,
      center: true,
      hide: "md",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      center: true,
      minWidth: "315px",
    },
    {
      name: "Action",
      center: true,
      cell: (row) => (
        <button
          title={`${row.block ? "Unblock" : "block"}`}
          onClick={() => handleBlock(row.block, row.id)}
          className={row.block ? `btn btn-danger` : `btn btn-success`}
        >
          {row.block ? <FaLock /> : <FaUnlock />}
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
            Individuals
          </h2>
          <div style={{ padding: "", backgroundColor: "" }}>
            <div
              style={{ float: "right", marginBottom: ".8rem" }}
              className="p-relative d-inline header__search searchbar-hidden1"
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
                persistTableHead={true}
                progressPending={pending}
                progressComponent={
                  pending ? (
                    <div style={{ padding: "1rem" }}>
                      <Spinner animation="border" variant="primary" />
                    </div>
                  ) : null
                }
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
            {records.length <= 0 && <h4 className="no-record-hidden" style={{textAlign: 'center',marginTop:"5rem",}}>No records to display</h4>}
            <div>
              {searchString
                ? records
                    .filter((item) =>
                      item.first_name
                        .toLowerCase()
                        .startsWith(searchString.toLowerCase())
                    )
                    .map((item) => {
                      return (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                           
                          }}
                        >
                          <div className="new-table-shadow new-table-res new-table-hidden">
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <p
                                onClick={() => {
                                  router.push({
                                    pathname: "/viewUser/editUser",
                                    query: {
                                      id: item.id,
                                      from: "manager-individual",
                                    },
                                  });
                                }}
                                style={{
                                  paddingTop: "1.5rem",
                                  paddingLeft: ".4rem",
                                  color: "#212a50",
                                  fontWeight: "bold",
                                }}
                              >
                                {item.first_name + " " + item.last_name}
                              </p>
                              <a
                                onClick={() => handleBlock(item.block, item.id)}
                                className={
                                  item.block
                                    ? "btn btn-danger"
                                    : "btn btn-success"
                                }
                                style={{
                                  height: "35px",
                                  marginTop: "1rem",
                                  marginRight: ".4rem",
                                }}
                              >
                                {item.block ? <FaLock /> : <FaUnlock />}
                              </a>
                            </div>
                          </div>
                        </div>
                      );
                    })
                : records.map((item) => {
                    return (
                      <div
                        style={{
                          padding:".5rem",
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
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
                              onClick={() => {
                                router.push({
                                  pathname: "/viewUser/editUser",
                                  query: {
                                    id: item.id,
                                    from: "manager-individual",
                                  },
                                });
                              }}
                              style={{
                                paddingTop: "1.5rem",
                                paddingLeft: ".4rem",
                                color: "#212a50",
                                fontWeight: "bold",
                              }}
                            >
                              {item.first_name + " " + item.last_name}
                            </p>
                            <a
                              style={{
                                height: "35px",
                                marginTop: "1rem",
                                marginRight: ".4rem",
                              }}
                              onClick={() => handleBlock(item.block, item.id)}
                              className={
                                item.block
                                  ? "btn btn-danger"
                                  : "btn btn-success"
                              }
                            >
                              {item.block ? <FaLock /> : <FaUnlock />}
                            </a>
                          </div>
                          
                          
                          <div style={{ display: 'flex', justifyContent: "space-between" }}>
                        <p style={{ color: 'green', marginLeft: ".5rem", fontWeight: "500" }}>Email:{" "}{item?.email}<a className="my-dashlink"></a></p>
                        {/* <p style={{ color: 'green', marginRight: ".5rem", fontWeight: "500" }}>City:{" "}{item?.city}</p> */}
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

export default ManageIndList;
