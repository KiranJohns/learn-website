import React, { Component } from "react";
import Link from "next/link";
import DashboardBar from "../Sidebar/DashboardBar";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import fetchData from "../../axios";
import DataTable from "react-data-table-component";
import { BsSearch } from "react-icons/bs";
import { IoHandLeft } from "react-icons/io5";
import Button from "react-bootstrap/Button";
import { FaEye } from "react-icons/fa";

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

class DashTest extends Component {
  constructor() {
    super();
    this.state = {
      records: [],
      filterRecords: [],
      user: {},
      searchString: "",
    };
  }

  handleFilter = (event) => {
    const newData = this.state.filterRecords.filter((row) =>
      row.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    this.setState({ records: newData });
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    try {
      const makeRequest = fetchData();
      makeRequest("GET", "/info/data")
        .then((res) => {
          console.log(res.data.response[0]);
          this.setState({ ...this.state, user: res.data.response[0] });
        })
        .catch((err) => {
          console.log(err);
        });
      makeRequest("GET", "/on-going-course/get-all-on-going-courses")
        .then((res) => {
          console.log(res);
          this.setState({
            records: res.data.response,
            filterRecords: res.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const columns = [
      {
        name: "No",
        selector: (row, idx) => idx + 1,
        center: true,
        width: "90px",
      },
      {
        name: "Name",
        selector: (row) => (row.name ? row.name : row.Name),
        center: true,
      },
      {
        name: "Attempts",
        selector: (row) => (
          <a href="/learnCourse/examAttempts">{row.attempts || 0 + "/20"}</a>
        ),
        center: true,
      },
      {
        name: "validity",
        selector: (row) => {
          let date = new Date(row.validity)
            .toLocaleDateString()
            .split("/")
            .map((d) => (d.length <= 1 ? "0" + d : d));
          let newDate = `${date[1]}/${date[0]}/${date[2]}`;
          return newDate;
        },
      },
      {
        name: "Action",
        cell: (row) => (
          <a
            onClick={() => {
              location.href = `/learnCourse/coursepage/?courseId=${row.id}`;
            }}
            className="btn btn-success"
          >
            continue
          </a>
        ),
      },
    ];

    return (
      <div className="container " style={{ padding: "10px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h3
            style={{ color: "#212450", marginTop: ".3rem", display: "inline" }}
          >
            Hello{" "}
            {this.state.user.first_name && this.state.user.last_name
              ? this.state.user.first_name + " " + this.state.user.last_name
              : " "}{" "}
            <IoHandLeft style={{ color: "#f1c27d", marginBottom: ".5rem" }} />
          </h3>
          <div className="headd-element" style={{}}>
            <h2
              style={{
                padding: "0",
                color: "#212a50",
                display: "flex",
                justifyContent: "center",
                margin: ".3rem",
              }}
            >
              Dashboard
            </h2>
          </div>
        </div>

        <div className="team-shadow ">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h3 style={{ marginTop: ".6rem", color: "#212a50" }}>My Team</h3>
          </div>
          <div
            className=""
            style={{
              padding: ".7rem",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <div className="ag-courses_item-new" style={{ marginLeft: "" }}>
              <a className="ag-courses-item_link-new">
                <div className="ag-courses-item_bg-new"></div>
                {/* <div
                  className="bi bi-person-circle ag-courses-item_date-box-new"
                  style={{ fontSize: "2rem" }}
                ></div> */}
                <div
                  className="ag-courses-item_title-new dash-box-h"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Managers
                  <span
                    style={{
                      background: "",
                      marginLeft: "1rem",
                      padding: "5px 2.5px 1px 2.5px",
                      color: "#fff",
                      borderRadius: ".5rem",
                    }}
                  >
                    {this.state.user.managers_count}
                  </span>
                </div>
              </a>
            </div>

            <div
              className="ag-courses_item-new"
              style={{ marginLeft: ".5rem" }}
            >
              <a className="ag-courses-item_link-new">
                <div className="ag-courses-item_bg-new"></div>
                {/* <div
                  className="bi bi-person-circle ag-courses-item_date-box-new"
                  style={{ fontSize: "2rem" }}
                ></div> */}
                <div
                  className="ag-courses-item_title-new dash-box-h"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Individuals
                  <span
                    style={{
                      background: "",
                      marginLeft: "1rem",
                      padding: "5px 2.5px 1px 2.5px",
                      color: "#fff",
                      borderRadius: ".5rem",
                    }}
                  >
                    {this.state.user.individuals_count}
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "2.5rem" }} className="team-shadow ">
          <div
            className=""
            style={{
              padding: ".7rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div className="ag-courses_item-comp " style={{ marginLeft: "" }}>
              <a
                href="/bundle/bundle-all"
                className="ag-courses-item_link-comp"
              >
                <div className="ag-courses-item_bg-comp"></div>
                <div
                  className="bi bi-stack ag-courses-item_date-box-new"
                  style={{ fontSize: "2rem" }}
                ></div>
                <div
                  className="ag-courses-item_title-comp dash-box-h"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "",
                    marginTop: "1rem",
                  }}
                >
                  Buy Bundles
                </div>
              </a>
            </div>

            <div
              className="ag-courses_item-comp"
              style={{ marginLeft: ".5rem" }}
            >
              <a href="/course-all" className="ag-courses-item_link-comp">
                <div className="ag-courses-item_bg-comp"></div>
                <div
                  className="bi bi-book ag-courses-item_date-box-new"
                  style={{ fontSize: "2rem" }}
                ></div>
                <div
                  className="ag-courses-item_title-comp dash-box-h"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "",
                    marginTop: "1rem",
                  }}
                >
                  Buy Courses
                </div>
              </a>
            </div>

            <div
              className="ag-courses_item-comp"
              style={{ marginLeft: ".5rem" }}
            >
              <a
                href="/company/certificates"
                className="ag-courses-item_link-comp"
              >
                <div className="ag-courses-item_bg-comp"></div>
                <div
                  className="bi bi-patch-check-fill ag-courses-item_date-box-new"
                  style={{ fontSize: "2rem" }}
                ></div>
                <div
                  className="ag-courses-item_title-comp dash-box-h"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "",
                    marginTop: "1rem",
                  }}
                >
                  Certificates
                </div>
              </a>
            </div>
          </div>
          <div
            className=""
            style={{
              padding: ".7rem",
              display: "flex",
              justifyContent: "center",
              flexWrap: "nowrap",
            }}
          >
            <div className="ag-courses_item-sec " style={{ marginLeft: "" }}>
              <a href="/company/mycourses" className="ag-courses-item_link-sec">
                <div className="ag-courses-item_bg-sec"></div>
                <div
                  className="bi bi-book ag-courses-item_date-box-new"
                  style={{ fontSize: "2rem" }}
                ></div>
                <div
                  className="ag-courses-item_title-sec dash-box-h"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "",
                    marginTop: "1rem",
                  }}
                >
                  My Courses
                </div>
              </a>
            </div>

            <div
              className="ag-courses_item-sec "
              style={{ marginLeft: "3.5rem" }}
            >
              <a href="/company/mybundle" className="ag-courses-item_link-sec">
                <div className="ag-courses-item_bg-sec"></div>
                <div
                  className="bi bi-stack ag-courses-item_date-box-new"
                  style={{ fontSize: "2rem" }}
                ></div>
                <div
                  className="ag-courses-item_title-sec dash-box-h"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "",
                    marginTop: "1rem",
                  }}
                >
                  My Bundles
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="ag-format-container" style={{ marginTop: "1rem" }}>
          <div className="dash-shadow">
            <div
              style={{
                display: "flex",
                marginTop: "2.5rem",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "nowrap",
              }}
            >
              <h4
                style={{
                  padding: "1.5rem",
                  marginTop: ".7rem",
                  color: "#212450",
                  display: "flex",
                  justifyContent: "flex-start",

                  fontSize: 35,
                }}
              >
                My Courses
              </h4>
              <div className="p-relative d-inline header__search">
                <form className="your-element" action="">
                  <input
                    className="d-block mr-25"
                    type="text"
                    placeholder="Search..."
                    value={this.state.searchString}
                    onChange={(e) =>
                      this.setState({
                        ...this.state,
                        searchString: e.target.value,
                      })
                    }
                    style={{ background: "#edeef3" }}
                  />
                  <button type="submit">
                    <i className="fas fa-search"></i>
                  </button>
                </form>
              </div>
            </div>

            <div className=" row g-3  min-vh-100   ag-format-container">
              <div style={{}}>
                <div
                  className="pb-2"
                  style={{ display: "flex", justifyContent: "right" }}
                >
                  {/* <input
                    type="text"
                    className=""
                    placeholder="Search course"
                    onChange={this.handleFilter}
                    style={{
                      padding: "6px 10px",
                      border: "blue",
                      borderRadius: ".15rem",
                      overflow: "hidden",
                      marginRight: ".4rem",
                      background: "#EDEEF3",
                    }}
                  /> */}
                </div>
                <div>
                  <DataTable
                    persistTableHead={true}
                    columns={columns}
                    data={
                      this.state.searchString
                        ? this.state.records.filter((item) =>
                            item.Name.toLowerCase().includes(
                              this.state.searchString.toLowerCase()
                            )
                          )
                        : this.state.records
                    }
                    customStyles={customStyles}
                    pagination
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default DashTest;

{
  /* <div>  
                <Card style={{ width: '18rem', marginTop:'50px'}}>
      <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card>
    </div>    
  
  
      <div style={{padding:'.8rem'}}  className=" mt-4 row "  >
          <div className="dash-neww">
          <div className="col p-2 m-2"> 
             <div className="data-box" style={{padding:'3.4rem', borderRadius:'.6rem',cursor:'none', }}>
               <div style={{display:"flex", justifyContent:"center"}}>
                <h2 style={{color:'#fff',cursor:'none'}}>Managers : 0</h2>
               </div>
             </div>
          </div>

          <div className="col p-2 m-2"> 
             <div  className="data-box" style={{padding:'3.4rem', borderRadius:'.6rem',cursor:'none',}}>
               <div style={{display:"flex", justifyContent:"center"}}>
                <h2 style={{color:'#fff', cursor:'none',  }}>Individuals : 0</h2>
               </div>
             </div>
          </div>
          
          </div>
            </div>
  
  
  */
}

//   <div  className="ag-courses_box dash-neww">
//   <div className="ag-courses_item" style={{ marginLeft: ".5rem" }}>
//     <a href="/company/myprofile" className="ag-courses-item_link">
//       <div className="ag-courses-item_bg"></div>
//       <div
//         className="bi bi-person-circle ag-courses-item_date-box"
//         style={{ fontSize: "2rem" }}
//       ></div>
//       <div
//         className="ag-courses-item_title"
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         Buy Bundles
//       </div>
//     </a>
//   </div>

//   <div className="ag-courses_item">
//     <a href="/company/mycourses" className="ag-courses-item_link">
//       <div className="ag-courses-item_bg"></div>
//       <div
//         className="bi bi-book ag-courses-item_date-box"
//         style={{ fontSize: "2rem" }}
//       ></div>
//       <div
//         className="ag-courses-item_title"
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         Buy Course
//       </div>
//     </a>
//   </div>

//   <div className="ag-courses_item">
//     <a href="/company/certificates" className="ag-courses-item_link">
//       <div className="ag-courses-item_bg"></div>
//       <div
//         className="bi bi-patch-check-fill ag-courses-item_date-box"
//         style={{ fontSize: "2rem" }}
//       >
//         <div
//           className="ag-courses-item_title"
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           Managers
//         </div>

//       </div>
//     </a>
//   </div>

//   <div className="ag-courses_item">
//     <a href="/company/mycourses" className="ag-courses-item_link">
//       <div className="ag-courses-item_bg"></div>
//       <div
//         className="bi bi-book ag-courses-item_date-box"
//         style={{ fontSize: "2rem" }}
//       ></div>
//       <div
//         className="ag-courses-item_title"
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         Buy Course
//       </div>
//     </a>
//   </div>
// </div>
