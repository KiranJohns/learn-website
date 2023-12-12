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

class IndMyBundle extends Component {
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

  componentDidMount() {
    let makeRequest = fetchData();
    makeRequest("GET", "/info/get-purchased-bundles")
      .then((res) => {
        makeRequest("GET", "/info/get-individual-assigned-bundles")
          .then((resAssigned) => {
            makeRequest("GET", "/bundle/get-on-going-bundles")
              .then((onGoingRes) => {
                let result = [
                  ...res.data.response,
                  ...resAssigned.data.response,
                ];
                console.log(onGoingRes.data.response);
                result = result.filter((item) => item?.course_count >= 1);
                console.log(result);
                this.setState({
                  records: [...result, ...onGoingRes.data.response],
                  filterRecords: res.data,
                });
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleStartBundle(id, from) {
    let makeRequest = fetchData();

    let form = new FormData();
    form.append("from", from);
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

  getData = () => {
    console.log("hi");
  };

  render() {
    const columns = [
      {
        name: "ID",
        selector: (row, idx) => ++idx,
        width:"90px",
        center:true,
      },
      {
        name: "bundle name",
        selector: (row) => row?.name || row?.bundle_name,
        sortable: true,
        width:"400px",
        center:true,
      },
      {
        name: "validity",
        center:true,
        selector: (row) => {
          let newDt = new Date(row.validity)
            .toLocaleDateString()
            .split("/")
            .map((d) => (d.length <= 1 ? "0" + d : d));
          return newDt[1] + "/" + newDt[0] + "/" + newDt[2];
        },
      },
      // {
      //   name: "description",
      //   center:true,
      //   selector: (row) => row.description?.slice(0, 20),
      // },
      {
        name: "Actions",
        center:true,
        cell: (row) => (
          <span
            onClick={() => {
              console.log(row);
              if (row?.form_ongoing) {
                location.href = `/learnCourse/bundleList/?id=${row.id}`;
              } else if (row?.from_purchased) {
                this.handleStartBundle(row.id, "purchased");
              } else {
                this.handleStartBundle(row.id, "assigned");
              }
            }}
            className="btn btn-success"
          >
            start
          </span>
        ),
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

export default IndMyBundle;
