import React, { Component } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Link from "next/link";
import BasicExample from "../About/button1";
import fetchData from "../../axios";
import Button from 'react-bootstrap/Button';
import { getMonth } from "../../utils/month";
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

class CompMonthRep extends Component {
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
    let makeRequest = fetchData();
    makeRequest("GET", "/info/get-all-transactions-by-month")
      .then((res) => {
        console.log(res);
        this.setState({
          records: res.data.response,
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
        name: "Sl",
        selector: (row,idx) => ++idx,
        center:"true",
        width:'100px'
      },
      {
        name: "year",
        selector: (row) => row.year,
      
        center:"true",
      },
      {
        name: "month",
        selector: (row) => getMonth(row.month),   
        center:"true",
      },
      {
        name: "Quantity",
        selector: (row) => row.total_fake_count,
        center:"true",
      },
      {
        name: "amount",
        selector: (row) => row.total_amount,
        center:"true",
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
          fontSize: 36,
        }}
      >
       Month Wise Report
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
          <Suspense fallback={<Loading />}>
          <DataTable
          persistTableHead={true}
            columns={columns}
            data={this.state.records}
            customStyles={customStyles}
            pagination
            noDataComponent={" "}
          />
            </Suspense>
        </div> 
      </div> </div>
    </div>
    );
  }
}

export default CompMonthRep;

function Loading() {
  return <h2>🌀 Loading...</h2>;
}