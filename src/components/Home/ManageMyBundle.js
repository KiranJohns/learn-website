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
      name: "SL No.",
      selector: (row, idx) => ++idx,
      width: "80px",
      center: true,
      hide: "md",
    },
    {
      name: "Bundle name",
      selector: (row) => row.bundle_name || row.name,
      sortable: true,
      width: "340px",
      center: true,
    },
    {
      name: "validity",
      selector: (row) => row.validity,
      center: true,
      hide: "md",
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
                {!row.progress || row?.progress <= 100 ? (
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
                    <a
                      onClick={() => {
                        if (row?.form_ongoing) {
                          location.href = `/learnCourse/bundleList/?id=${row.id}`;
                        } else {
                          handleStartBundle(row.id);
                        }
                      }}
                      className="btn btn-success"
                    >
                      Completed
                    </a>
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
          <div
            className="reacttable-hidden"
            style={{ padding: "", backgroundColor: "" }}
          >
            <div
              style={{ float: "right", marginBottom: "1.4rem" }}
              className="p-relative d-inline header__search searchbar-hidden1"
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

          <div style={{ marginTop: "3rem", paddingTop: "1rem" }}>
            {searchString
              ? records
                  .filter((item) =>
                    (item.bundle_name || item.name)
                      .toLowerCase()
                      .startsWith(searchString.toLowerCase())
                  )
                  .map((item) => {
                    return (
                      <div
                        style={{
                          paddingTop: "1rem",
                          marginTop: "3rem",
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
                              {item.bundle_name || item.name}
                            </p>
                            <>
                              {new Date(item.validity.split("/").reverse()) >
                              new Date() ? (
                                <>
                                  {!item.progress || item?.progress <= 100 ? (
                                    <button
                                      className="btn btn-success"
                                      style={{
                                        width: "7rem",
                                        height: "35px",
                                        marginTop: "1rem",
                                        marginRight: ".4rem",
                                      }}
                                      onClick={() => {
                                        if (item?.form_ongoing) {
                                          location.href = `/learnCourse/bundleList/?id=${item.id}`;
                                        } else {
                                          handleStartBundle(row.id);
                                        }
                                      }}
                                    >
                                      Start
                                    </button>
                                  ) : (
                                    <>
                                      <a
                                        style={{
                                          height: "35px",
                                          marginTop: "1rem",
                                          marginRight: ".4rem",
                                        }}
                                        className="btn btn-danger"
                                      >
                                        Completed
                                      </a>
                                    </>
                                  )}
                                </>
                              ) : (
                                <>
                                  <a
                                    style={{
                                      height: "35px",
                                      marginTop: "1rem",
                                      marginRight: ".4rem",
                                    }}
                                    className="btn btn-danger"
                                  >
                                    Expired
                                  </a>
                                </>
                              )}
                            </>
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
                        marginTop: ".5rem",
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
                            {item.bundle_name || item.name}
                          </p>
                          <>
                            {new Date(item.validity.split("/").reverse()) >
                            new Date() ? (
                              <>
                                {!item.progress || item?.progress <= 100 ? (
                                  <button
                                    className="btn btn-success"
                                    style={{
                                      width: "7rem",
                                      height: "35px",
                                      marginTop: "1rem",
                                      marginRight: ".4rem",
                                    }}
                                    onClick={() => {
                                      if (item?.form_ongoing) {
                                        location.href = `/learnCourse/bundleList/?id=${item.id}`;
                                      } else {
                                        handleStartBundle(item.id);
                                      }
                                    }}
                                  >
                                    Start
                                  </button>
                                ) : (
                                  <>
                                    <a
                                      style={{
                                        height: "35px",
                                        marginTop: "1rem",
                                        marginRight: ".4rem",
                                      }}
                                      className="btn btn-danger"
                                    >
                                      Completed
                                    </a>
                                  </>
                                )}
                              </>
                            ) : (
                              <>
                                <a
                                  style={{
                                    height: "35px",
                                    marginTop: "1rem",
                                    marginRight: ".4rem",
                                  }}
                                  className="btn btn-danger"
                                >
                                  Expired
                                </a>
                              </>
                            )}
                          </>
                          {/* <button className="btn btn-success" style={{height:'35px',marginTop:"1rem", marginRight:'.4rem'}}>View</button> */}
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

export default ManagerBundle;
