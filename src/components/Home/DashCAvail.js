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
      fontSize: "15px",
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

class DashCAvail extends Component {
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
    console.log('');
    this.getData();
  }

  getData = () => {
    this.makeRequest("GET", "/course/get-all-bought-course")
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
  };

  render() {
    const columns = [
      {
        name: "ID",
        selector: (row,idx) => ++idx,
        sortable: true,
      },
      {
        name: "Courses",
        selector: (row) => row.Name,
        sortable: true,
      },
  
      {
        name: "count",
        selector: (row) => row.course_count,
      },
      {
        name: "Actions",
        cell: () => <BasicExample />,
      },
      {
        name: "validity",
        selector: (row) => row.validity,
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
          fontSize: 42,
        }}
      >
        Purchased Courses
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
          persistTableHead={true}
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

export default DashCAvail;
