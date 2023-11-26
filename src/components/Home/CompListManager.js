import React, { Component } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Link from "next/link";
import BasicExample from "../About/button1";
import fetchData from "../../axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

class CompListManager extends Component {
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
    this.makeRequest("GET", "/info/get-all-sub-users")
      .then((res) => {
        console.log(res.data.response);
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
        this.getData()
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
              List of Managers
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
              <DataTable
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
                selectableRows
              />
            </div>
          </div>{" "}
        </div>
      </div>
    );
  }
}

export default CompListManager;