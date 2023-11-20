import React, { useEffect, useState } from "react";
import Link from "next/link";
import DashboardBar from "../Sidebar/DashboardBar";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import fetchData, { getUserType } from "../../axios";
import DataTable from "react-data-table-component";
import { useRouter } from "next/router";
import { decryptData} from "../../utils/crtyper";

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

function DashIndividual() {
  const [records, setRecords] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [filterRecords, setFilterRecords] = useState([]);
  const route = useRouter();

  const handleFilter = (event) => {
    const newData = filterRecords.filter((row) =>
      row.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setRecords(newData);
  };

  function handleSearch() {}

  const makeRequest = fetchData();

  const getData = () => {
    try {
      let url = "";
      if (getUserType() === "individual") {
        url = "/course/get-bought-course";
      } else {
        url = "/sub-user/course/get-assigned-course";
      }
      makeRequest("GET", url)
        .then((res) => {
          setRecords(
            res.data.response.filter((course) => {
              if (course?.course_count > 0) {
                console.log(course);
                return course;
              }
            })
          );
          setFilterRecords(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  function startCourse(id) {
    console.log(id);
    // makeRequest("GET", `/course/start-course/${id}`)
    //   .then((res) => {
    //     route.push(`/company/course-learn/${res.data.response.id}`);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  useEffect(() => {
    getData();
  }, []);

  // useEffect(() => {
  //   if(searchString) {
  //     setRecords((prev) => {
  //       return
  //     })
  //   }
  // }, [searchString]);

  const columns = [
    {
      name: "No",
      selector: (row, idx) => idx + 1,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name ? row.name : row.Name,
      sortable: true,
    },
    {
      name: "description",
      selector: (row) => row.description.slice(0, 25),
    },
    {
      name: "category",
      selector: (row) => row.category,
    },
    {
      name: "validity",
      selector: (row) => {
        let date = row.validity
          .split("/")
          .map((d) => (d.length <= 1 ? "0" + d : d));
        let newDate = `${date[1]}/${date[0]}/${date[2]}`;
        return newDate;
      },
    },
    {
      name: "",
      cell: (row) => {
        if (getUserType() === "individual") {
          return (
            <a
              onClick={() => startCourse(row.purchased_course_id)}
              className="btn btn-success"
            >
              start
            </a>
          );
        } else {
          return <a
            onClick={() => startCourse(row.assigned_course_id)}
            className="btn btn-success"
          >
            start
          </a>;
        }
      },
    },
  ];

  return (
    <div className="container" style={{ padding: "10px" }}>
      {/* Your JSX content here */}
      <div className="ag-format-container">
        <h2
          style={{
            padding: "1.5rem",
            color: "#212450",
            display: "flex",
            justifyContent: "flex-start",
            justifyContent: "center",
            marginTop: "20px",
            fontSize: 38,
          }}
        >
          Dashboard
        </h2>
        <div className="team-shadow">

          <div className="" style={{padding:'.7rem', display:"flex", justifyContent:"space-between"}}>
           
         <div className="ag-courses_item-comp " style={{ marginLeft: "" }}>
              <a href="/bundle/bundle-all" className="ag-courses-item_link-comp">
                <div className="ag-courses-item_bg-comp"></div>
                <div
                  className="bi bi-person-circle ag-courses-item_date-box-new"
                  style={{ fontSize: "2rem" }}
                ></div>
                <div
                  className="ag-courses-item_title-comp"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                 Buy Bundles
                
                </div>
              </a>
            </div>

            <div className="ag-courses_item-comp" style={{ marginLeft: ".5rem" }}>
              <a href="/course-all" className="ag-courses-item_link-comp">
                <div className="ag-courses-item_bg-comp"></div>
                <div
                  className="bi bi-person-circle ag-courses-item_date-box-new"
                  style={{ fontSize: "2rem" }}
                ></div>
                <div
                  className="ag-courses-item_title-comp"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Buy Courses
                
                </div>
              </a>
            </div>

            <div className="ag-courses_item-comp" style={{ marginLeft: ".5rem" }}>
              <a href="/individual/certificates" className="ag-courses-item_link-comp">
                <div className="ag-courses-item_bg-comp"></div>
                <div
                  className="bi bi-person-circle ag-courses-item_date-box-new"
                  style={{ fontSize: "2rem" }}
                ></div>
                <div
                  className="ag-courses-item_title-comp"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                 My Certificates
                
                </div>
              </a>
            </div>

            </div>
            <div className="" style={{padding:'.7rem', display:"flex", justifyContent:"space-around" , flexWrap:'nowrap'}}>
           
           <div className="ag-courses_item-comp " style={{ marginLeft: "" }}>
                <a href="" className="ag-courses-item_link-comp">
                  <div className="ag-courses-item_bg-comp"></div>
                  <div
                    className="bi bi-person-circle ag-courses-item_date-box-new"
                    style={{ fontSize: "2rem" }}
                  ></div>
                  <div
                    className="ag-courses-item_title-comp"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    My Courses
                  
                  </div>
                </a>
              </div>

              <div className="ag-courses_item-comp " style={{ marginLeft: "" }}>
                <a href="" className="ag-courses-item_link-comp">
                  <div className="ag-courses-item_bg-comp"></div>
                  <div
                    className="bi bi-person-circle ag-courses-item_date-box-new"
                    style={{ fontSize: "2rem" }}
                  ></div>
                  <div
                    className="ag-courses-item_title-comp"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    My Bundles
                  
                  </div>
                </a>
              </div>

              </div>
         </div>
         
        {/* <div className="ag-courses_box dash-shadow">
          <div className="ag-courses_item">
            <a href="/individual/myprofile" className="ag-courses-item_link">
              <div className="ag-courses-item_bg"></div>

              <div className="ag-courses-item_title">My Profile</div>

              <div className="bi bi-person-circle ag-courses-item_date-box">
               
              </div>
            </a>
          </div>

          <div className="ag-courses_item">
            <a href="/individual/mycourses" className="ag-courses-item_link">
              <div className="ag-courses-item_bg"></div>

              <div className="ag-courses-item_title">My Course</div>

              <div className="bi bi-archive ag-courses-item_date-box">
              
              </div>
            </a>
          </div>

          <div className="ag-courses_item">
            <a href="/individual/certificates" className="ag-courses-item_link">
              <div className="ag-courses-item_bg"></div>
              <div className="ag-courses-item_title">
                My Certificate
              </div>
              <div className="bi bi-patch-check-fill ag-courses-item_date-box">
              
              </div>
            </a>
          </div>
          
        </div> */}
        <div className="dash-shadow">
          <div className=" row g-3  min-vh-100  d-flex justify-content-center mt-30">
            <div style={{}}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  margin: "1rem 2rem",
                }}
              >
                <h4
                  style={{
                    margin: 0,
                    color: "#212450",
                    fontSize: 35,
                  }}
                >
                  Courses to do
                </h4>
                <div style={{}} className="p-relative d-inline header__search">
                  <form action="">
                    <input
                      style={{ background: "#edeef3" }}
                      className="d-block  "
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
              </div>
              <div style={{ padding: ".2rem" }}>
                <DataTable
                  columns={columns}
                  data={
                    searchString
                      ? records.filter((item) =>
                          item.Name.toLowerCase().includes(
                            searchString.toLowerCase()
                          )
                        )
                      : records
                  }
                  customStyles={customStyles}
                  pagination
                  selectableRows
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashIndividual;


