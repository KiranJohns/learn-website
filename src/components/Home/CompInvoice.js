import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Button from "react-bootstrap/Button";
import { FaEye } from "react-icons/fa";
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

  const [searchString, setSearchString] = React.useState("");
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
        console.clear();
        let makeRequest = fetchData();
        const res = await makeRequest("GET", "/cart/get-invoice");
        setRecords(res.data.response.reverse());
        setFilterRecords(res.data);
        setPending(false);
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []); // Run once when component mounts

  const columns = [
    {
      name: "Sl No.",
      selector: (row, idx) => ++idx,
      center: true,
      width: "80px",
      hide:945,
    },
    {
      name: "User",
      selector: (row, idx) => row.first_name.concat(" ", row.last_name),
      center: true,
      maxWidth: "310px",
    },
    {
      name: "Date",
      selector: (row) => row.date,
      center: true,
      sortable: true,
    },
    {
      name: "Time",
      hide:755,
      selector: (row) =>
        new Date(row.time).toLocaleTimeString("en-GB", {
          timeZone: "Europe/London",
          hour12: true,
        }),
      center: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <Button
          style={{ background: "#212a50", color: "white" }}
          variant="success btn-icon-xxs"
        >
          <a target="_blank" href={row.img}>
            <FaEye />
          </a>
        </Button>
      ),
      center: true,
    },
  ];

  return (
    <div className="">
      <div className="dash-shadow">
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
              fontSize: 35,
              marginTop:"1.4rem"
            }}
          >
            Invoice
          </h2>
          <div style={{ padding: "", backgroundColor: "" }}>
            <div
              style={{ float: "right", marginBottom: ".7rem" }}
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
                progressPending={pending}
                progressComponent={
                  pending ? (
                    <div style={{ padding: "1rem" }}>
                      <Spinner animation="border" variant="primary" />
                    </div>
                  ) : null
                }
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
                noDataComponent={"No records to display"}
              />
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
                          paddingTop: "1rem",
                          marginTop: "3rem",
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
                              {item.first_name.concat(" ", item.last_name)}
                            </p>
                            {/* <button className="btn btn-success" style={{height:'35px',marginTop:"1rem", marginRight:'.4rem'}}>View</button> */}
                            <Button
                              style={{
                                background: "#212a50",
                                color: "white",
                                height: "35px",
                                marginTop: "1rem",
                                marginRight: ".4rem",
                              }}
                              variant="success btn-icon-xxs"
                            >
                              <a target="_blank" href={item.img}>
                                <FaEye />
                              </a>
                            </Button>
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
                            {item.first_name.concat(" ", item.last_name)}
                          </p>
                          {/* <button className="btn btn-success" style={{height:'35px',marginTop:"1rem", marginRight:'.4rem'}}>View</button> */}
                          <Button
                            style={{
                              background: "#212a50",
                              color: "white",
                              height: "35px",
                              marginTop: "1rem",
                              marginRight: ".4rem",
                            }}
                            variant="success btn-icon-xxs"
                          >
                            <a target="_blank" href={item.img}>
                              <FaEye />
                            </a>
                          </Button>
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

export default CompInvoice;
