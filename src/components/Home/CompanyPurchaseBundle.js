import React, { Component } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Button from 'react-bootstrap/Button';
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

class CompanyPurBundle extends Component {
  state = {
    records: [],
    filterRecords: [],
  };

  handleFilter = (event) => {
    const newData = this.state.filterRecords.filter((row) =>
      row.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    this.setState({ records: newData });
  };

  componentDidMount() {
    let makeRequest = fetchData();
    makeRequest("GET", "/info/get-purchased-bundles")
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
        cell: (id) => <a href="https://test.learnforcare.co.uk/bundle/bundle-all"><Button style={{background:"#212a50", color:'#fff'}} variant="">View</Button></a>,
      },
    ];

    return (
      <div className="">
        <div className="dash-shadow">
          <div style={{ position: 'relative' }} className=" row g-3   min-vh-100  d-flex justify-content-center mt-20">
            <h2
              style={{
                color: "#212450",
                display: "flex",
                justifyContent: "center",
                position: 'absolute',
                fontSize: 38,
              }}
            >
              Purchased Bundle
            </h2>
            <div style={{ padding: "", backgroundColor: "" }}>
              <div style={{ float: 'right', marginBottom: '1.4rem' }} className="p-relative d-inline header__search">
                <form action="">
                  <input style={{ background: '#edeef3', }}
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
                noDataComponent={"No records to display"}
                columns={columns}
                data={this.state.records}
                customStyles={customStyles}
                pagination
                selectableRows
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CompanyPurBundle;
