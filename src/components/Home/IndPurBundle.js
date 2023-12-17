import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import fetchData from "../../axios";
import Button from "react-bootstrap/Button";
import { FaEye } from "react-icons/fa";
import { Suspense } from "react";
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
    },
    {
      name: "Bundles",
      selector: (row) => row.bundle_name,
      sortable: true,
      width: "410px",
      center: true,
    },
    {
      name: "validity",
      selector: (row) => row.validity,
      center: true,
    },
    {
      name: "count",
      selector: (row) => row.course_count,
      center: true,
    },
    {
      name: "Action",
      cell: () => (
        <a href="https://test.learnforcare.co.uk/bundle/bundle-all">
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
            Purchased Bundles
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
              className="p-relative d-inline header__search"
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
              noDataComponent={" "}
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
        </div>{" "}
      </div>
    </div>
  );
};

export default IndPurBundle;
