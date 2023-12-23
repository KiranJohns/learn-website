import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import fetchData from "../../axios";
import Spinner from "react-bootstrap/Spinner";
import { Suspense } from "react";
import { jwtDecode } from "jwt-decode";

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

const ManagerBundle = () => {
  const [records, setRecords] = useState([]);
  const [filterRecords, setFilterRecords] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [user, setUser] = useState(() => {
    let token = localStorage.getItem(`learnforcare_access`);
    return jwtDecode(token);
  });

  const makeRequest = fetchData();
  const [pending, setPending] = React.useState(true);

  const getData = async () => {
    console.clear();
    try {
      const onGoingRes = await makeRequest(
        "GET",
        "/bundle/get-on-going-bundles"
      );
      let resAssigned = await makeRequest("GET", "/info/get-assigned-bundle");

      setRecords([
        ...resAssigned.data.response.filter(
          (item) => item.course_count >= 1 && item.owner == user.id
        ),
        ...onGoingRes.data.response,
      ]);
      setFilterRecords(resAssigned.data);
      setPending(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleStartBundle = (id) => {
    let form = new FormData();
    form.append("from", "manager");
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

  useEffect(() => {
    console.log("");
    getData();
  }, []); // Run once when component mounts

  const columns = [
    {
      name: "ID",
      selector: (row, idx) => ++idx,
      width: "70px",
      center: true,
    },
    {
      name: "Bundle name",
      selector: (row) => row.bundle_name || row.name,
      sortable: true,
      width: "420px",
      center: true,
    },
    {
      name: "validity",
      selector: (row) => row.validity,
      center: true,
    },
    {
      name: "Progress",
      selector: (row) => (row.progress || 0) + "%",
      center: true,
    },
    {
      name: "Action",
      center: true,
      selector: (row) => {
        let validity = row.validity.split("/").reverse();
        return (
          <>
            {new Date(validity) > new Date() ? (
              <>
                {row.progress < 100 ? (
                  <button
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
                  </button>
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
                      (item.bundle_name || item.name)
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

export default ManagerBundle;
