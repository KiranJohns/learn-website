import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import fetchData from "../../axios";
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

const IndMyBundle = () => {
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

  const handleStartBundle = (id, from) => {
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
  };

  useEffect(() => {
    setPending(true)
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
                setRecords([...result, ...onGoingRes.data.response]);
                setFilterRecords(res.data);
                setPending(false);
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
  }, []);

  const columns = [
    {
      name: "ID",
      selector: (row, idx) => ++idx,
      width: "90px",
      center: true,
      hide: "md",
    },
    {
      name: "bundle name",
      selector: (row) => row?.name || row?.bundle_name,
      width: "340px",
      center: true,
    },
    {
      name: "validity",
      center: true,
      selector: (row) => row.validity,
    },
    {
      name: "Progress",
      selector: (row) => (row?.progress || 0) + "%",
      center: true,
    },
    {
      name: "Actions",
      center: true,
      cell: (row) => {
        let validity = row.validity.split("/").reverse();
        return (
          <>
            {row.valid ? (
              <>
                {!row.progress || row.progress < 100 ? (
                  <span
                    style={{ width: "7rem" }}
                    onClick={() => {
                      console.log(row);
                      if (row?.form_ongoing) {
                        location.href = `/learnCourse/bundleList/?id=${row.id}`;
                      } else if (row?.from_purchased) {
                        handleStartBundle(row.id, "purchased");
                      } else {
                        handleStartBundle(row.id, "assigned");
                      }
                    }}
                    className="btn btn-success"
                  >
                    Start
                  </span>
                ) : (
                  <>
                    <a
                      style={{ width: "7rem" }}
                      onClick={() => {
                        console.log(row);
                        if (row?.form_ongoing) {
                          location.href = `/learnCourse/bundleList/?id=${row.id}`;
                        } else if (row?.from_purchased) {
                          handleStartBundle(row.id, "purchased");
                        } else {
                          handleStartBundle(row.id, "assigned");
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
                <a style={{ width: "7rem" }} className="btn btn-danger">
                  Expired
                </a>
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
          {(records.length <= 0 && !pending) && <h4 className="no-record-hidden" style={{textAlign: 'center',marginTop:"1rem",}}>No records to display</h4>}
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
                          // paddingTop: "1.4rem",
                          // marginTop: "2rem",
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
                            <>
                              {item.valid ? (
                                <>
                                  {!item.progress || item.progress < 100 ? (
                                    <span
                                      onClick={() => {
                                        console.log(item);
                                        if (item?.form_ongoing) {
                                          location.href = `/learnCourse/bundleList/?id=${item.id}`;
                                        } else if (item?.from_purchased) {
                                          handleStartBundle(
                                            item.id,
                                            "purchased"
                                          );
                                        } else {
                                          handleStartBundle(
                                            item.id,
                                            "assigned"
                                          );
                                        }
                                      }}
                                      style={{
                                        height: "35px",
                                        marginTop: "1rem",
                                        marginRight: ".4rem",

                                      }}
                                      className="btn btn-success"
                                    >
                                      Start
                                    </span>
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
                      
                        marginTop: ".2rem",
                        padding:".5rem"
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
                              marginRight: ".42rem",
                            }}
                          >
                            {item?.name || item?.bundle_name}
                          </p>
                          <>
                            {item.valid ? (
                              <>
                                {!item.progress || item.progress < 100 ? (
                                  <span
                                    onClick={() => {
                                      console.log(item);
                                      if (item?.form_ongoing) {
                                        location.href = `/learnCourse/bundleList/?id=${item.id}`;
                                      } else if (item?.from_purchased) {
                                        handleStartBundle(item.id, "purchased");
                                      } else {
                                        handleStartBundle(item.id, "assigned");
                                      }
                                    }}
                                    style={{
                                      width: "6rem  !important",
                                      height: "35px",
                                      marginTop: "1rem",
                                      marginRight: ".4rem",
                                    }}
                                    className="btn btn-success"
                                  >
                                    Start
                                  </span>
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
                                      Completed
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
                          {/* <button className="btn btn-success" style={{height:'35px',marginTop:"1rem", marginRight:'.4rem'}}>View</button> */}
                        </div>
                        <div style={{ display: 'flex', justifyContent: "space-between" }}>
                        <p style={{ color: 'green', marginLeft: ".5rem", fontWeight: "500" }}>Progress:{" "}{item?.progress || 0}%<a className="my-dashlink"></a></p>
                        <p style={{ color: 'green', marginRight: ".5rem", fontWeight: "500" }}>Validity:{" "}{item?.validity}</p>
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

export default IndMyBundle;
