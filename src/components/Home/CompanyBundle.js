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
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useRouter } from 'next/router';
import Backbutton from "./Backbutton";

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
  const [pending, setPending] = useState(true);
  const router = useRouter();
 

  const [user, setUser] = useState(() => {
    let token = localStorage.getItem(`learnforcare_access`);
    return jwtDecode(token);
  });

  const handleGoBack = () => {
    router.back();
  }

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
      setPending(true);

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

  const columns = [
    {
      name: "Sl No.",
      selector: (row, idx) => ++idx,
      center: true,
      width: "80px",
      hide: "lg",
    },

    {
      name: "Bundle Name",
      selector: (row) => row.bundle_name || row.name,
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
      hide: "md",
    },
    {
      name: "Action",
      cell: (row) => {
        let validity = row.validity.split("/").reverse();
        return (
          <>
            {row.valid ? (
              <>
                {!row?.progress || row?.progress < 100 ? (
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
                    View
                  </a>
                ) : (
                  <>
                    <a
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
              marginTop: "1.2rem",
            }}
            onClick={() => setRefresh((prev) => ++prev)}
          >
            My Bundle
          </h2>
          <div style={{ padding: "", backgroundColor: "" }}>
            <div
              style={{ float: "right", marginBottom: ".5rem" }}
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
            <div
              className="reacttable-hidden"
              style={{ padding: "", backgroundColor: "" }}
            >
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
            
            {pending && (
              <div
                className="no-record-hidden"
                style={{ textAlign: "center", marginTop: "5rem" }}
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
            {searchString
              ? records
                  .filter((item) =>
                    (item?.name || item?.bundle_name)
                      .toLowerCase()
                      .startsWith(searchString.toLowerCase())
                  )
                  .map((item) => {
                    let validity = item.validity.split("/").reverse();

                    return (
                      <div
                        style={{
                          width: "100%",
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
                              {item?.name || item?.bundle_name}
                            </p>
                            {/* <button className="btn btn-success" style={{height:'35px',marginTop:"1rem", marginRight:'.4rem'}}>View</button> */}
                            <>
                              {item.valid ? (
                                <>
                                  {!item?.progress || item?.progress < 100 ? (
                                    <a
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
                                    </a>
                                  ) : (
                                    <>
                                      <a
                                        onClick={() => {
                                          if (item?.form_ongoing) {
                                            location.href = `/learnCourse/bundleList/?id=${item.id}`;
                                          } else {
                                            handleStartBundle(item.id);
                                          }
                                        }}
                                        className="btn btn-danger"
                                        style={{
                                          width: "7rem",
                                          height: "35px",
                                          marginTop: "1rem",
                                          marginRight: ".4rem",
                                        }}
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
                                      width: "7rem",
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
                          </div>
                        </div>
                      </div>
                    );
                  })
              : records.map((item) => {
                  let validity = item.validity.split("/").reverse();

                  return (
                    <div
                      style={{
                        width: "100%",
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
                              marginRight: ".42rem",
                            }}
                          >
                            {item?.name || item?.bundle_name}
                          </p>
                          {/* <button className="btn btn-success" style={{height:'35px',marginTop:"1rem", marginRight:'.4rem'}}>View</button> */}
                          <>
                            {item.valid ? (
                              <>
                                {!item?.progress || item?.progress < 100 ? (
                                  <a
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
                                  </a>
                                ) : (
                                  <>
                                    <a
                                      onClick={() => {
                                        if (item?.form_ongoing) {
                                          location.href = `/learnCourse/bundleList/?id=${item.id}`;
                                        } else {
                                          handleStartBundle(item.id);
                                        }
                                      }}
                                      className="btn btn-success"
                                      style={{
                                        width: "6rem  !important",
                                        height: "35px",
                                        marginTop: "1rem",
                                        marginRight: ".4rem",
                                      }}
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
                                    width: "6rem  !important",
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
                            Progress: {item.progress || 0}%
                            <a className="my-dashlink"></a>
                          </p>
                          <p
                            style={{
                              color: "green",
                              marginRight: ".5rem",
                              fontWeight: "500",
                            }}
                          >
                            Validity: {item.validity}
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

export default CompanyBundle;

function Loading() {
  return <h2>🌀 Loading...</h2>;
}
