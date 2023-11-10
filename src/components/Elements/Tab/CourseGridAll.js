import React, { Component, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import store from "../../../redux/store";
const Tabs = dynamic(
  import("react-tabs").then((mod) => mod.Tabs),
  { ssr: false }
);
import { Tab, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import PaginationSection from "../../Common/Pagination";
import Link from "next/link";
import { useSelector } from "react-redux";
import fetchData from "../../../axios/index";
import CourseCard from "./CourseCard";
import ResponsivePagination from "react-responsive-pagination";

export default () => {
  const { cart } = useSelector((store) => store.cart);
  let makeRequest = fetchData();

  const [course, setCourse] = useState([]);
  const [filteredCourse, setFilteredCourse] = useState([]);

  const [count, setCount] = useState(0);
  const [selectedCount, setSelectedCount] = useState(1);

  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  function getCourse(limit) {
    if (limit == 1) {
      limit = 0;
    } else {
      setSelectedCount(limit);
      limit = 12 * limit;
      --limit;
    }

    makeRequest("GET", `/course/get-course-by-limit/${limit}`)
      .then((res) => {
        setCourse(res.data.response.courses);
        setCount(res.data.response.count);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (categoryFilter) {
      setFilteredCourse(() => {
        console.log(filteredCourse);
        return course.filter(
          (item) => item.category.toLowerCase() === categoryFilter.toLowerCase()
        );
      });
    }
  }, [categoryFilter]);

  function handleClick(val) {
    getCourse(val);
  }

  useEffect(() => {
    makeRequest("GET", `/course/get-course-by-limit/${count}`)
      .then((res) => {
        setCourse(res.data.response.courses);
        setCount(res.data.response.count);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section className="course__area pt-50 pb-60 grey-bg">
      <Tabs variant="enclosed" id="react-tabs-276">
        <div className="container">
          <div className="" style={{display: "flex",justifyContent: "space-between"}}>
            <div
              style={{ float: "left", marginBottom: "1.4rem" }}
              className="p-relative d-inline header__search"
            >
              <form action="">
                <input
                  style={{ background: "#edeef3" }}
                  className="d-block"
                  type="text"
                  placeholder="Search..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <button type="submit">
                  <i className="fas fa-search"></i>
                </button>
              </form>
            </div>
            <div className="">
              <select
                style={{ background: "#edeef3", paddingBottom: "1rem" , width: "18rem" }}
                className="form-control text-secondary "
                aria-label="Default select example"
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">filter</option>
                <option value="Care Certificate">Care Certificate</option>
                <option value="Mandatory Care Courses">
                  Mandatory Care Courses
                </option>
                <option value="Specialized Care Courses">
                  Specialized Care Courses
                </option>
                <option value="Recovery Care Courses">
                  Recovery Care Courses
                </option>
                <option value="Child Care Courses">Child Care Courses</option>
              </select>
            </div>
          </div>
          <div className="row align-items-end">
            <div className="col-xxl-5 col-xl-6 col-lg-6">
              <div className="section__title-wrapper mb-60">
                {/* <h2 className="section__title">
                Find the Right
                <br />
                Online{' '}
                <span className="yellow-bg yellow-bg-big">
                  Course
                  <img
                    src="assets/img/shape/yellow-bg.png"
                    alt="img not found"
                  />
                </span>{' '}
                for you
              </h2> */}
                {/* <p>
                You don't have to struggle alone, you've got our assistance
                and help.
              </p> */}
              </div>
            </div>
            {/* <div className="col-xxl-7 col-xl-6 col-lg-6">
                   <div className="course__menu d-flex justify-content-lg-end mb-60">
                      <div className="masonary-menu filter-button-group">
                         <TabList>
                              <Tab><button>See All <span className="tag">new</span></button></Tab>
                              <Tab><button>Trending</button></Tab>
                              <Tab><button>Popularity</button></Tab>
                              <Tab><button>Featured</button></Tab>
                              <Tab><button>Art & Design</button></Tab>
                          </TabList>
                     </div>
                   </div>
                </div> */}
          </div>
          <TabPanel>
            <div className="row">
              {(categoryFilter ? filteredCourse : course).map((item) => {
                if (searchText) {
                  return (
                    item?.name
                      ?.toLowerCase()
                      .startsWith(searchText.toLowerCase()) && (
                      <CourseCard item={item} />
                    )
                  );
                } else {
                  return <CourseCard item={item} />;
                }
              })}
            </div>
            <div className="d-flex justify-content-center">
              <ResponsivePagination
                current={selectedCount}
                total={Math.ceil(count / 12)}
                onPageChange={handleClick}
              />
            </div>
          </TabPanel>
        </div>
      </Tabs>
    </section>
  );
};
