import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Link from "next/link";
import BasicExample from "../About/button1";
import fetchData from "../../axios";
import Button from "react-bootstrap/Button";
import { Suspense } from "react";
import Spinner from "react-bootstrap/Spinner";
import { jwtDecode } from "jwt-decode";

const customStyles = {
  headRow: {
    style: {
      backgroundColor: "#212450",
      color: "white",
      textAlign: "center",
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
  rows: {
    style: {
      textAlign: "center",
    },
  },
};

const CompanyBundle = () => {
  const [records, setRecords] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [filterRecords, setFilterRecords] = useState([]);
  const [refresh, setRefresh] = useState(0);

  const [user, setUser] = useState(() => {
    let token = localStorage.getItem(`learnforcare_access`);
    return jwtDecode(token);
  });

  const handleFilter = useCallback(
    (event) => {
      const newData = filterRecords.filter((row) =>
        row.name.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setRecords(newData);
    },
    [filterRecords]
  );

  useEffect(() => {
    const fetchDataAsync = async () => {
      let makeRequest = fetchData();

      try {
        const onGoingRes = await makeRequest(
          "GET",
          "/bundle/get-on-going-bundles"
        );
        let assignedRes = await makeRequest(
          "GET",
          "/info/get-assigned-bundles-for-company"
        );
        console.clear();
        const newRes = [
          ...assignedRes.data.response
            .filter((item) => item.course_count >= 1 && item.owner == user.id)
            .reverse(),
          ...onGoingRes.data.response,
        ];
        console.log(assignedRes.data.response, onGoingRes.data.response);
        setRecords(newRes);
        // setFilterRecords(assignedRes.data); // Assuming this is correct, please double-check
        setPending(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchDataAsync();
  }, [refresh]);

  const handleStartBundle = (id) => {
    let makeRequest = fetchData();

    let form = new FormData();
    form.append("from", "assigned");
    form.append("bundle_id", id);
    makeRequest("POST", "/bundle/start-bundle", form)
      .then((res) => {
        console.log(res);
        location.href = `/learnCourse/bundleList/?id=${res.data.response.id}`;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [pending, setPending] = React.useState(true);

  const columns = [
    {
      name: "NO",
      selector: (row, idx) => ++idx,
      sortable: true,
      center: true,
    },
    {
      name: "Bundle Name",
      selector: (row) => row.bundle_name || row.name,
      sortable: true,
      center: true,
    },
    {
      name: "validity",
      selector: (row) => row.validity,
      center: true,
    },
    {
      name: "Progress",
      selector: (row) => (row?.progress || 0) + "%",
      center: true,
    },
    {
      name: "Action",
      cell: (row) => {
        let validity = row.validity.split("/").reverse();
        return (
          <>
            {new Date(validity) > new Date() ? (
              <>
                {row.progress < 100 ? (
                  <a
                    className="btn btn-success"
                    style={{
                      width: "7rem",
                    }}
                    onClick={() => {
                      if (row?.form_ongoing) {
                        location.href = `/learnCourse/bundleList/?id=${row.id}`;
                      } else {
                        handleStartBundle(row.id);
                      }
                    }}
                  >
                    Start
                  </a>
                ) : (
                  <>
                    <a className="btn btn-danger">Finished</a>
                  </>
                )}
              </>
            ) : (
              <>
                <a className="btn btn-danger">Expired</a>
              </>
            )}
          </>
        );
      },
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
          <h2
            style={{
              color: "#212450",
              display: "flex",
              justifyContent: "center",
              position: "absolute",
              fontSize: 36,
            }}
            onClick={() => setRefresh((prev) => ++prev)}
          >
            My Bundle
          </h2>
          <div style={{ padding: "", backgroundColor: "" }}>
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
            <Suspense fallback={<Loading />}>
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
            </Suspense>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default CompanyBundle;

function Loading() {
  return <h2>🌀 Loading...</h2>;
}
