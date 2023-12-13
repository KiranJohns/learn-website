import React, { Component } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Link from "next/link";
import BasicExample from "../About/button1";
import fetchData from "../../axios";
import Modal from "react-responsive-modal";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { Suspense } from "react";
import Spinner from 'react-bootstrap/Spinner';
import { useState, useEffect } from "react";

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

const DashCourse = () => {
  const [records, setRecords] = useState([]);
  const [filterRecords, setFilterRecords] = useState([]);
  const [subUsers, setSubUsers] = useState([]);
  const [user, setUser] = useState(
    jwtDecode(localStorage.getItem("learnforcare_access"))
  );
  const [searchData, setSearchData] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const makeRequest = fetchData();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const [assignedCourses] = await Promise.all([
        makeRequest("GET", "/course/get-all-assigned-course"),
      ]);

      setRecords(
        [...assignedCourses.data.response]
          .reverse()
          .filter((item) => item?.owner == user?.id)
      );
      setFilterRecords(assignedCourses.data);

      // Uncomment the following block if "get-all-sub-users" endpoint is needed
      // const subUsersRes = await makeRequest("GET", "/info/get-all-sub-users");
      // setSubUsers(subUsersRes.data.response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilter = (event) => {
    const newData = filterRecords.filter((row) =>
      row.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setRecords(newData);
  };

  const handleShowModal = () => {
    setOpenModal(!openModal);
  };

  const [pending, setPending] = React.useState(true);
	const [rows, setRows] = React.useState([]);

  useEffect(() => {
    if(records.length>0){
    setRows(records);
    setPending(false);
    }
    else{
      setPending(true);
    }
}, [records]);

  const assignCourse = (e, subUser) => {
    e.persist();
    makeRequest("POST", "/info/assign-course-to-sub-user", {
      sub_user_id: subUser.id,
      course_id: course_id,
      purchased_course_id: purchased_course_id,
    })
      .then((res) => {
        toast.success("course assigned");
        getData();
        setOpenModal(!openModal);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

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

  const columns = [
    {
      name: "No",
      selector: (row, idx) => idx + 1,
      center: true,
      width: "80px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      center: true,
      width: "400px",
    },
    {
      name: "validity",
      center: true,
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
      center: true,
      cell: (row) => (
        <a
          onClick={() => {
            handleStart(row?.id, "assigned");
          }}
          className="btn btn-success"
        >
          start
        </a>
      ),
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
      <Modal open={openModal} onClose={handleShowModal}>
        <div style={{ padding: "", width: "40rem", height: "20rem" }}>
          <h3>Sub Users</h3>
          <ul class="list-group bg-white" style={{}}>
            {subUsers &&
              subUsers.map((item) => {
                if (!item.block) {
                  return (
                    <li class="list-group-item bg-white text-black d-flex justify-content-between align-items-center">
                      <h5>{item.first_name + " " + item.last_name}</h5>
                      <a
                        className="btn btn-primary"
                        onClick={(e) => assignCourse(e, item)}
                      >
                        Assign
                      </a>
                    </li>
                  );
                }
              })}
          </ul>
        </div>
      </Modal>
      <div className=" row g-3  min-vh-100  d-flex justify-content-center dash-shadow mt-10">
        <div style={{ padding: "", backgroundColor: "" }}>
          <h2
            className="dash-head-center"
            style={{
              padding: "",
              color: "#212450",
              fontSize: 38,
            }}
          >
            My Courses
          </h2>
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
                onChange={(e) => setSearchData(e.target.value)}
              />
              <button type="submit">
                <i className="fas fa-search"></i>
              </button>
            </form>
          </div>
          <Suspense fallback={<Loading />}>
            <DataTable
               progressPending={pending}
               progressComponent	={<div style={{padding:"1rem"}}>
             <Spinner animation="border" variant="primary" />
               </div>}
              persistTableHead={true}
              noDataComponent={" "}
              columns={columns}
              data={
                searchData
                  ? records.filter((item) =>
                      item.Name.toLowerCase().includes(searchData.toLowerCase())
                    )
                  : records
              }
              customStyles={customStyles}
              pagination
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default DashCourse;
function Loading() {
  return <h2>🌀 Loading...</h2>;
}

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
