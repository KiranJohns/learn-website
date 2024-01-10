import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import fetchData from "../../axios";
import { getMonth } from "../../utils/month";
import Button from "react-bootstrap/Button";
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

const ManageMonthRep = () => {
  const [records, setRecords] = useState([]);
  const [searchString, setSearchString] = useState("");

  const [filterRecords, setFilterRecords] = useState([]);

  const [pending, setPending] = React.useState(true);

  useEffect(() => {
    let makeRequest = fetchData();
    makeRequest("GET", "/info/get-all-transactions-by-month")
      .then((res) => {
        console.log(res);
        setRecords(res.data.response.reverse());
        setFilterRecords(res.data);
        setPending(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleFilter = (event) => {
    const newData = filterRecords.filter((row) =>
      row.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setRecords(newData);
  };

  const columns = [
    {
      name: "no",
      selector: (row, idx) => ++idx,
      width: "80px",
      center: true,
    },
    {
      name: "year",
      selector: (row) => row.year,
      center: true,
    },
    {
      name: "month",
      selector: (row) => getMonth(row.month),
      center: true,
    },
    {
      name: "Quantity",
      selector: (row) => row.total_fake_count,
      center: true,
    },
    {
      name: "amount",
      selector: (row) => row.total_amount,
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
            Month Wise Report
          </h2>
          <div style={{ padding: "", backgroundColor: "" }}>
            <div
              style={{ float: "right", marginBottom: "1.4rem" }}
              className="p-relative d-inline header__search searchbar-hidden3"
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
              persistTableHead={true}
              columns={columns}
              data={
                searchString
                  ? records.filter((item) =>
                      getMonth(item.month)
                        .toLowerCase()
                        .startsWith(searchString.toLowerCase())
                    )
                  : records
              }
              customStyles={customStyles}
              pagination
            />
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default ManageMonthRep;
