import React, { Component } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

class DashArchive extends Component {
  constructor() {
    super();
    this.state = {
      records: [],
      filterRecords: [],
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
    this.makeRequest("GET", "/info/get-all-blocked-sub-user")
      .then((res) => {
        console.log(res);
        this.setState({ records: res.data.response, filterRecords: res.data });
      })
      .catch((err) => console.log(err));
  };

  handleBlock(block, id) {
    let url = null;
    let message = null;
    if (block) {
      url = "/info/unblock-sub-user";
      message = "user unblocked";
    } else {
      message = "user blocked";
      url = "/info/block-sub-user";
    }
    this.makeRequest("POST", url, {
      sub_user_id: id,
    })
      .then((res) => {
        this.getData();
        toast.success(message);
      })
      .catch((err) => console.log(err));
  }

  render() {
    const columns = [
      {
        name: "ID",
        selector: (row) => row.id,
        sortable: true,
      },
      {
        name: "User",
        selector: (row) => row.first_name + " " + row.last_name,
        sortable: true,
      },
      {
        name: "city",
        selector: (row) => row.city,
        sortable: true,
      },
      {
        name: "Email",
        selector: (row) => row.email,
      },
      {
        name: "Action",
        cell: (row) => (
          <a
            onClick={() => this.handleBlock(row.block, row.id)}
            className={row.block ? `btn btn-success` : `btn btn-danger`}
          >
            {row.block ? "unblock" : "block"}
          </a>
        ),
      },
    ];

    return (
      <div className="">
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
        <div className="dash-shadow">
          <div className=" row g-3  min-vh-100  d-flex justify-content-center mt-20">
            <h2
              style={{
                color: "#212450",
                display: "flex",

                justifyContent: "center",
                position: "absolute",
                marginLeft: ".5rem",
                fontSize: 42,
              }}
            >
              Archive Users
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

export default DashArchive;
