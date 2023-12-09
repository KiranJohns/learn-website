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

class AttemptsExam extends Component {
  constructor() {
    super();
    this.state = {
      records: [],
      filterRecords: [],
      subUsers: [],
      user: jwtDecode(localStorage.getItem(`learnforcare_access`)),
      searchData: "",
      openModal: false,
    };
    this.makeRequest = fetchData();
    this.handleShowModal = this.handleShowModal.bind(this);
    this.assignCourse = this.assignCourse.bind(this);
    this.handleStart = this.handleStart.bind(this);
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

  getData = () => {
    try {
      this.makeRequest("GET", "/course/get-all-assigned-course")
        .then((res) => {
          console.log(res);
          this.setState({
            records: res.data.response.reverse().filter(item => item?.owner == this.state?.user?.id),
            filterRecords: res.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }

    // this.makeRequest("GET", "/info/get-all-sub-users")
    //   .then((res) => {
    //     console.log(res.data.response);
    //     this.setState({ ...this.state, subUsers: res.data.response });
    //   })
    //   .catch((err) => console.log(err));
  };

  handleShowModal() {
    this.setState({
      ...this.state,
      openModal: !this.state.openModal,
    });
  }
  assignCourse(e, subUser) {
    e.persist();
    this.makeRequest("POST", "/info/assign-course-to-sub-user", {
      sub_user_id: subUser.id,
      course_id: this.course_id,
      purchased_course_id: this.purchased_course_id,
    })
      .then((res) => {
        toast.success("course assigned");
        this.getData();
        this.setState({
          ...this.state,
          openModal: !this.state.openModal,
        });
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  handleStart(id, from) {
    let makeRequest = fetchData();
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
  }

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
        name: "Attempt",
        selector: (row, idx) => idx + 1,
        center: true,
        width:"170px"
      },
      {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
        center: true,
        width:"400px"
      },

      {
        name: "Date",
        center: true,
        selector: (row) => {
          let date = new Date(row.validity).toLocaleDateString()
            .split("/")
            .map((d) => (d.length <= 1 ? "0" + d : d));
          let newDate = `${date[1]}/${date[0]}/${date[2]}`;
          return newDate;
        },
      },
      {
        name: "Marks Obtained",
        selector: (row) => row.course_count,
      },
    //   {
    //     name: "Action",
    //     center: true,
    //     cell: (row) => {
    //       return (
    //         <a
    //           onClick={() => {
    //             console.log(row.course_id, row.purchased_course_id);
    //             this.course_id = row.course_id;
    //             this.purchased_course_id = row.purchased_course_id;
    //             Other state updates if needed
    //             this.handleStart(row?.id, "assigned");
    //           }}
    //           className="btn btn-success"
    //         >
    //           start
    //         </a>
    //       );
    //     },
    //   },
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
        <Modal open={this.state.openModal} onClose={this.handleShowModal}>
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
        </Modal>
        <div className=" row g-3  min-vh-100  d-flex justify-content-center dash-shadow mt-10">
          <div style={{ padding: "", backgroundColor: "" }}>
            <h2
              className="dash-head-center"
              style={{
                padding: "",
                color: "#212450",
                fontSize: 36,
              }}
            >
             Exam Results
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
              persistTableHead={true}
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
              
            />
          </div>
        </div>
      </div>
    );
  }
}

export default AttemptsExam;