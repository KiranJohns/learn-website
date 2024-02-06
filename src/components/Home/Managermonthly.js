import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import fetchData from "../../axios";
import { getMonth } from "../../utils/month";
import Button from "react-bootstrap/Button";
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

const ManageMonthRep = () => {
  const [records, setRecords] = useState([]);
  const [searchString, setSearchString] = useState("");

  const [filterRecords, setFilterRecords] = useState([]);

  const [pending, setPending] = React.useState(true);

  useEffect(() => {
    let makeRequest = fetchData();
    makeRequest("GET", "/info/get-all-transactions-by-month")
      .then((res) => {
        console.log(res);
        setRecords(res.data.response.reverse());
        setFilterRecords(res.data);
        setPending(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleFilter = (event) => {
    const newData = filterRecords.filter((row) =>
      row.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setRecords(newData);
  };

  const columns = [
    {
      name: "no",
      selector: (row, idx) => ++idx,
      width: "80px",
      center: true,
      hide:"sm",
    },
    {
      name: "year",
      selector: (row) => row.year,
      center: true,
    },
    {
      name: "month",
      selector: (row) => getMonth(row.month),
      center: true,
    },
    {
      name: "Quantity",
      selector: (row) => row.total_fake_count,
      center: true,
      hide:"sm",
    },
    {
      name: "amount",
      selector: (row) => row.total_amount,
      center: true,
    },
  ];

  return (
    <div className="">
      <div className="dash-shadow">
        <div style={{position:'relative'}} className=" row g-3  min-vh-100  d-flex justify-content-center mt-20">
        <Backbutton/>
          <h2
            style={{
              color: "#212450",
              display: "flex",
              justifyContent: "center",
              position: "absolute",
              fontSize: 33,
            }}
          >
            Month Wise Report
          </h2>
          <div style={{ padding: "", backgroundColor: "" }}>
            <div
              style={{ float: "right", marginBottom: "1.4rem",zIndex:"99" }}
              className="p-relative d-inline header__search searchbar-hidden3"
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
                      getMonth(item.month)
                        .toLowerCase()
                        .startsWith(searchString.toLowerCase())
                    )
                  : records
              }
              customStyles={customStyles}
              pagination
            />
              <DownloadCSV records={records}/>
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
                       Year: {item.year}
                      </p>
                      <p
                        style={{
                          color: "#212a50",
                          marginRight: ".5rem",
                          fontWeight: "500", 
                           paddingTop: ".5rem",
                        }}
                      >
                       Month: {item.month}
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
                        Course: {item.course_count}
                        <a className="my-dashlink"></a>
                      </p> */}
                      <p
                        style={{
                          color: "green",
                          marginLeft: ".5rem",
                          fontWeight: "500",
                        }}
                      >
                       Quantity: {item.total_fake_count}
                      </p>
                      <p
                        style={{
                          color: "green",
                          marginRight: ".5rem",
                          fontWeight: "500",
                        }}
                      >
                        Amount: {item.total_amount}
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

export default ManageMonthRep;
