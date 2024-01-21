import React, { Component } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Link from "next/link";
import BasicExample from "../About/button1";
import fetchData from "../../axios";
import { FaEye } from "react-icons/fa";
import Spinner from "react-bootstrap/Spinner";

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
      textAlign: "center",
    },
  },
};

class IndCertificate extends Component {
  constructor() {
    super();
    this.state = {
      records: [],
      filterRecords: [],
      searchData: "",
      pending: true,
    };
  }

  handleFilter = (event) => {
    const newData = this.state.filterRecords.filter((row) =>
      row.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    this.setState({ records: newData });
  };

  componentDidMount() {
    this.setState({
      ...this.state,
      pending: true,
    });
    this.fetchData();
  }

  fetchData = () => {
    let makeRequest = fetchData();
    console.log("ertyuiop");
    makeRequest("GET", "/certificate/get-certificates")
      .then((res) => {
        console.log(res.data);
        this.setState({
          records: res.data.response.reverse(),
          filterRecords: res.data,
          pending: false,
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const columns = [
      {
        name: "SL No.",
        selector: (row, idx) => idx + 1,
        center: true,
        hide: "md",
        width: "85px",
      },
      {
        name: "Courses",
        selector: (row) => row.course_name,
        sortable: true,
        center: true,

        minWidth: "250px",
      },
      {
        name: "Date",
        selector: (row) => row.date,
        center: true,
        hide: "md",
      },
      {
        name: "Percentage",
        selector: (row) => row.percentage,
        center: true,
        hide: "sm",
      },
      {
        name: "Actions",
        center: true,
        selector: (row) => (
          <a className="btn btn-success" target="_blank" href={row.image}>
            <FaEye />
          </a>
        ),
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
                fontSize: 35,
              }}
            >
              Certificates
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
                className="p-relative d-inline header__search searchbar-hidden1"
              >
                <form action="">
                  <input
                    style={{ background: "#edeef3" }}
                    className="d-block mr-10"
                    type="text"
                    onChange={(e) => {
                      this.setState({
                        ...this.state,
                        searchData: e.target.value,
                      });
                    }}
                    placeholder="Search..."
                    // value={searchString}
                    // onChange={handleSearch}
                  />
                  <button type="submit">
                    <i className="fas fa-search"></i>
                  </button>
                </form>
              </div>
              <div
                className="reacttable-hidden"
                style={{ padding: "", backgroundColor: "" }}
              >
                <DataTable
                  noDataComponent={"No records to display"}
                  columns={columns}
                  persistTableHead={true}
                  data={
                    this.state.searchData
                      ? this.state.records.filter((item) =>
                          item.course_name
                            .toLowerCase()
                            .startsWith(this.state.searchData.toLowerCase())
                        )
                      : this.state.records
                  }
                  customStyles={customStyles}
                  pagination
                  responsive={true}
                />
              </div>

              <div>
                {this.state.records.length <= 0 && !this.state.pending && (
                  <h4
                    className="no-record-hidden"
                    style={{ textAlign: "center", marginTop: "2rem" }}
                  >
                    No records to display
                  </h4>
                )}
                {this.state.pending && (
                  <div
                    className="no-record-hidden"
                    style={{
                      textAlign: "center",
                      padding: "1rem",
                      marginTop: "4rem",
                    }}
                  >
                    <Spinner animation="border" variant="primary" />
                  </div>
                )}
                {this.state.searchData
                  ? this.state.records
                      .filter((item) =>
                        item.name
                          .toLowerCase()
                          .includes(this.state.searchData.toLowerCase())
                      )
                      .map((item) => {
                        return (
                          <div
                            style={{
                              paddingTop: "1rem",
                              display: "flex",
                              flexDirection: "column",
                              width: "100%",
                            }}
                          >
                            <div className="new-table-shadow new-table-res new-table-hidden">
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <p
                                  style={{
                                    paddingTop: "1.5rem",
                                    paddingLeft: ".4rem",
                                    color: "#212a50",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {item.course_name}
                                </p>
                                {/* <button className="btn btn-success" style={{height:'35px',marginTop:"1rem", marginRight:'.4rem'}}>View</button> */}
                                <a
                                  style={{
                                    height: "35px",
                                    marginTop: "1rem",
                                    marginRight: ".4rem",
                                  }}
                                  className="btn btn-success"
                                  target="_blank"
                                  href={item.image}
                                >
                                  <FaEye />
                                </a>
                              </div>
                            </div>
                          </div>
                        );
                      })
                  : this.state.records.map((item) => {
                      return (
                        <div
                          style={{
                            paddingTop: "1rem",
                            // marginTop: "0.5rem",
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                          }}
                        >
                          <div className="new-table-shadow  new-table-hidden">
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <p
                                style={{
                                  paddingTop: "1.5rem",
                                  paddingLeft: ".4rem",
                                  color: "#212a50",
                                  fontWeight: "bold",
                                }}
                              >
                                {item.course_name}
                              </p>
                              {/* <button className="btn btn-success" style={{height:'35px',marginTop:"1rem", marginRight:'.4rem'}}>View</button> */}
                              <a
                                style={{
                                  height: "35px",
                                  marginTop: "1rem",
                                  marginRight: ".4rem",
                                }}
                                className="btn btn-success"
                                target="_blank"
                                href={item.image}
                              >
                                <FaEye />
                              </a>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <p
                                style={{
                                  color: "green",
                                  marginLeft: ".5rem",
                                  fontWeight: "500",
                                }}
                              >
                                Percentage: {item?.percentage}
                                {"%"}
                                <a className="my-dashlink"></a>
                              </p>
                              <p
                                style={{
                                  color: "green",
                                  marginRight: ".5rem",
                                  fontWeight: "500",
                                }}
                              >
                                Date: {item?.date}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
              </div>
            </div>
          </div>{" "}
        </div>
      </div>
    );
  }
}

export default IndCertificate;
