import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import fetchData from "../../axios";
import Spinner from "react-bootstrap/Spinner";
import { Suspense } from "react";
import { jwtDecode } from "jwt-decode";
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
      setPending(true);
      const onGoingRes = await makeRequest(
        "GET",
        "/bundle/get-on-going-bundles"
      );
      let resAssigned = await makeRequest("GET", "/info/get-assigned-bundle");
      let onGoingBundles = onGoingRes.data.response;
      console.log("onGoingBundles1 ", onGoingBundles);
      onGoingBundles = onGoingBundles.map((item) => {
        const { all_courses, finished_course, on_going_course } = item;
        let pers1 =
          ((JSON.parse(finished_course)?.length || 0) /
            JSON.parse(all_courses)?.length) *
          100;
        let pers2 =
          ((JSON.parse(on_going_course)?.length || 0) /
            JSON.parse(all_courses)?.length) *
          100;
        pers2 = Math.round(pers2 / 2);
        console.log(pers1 + pers2);
        item["progress"] = pers1 + pers2;
        return item;
      });

      let newRes = [
        ...resAssigned.data.response.filter(
          (item) => item.course_count >= 1 && item.owner == user.id
        ),
        ...onGoingBundles,
      ];

      function compareDates(a, b) {
        var dateA = new Date(a.validity.split("/").reverse().join("/"));
        var dateB = new Date(b.validity.split("/").reverse().join("/"));
        return dateA - dateB;
      }

      // Sort the array of objects
      newRes.sort(compareDates);

      setRecords(newRes.reverse());
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
      width: "280px",
      center: true,
    },
    {
      name: "validity",
      selector: (row) => row.validity,
      center: true,
      id: "val",
    },
    {
      name: "Progress",
      selector: (row) => (row.progress || 0) + "%",
      center: true,
      hide: 773,
    },
    {
      name: "Action",
      center: true,
      selector: (row) => {
        let validity = row.validity.split("/");
        validity = validity[1] + "/" + validity[0] + "/" + validity[2];
        console.log(new Date() > new Date(validity));
        console.log(new Date(validity));
        return (
          <>
            {new Date() < new Date(validity) ? (
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
                    View
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
                      View
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
          <Backbutton />
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
              // defaultSortFieldId="val"
              // defaultSortAsc={false}
            />
          </div>
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
              style={{ textAlign: "center", marginTop: "5rem" }}
            >
              No records to display
            </h4>
          )}
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
                              {item.valid ? (
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
                        display: "flex",
                        flexDirection: "column",
                        padding: ".5rem",
                      }}
                    >
                      <div className="new-table-shadow new-table-hidden">
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
                              marginRight: ".44rem",
                            }}
                          >
                            {item.bundle_name || item.name}
                          </p>
                          <>
                            {item.valid ? (
                              <>
                                {!item.progress || item?.progress <= 100 ? (
                                  <button
                                    className="btn btn-success"
                                    style={{
                                      width: "6rem  !important",
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
                                    View
                                  </button>
                                ) : (
                                  <>
                                    <a
                                      style={{
                                        height: "35px",
                                        marginTop: "1rem",
                                        marginRight: ".4rem",
                                        width: "6rem  !important",
                                      }}
                                      className="btn btn-success"
                                    >
                                      View
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
                                    width: "6rem  !important",
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
                            Attempts: {item?.progress || 0}
                            {"/20"}
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

export default ManagerBundle;
