import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Link from "next/link";
import fetchData from "../../axios";
import { Suspense } from "react";
import Spinner from "react-bootstrap/Spinner";
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

const ManageMyCourse = () => {
  const [records, setRecords] = useState([]);
  const [filterRecords, setFilterRecords] = useState([]);
  const [searchString, setSearchString] = useState("");

  const makeRequest = fetchData();
  const [pending, setPending] = React.useState(true);
  const handleFilter = (event) => {
    const newData = filterRecords.filter((row) =>
      row.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setRecords(newData);
  };
  const [user, setUser] = useState(() => {
    let token = localStorage.getItem(`learnforcare_access`);
    return jwtDecode(token);
  });

  const handleStart = (id, from) => {
    let form = new FormData();
    form.append("from", from);
    form.append("course_id", id);

    makeRequest("POST", "/course/start-course", form)
      .then((res) => {
        location.href = `/learnCourse/coursepage/?courseId=${res.data.response.id}`;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setPending(true);
    const fetchDataAsync = async () => {
      try {
        let assignedRes = await makeRequest(
          "GET",
          "/info/get-assigned-course-for-manager"
        );
        let onGoingCourse = await makeRequest(
          "GET",
          "/on-going-course/get-all-on-going-courses"
        );

        let newRes = [
          ...assignedRes.data.response.filter(
            (item) => item.owner == user.id && item.count >= 1
            ),
            ...onGoingCourse.data.response,
          ];
          console.log(assignedRes.data.response, onGoingCourse.data.response);

        setRecords(newRes);
        setFilterRecords(newRes);
        setPending(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchDataAsync();
  }, []); // Run once when component mounts

  const columns = [
    {
      name: "Sl No.",
      selector: (row, idx) => ++idx,
      center: true,
      width: "80px",
      hide: "md",
    },
    {
      name: "Courses",
      selector: (row) => row?.Name || row?.name,
      sortable: true,
      center: true,
      width: "260px",
    },
    {
      name: "validity",
      selector: (row) => row?.validity,
      center: true,
      id:"val"
      // hide: "md",
    },
    {
      center: true,
      name: "Attempts",
      
      selector: (row) => (
        <a
          className="my-dashlink"
          href={`/learnCourse/examAttempts/?courseId=${row.id}&course_name=${
            row.name ? row.name : row.Name
          }`}
        >
          {row.attempts ? row.attempts + "/20" : "0/20"}
        </a>
      ),
      hide: 670,
    },
    {
      center: true,
      name: "Actions",
     
      cell: (row) => {
        let validity = row.validity.split("/").reverse();
        let flag = false;
        let title = "Start";

        if (!row.valid) {
          title = "Expired";
          flag = false;
        } else {
          title = "Completed";
          flag = true;
        }

        return (
          <>
            {flag ? (
              <>
                {row?.progress ? (
                  <>
                    {row.progress < 80 ? (
                      <Link
                        href={{
                          pathname: "/learnCourse/coursepage",
                          query: { courseId: row?.on_going_course_id },
                        }}
                      >
                        <a
                          style={{ width: "7rem" }}
                          className="btn btn-success"
                        >
                          Start
                        </a>
                      </Link>
                    ) : (
                      <Link
                        href={{
                          pathname: "/manager/certificates",
                        }}
                      >
                        <a
                          style={{ width: "7rem" }}
                          className="btn btn-success"
                        >
                          Completed
                        </a>
                      </Link>
                    )}
                  </>
                ) : (
                  // <>
                  //   <Link
                  //     href={{
                  //       pathname: "/learnCourse/coursepage",
                  //       query: { courseId: row?.on_going_course_id },
                  //     }}
                  //   >
                  //     <a style={{ width: "7rem" }} className="btn btn-success">
                  //       {row?.progress >= 80 ? "Completed" : "Start"}
                  //     </a>
                  //   </Link>
                  // </>
                  <button
                    onClick={() => {
                      if (row?.from_purchased) {
                        handleStart(row?.id, "purchased");
                      } else {
                        handleStart(row?.id, "manager");
                      }
                    }}
                    className="btn btn-success"
                    style={{ width: "7rem" }}
                  >
                    Start
                  </button>
                )}
              </>
            ) : (
              <>
                <a className="btn btn-danger">{title}</a>
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
          <Backbutton/>
          <h2
            style={{
              color: "#212450",
              display: "flex",
              justifyContent: "center",
              position: "absolute",
              fontSize: 34,
            }}
          >
            My Courses
          </h2>
          <div
            className="reacttable-hidden"
            style={{ padding: "", backgroundColor: "",zIndex:"99" }}
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
                      (item.Name || item.name)
                        .toLowerCase()
                        .startsWith(searchString.toLowerCase())
                    )
                  : records
              }
              customStyles={customStyles}
              pagination
              persistTableHead={true}
              defaultSortFieldId="val"
              defaultSortAsc= {false}
            />
          </div>

          {records.length <= 0 && !pending && (
            <h4
              className="no-record-hidden"
              style={{ textAlign: "center", marginTop: "4.5rem" }}
            >
              No records to display
            </h4>
          )}

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

          <div style={{ paddingTop: "1rem", marginTop: "3rem" }}>
            {searchString
              ? records
                  .filter((item) =>
                    (item.Name || item.name)
                      .toLowerCase()
                      .startsWith(searchString.toLowerCase())
                  )
                  .map((item) => {
                    let validity = item.validity.split("/").reverse();
                    let flag = false;
                    let title = "Start";

                    if (!item.valid || item?.attempts >= 20) {
                      title = "Expired";
                      flag = false;
                    } else {
                      title = "Completed";
                      flag = true;
                    }
                    return (
                      <div
                        style={{
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
                            <>
                              {flag ? (
                                <>
                                  {item?.progress ? (
                                    <>
                                      {item.progress < 80 ? (
                                        <Link
                                          href={{
                                            pathname: "/learnCourse/coursepage",
                                            query: {
                                              courseId:
                                                item?.on_going_course_id,
                                            },
                                          }}
                                        >
                                          <a
                                            style={{
                                              width: "7rem",
                                              height: "35px",
                                              marginTop: "1rem",
                                              marginRight: ".4rem",
                                            }}
                                            className="btn btn-success"
                                          >
                                            Start
                                          </a>
                                        </Link>
                                      ) : (
                                        <Link
                                          href={{
                                            pathname: "/manager/certificates",
                                          }}
                                        >
                                          <a
                                            style={{
                                              width: "7rem",
                                              height: "35px",
                                              marginTop: "1rem",
                                              marginRight: ".4rem",
                                            }}
                                            className="btn btn-success"
                                          >
                                            Completed
                                          </a>
                                        </Link>
                                      )}
                                    </>
                                  ) : (
                                    // <>
                                    //   <Link
                                    //     href={{
                                    //       pathname: "/learnCourse/coursepage",
                                    //       query: {
                                    //         courseId: item?.on_going_course_id,
                                    //       },
                                    //     }}
                                    //   >
                                    //     <a
                                    //       style={{
                                    //         width: "7rem",
                                    //         height: "35px",
                                    //         marginTop: "1rem",
                                    //         marginRight: ".4rem",
                                    //       }}
                                    //       className="btn btn-success"
                                    //     >
                                    //       {item?.progress >= 80
                                    //         ? "Completed"
                                    //         : "Start"}
                                    //     </a>
                                    //   </Link>
                                    // </>
                                    <button
                                      onClick={() => {
                                        if (item?.from_purchased) {
                                          handleStart(item?.id, "purchased");
                                        } else {
                                          handleStart(item?.id, "manager");
                                        }
                                      }}
                                      className="btn btn-success"
                                      style={{
                                        width: "7rem",
                                        height: "35px",
                                        marginTop: "1rem",
                                        marginRight: ".4rem",
                                      }}
                                    >
                                      Start
                                    </button>
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
                                    {title}
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
                  console.log(item);
                  let validity = item.validity.split("/").reverse();
                  let flag = false;
                  let title = "Start";

                  if (!item.valid || item?.attempts >= 20) {
                    title = "Expired";
                    flag = false;
                  } else {
                    title = "Completed";
                    flag = true;
                  }
                  return (
                    <div
                      style={{
                        padding: ".5rem",
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
                              marginRight: ".42rem",
                            }}
                          >
                            {item.Name || item.name}
                          </p>
                          <>
                            {flag ? (
                              <>
                                {item?.progress ? (
                                  <>
                                    {item.progress < 80 ? (
                                      <Link
                                        href={{
                                          pathname: "/learnCourse/coursepage",
                                          query: {
                                            courseId: item?.on_going_course_id,
                                          },
                                        }}
                                      >
                                        <a
                                          style={{
                                            width: "7rem",
                                            height: "35px",
                                            marginTop: "1rem",
                                            marginRight: ".4rem",
                                          }}
                                          className="btn btn-success"
                                        >
                                          Start
                                        </a>
                                      </Link>
                                    ) : (
                                      <Link
                                        href={{
                                          pathname: "/manager/certificates",
                                        }}
                                      >
                                        <a
                                          style={{
                                            width: "6rem !important",
                                            height: "35px",
                                            marginTop: "1rem",
                                            marginRight: ".4rem",
                                          }}
                                          className="btn btn-success"
                                        >
                                          Completed
                                        </a>
                                      </Link>
                                    )}
                                  </>
                                ) : (
                                  // <>
                                  //   <Link
                                  //     href={{
                                  //       pathname: "/learnCourse/coursepage",
                                  //       query: {
                                  //         courseId: item?.on_going_course_id,
                                  //       },
                                  //     }}
                                  //   >
                                  //     <a
                                  //       style={{
                                  //         width: "7rem",
                                  //         height: "35px",
                                  //         marginTop: "1rem",
                                  //         marginRight: ".4rem",
                                  //       }}
                                  //       className="btn btn-success"
                                  //     >
                                  //       {item?.progress >= 80
                                  //         ? "Completed"
                                  //         : "Start"}
                                  //     </a>
                                  //   </Link>
                                  // </>
                                  <button
                                    onClick={() => {
                                      if (item?.from_purchased) {
                                        handleStart(item?.id, "purchased");
                                      } else {
                                        handleStart(item?.id, "manager");
                                      }
                                    }}
                                    className="btn btn-success"
                                    style={{
                                      width: "6rem !important",
                                      height: "35px",
                                      marginTop: "1rem",
                                      marginRight: ".4rem",
                                    }}
                                  >
                                    Start
                                  </button>
                                )}
                              </>
                            ) : (
                              <>
                                <a
                                  style={{
                                    height: "35px",
                                    marginTop: "1rem",
                                    marginRight: ".4rem",
                                    width: "6rem !important",
                                  }}
                                  className="btn btn-danger"
                                >
                                  {title}
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
                              color: "#0d6efd",
                              marginLeft: ".5rem",
                              fontWeight: "500",
                            }}
                          >
                            Validity: {item?.validity}
                          </p>
                          <p
                            style={{
                              color: "#0d6efd",
                              marginRight: ".5rem",
                              fontWeight: "500",
                            }}
                          >
                            Attempts:{" "}
                            <a
                              href={`/learnCourse/examAttempts/?courseId=${item?.id}`}
                              className="my-dashlink"
                            >
                              {item?.attempts || 0}
                            </a>
                            {"/20"}
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

export default ManageMyCourse;
