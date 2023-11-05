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
import Pagination from "react-bootstrap/Pagination";

export default () => {
  const { cart } = useSelector((store) => store.cart);
  let makeRequest = fetchData();

  const [course, setCourse] = useState([]);

  useEffect(() => {
    makeRequest("GET", "/course/get-all-course")
      .then((res) => {
        setCourse(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section className="course__area pt-50 pb-60 grey-bg">
      <Tabs variant="enclosed" id="react-tabs-276">
        <div className="container">
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
              {course.map((item) => (
                <CourseCard item={item} />
              ))}
            </div>
            <div className="d-flex justify-content-end">
              <Pagination>
                <Pagination.First />
                <Pagination.Prev />
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Item>{2}</Pagination.Item>
                <Pagination.Item>{3}</Pagination.Item>
                <Pagination.Item active>{4}</Pagination.Item>
                <Pagination.Item>{5}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
              </Pagination>
            </div>
          </TabPanel>
        </div>
      </Tabs>
    </section>
  );
};
