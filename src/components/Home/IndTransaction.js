import React, { Component } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Link from "next/link";
import BasicExample from "../About/button1";
import fetchData from "../../axios";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { FaEye } from "react-icons/fa";

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

class Transaction extends Component {
  constructor() {
    super();
    this.state = {
      records: [],
      filterRecords: [],
      searchString: "",
    };
  }

  handleFilter = (event) => {
    const newData = this.state.filterRecords.filter((row) =>
      row.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    this.setState({ records: newData });
  };

  componentDidMount() {
    console.clear();
    let makeRequest = fetchData();
    makeRequest("GET", "/info/get-all-transactions")
      .then((res) => {
        console.log(res);
        this.setState({
          records: res.data.response.reverse(),
          filterRecords: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const columns = [
      {
        name: "SL",
        selector: (row, idx) => ++idx,
        width: "70px",
        center: true,
        hide:'lg'
      },
      {
        name: "User",
        selector: (row, idx) => row.first_name.concat(" ", row.last_name),
        width: "210px",
        center: true,
        hide:'sm'
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
        hide:'md'
      },
      {
        name: "Quantity",
        selector: (row) => row.count,
        center: true,
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
          <div style={{position:'relative'}} className=" row g-3  min-vh-100  d-flex justify-content-center mt-20">
            <h2
              style={{
                color: "#212450",
                display: "flex",
                justifyContent: "center",
                position: "absolute",
                fontSize: 36,
              }}
            >
              Transactions
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
                className="p-relative d-inline header__search searchbar-hidden1"
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
              <DataTable
                noDataComponent={"No records to display"}
                persistTableHead={true}
                columns={columns}
                data={
                  this.state.searchString
                    ? this.state.records.filter((item) =>
                        item.first_name
                          .toLowerCase()
                          .startsWith(this.state.searchString.toLowerCase())
                      )
                    : this.state.records
                }
                customStyles={customStyles}
                pagination
              />
            </div>
          </div>{" "}
        </div>
      </div>
    );
  }
}

export default Transaction;
