import React, { Component } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Link from "next/link";
import BasicExample from "../About/button1";

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

class DashSUser extends Component {
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
    this.fetchData();
  }

  fetchData = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) =>
        this.setState({ records: res.data, filterRecords: res.data })
      )
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
        name: "User",
        selector: (row) => row.name,
        sortable: true,
      },
      {
        name: "Email",
        selector: (row) => row.email,
      },
      {
        name: "Action",
        cell: (row) => <BasicExample />,
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
          position:'absolute',
          fontSize: 46,
        }}
      >
        Users
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
          <div style={{float:'right',marginBottom:'1.4rem'}} className="p-relative d-inline header__search">
            <form action="">
              <input style={{ background:'#edeef3',}}
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
      </div> </div>
    </div>
    );
  }
}

export default DashSUser;
