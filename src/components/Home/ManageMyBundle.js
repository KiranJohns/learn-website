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

class ManagerBundle extends Component {
  constructor() {
    super();
    this.state = {
      records: [],
      filterRecords: [],
    };
    this.makeRequest = fetchData();
    this.handleStartBundle = this.handleStartBundle.bind(this);
  }

  componentDidMount() {
    console.log("");
    this.getData();
  }

  getData = async () => {
    console.clear();
    let resAssigned = await this.makeRequest(
      "GET",
      "/info/get-assigned-bundle"
    );

    Promise.all([resAssigned])
      .then((res) => {
        console.log(res);
        this.setState({
          records: [...res[0].data.response].filter(
            (item) => item.course_count >= 1
          ),
          filterRecords: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleStartBundle(id) {
    let makeRequest = fetchData();

    let form = new FormData();
    console.log(id);
    form.append("from", "manager");
    form.append("bundle_id", id);
    makeRequest("POST", "/bundle/start-bundle", form)
      .then((res) => {
        console.log(res);
        location.href = `/learnCourse/bundleList/?id=${res.data.response.id}`;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const columns = [
      {
        name: "ID",
        selector: (row, idx) => ++idx,
         width:'70px',
         center:true,
      },
      {
        name: "Bundle name",
        selector: (row) => row.bundle_name,
        sortable: true,
        width:"420px",
        center:true,
      },
      {
        name: "validity",
        selector: (row) => new Date(row.validity).toLocaleDateString(),
        center:true,
      },
      {
        name: "count",
        selector: (row) => row.course_count,
        center:true,
      },
      {
        name: "total price",
        selector: (row) => row.amount,
        center:true,
      },
      {
        name: "Action",
        center:true,
        selector: (row) => (
          <a
            className="btn btn-success"
            onClick={() => {
              this.handleStartBundle(row.id);
            }}
          >
            Start
          </a>
        ),
      },
    ];

    return (
      <div className="">
        <div className="dash-shadow">
          <div style={{position:"relative"}} className=" row g-3  min-vh-100  d-flex justify-content-center mt-20">
            <h2
              style={{
                color: "#212450",
                display: "flex",
                justifyContent: "center",
                position: "absolute",
                fontSize: 36,
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
              noDataComponent={" "}
                columns={columns}
                data={this.state.records}
                customStyles={customStyles}
                pagination
                persistTableHead={true}
              />
            </div>
          </div>{" "}
        </div>
      </div>
    );
  }
}

export default ManagerBundle;
