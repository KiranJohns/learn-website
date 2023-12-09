import React, { Component } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Link from "next/link";
import BasicExample from "../About/button1";
import fetchData from "../../axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaLock } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";
import { Suspense } from "react";


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

class CompIndReport extends Component {
  constructor() {
    super();
    this.state = {
      records: [],
      filterRecords: [],
      searchString: "",
    };
    this.makeRequest = fetchData();
  }

  handleFilter = (event) => {
    const newData = this.state.filterRecords.filter((row) =>
      row.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    this.setState({ records: newData });
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    this.makeRequest("GET", "/info/get-all-ind-reports")
      .then((res) => {
        console.log(res.data.response);
        this.setState({ records: res.data.response, filterRecords: res.data });
      })
      .catch((err) => console.log(err));
  };
  handleBlock(block, id) {

  }
  render() {
    const columns = [

        {
          name: "Name",
          selector: (row) => row.first_name + " " + row.last_name,
          sortable: true,
          center: true,
        },
        {
          name: "Courses Assigned",
          selector: (row) => row.course,
          sortable: true,
          center: true,
        },
        {
          name: "Bundles Assigned",
          selector: (row) => row.bundle,
          center: true,
        },
        {
          name: "Certificates",
          cell: (row) => row.certificates,
          center:'true'
        }
      ];

    return (
      <div className="">
        <div className="dash-shadow">
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={true}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
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
          Individual Report
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
              <Suspense fallback={<Loading />}>
              <DataTable
             noDataComponent={" "}
             persistTableHead={true}   
                columns={columns}
                data={
                  this.state.searchString
                    ? this.state.records.filter((item) =>
                        item.name
                          .toLowerCase()
                          .includes(this.state.searchString.toLowerCase())
                      )
                    : this.state.records
                }
                customStyles={customStyles}
                pagination
            
              />
              </Suspense>
            </div>
          </div>{" "}
        </div>
      </div>
    );
  }
}

export default CompIndReport;

function Loading() {
  return <h2>🌀 Loading...</h2>;
}