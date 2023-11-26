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
    },
  },
};

class CompanyBundle extends Component {
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

  async componentDidMount() {
    let makeRequest = fetchData();

    let purchasedRes = await makeRequest("GET", "/info/get-purchased-bundles");
    let assignedRes = await makeRequest(
      "GET",
      "/info/get-assigned-bundles-for-company"
    )
      Promise.all([purchasedRes,assignedRes]).then((res) => {
        console.log(res)
        let newRes = [...res[0].data.response,...res[1].data.response]
        this.setState({
          records: newRes?.filter((item) => item.course_count >= 1),
          filterRecords: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getData = () => {
    console.log("hi");
  };

  render() {
    const columns = [
      {
        name: "ID",
        selector: (row, idx) => ++idx,
        sortable: true,
      },
      {
        name: "Courses",
        selector: (row) => row.bundle_name,
        sortable: true,
      },
      {
        name: "validity",
        selector: (row) => row.validity,
      },
      {
        name: "count",
        selector: (row) => row.course_count,
      },
      {
        name: "Actions",
        cell: () => <BasicExample />,
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
                fontSize: 38,
              }}
            >
              My Bundle
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
                className="p-relative d-inline header__search"
              >
                <form action="">
                  <input
                    style={{ background: "#edeef3" }}
                    className="d-block mr-10"
                    type="text"
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
                columns={columns}
                data={this.state.records}
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

export default CompanyBundle;