import React, { Component } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Link from "next/link";
import BasicExample from "../About/button1";
import fetchData from "../../axios";
import Button from "react-bootstrap/Button";

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

class ManTransaction extends Component {
  constructor() {
    super();
    this.state = {
      records: [],
      filterRecords: [],
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
        name: "NO",
        selector: (row, idx) => ++idx,
        center: true,
        width: "100px",
      },
      {
        name: "Date",
        selector: (row) => new Date(row.date).toLocaleDateString(),
        center: true,
      },
      {
        name: "Time",
        selector: (row) => new Date(row.date).toLocaleTimeString("en-GB", {timeZone: "Europe/London",hour12: true}),
        center: true,
        sortable: true,
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
          <div className="relative row g-3  min-vh-100  d-flex justify-content-center mt-20">
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
                  />
                  <button type="submit">
                    <i className="fas fa-search"></i>
                  </button>
                </form>
              </div>
              <DataTable
                persistTableHead={true}
                columns={columns}
                data={this.state.records}
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

export default ManTransaction;
