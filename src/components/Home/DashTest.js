import React, { Component } from "react";
import Link from "next/link";
import DashboardBar from "../Sidebar/DashboardBar";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import fetchData from "../../axios";
import DataTable from "react-data-table-component";
import { BsSearch } from "react-icons/bs";
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
      makeRequest("GET", "/course/get-bought-course")
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
        sortable: true,
      },
      {
        name: "Name",
        selector: (row) => row.Name,
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
        cell: () => (
          <a href={"#"} className="btn btn-success">
            Start
          </a>
        ),
      },
    ];

    return (
      <div className="container" style={{ padding: "10px" }}>
        {/* <div>  
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
    </div>    */}
       <h3 style={{color:'#212450'}}>Hello 'Name'</h3>
        <div className="ag-format-container">
          <h2
            style={{
              padding: "1.5rem",
              color: "#212450",
              display: "flex",
              justifyContent: "flex-start",
              justifyContent: "center",
              marginTop: ".5rem",
              fontSize: 46,
            }}
          >
            Dashboard
          </h2>
          <div className="ag-courses_box dash-shadow">
            <div className="ag-courses_item">
              <a href="/company/myprofile" className="ag-courses-item_link">
                <div className="ag-courses-item_bg"></div>

                <div className="ag-courses-item_title">My Profile</div>

                <div className="bi bi-person-circle ag-courses-item_date-box">
                  {/* Start:
          <span className="ag-courses-item_date">
            04.11.2022
          </span> */}
                </div>
              </a>
            </div>

            <div className="ag-courses_item">
              <a href="/company/mycourses" className="ag-courses-item_link">
                <div className="ag-courses-item_bg"></div>

                <div className="ag-courses-item_title">My Course</div>

                <div className="bi bi-archive ag-courses-item_date-box">
                  {/* Start:
          <span className="ag-courses-item_date">
            04.11.2022
          </span> */}
                </div>
              </a>
            </div>

            <div className="ag-courses_item">
              <a href="#" className="ag-courses-item_link">
                <div className="ag-courses-item_bg"></div>

                <div className="ag-courses-item_title">Training Matrix</div>

                <div className="bi bi-file-earmark-spreadsheet ag-courses-item_date-box">
                  {/* Start:
          <span className="ag-courses-item_date">
            04.11.202
          </span> */}
                </div>
              </a>
            </div>
          </div>
          <div className="dash-shadow">
            <div style={{ display: "flex", marginTop: "2.5rem", justifyContent: 'space-between', alignItems: 'center' }}>
              <h4
                style={{
                  padding: "1rem",
                  color: "#212450",
                  display: "flex",
                  justifyContent: "flex-start",

                  fontSize: 35,
                }}
              >
                Courses to do
              </h4>
              <div className="p-relative d-inline header__search">
                <form action="">
                  <input
                    className="d-block mr-30"
                    type="text"
                    placeholder="Search..."
                    // value={searchString}
                    // onChange={handleSearch}
                  />
                  <button type="submit">
                    <i className="fas fa-search"></i>
                  </button>
                </form>
              </div>
            </div>
            <div className=" row g-3  min-vh-100  d-flex justify-content-center ">
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
                <div style={{ padding: ".2rem" }}>
                  <DataTable
                    columns={columns}
                    data={this.state.records}
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
}
export default DashTest;
