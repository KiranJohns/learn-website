import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import fetchData from "../../axios";
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

const CompTransaction = () => {
  const [records, setRecords] = useState([]);
  const [newRecords, setNewRecords] = useState([]);
  const [filterRecords, setFilterRecords] = useState([]);
  const [pending, setPending] = React.useState(true);
  const [searchString, setSearchString] = React.useState("");

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
        setPending(true);
        let makeRequest = fetchData();
        const res = await makeRequest("GET", "/info/get-all-transactions");
        console.log(res);
        let arr = []
        res.data.response.map((item,idx) => {
          arr.push({
            "Sl No.": ++idx,
            "User": item.first_name.concat(" ", item.last_name),
            "Date": item.date,
            "Time": item.time,
            "Quantity": item.count,
            "Amount": item.amount
          })
        })
        setNewRecords(arr)
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
      name: "SL No.",
      selector: (row, idx) => ++idx,
      center: true,
      width: "80px",
      hide: 890,
    },
    {
      name: "User",
      selector: (row, idx) => row.first_name.concat(" ", row.last_name),
      center: true,
      width: "225px",
      hide: 550,
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
      sortable: true,
      hide: 890,
    },
    {
      name: "Quantity",
      selector: (row) => row.count,
      center: true,
      hide: 700,
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
              fontSize: 35,
              marginTop: "1.3rem",
            }}
          >
            Transaction Report
          </h2>
          <div style={{ padding: "", backgroundColor: "" }}>
            <div
              style={{ float: "right", marginBottom: "1.4rem" }}
              className="p-relative d-inline header__search searchbar-hidden2 "
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
            <div style={{ marginTop: "3.3rem" }} className="reacttable-hidden">
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
                pagination
                noDataComponent={"No records to display"}
                customStyles={customStyles}
              />
               <DownloadCSV records={newRecords}/>
            </div>
            <div style={{ marginTop: "4rem" }}>
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
                      padding: ".45rem",
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
                          {item.first_name.concat(" ", item.last_name)}
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            padding: "1rem",
                            flexDirection: "column",
                            align: "start",
                          }}
                        >
                          <p
                            style={{
                              color: "green",
                              // marginLeft: ".5rem",
                              fontWeight: "500",
                            }}
                          >
                            Date: {item.date}
                            <a className="my-dashlink"></a>
                          </p>
                          <p
                            style={{
                              color: "green",
                              // marginRight: ".5rem",
                              fontWeight: "500",
                            }}
                          >
                            Time: {item.time}
                          </p>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            padding: "1rem",
                            flexDirection: "column",
                            align: "start",
                          }}
                        >
                          <p
                            style={{
                              color: "green",
                              // marginRight: ".5rem",
                              fontWeight: "500",
                            }}
                          >
                            Count: {item.count}
                          </p>
                          <p
                            style={{
                              color: "green",
                              // marginRight: ".5rem",
                              fontWeight: "500",
                            }}
                          >
                            amount: {item.amount}
                          </p>
                        </div>
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

export default CompTransaction;

function Loading() {
  return <h2>🌀 Loading...</h2>;
}
