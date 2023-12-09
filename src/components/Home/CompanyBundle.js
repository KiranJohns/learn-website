import React, { Component } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Link from "next/link";
import BasicExample from "../About/button1";
import fetchData from "../../axios";
import Button from "react-bootstrap/Button";
import { Suspense } from "react";

const customStyles = {
  headRow: {
    style: {
      backgroundColor: "#212450",
      color: "white",
      textAlign: "center",
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
  rows: {
    style: {
      textAlign: "center",
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
    this.handleStartBundle = this.handleStartBundle.bind(this);
  }

  handleFilter = (event) => {
    const newData = this.state.filterRecords.filter((row) =>
      row.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    this.setState({ records: newData });
  };

  async componentDidMount() {
    let makeRequest = fetchData();

    let assignedRes = await makeRequest(
      "GET",
      "/info/get-assigned-bundles-for-company"
    );
    let onFoingRes = await makeRequest("GET", "/bundle/get-on-going-bundles");
    console.clear();
    Promise.all([assignedRes, onFoingRes])
      .then((res) => {
        console.log(res[0].data);
        console.log(res[1].data);
        let newRes = [...res[0].data.response, ...res[1].data.response];
        this.setState({
          records: newRes?.filter((item) => item.course_count >= 1).reverse(),
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

  handleStartBundle(id) {
    let makeRequest = fetchData();

    let form = new FormData();
    form.append("from", "assigned");
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
        name: "NO",
        selector: (row, idx) => ++idx,
        sortable: true,
        center: true,
      },
      {
        name: "Bundle Name",
        selector: (row) => row.bundle_name,
        sortable: true,
        center: true,
      },
      {
        name: "validity",
        selector: (row) => {
          let date = new Date(row.validity)
            .toLocaleDateString()
            .split("/")
            .map((d) => (d.length <= 1 ? "0" + d : d));
          let newDate = `${date[1]}/${date[0]}/${date[2]}`;
          return newDate;
        },
        center: true,
      },

      {
        name: "count",
        selector: (row) => row.course_count,
        center: true,
      },
      {
        name: "Action",
        cell: (row) => (
          <a
            className="btn btn-success"
            style={{
              width: '7rem'
            }}
            onClick={() => {
              if (row?.progress) {
                location.href = `/learnCourse/bundleList/?id=${row.id}`;
              } else {
                this.handleStartBundle(row.id);
              }
            }}
          >
            {row?.color ? "Continue" : "Start"}
          </a>
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
              <Suspense fallback={<Loading />}>
              <DataTable
                  noDataComponent={" "}
                columns={columns}
                data={this.state.records}
                customStyles={customStyles}
                pagination
                persistTableHead={true}
              />
               </Suspense>
            </div>
          </div>{" "}
        </div>
      </div>
    );
  }
}

export default CompanyBundle;

function Loading() {
  return <h2>🌀 Loading...</h2>;
}