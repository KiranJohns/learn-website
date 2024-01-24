import React, { Component, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import store from "../../../redux/store";
import { FaFilter } from "react-icons/fa";
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
import { CiFilter } from "react-icons/ci";

export default () => {
  const { cart } = useSelector((store) => store.cart);
  let makeRequest = fetchData();

  const [course, setCourse] = useState([]);
  const [filteredCourse, setFilteredCourse] = useState([]);

  const [count, setCount] = useState(0);
  const [selectedCount, setSelectedCount] = useState(1);

  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [image, setImage] = useState("");
  const [filter, setFilter] = useState(false);

  const [coupon, setCoupon] = useState({ text: "", highLight: "" });

  useState(() => {
    makeRequest("GET", "/coupon/get-offer-text")
      .then((res) => {
        // console.log("coupon ", res.data.response);
        let text = res.data.response[0];
        if (text?.image != "") {
          setImage(text?.image);
        } else {
          let offerText = text.offer_text;
          let highLightText = text.hight_light_text;
          let newText = offerText.replace(text.hight_light_text, "##$##");
          newText = newText.split("##");
          // console.log(newText);
          setCoupon({ text: newText, highLight: highLightText });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function getCourse(limit) {
    if (limit == 1) {
      setSelectedCount(1);
      limit = 0;
    } else {
      setSelectedCount(limit);
      limit = 12 * limit - 12;
    }
    console.log(limit);

    makeRequest("GET", `/course/get-course-by-limit/${limit}`)
      .then((res) => {
        console.log(res.data.response);
        setCourse(res.data.response.courses);
        // setCount(res.data.response.count);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (categoryFilter) {
      setFilter(true)
      makeRequest("GET", "/course/get-all-course")
        .then((res) => {
          setFilteredCourse(() => {
            // console.log(filteredCourse);
            return res.data.response.filter((item) => {
              console.log(item.category);
              return (
                item.category.toLowerCase() === categoryFilter.toLowerCase()
              );
            });
          });
          console.log(res);
        })
        .catch((err) => {});
      } else {
        setFilter(false)
      }
  }, [categoryFilter]);

  function handleClick(val) {
    getCourse(val);
  }

  useEffect(() => {
    makeRequest("GET", `/course/get-course-by-limit/${count}`)
      .then((res) => {
        console.log(res.data.response);
        setCourse(res.data.response.courses);
        setCount(res.data.response.count);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section className="course__area pt-50 pb-60 grey-bg ">
      <Tabs variant="enclosed" id="react-tabs-276">
        <div className="container">
          <div
            className=""
            style={{ display: "flex", justifyContent: "space-between" }}
          >
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

            {/* <div className="select-menu">
                <div className="select-btn">
                <FaFilter className="ic-fil"/>
                 <span className="sBtn-text"> Filter..</span>
                </div>
                <ul className="fi-options">
                  <li className="fi-option">
                    <span className="option-text">Github</span>
                  </li>
                </ul>
             </div> */}

            <div className="select media-select filter-hidden">
              <FaFilter
                className="ic-fil"
                style={{
                  position: "absolute",
                  zIndex: "1",
                  marginTop: "11px",
                  marginLeft: ".5rem",
                  marginRight: ".5rem",
                  color: "#fff",
                  fontSize: "1rem",
                }}
              />
              <select
                style={{
                  border: "none",
                  outline: "#fff",
                  borderRadius: "4px",
                  background: "#5a9676",
                  textAlign: "center",
                  position: "relative",
                  width: "13.1rem",
                  height: "45px",
                  fontSize: ".9rem",
                  fontWeight: "500",
                  color: "#fff",
                }}
                className=""
                aria-label="Default select example"
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                i
                <option
                  style={{
                    fontSize: "1rem",
                    color: "#000",
                    background: "#fff",
                    fontWeght: "500",
                  }}
                  value=""
                >
                  Filters
                </option>
                <option
                  style={{
                    fontSize: "1rem",
                    color: "#000",
                    background: "#fff",
                    fontWeght: "500",
                  }}
                  value="Care Course"
                >
                  Care Certificate Courses
                </option>
                <option
                  style={{
                    fontSize: "1rem",
                    color: "#000",
                    background: "#fff",
                    fontWeght: "500",
                  }}
                  value="Mandatory Care Course"
                >
                  Mandatory Care Courses
                </option>
                <option
                  style={{
                    fontSize: "1rem",
                    color: "#000",
                    background: "#fff",
                    fontWeght: "500",
                  }}
                  value="Specialised Care Course"
                >
                  Specialised Care Courses
                </option>
                <option
                  style={{
                    fontSize: "1rem",
                    color: "#000",
                    background: "#fff",
                    fontWeght: "500",
                  }}
                  value="Recovery Care Course"
                >
                  Recovery Care Courses
                </option>
                <option
                  style={{
                    fontSize: "1rem",
                    color: "#000",
                    background: "#fff",
                    fontWeght: "500",
                  }}
                  value="Child Care Course"
                >
                  Child Care Courses
                </option>
              </select>
            </div>
          </div>
          {/* offer text */}
          <div style={{ marginBottom: "1rem", marginTop: "1rem" }}>
            {!image ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                  background: "",
                  padding: ".5rem",
                }}
                className="col-12"
              >
                <marquee
                  style={{
                    color: "#212a50",
                    fontSize: "19px",
                    fontWeight: "600",
                  }}
                  scrollamount="10"
                >
                  {coupon.text &&
                    coupon.text.map((item) => {
                      // console.log(coupon.text);
                      if (item == "$") {
                        return (
                          <span className="animated-text">
                            {coupon.highLight + " "}{" "}
                          </span>
                        );
                      } else {
                        return <span>{item + " "}</span>;
                      }
                    })}
                </marquee>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                  background: "",
                  padding: ".5rem",
                }}
                className="col-12"
              >
                <marquee
                  style={{
                    color: "#212a50",
                    fontSize: "19px",
                    fontWeight: "600",
                  }}
                  scrollamount="10"
                >
                  <img src={image} alt="" />
                </marquee>
              </div>
            )}
            {/* <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                background: "",
                padding: ".5rem",
              }}
              className="col-12 animated-text"
            >
              <marquee
                style={{ color: "#212a50", fontSize: "19px" }}
                scrollamount="10"
              >
                {coupon.text &&
                  coupon.text.map((item) => {
                    console.log(coupon.text);
                    if (item == "$") {
                      return (
                        <span className="animated-text">
                          {coupon.highLight + " "}{" "}
                        </span>
                      );
                    } else {
                      return <span>{item + " "}</span>;
                    }
                  })}
              </marquee>
            </div> */}
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
            {!filter && <div className="d-flex justify-content-center">
              <ResponsivePagination
                current={selectedCount}
                total={Math.ceil(count / 12)}
                onPageChange={handleClick}
              />
            </div>}
          </TabPanel>
        </div>
      </Tabs>
    </section>
  );
};
