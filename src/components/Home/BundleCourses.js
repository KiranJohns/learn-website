import React, { useState, useEffect } from "react";
// import {} from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import Link from "next/link";
import BasicExample from "../About/button1";
import fetchData, { getUserType } from "../../axios";
import Modal from "react-responsive-modal";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { Button } from "react-bootstrap";
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
      justifyContent: "center",
    },
  },
  cells: {
    style: {
      fontSize: "15px",
      justifyContent: "center",
    },
  },
};

const BundleCour = () => {
  const [records, setRecords] = useState([]);
  const [filterRecords, setFilterRecords] = useState([]);
  const [data, setData] = useState({});
  const [searchData, setSearchData] = useState("");
  const [pending, setPending] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const makeRequest = fetchData();
  let sub_user_id = null;
  let course_id = null;
  let purchased_course_id = null;
  const router = useRouter();

  const handleFilter = (event) => {
    const newData = filterRecords.filter((row) =>
      row.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setRecords(newData);
  };

  const getData = async () => {
    try {
      let makeRequest = fetchData();

      // let form = new FormData();
      // form.append("from", from);
      // form.append("bundle_id", id);

      setPending(true)

      console.log(router.query);
      makeRequest("GET", `/bundle/get-started-bundle/${router.query.id}`)
        .then((res) => {
          setRecords(res?.data?.response?.courses || []);
          console.log(res.data.response);
          setData(res.data.response.bundle[0]);
          setPending(false)
          // location.href = `/individual/bundleCourses/?id=${res.data.response.id}`;
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowModal = () => {
    setOpenModal(!openModal);
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      name: "No",
      selector: (row, idx) => idx + 1,
      center: "true",
      width: "80px",
      hide: "md",
    },
    {
      name: "name",
      selector: (row) => row.name || row.Name,
      center: "true",
      width: "300px",
    },
    {
      name: "category",
      selector: (row) => row.category,
      center: "true",
      hide: "md",
    },
    {
      name: "Attempts",
      selector: (row) => {
        return <a
          className="my-dashlink"
          href={`/learnCourse/examAttempts/?bundleId=${router.query.id}&courseId=${row.id}&course_name=${(row.name ? row.name : row.Name)}`}
        >
          {(row.attempts ? row.attempts : 0) + "/20"}
        </a>
      },
      center: "true",
    },
    {
      name: "Action",
      cell: (row) => {
        console.log(row);
        return (
          <>
            {!data?.finished_course?.includes(row.id) ? (
              <>
                {row?.attempts < 20 ? (
                  <Link
                    href={{
                      pathname: "/learnCourse/bundleCourse",
                      query: {
                        course_id: row.id,
                        bundleId: router.query.id,
                      },
                    }}
                  >
                    <a
                      onClick={() => {}}
                      className={`btn btn-success`}
                      style={{ width: "7rem" }}
                    >
                      Start
                    </a>
                  </Link>
                ) : (
                  <>
                    <a className="btn btn-danger">Expired</a>
                  </>
                )}
              </>
            ) : (
              <>
                <Link
                  href={{
                    pathname: `/${getUserType()}/certificates`,
                  }}
                >
                  <a
                    onClick={() => {}}
                    className={`btn btn-success`}
                    style={{ width: "7rem" }}
                  >
                    Completed
                  </a>
                </Link>
                {/* <a className="btn btn-danger">Completed</a> */}
              </>
            )}
          </>
        );
      },
    },
  ];

  return (
    <div className="">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className=" row g-3  min-vh-100  d-flex justify-content-center dash-shadow mt-10">
        <div style={{ padding: "", backgroundColor: "" }}>
          <h2
            className="dash-head-center"
            style={{
              padding: "",
              color: "#212450",
              margin: "0",
              fontSize: 37,
            }}
          >
            Bundle Courses
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
                  className="d-block  "
                  type="text"
                  placeholder="Search..."
                  value={searchData}
                  onChange={(e) => setSearchData(e.target.value)}
                />
                <button type="submit">
                  <i className="fas fa-search"></i>
                </button>
              </form>
            </div>
            <DataTable
              noDataComponent={"No records to display"}
              columns={columns}
              data={
                searchData
                  ? records.filter((item) =>
                      (item?.Name || item?.name)
                        .toLowerCase()
                        .includes(searchData.toLowerCase())
                    )
                  : records
              }
              customStyles={customStyles}
              pagination
              persistTableHead={true}
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
          {searchData
            ? records
                .filter((item) =>
                  (item?.Name || item?.name)
                    .toLowerCase()
                    .includes(searchData.toLowerCase())
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
                            {item.Name || item.name}
                          </p>
                          {/* <button className="btn btn-success" style={{height:'35px',marginTop:"1rem", marginRight:'.4rem'}}>View</button> */}
                          <>
                            {!data?.finished_course?.includes(item.id) ? (
                              <>
                                {item?.attempts < 20 ? (
                                  <Link
                                    href={{
                                      pathname: "/learnCourse/bundleCourse",
                                      query: {
                                        course_id: item.id,
                                        bundleId: router.query.id,
                                      },
                                    }}
                                  >
                                    <a
                                      onClick={() => {}}
                                      className={`btn btn-success`}
                                      style={{
                                        width: "7rem",
                                        height: "35px",
                                        marginTop: "1rem",
                                        marginRight: ".4rem",
                                      }}
                                    >
                                      Start
                                    </a>
                                  </Link>
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
                            ) : (
                              <>
                                <a
                                  href={"/company/certificates"}
                                  style={{
                                    width: "7rem",
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
                        </div>
                      </div>
                    </div>
                  );
                })
            : records.map((item) => {
                return (
                  <div
                    style={{
                      paddingTop: "1rem",
                      marginTop: "3rem",
                      display: "flex",
                      flexDirection: "column",
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
                          }}
                        >
                          {item.Name || item.name}
                        </p>
                        {/* <button className="btn btn-success" style={{height:'35px',marginTop:"1rem", marginRight:'.4rem'}}>View</button> */}
                        <>
                          {!data?.finished_course?.includes(item.id) ? (
                            <>
                              {item?.attempts < 20 ? (
                                <Link
                                  href={{
                                    pathname: "/learnCourse/bundleCourse",
                                    query: {
                                      course_id: item.id,
                                      bundleId: router.query.id,
                                    },
                                  }}
                                >
                                  <a
                                    onClick={() => {}}
                                    className={`btn btn-success`}
                                    style={{
                                      width: "6rem  !important",
                                      height: "35px",
                                      marginTop: "1rem",
                                      marginRight: ".4rem",
                                    }}
                                  >
                                    Start
                                  </a>
                                </Link>
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
                          ) : (
                            <>
                              <a
                                href={"/company/certificates"}
                                style={{
                                  width: "6rem  !important",
                                  height: "35px",
                                  marginTop: "1rem",
                                  marginRight: ".4rem",
                                }}
                                className="btn btn-success"
                              >
                                Completed
                              </a>
                            </>
                          )}
                        </>
                      </div>
                     
                      <div style={{ display: 'flex', justifyContent: "space-between" }}>
                        <p style={{ color: 'green', marginLeft: ".5rem", fontWeight: "500" }}>Attempts:{" "}{item?.attempts}{"/20"}<a className="my-dashlink"></a></p>
                        <p style={{ color: 'green', marginRight: ".5rem", fontWeight: "500" }}>{item?.category}</p>
                      </div>


                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default BundleCour;
