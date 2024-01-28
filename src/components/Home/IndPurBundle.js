import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import fetchData from "../../axios";
import Button from "react-bootstrap/Button";
import { FaEye } from "react-icons/fa";
import { Suspense } from "react";
import Spinner from "react-bootstrap/Spinner";
import Backbutton from "./Backbutton";

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

const IndPurBundle = () => {
  const [records, setRecords] = useState([]);
  const [filterRecords, setFilterRecords] = useState([]);

  const [searchString, setSearchString] = React.useState("");
  const [pending, setPending] = React.useState(true);

  const handleFilter = (event) => {
    const newData = filterRecords.filter((row) =>
      row.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setRecords(newData);
  };

  useEffect(() => {
    setPending(true);
    let makeRequest = fetchData();
    makeRequest("GET", "/info/get-purchased-bundles")
      .then((res) => {
        console.log(res);
        setRecords(res.data.response);
        setFilterRecords(res.data);
        setPending(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const columns = [
    {
      name: "ID",
      selector: (row, idx) => ++idx,
      width: "70px",
      center: true,
      hide: "md",
    },
    {
      name: "Bundles",
      selector: (row) => row.bundle_name,
      width: "320px",
      center: true,
    },
    {
      name: "validity",
      selector: (row) => row.validity,
      center: true,
      hide: "md",
    },
    {
      name: "count",
      selector: (row) => row.course_count,
      center: true,
    },
    {
      name: "Action",
      cell: () => (
        <a title="View" href="https://test.learnforcare.co.uk/bundle/bundle-all">
          <Button style={{ background: "#212a50" }}>
            <FaEye />
          </Button>
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
          <Backbutton/>
          <h2
            style={{
              color: "#212450",
              display: "flex",
              justifyContent: "center",
              position: "absolute",
              fontSize: 35,
            }}
          >
            Purchased Bundles
          </h2>
          <div
            className="reacttable-hidden"
            style={{ padding: "", backgroundColor: "" }}
          >
            {/* <div
              className="pb-2 smth"
              style={{ display: "flex", justifyContent: "left" }}
            >
              <input
                type="text"
                className=""
                placeholder="Search course..."
                onChange={handleFilter}
                style={{
                  padding: "6px 10px",
                  borderColor: "transparent",
                  overflow: "hidden",
                }}
              />
            </div> */}
            <div
              style={{ float: "right", marginBottom: "1.4rem" }}
              className="p-relative d-inline header__search searchbar-hidden"
            >
              <form action="">
                <input
                  style={{ background: "#edeef3" }}
                  className="d-block mr-10"
                  type="text"
                  placeholder="Search..."
                  value={searchString}
                  onChange={(e) => setSearchString(e.target.value)}
                />
                <button type="submit">
                  <i className="fas fa-search"></i>
                </button>
              </form>
            </div>
            <DataTable
              progressPending={pending}
              progressComponent={
                pending ? (
                  <div style={{ padding: "1rem" }}>
                    <Spinner animation="border" variant="primary" />
                  </div>
                ) : null
              }
              noDataComponent={"No records to display"}
              columns={columns}
              data={
                searchString
                  ? records.filter((item) =>
                      (item?.name || item?.bundle_name)
                        .toLowerCase()
                        .startsWith(searchString.toLowerCase())
                    )
                  : records
              }
              customStyles={customStyles}
              pagination
              persistTableHead={true}
            />
          </div>
          <div style={{ marginTop: "4rem" }}>
            {pending && (
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
            {records.length <= 0 && !pending && (
              <h4
                className="no-record-hidden"
                style={{ textAlign: "center", marginTop: "4rem" }}
              >
                No records to display
              </h4>
            )}
            {searchString
              ? records
                  .filter((item) =>
                    (item?.name || item?.bundle_name)
                      .toLowerCase()
                      .startsWith(searchString.toLowerCase())
                  )
                  .map((item) => {
                    return (
                      <div
                        style={{
                          paddingTop: "1rem",
                          marginTop: "0.5rem",
                          display: "flex",
                          flexDirection: "column",
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
                              {item?.name || item?.bundle_name}
                            </p>
                            <a
                              style={{
                                height: "35px",
                                marginTop: "1rem",
                                marginRight: ".4rem",
                              }}
                              href="https://test.learnforcare.co.uk/bundle/bundle-all"
                            >
                              <Button style={{ background: "#212a50" }}>
                                <FaEye />
                              </Button>
                            </a>
                            {/* <button className="btn btn-success" style={{height:'35px',marginTop:"1rem", marginRight:'.4rem'}}>View</button> */}
                          </div>
                        </div>
                      </div>
                    );
                  })
              : records.map((item) => {
                  return (
                    <div
                      style={{
                        padding: ".5rem",
                        // marginTop: "0.5rem",
                        display: "flex",
                        flexDirection: "column",
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
                            {item?.name || item?.bundle_name}
                          </p>
                          <a
                            style={{
                              height: "35px",
                              marginTop: "1rem",
                              marginRight: ".4rem",
                            }}
                            href="https://test.learnforcare.co.uk/bundle/bundle-all"
                          >
                            <Button style={{ background: "#212a50" }}>
                              <FaEye />
                            </Button>
                          </a>
                          {/* <button className="btn btn-success" style={{height:'35px',marginTop:"1rem", marginRight:'.4rem'}}>View</button> */}
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
                            Count: {item?.course_count}
                            <a className="my-dashlink"></a>
                          </p>
                          <p
                            style={{
                              color: "green",
                              marginRight: ".5rem",
                              fontWeight: "500",
                            }}
                          >
                            Validity: {item?.validity}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default IndPurBundle;
