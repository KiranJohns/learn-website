import React, { Component } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Link from "next/link";
import BasicExample from "../About/button1";
import fetchData, { getUserType } from "../../axios";
import Modal from "react-responsive-modal";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

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

class IndCourse extends Component {
  constructor() {
    super();
    this.state = {
      records: [],
      filterRecords: [],
      subUsers: [],
      searchData: "",
      openModal: false,
    };
    this.makeRequest = fetchData();
    this.handleShowModal = this.handleShowModal.bind(this);
    // this.assignCourse = this.assignCourse.bind(this);
    this.sub_user_id = null;
    this.course_id = null;
    this.purchased_course_id = null;
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

   getData = async () => {
    try {
      
      let assignedRes = await this.makeRequest("GET", "/course/get-all-assigned-course")
      let purchasedRes = await this.makeRequest("GET", "/course/get-bought-course")
      Promise.all([assignedRes, purchasedRes]).then((res) => {
        let arr = [
          ...res[0].data.response,
          ...res[1].data.response
        ]
          console.log('res',res);
          this.setState({
            records: arr,
            filterRecords: arr,
          });
        })
        .catch((err) => {
          console.log(err);
        });


      // if (getUserType() === "individual") {
        
      // } else {

      // }
    } catch (error) {
      console.log(error);
    }
  };

  handleShowModal() {
    this.setState({
      ...this.state,
      openModal: !this.state.openModal,
    });
  }
  // assignCourse(e, subUser) {
  //   e.persist();
  //   this.makeRequest("POST", "/info/assign-course-to-sub-user", {
  //     sub_user_id: subUser.id,
  //     course_id: this.course_id,
  //     purchased_course_id: this.purchased_course_id,
  //   })
  //     .then((res) => {
  //       toast.success("course assigned");
  //       this.getData();
  //       this.setState({
  //         ...this.state,
  //         openModal: !this.state.openModal,
  //       });
  //     })
  //     .catch((err) => console.log(err));
  // }

  // handleCourseStart(id) {
  //   console.log(id);
  //   this.makeRequest("GET", `/course/start-course/${id}`)
  //     .then((res) => {
  //       location.pathname = `/company/course-learn/${res.data.response.id}`;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  render() {
    const columns = [
      {
        name: "No",
        selector: (row, idx) => idx + 1,
        sortable: true,
      },
      {
        name: "name",
        selector: (row) => row.name || row.Name,
        sortable: true,
      },
      {
        name: "description",
        selector: (row) => row?.description?.slice(0, 25),
      },
      {
        name: "category",
        selector: (row) => row.category,
      },
      {
        name: "validity",
        selector: (row) => {
          // let date = row.validity
          //   .split("/")
          //   .map((d) => (d.length <= 1 ? "0" + d : d));
          // let newDate = `${date[1]}/${date[0]}/${date[2]}`;
          return new Date(row.validity).toLocaleDateString();
        },
      },
      {
        name: "",
        cell: (row) => {
          return (
            <a
              onClick={() => {
                console.log(row);
                location.pathname = `/company/course-learn/${row.on_going_course_id}`
              }}
              className="btn btn-success"
            >
              continue
            </a>
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
        {/* <Modal open={this.state.openModal} onClose={this.handleShowModal}>
          <div style={{ padding: "", width: "40rem", height: "20rem" }}>
            <h3>Sub Users</h3>
            <ul class="list-group bg-white" style={{}}>
              {this.state.subUsers &&
                this.state.subUsers.map((item) => {
                  if (!item.block) {
                    return (
                      <li class="list-group-item bg-white text-black d-flex justify-content-between align-items-center">
                        <h5>{item.first_name + " " + item.last_name}</h5>
                        <a
                          className="btn btn-primary"
                          onClick={(e) => this.assignCourse(e, item)}
                        >
                          Assign
                        </a>
                      </li>
                    );
                  }
                })}
            </ul>
          </div>
        </Modal> */}
        <div className=" row g-3  min-vh-100  d-flex justify-content-center dash-shadow mt-10">
          <div style={{ padding: "", backgroundColor: "" }}>
            <h2
              className="dash-head-center"
              style={{
                padding: "",
                color: "#212450",

                fontSize: 42,
              }}
            >
              My Courses
            </h2>
            {/* <div
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
            </div> */}

            <div
              style={{ float: "right", marginBottom: "1.4rem" }}
              className="p-relative d-inline header__search"
            >
              <form action="">
                <input
                  style={{ background: "#edeef3" }}
                  className="d-block  "
                  type="text"
                  placeholder="Search..."
                  // value={searchString}
                  onChange={(e) =>
                    this.setState({ ...this.state, searchData: e.target.value })
                  }
                />
                <button type="submit">
                  <i className="fas fa-search"></i>
                </button>
              </form>
            </div>
            <DataTable
              columns={columns}
              data={
                this.state.searchData
                  ? this.state.records.filter((item) =>
                      item.Name.toLowerCase().includes(
                        this.state.searchData.toLowerCase()
                      )
                    )
                  : this.state.records
              }
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

export default IndCourse;

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
