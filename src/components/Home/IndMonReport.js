import React, { Component } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Link from "next/link";
import BasicExample from "../About/button1";
import fetchData from "../../axios";
import Button from "react-bootstrap/Button";
import { getMonth } from "../../utils/month";
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

class IndMonthRep extends Component {
  constructor() {
    super();
    this.state = {
      records: [],
      filterRecords: [],
      searchString: "",
      pending: true
    };
  }

  handleFilter = (event) => {
    const newData = this.state.filterRecords.filter((row) =>
      row.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    this.setState({ records: newData });
  };

  componentDidMount() {
    this.setState({
      ...this.state,
      pending: true
    });
    let makeRequest = fetchData();
    makeRequest("GET", "/info/get-all-transactions-by-month")
      .then((res) => {
        this.setState({
          records: res.data.response.reverse(),
          filterRecords: res.data,
          pending: false
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const columns = [
      {
        name: "NO",
        selector: (row, idx) => ++idx,
        center: true,
        width: "85px",
        hide: "sm",
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
        hide: "sm",
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
              }}
            >
              Month Wise Report
            </h2>
            <div style={{ padding: "", backgroundColor: "" }}>
              {/* <div
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
          </div> */}
              <div
                style={{ float: "right", marginBottom: "1.4rem" }}
                className="p-relative d-inline header__search searchbar-hidden2"
              >
                <form action="">
                  <input
                    style={{ background: "#edeef3" }}
                    className="d-block mr-10"
                    type="text"
                    placeholder="Search..."
                    value={this.state.searchString}
                    onChange={(e) =>
                      this.setState({
                        ...this.state,
                        searchString: e.target.value,
                      })
                    }
                  />
                  <button type="submit">
                    <i className="fas fa-search"></i>
                  </button>
                </form>
              </div>

              <div className="reacttable-hidden">
                <DataTable
                  noDataComponent={"No records to display"}
                  persistTableHead={true}
                  columns={columns}
                  data={
                    this.state.searchString
                      ? this.state.records.filter((item) =>
                          getMonth(item.month)
                            .toLowerCase()
                            .startsWith(this.state.searchString.toLowerCase())
                        )
                      : this.state.records
                  }
                  customStyles={customStyles}
                  pagination
                />
                 <DownloadCSV records={this.state.records}/>
              </div>

              {(this.state.records.length <= 0 && !this.state.pending) && (
                <h4
                  className="no-record-hidden"
                  style={{ textAlign: "center", marginTop: "4.5rem" }}
                >
                  No records to display
                </h4>
              )}
              {this.state.pending && (
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
              <div style={{ marginTop: "3rem" }}>
                {this.state.records.map((item) => {
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
  }
}

export default IndMonthRep;
