import React, { Component } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Link from "next/link";
import BasicExample from "../About/button1";
import fetchData from "../../axios";

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
      textAlign: "center",
    },
  },
};

class ManageCertificate extends Component {
  constructor() {
    super();
    this.state = {
      records: [],
      filterRecords: [],
      searchData: "",
    };
  }

  handleFilter = (event) => {
    const newData = this.state.filterRecords.filter((row) =>
      row.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    this.setState({ records: newData });
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    let makeRequest = fetchData();
    console.log("ertyuiop");
    makeRequest("GET", "/certificate/get-certificates")
      .then((res) => {
        console.log(res.data);
        this.setState({
          records: res.data.response,
          filterRecords: res.data,
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const columns = [
      {
        name: "ID",
        selector: (row) => row.id,
        sortable: true,
      },
      {
        name: "Courses",
        selector: (row) => row.course_name,
        sortable: true,
      },
      {
        name: "Date",
        selector: (row) => new Date(row.date).toLocaleDateString(),
      },
      {
        name: "Percentage",
        selector: (row) => row.percentage,
      },
      {
        name: "Actions",
        selector: (row) => <a className="btn btn-success" target="_blank" href={row.image}>view</a>,
      },
    ];

    return (
      <div className="">
        <div className="dash-shadow">
          <div className=" row g-3  min-vh-100  d-flex justify-content-center mt-20">
            <h2
              style={{
                color: "#212450",
                display: "flex",
                justifyContent: "center",
                position: "absolute",
                fontSize: 42,
              }}
            >
              Certificates
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
                    onChange={(e) =>
                      this.setState({
                        ...this.state,
                        searchData: e.target.value,
                      })
                    }
                    placeholder="Search..."
                    // value={searchString}
                    // onChange={handleSearch}
                  />
                  <button type="submit">
                    <i className="fas fa-search"></i>
                  </button>
                </form>
              </div>
              <DataTable
                noDataComponent={"No records to display"}
                columns={columns}
                persistTableHead={true}
                data={
                  this.state.searchData
                    ? this.state.records.filter((item) =>
                        item.name
                          .toLowerCase()
                          .includes(this.state.searchData.toLowerCase())
                      )
                    : this.state.records
                }
                customStyles={customStyles}
                pagination
                selectableRows
              />
            </div>
          </div>{" "}
        </div>
      </div>
    );
  }
}

export default ManageCertificate;