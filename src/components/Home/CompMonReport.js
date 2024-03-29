import axios from "axios";
import DataTable from "react-data-table-component";
import Link from "next/link";
import BasicExample from "../About/button1";
import fetchData from "../../axios";
import Button from "react-bootstrap/Button";
import { getMonth } from "../../utils/month";
import { Suspense } from "react";
import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import Backbutton from "./Backbutton";
import DownloadCSV from "../button/DownloadCSV";
import { FaArrowAltCircleLeft } from "react-icons/fa";

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

const CompMonthRep = () => {
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
        setPending(true)
        let makeRequest = fetchData();
        const res = await makeRequest(
          "GET",
          "/info/get-all-transactions-by-month"
        );
        let arr = []
        res.data.response.map((item,idx) => {
          arr.push({
            "Sl No": ++idx,
            Year: item.year,
            Month: getMonth(item.month),
            Quantity: item.total_fake_count,
            Amount: item.total_amount
          })
        })
        console.log(res);
        setNewRecords(arr);
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
      width: "100px",
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
    },
    {
      name: "amount",
      selector: (row) =>"£ "+Number(row.total_amount).toFixed(2),
      center: true,
    },
  ];

  return (
    <div className="">
      <div className="dash-shadow">
        <div style={{position:"relative"}} className=" row g-3  min-vh-100  d-flex justify-content-center mt-20">
        <span style={{position:'absolute', marginLeft:"1.55rem", marginTop:"1.5rem", zIndex:"100"}} className=""><button style={{background:"white"}} onClick={() => history.back()}> <FaArrowAltCircleLeft className="back-fontsize"  style={{color:"#212a50", }}/></button></span >
          <h2 className="dash-head-font"
            style={{
              color: "#212450",
              display: "flex",
              justifyContent: "center",
              position: "absolute",
              // fontSize: 34,
            }}
          >
            Month Wise Report
          </h2>
          <div style={{ padding: "", backgroundColor: "",zIndex:"99" }}>
            <div
              style={{ float: "right", marginBottom: "1.4rem",zIndex:"99" }}
              className="p-relative d-inline header__search searchbar-hidden2"
            >
              <form action="">
                <input
                  style={{ background: "#edeef3" }}
                  className="d-block mr-10"
                  type="text"
                  placeholder="Search by month"
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
                        getMonth(item.month)
                          .toLowerCase()
                          .startsWith(searchString.toLowerCase())
                      )
                    : records
                }
                pagination
                noDataComponent={"No records to display"}
                customStyles={customStyles}
              />
                <DownloadCSV records={newRecords} />
            </div>
            {records.length <= 0 && !pending && (
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
                        Amount: {"£"}{Number(item.total_amount).toFixed(2)}
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

export default CompMonthRep;

function Loading() {
  return <h2>🌀 Loading...</h2>;
}
