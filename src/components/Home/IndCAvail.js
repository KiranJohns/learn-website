import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import BasicExample from "../About/button1";
import fetchData, { getUserType } from "../../axios";
import Button from 'react-bootstrap/Button';
import { FaEye } from "react-icons/fa";
import Spinner from "react-bootstrap/Spinner";

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
  const [filterRecords, setFilterRecords] = useState([]);

  const [pending, setPending] = React.useState(true);


  const makeRequest = fetchData();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    let url1 = "/course/get-all-bought-course";
    Promise.all([
      makeRequest("GET", url1),
    ]).then((res) => {
      let arr = [
        ...res[0].data.response,
      ];
      console.log(res);
      setRecords(() => {
        return arr.reverse()  
      });
      setPending(false)
    });
  };
  
  
  const columns = [
    {
      name: "ID",
      selector: (row, idx) => ++idx,
      sortable: true,
      width:"90px",
      center:true,
    },
    {
      name: "Courses",
      selector: (row) => row.Name,
      sortable: true,
      width:"420px",
      center:true,
    },
    {
      name: "validity",
      center:true,
      selector: (row) => {
        let date = row.validity.split("/")
        return `${date[1]}/${date[0]}/${date[2]}`
      },
    },
    {
      name: "catagory",
      selector: (row) => row.category,
      width:"350px",
      center:true,
    },
    {
      name: "Actions",
      center:true,
      cell: (id) => <a href="https://test.learnforcare.co.uk/course-all"><Button style={{background:"#212a50", color:'#fff'}} variant=""><FaEye /></Button></a> ,
    },
  ];

  return (
    <div className="">
      <div className="dash-shadow">
        <div style={{position:'relative'}} className=" row g-3  min-vh-100  d-flex justify-content-center mt-20">
          <h2
            style={{
              color: "#212450",
              display: "flex",
              justifyContent: "center",
              position: "absolute",
              fontSize: 36,
            }}
          >
           Purchased Courses
          </h2>
          <div style={{ padding: "", backgroundColor: "" }}>
            <div
              style={{ float: "right", marginBottom: "1.4rem" }}
              className="p-relative d-inline header__search"
            >
              <form action="">
                <input
                  style={{ background: "#edeef3" }}
                  className="d-block mr-10"
                  type="text"
                  placeholder="Search..."
                />
                <button type="submit">
                  <i className="fas fa-search"></i>
                </button>
              </form>
            </div>
            <DataTable
               progressPending={pending}
               progressComponent={
                 pending ? 
                 (<div style={{ padding: "1rem" }}>
                   <Spinner animation="border" variant="primary" />
                 </div>) : (null)
               }   
              noDataComponent={" "}
            persistTableHead={true}
              columns={columns}
              data={records}
              customStyles={customStyles}
              pagination
              
            />
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default IndCAvail;
