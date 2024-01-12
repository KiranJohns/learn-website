import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import fetchData from "../../axios";
import Button from "react-bootstrap/Button";
import { CSVLink, CSVDownload } from "react-csv";
import { FaLock } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";
import { Suspense } from "react";
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

const DashSUser = () => {
  const [records, setRecords] = useState([]);
  const [filterRecords, setFilterRecords] = useState([]);
  const [searchString, setSearchString] = useState("");
  const makeRequest = fetchData();

  const [csvf, setCsvf] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        let data = [];
        json.forEach((item) => {
          let object = {
            id: item.id,
            name: item.name,
            username: item.username,
            email: item.email,
          };
          data.push(object);
        });
        setCsvf(data);
      });
  }, []);

  const [pending, setPending] = React.useState(true);

  useEffect(() => {
    getData();
  }, []);

  const handleFilter = (event) => {
    const newData = filterRecords.filter((row) =>
      row.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setRecords(newData);
  };

  const getData = () => {
    makeRequest("GET", "/info/get-all-individuals-under-company")
      .then((res) => {
        console.log(res.data.response);
        setRecords(
          res.data.response
            .flat(1)
            .filter((item) => item.type_of_account != "manager")
            .reverse()
        );
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

  const columns = [
    {
      name: "Sl No.",
      selector: (row) => row.id,
      center: "true",
      width: "80px",
      hide:1090,
    },
    {
      name: "User",
      selector: (row) => row.first_name + " " + row.last_name,
      center: "true",
    },
    {
      name: "city",
      selector: (row) => row.city,
      center: "true",
      hide:900,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      center: "true",
    },
    {
      name: "Action",
      center: "true",
      cell: (row) => (
        <a
          onClick={() => handleBlock(row.block, row.id)}
          className={row.block ? `btn btn-danger` : `btn btn-success`}
        >
          {row.block ? <FaLock /> : <FaUnlock />}
        </a>
      ),
    },
  ];

  useEffect(() => {
    getData();
  }, []);

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
              fontSize: 37,
            }}
          >
            Individuals
          </h2>
          <div style={{ padding: "", backgroundColor: "" }}>
            {/* CSV export*/}
            {/* <span style={{ marginLeft: "1rem", paddingTop: '.5rem', position:"absolute", outline:'none', border:'none' }}>
              <CSVLink data={csvf}>
                <Button variant="secondary">Export</Button>
              </CSVLink>
            </span> */}

            <div
              style={{ float: "right", marginBottom: "1.4rem" }}
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
              <Suspense fallback={<Loading />}>
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
              </Suspense>
            </div>
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
                          // paddingTop: "1rem",
                          // marginTop: "3rem",
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
                              style={{height:'35px',marginTop:"1rem", marginRight:'.4rem'}}
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
                        // paddingTop: "1rem",
                        marginTop: ".5rem",
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
                          style={{height:'35px',marginTop:"1rem", marginRight:'.4rem'}}
                            onClick={() => handleBlock(item.block, item.id)}
                            className={
                              item.block ? "btn btn-danger" : "btn btn-success"
                            }
                          >
                            {item.block ? <FaLock /> : <FaUnlock />}
                          </a>
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

export default DashSUser;

function Loading() {
  return <h2>🌀 Loading...</h2>;
}

{
  /* <div
            className="pb-2 smth"
            style={{ display: "flex", justifyContent: "left" }}
          >
            <input
              type="text"
              className=""
              placeholder="Search course..."
              onChange={this.handleFilter}
              style={{
                padding: "6px 10px",
                borderColor: "transparent",
                overflow: "hidden",
              }}
            />
          </div> */
}
