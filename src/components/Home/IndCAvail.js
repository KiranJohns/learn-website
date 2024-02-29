import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import BasicExample from "../About/button1";
import fetchData, { getUserType } from "../../axios";
import Button from "react-bootstrap/Button";
import { FaEye } from "react-icons/fa";
import Spinner from "react-bootstrap/Spinner";
import Backbutton from "./Backbutton";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const customStyles = {
  headRow: {
    style: {
      backgroundColor: "#212450",
      color: "white",
      display: "flex",
      justifyContent: "center",
    },
  },
  headCells: {
    style: {
      fontSize: "16px",
      fontWeight: "600",
      textTransform: "uppercase",
      display: "flex",
      justifyContent: "center",
    },
  },
  cells: {
    style: {
      fontSize: "15px",
      display: "flex",
      justifyContent: "center",
    },
  },
};

const IndCAvail = () => {
  const [records, setRecords] = useState([]);
  const [searchData,setSearchData] = useState("");

  const [pending, setPending] = React.useState(true);

  const makeRequest = fetchData();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setPending(true)
    let url1 = "/course/get-all-bought-course";
    // let url2 = "/course/get-all-assigned-course";
    Promise.all([makeRequest("GET", url1)]).then((res) => {
      let arr = [...res[0].data.response];
      setRecords(() => {
        return arr.reverse();
      });
      setPending(false);
    });
  };

  const columns = [
    {
      name: "ID",
      selector: (row, idx) => ++idx,
      width: "70px",
      center: true,
      hide:'lg'
    },
    {
      name: "Courses",
      selector: (row) => row.Name,
      sortable: true,
      width: "340px",
      center: true,
    },
    {
      name: "validity",
      center: true,
      selector: (row) => row.validity,
    },
    {
      name: "catagory",
      selector: (row) => row.category,
      center: true,
      hide:'md'
    },
    {
      name: "Actions",
      center: true,
      cell: (row) => (
        <a title="Vew" href={`https://learnforcare.co.uk/course/${row.course_id}`}>
          <Button style={{ background: "#212a50", color: "#fff" }} variant="">
            <FaEye />
          </Button>
        </a>
      ),
    },
  ];

  return (
    <div className="">
      <div className="dash-shadow">
        <div
          style={{ position: "relative" }}
          className=" row g-3  min-vh-100  d-flex justify-content-center mt-20"
        >
          <span style={{position:'absolute', marginLeft:"1.25rem", marginTop:"1.2rem", zIndex:"99"}} className=""><button style={{background:"white"}} onClick={() => history.back()}> <FaArrowAltCircleLeft className="back-fontsize"  style={{color:"#212a50", }}/></button></span >
          <h2 className="purchased-font"
            style={{
              color: "#212450",
              display: "flex",
              justifyContent: "center",
              position: "absolute",
            }}
          >
            Purchased Courses
          </h2>
          <div className="reacttable-hidden" style={{ padding: "", backgroundColor: "" }}>
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
                  value={searchData}
                  onChange={(e) => setSearchData(e.target.value)}
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
              persistTableHead={true}
              columns={columns}
              data={
                searchData
                  ? records.filter((item) =>
                      (item?.Name)
                        .toLowerCase()
                        .startsWith(searchData.toLowerCase())
                    )
                  : records
              }
              customStyles={customStyles}
              pagination
            />
          </div>
          <div style={{paddingTop:'1rem',marginTop:"3rem",}}>
          {records.length <= 0 && !pending && (
              <h4
                className="no-record-hidden"
                style={{ textAlign: "center", marginTop: "2rem" }}
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
          {searchData
              ? records.filter((item) =>
                  (item?.Name)
                    .toLowerCase()
                    .startsWith(searchData.toLowerCase())
                ).map(item => {
                  return (
                    <div style={{marginTop:".8rem", display:'flex', flexDirection:'column'}}>
                      <div className="new-table-shadow new-table-res new-table-hidden">
                        <div style={{display:'flex',justifyContent:'space-between'}}>
                          <p style={{paddingTop:"1.5rem",paddingLeft:".4rem", color:'#212a50', fontWeight:'bold',}}>{item?.Name}</p>
                          <a style={{height:'35px',marginTop:"1rem", marginRight:'.4rem'}} href="https://test.learnforcare.co.uk/course-all">
                            <Button style={{ background: "#212a50", color: "#fff" }} variant="">
                              <FaEye />
                            </Button>
                          </a>
                          {/* <button className="btn btn-success" style={{height:'35px',marginTop:"1rem", marginRight:'.4rem'}}>View</button> */}
                        </div>
                      </div>
                    </div>
                  )
                })
              : records.map(item => {
                return (
                  <div style={{padding:".45rem",display:'flex', flexDirection:'column'}}>
                    <div className="new-table-shadow  new-table-hidden">
                      <div style={{display:'flex',justifyContent:'space-between'}}>
                        <p style={{paddingTop:"1.5rem",paddingLeft:".4rem", color:'#212a50', fontWeight:'bold',}}>{item?.Name}</p>
                        <a style={{height:'35px',marginTop:"1rem", marginRight:'.4rem'}} href="https://test.learnforcare.co.uk/course-all">
                          <Button style={{ background: "#212a50", color: "#fff" }} variant="">
                            <FaEye />
                          </Button>
                        </a>
                        {/* <button className="btn btn-success" style={{height:'35px',marginTop:"1rem", marginRight:'.4rem'}}>View</button> */}
                      </div>
  
                      <div
                      style={{
                        display: "flex",
                        justifyContent: "start",
                      }}
                    >
                     
                     <p
                        style={{
                          color: "green",
                          marginLeft: ".5rem",
                          fontWeight: "500",
                        }} 
                      >
                        Validity: {item.validity}
                      </p>
                      {/* <p
                        style={{
                          color: "green",
                          marginRight: ".5rem",
                          fontWeight: "500",
                        }}
                      >
                        Category: {item.category}
                      </p> */}
                    </div>

                    </div>
                  </div>
                )
              })
          }
         </div>
         
        </div>{" "}
      </div>
    </div>
  );
};

export default IndCAvail;
