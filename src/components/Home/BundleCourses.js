import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Link from "next/link";
import BasicExample from "../About/button1";
import fetchData, { getUserType } from "../../axios";
import Modal from "react-responsive-modal";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";

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

const BundleCour = () => {
  const [records, setRecords] = useState([]);
  const [filterRecords, setFilterRecords] = useState([]);
  const [data, setData] = useState();
  const [searchData, setSearchData] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const makeRequest = fetchData();
  let sub_user_id = null;
  let course_id = null;
  let purchased_course_id = null;
  const router = useRouter();

  const handleFilter = (event) => {
    const newData = filterRecords.filter((row) =>
      row.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setRecords(newData);
  };

  const getData = async () => {
    try {
      let makeRequest = fetchData();

      // let form = new FormData();
      // form.append("from", from);
      // form.append("bundle_id", id);

      console.log(router.query);
      makeRequest("GET", `/bundle/get-started-bundle/${router.query.id}`)
        .then((res) => {
          setRecords(res.data.response.courses);
          console.log(res.data.response.bundle[0]);
          setData(res.data.response.bundle[0]);
          // location.href = `/individual/bundleCourses/?id=${res.data.response.id}`;
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowModal = () => {
    setOpenModal(!openModal);
  };

  useEffect(() => {
    getData();
  }, []);

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
      name: "Action",
      cell: (row) => (
        <Link href={{
          pathname: "/learnCourse/bundleCourse",
          query:{
            course_id:row.id,
            bundleId: router.query.id
          },
        }}>
          <a
            onClick={() => {
    //           let form = new FormData();
    // form.append("enrolled_bundle_id", data.id);
    // form.append("course_id", id);

    // console.log(router.query);
    // makeRequest("POST", `/bundle/start-bundle-course`, form)
    //   .then((res) => {
        // setRecords(res.data.response);
        // console.log(res.data.response);
        // location.href = `/individual/bundleCourses/?id=${res.data.response.id}`;
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
            }}
            className="btn btn-success"
          >
            start
          </a>
        </Link>
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
      <div className=" row g-3  min-vh-100  d-flex justify-content-center dash-shadow mt-10">
        <div style={{ padding: "", backgroundColor: "" }}>
          <h2
            className="dash-head-center"
            style={{
              padding: "",
              color: "#212450",
              fontSize: 37,
            }}
          >
            Bundle Courses
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
                value={searchData}
                onChange={(e) => setSearchData(e.target.value)}
              />
              <button type="submit">
                <i className="fas fa-search"></i>
              </button>
            </form>
          </div>
          <DataTable
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
            selectableRows
          />
        </div>
      </div>
    </div>
  );
};

export default BundleCour;
