import React, { Component } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Link from "next/link";
import BasicExample from "../About/button1";
import fetchData from "../../axios";

const customStyles = {
  headRow: {
    style: {
      backgroundColor: "#004b55",
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

class DashCourse extends Component {
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
      makeRequest("GET","/course/get-bought-course")
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
        selector: (row,idx) => idx+1,
        sortable: true,
      },
      {
        name: "Name",
        selector: (row) => row.Name,
        sortable: true,
      },
      {
        name: "description",
        selector: (row) => row.description.slice(0,25),
      },
      {
        name: "category",
        selector: (row) => row.category,
      },
      {
        name: "validity",
        selector: (row) => {
          let date = row.validity.split("/")
          let newDate = `${date[1]}/${date[0]}/${date[2]}`
          return newDate
        },
      },
      {
        name: "",
        cell: () => (
          <a href={"#"} className="btn btn-primary">
            Start
          </a>
        ),
      },
    ];

    return (
      <div className="">
        <h2
          style={{
            padding: "1.5rem",
            color: "#004b55",
            display: "flex",
            justifyContent: "flex-start",
            justifyContent: "center",
            marginTop: "20px",
            fontSize: 46,
          }}
        >
          My Courses
        </h2>
        <div className=" row g-3  min-vh-100  d-flex justify-content-center ">
          <div style={{ padding: "", backgroundColor: "" }}>
            <div
              className="pb-2 smth"
              style={{ display: "flex", justifyContent: "left" }}
            >
              <input
                type="text"
                className=""
                placeholder="Search course..."
                onChange={this.handleFilter}
                style={{
                  padding: "6px 10px",
                  borderColor: "transparent",
                  overflow: "hidden",
                }}
              />
            </div>
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
    );
  }
}

export default DashCourse;

// import React from 'react'
// import axios from 'axios'
// import { useEffect } from 'react'
// import { useState } from 'react'
// import DataTable from 'react-data-table-component'

// const DashCourse = () => {
//   const column=[
//     {
//       name:"ID",
//       selector: row => row.id
//     },{
//       name:"Name",
//       selector: row => row.name
//     },{
//       name:'Email',
//     },{
//       name:"City"
//     }
// ]

//    useEffect(()=>{
//     const fetData =async ()=>{
//       axios.get('https://jsonplaceholder.typicode.com/users')
//       .then(res=>setRecords(res.data)
// setFilterRecords(res.data))
//       .catch(err=>console.log(err));
//     }
//     fetData();
//    })
//     const[records, setRecords]=useState([])
//     const [filterRecords, setRecords] = useState([])
//  const handleFilter = (event) => {
//   const newData = filterRecords.filter(
//     (row) => row.name.toLowerCase().includes(event.target.value.toLowerCase())
//   );
//   setRecords(newData);
// }
//   return (
//     <div className=''>
//     <div className=' row g-3  min-vh-100  d-flex justify-content-center align-items-center '>

// <input type="text"  placeholder='Search course...' onChange={this.handleFilter} style={{padding:'6px 10px', borderColor:'transparent'}}/></div>
// <DataTable
//  columns={columns}
//  data={this.state.records}
//  customStyles={customStyles}
//  pagination
//  selectableRows
//  >
//      </div>
//     </div>
//   )
// }

// export default DashCourse
