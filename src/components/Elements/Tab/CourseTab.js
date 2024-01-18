import React, { useState } from "react";
import dynamic from "next/dynamic";
import store from "../../../redux/store";
const Tabs = dynamic(import("react-tabs").then((mod) => mod.Tabs)); // disable ssr
import { Tab, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Link from "next/link";

import { useSelector } from "react-redux";
import fetchData from "../../../axios";
import CourseCard from "./CourseCard";

export default () => {
  const { cart } = useSelector((store) => store.cart);
  const [course, setCourse] = useState([]);
  const [image, setImage] = useState("");
  const [coupon, setCoupon] = useState({ text: "", highLight: "" });

  const makeRequest = fetchData();

  useState(() => {
    makeRequest("GET", "/course/get-all-course")
      .then((res) => {
        console.log("course ", res.data.response);
        setCourse(res.data.response.slice(0, 8));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useState(() => {
    makeRequest("GET", "/coupon/get-offer-text")
      .then((res) => {
        console.log("coupon ", res.data.response);
        let text = res.data.response[0];
        if (text.image != "") {
          setImage(text.image);
        } else {
          let offerText = text.offer_text;
          let highLightText = text.hight_light_text;
          let newText = offerText.replace(text.hight_light_text, "##$##");
          newText = newText.split("##");
          console.log(newText);
          setCoupon({ text: newText, highLight: highLightText });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section className="course__area pt-50 pb-60 grey-bg">
      <Tabs variant="enclosed" id="react-tabs-276">
        <div className="container">
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

          <div style={{ position: "relative" }} className="row align-items-end">
            <div style={{ marginBottom: "2rem" }}></div>
            <div className="col-xxl-5 col-xl-6 col-lg-6">
              <div className="section__title-wrapper mb-60">
                <h2 className="section__title">
                  Find the Right
                  <br />
                  Online{" "}
                  <span className="yellow-bg yellow-bg-big">
                    Course
                    <img
                      src="assets/img/shape/yellow-bg.png"
                      alt="img not found"
                    />
                  </span>{" "}
                  for you
                </h2>
                <p>
                  You don't have to struggle alone, you've got our assistance
                  and help.
                </p>
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
              {course.map((item, idx) => {
                return <CourseCard item={item} />;
              })}
            </div>
          </TabPanel>
          <div className="d-flex justify-content-center ">
            <div className="btn btn-primary">
              <Link href="/all-courses">View More</Link>
            </div>
          </div>
          <TabPanel>
            <div className="row">
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
                <div className="course__item white-bg mb-30 fix">
                  <div className="course__thumb w-img p-relative fix">
                    <Link href="/course-details">
                      <a>
                        <img
                          src="assets/img/course/course-2.jpg"
                          alt="img not found"
                        />
                      </a>
                    </Link>
                    <div className="course__tag">
                      <Link href="/course-details">
                        <a className="sky-blue">Art & Design</a>
                      </Link>
                    </div>
                  </div>
                  <div className="course__content">
                    <div className="course__meta d-flex align-items-center justify-content-between">
                      <div className="course__lesson">
                        <span>
                          <i className="fas fa-book"></i>72 Lesson
                        </span>
                      </div>
                      <div className="course__rating">
                        <span>
                          <i className="fas fa-star"></i>4.5 (44)
                        </span>
                      </div>
                    </div>
                    <h3 className="course__title">
                      <Link href="/course-details">
                        <a>Fundamentals of music theory Learn new</a>
                      </Link>
                    </h3>
                    <div className="course__teacher d-flex align-items-center">
                      <div className="course__teacher-thumb mr-15">
                        <img
                          src="assets/img/course/teacher/teacher-2.jpg"
                          alt="img not found"
                        />
                      </div>
                      <h6>
                        <Link href="/instructor-details">
                          <a>Andrew Nihal</a>
                        </Link>
                      </h6>
                    </div>
                  </div>
                  <div className="course__more d-flex justify-content-between align-items-center">
                    <div className="course__status d-flex align-items-center">
                      <span className="sky-blue">$32.00</span>
                      <span className="old-price">$68.00</span>
                    </div>
                    <div className="course__btn">
                      <Link href="/course-details">
                        <a className="link-btn">
                          Know Details
                          <i className="fas fa-arrow-right"></i>
                          <i className="fas fa-arrow-right"></i>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
                <div className="course__item white-bg mb-30 fix">
                  <div className="course__thumb w-img p-relative fix">
                    <Link href="/course-details">
                      <a>
                        <img
                          src="assets/img/course/course-3.jpg"
                          alt="img not found"
                        />
                      </a>
                    </Link>
                    <div className="course__tag">
                      <Link href="/course-details">
                        <a className="green">Development</a>
                      </Link>
                    </div>
                  </div>
                  <div className="course__content">
                    <div className="course__meta d-flex align-items-center justify-content-between">
                      <div className="course__lesson">
                        <span>
                          <i className="fas fa-book"></i>14 Lesson
                        </span>
                      </div>
                      <div className="course__rating">
                        <span>
                          <i className="fas fa-star"></i>3.5 (55)
                        </span>
                      </div>
                    </div>
                    <h3 className="course__title">
                      <Link href="/course-details">
                        <a>Strategy law and organization Foundation</a>
                      </Link>
                    </h3>
                    <div className="course__teacher d-flex align-items-center">
                      <div className="course__teacher-thumb mr-15">
                        <img
                          src="assets/img/course/teacher/teacher-3.jpg"
                          alt="img not found"
                        />
                      </div>
                      <h6>
                        <Link href="/instructor-details">
                          <a>Jhon Saif</a>
                        </Link>
                      </h6>
                    </div>
                  </div>
                  <div className="course__more d-flex justify-content-between align-items-center">
                    <div className="course__status d-flex align-items-center">
                      <span className="green">$46.00</span>
                      <span className="old-price">$68.00</span>
                    </div>
                    <div className="course__btn">
                      <Link href="/course-details">
                        <a className="link-btn">
                          Know Details
                          <i className="fas fa-arrow-right"></i>
                          <i className="fas fa-arrow-right"></i>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
                <div className="course__item white-bg mb-30 fix">
                  <div className="course__thumb w-img p-relative fix">
                    <Link href="/course-details">
                      <a>
                        <img
                          src="assets/img/course/course-4.jpg"
                          alt="img not found"
                        />
                      </a>
                    </Link>
                    <div className="course__tag">
                      <Link href="/course-details">
                        <a className="blue">Marketing</a>
                      </Link>
                    </div>
                  </div>
                  <div className="course__content">
                    <div className="course__meta d-flex align-items-center justify-content-between">
                      <div className="course__lesson">
                        <span>
                          <i className="fas fa-book"></i>22 Lesson
                        </span>
                      </div>
                      <div className="course__rating">
                        <span>
                          <i className="fas fa-star"></i>4.5 (42)
                        </span>
                      </div>
                    </div>
                    <h3 className="course__title">
                      <Link href="/course-details">
                        <a>The business Intelligence analyst Course 2022</a>
                      </Link>
                    </h3>
                    <div className="course__teacher d-flex align-items-center">
                      <div className="course__teacher-thumb mr-15">
                        <img
                          src="assets/img/course/teacher/teacher-4.jpg"
                          alt="img not found"
                        />
                      </div>
                      <h6>
                        <Link href="/instructor-details">
                          <a>Kevin Peter</a>
                        </Link>
                      </h6>
                    </div>
                  </div>
                  <div className="course__more d-flex justify-content-between align-items-center">
                    <div className="course__status d-flex align-items-center">
                      <span className="blue">$62.00</span>
                      <span className="old-price">$97.00</span>
                    </div>
                    <div className="course__btn">
                      <Link href="/course-details">
                        <a className="link-btn">
                          Know Details
                          <i className="fas fa-arrow-right"></i>
                          <i className="fas fa-arrow-right"></i>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
                <div className="course__item white-bg mb-30 fix">
                  <div className="course__thumb w-img p-relative fix">
                    <Link href="/course-details">
                      <a>
                        <img
                          src="assets/img/course/course-5.jpg"
                          alt="img not found"
                        />
                      </a>
                    </Link>
                    <div className="course__tag">
                      <Link href="/course-details">
                        <a className="orange">Audio & Music</a>
                      </Link>
                    </div>
                  </div>
                  <div className="course__content">
                    <div className="course__meta d-flex align-items-center justify-content-between">
                      <div className="course__lesson">
                        <span>
                          <i className="fas fa-book"></i>18 Lesson
                        </span>
                      </div>
                      <div className="course__rating">
                        <span>
                          <i className="fas fa-star"></i>4.5 (37)
                        </span>
                      </div>
                    </div>
                    <h3 className="course__title">
                      <Link href="/course-details">
                        <a>Build your media and Public presence</a>
                      </Link>
                    </h3>
                    <div className="course__teacher d-flex align-items-center">
                      <div className="course__teacher-thumb mr-15">
                        <img
                          src="assets/img/course/teacher/teacher-5.jpg"
                          alt="img not found"
                        />
                      </div>
                      <h6>
                        <Link href="/instructor-details">
                          <a>Peter Parker</a>
                        </Link>
                      </h6>
                    </div>
                  </div>
                  <div className="course__more d-flex justify-content-between align-items-center">
                    <div className="course__status d-flex align-items-center">
                      <span className="orange">$62.00</span>
                      <span className="old-price">$97.00</span>
                    </div>
                    <div className="course__btn">
                      <Link href="/course-details">
                        <a className="link-btn">
                          Know Details
                          <i className="fas fa-arrow-right"></i>
                          <i className="fas fa-arrow-right"></i>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
                <div className="course__item white-bg mb-30 fix">
                  <div className="course__thumb w-img p-relative fix">
                    <Link href="/course-details">
                      <a>
                        <img
                          src="assets/img/course/course-6.jpg"
                          alt="img not found"
                        />
                      </a>
                    </Link>
                    <div className="course__tag">
                      <Link href="/course-details">
                        <a className="pink">UX Design</a>
                      </Link>
                    </div>
                  </div>
                  <div className="course__content">
                    <div className="course__meta d-flex align-items-center justify-content-between">
                      <div className="course__lesson">
                        <span>
                          <i className="fas fa-book"></i>13 Lesson
                        </span>
                      </div>
                      <div className="course__rating">
                        <span>
                          <i className="fas fa-star"></i>4.5 (72)
                        </span>
                      </div>
                    </div>
                    <h3 className="course__title">
                      <Link href="/course-details">
                        <a>Creative writing through Storytelling</a>
                      </Link>
                    </h3>
                    <div className="course__teacher d-flex align-items-center">
                      <div className="course__teacher-thumb mr-15">
                        <img
                          src="assets/img/course/teacher/teacher-6.jpg"
                          alt="img not found"
                        />
                      </div>
                      <h6>
                        <Link href="/instructor-details">
                          <a>Steve Long</a>
                        </Link>
                      </h6>
                    </div>
                  </div>
                  <div className="course__more d-flex justify-content-between align-items-center">
                    <div className="course__status d-flex align-items-center">
                      <span className="pink">$46.00</span>
                      <span className="old-price">$72.00</span>
                    </div>
                    <div className="course__btn">
                      <Link href="/course-details">
                        <a className="link-btn">
                          Know Details
                          <i className="fas fa-arrow-right"></i>
                          <i className="fas fa-arrow-right"></i>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="row">
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
                <div className="course__item white-bg mb-30 fix">
                  <div className="course__thumb w-img p-relative fix">
                    <Link href="/course-details">
                      <a>
                        <img
                          src="assets/img/course/course-1.jpg"
                          alt="img not found"
                        />
                      </a>
                    </Link>
                    <div className="course__tag">
                      <Link href="/course-details">
                        <a>Art & Design</a>
                      </Link>
                    </div>
                  </div>
                  <div className="course__content">
                    <div className="course__meta d-flex align-items-center justify-content-between">
                      <div className="course__lesson">
                        <span>
                          <i className="fas fa-book"></i>43 Lesson
                        </span>
                      </div>
                      <div className="course__rating">
                        <span>
                          <i className="fas fa-star"></i>4.5 (44)
                        </span>
                      </div>
                    </div>
                    <h3 className="course__title">
                      <Link href="/course-details">
                        <a>Become a product Manager learn the skills & job.</a>
                      </Link>
                    </h3>
                    <div className="course__teacher d-flex align-items-center">
                      <div className="course__teacher-thumb mr-15">
                        <img
                          src="assets/img/course/teacher/teacher-1.jpg"
                          alt="img not found"
                        />
                      </div>
                      <h6>
                        <Link href="/instructor-details">
                          <a>Peterson</a>
                        </Link>
                      </h6>
                    </div>
                  </div>
                  <div className="course__more d-flex justify-content-between align-items-center">
                    <div className="course__status">
                      <span>Free</span>
                    </div>
                    <div className="course__btn">
                      <Link href="/course-details">
                        <a className="link-btn">
                          Know Details
                          <i className="fas fa-arrow-right"></i>
                          <i className="fas fa-arrow-right"></i>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
                <div className="course__item white-bg mb-30 fix">
                  <div className="course__thumb w-img p-relative fix">
                    <Link href="/course-details">
                      <a>
                        <img
                          src="assets/img/course/course-2.jpg"
                          alt="img not found"
                        />
                      </a>
                    </Link>
                    <div className="course__tag">
                      <Link href="/course-details">
                        <a className="sky-blue">Art & Design</a>
                      </Link>
                    </div>
                  </div>
                  <div className="course__content">
                    <div className="course__meta d-flex align-items-center justify-content-between">
                      <div className="course__lesson">
                        <span>
                          <i className="fas fa-book"></i>72 Lesson
                        </span>
                      </div>
                      <div className="course__rating">
                        <span>
                          <i className="fas fa-star"></i>4.5 (44)
                        </span>
                      </div>
                    </div>
                    <h3 className="course__title">
                      <Link href="/course-details">
                        <a>Fundamentals of music theory Learn new</a>
                      </Link>
                    </h3>
                    <div className="course__teacher d-flex align-items-center">
                      <div className="course__teacher-thumb mr-15">
                        <img
                          src="assets/img/course/teacher/teacher-2.jpg"
                          alt="img not found"
                        />
                      </div>
                      <h6>
                        <Link href="/instructor-details">
                          <a>Willamson</a>
                        </Link>
                      </h6>
                    </div>
                  </div>
                  <div className="course__more d-flex justify-content-between align-items-center">
                    <div className="course__status d-flex align-items-center">
                      <span className="sky-blue">$32.00</span>
                      <span className="old-price">$68.00</span>
                    </div>
                    <div className="course__btn">
                      <Link href="/course-details">
                        <a className="link-btn">
                          Know Details
                          <i className="fas fa-arrow-right"></i>
                          <i className="fas fa-arrow-right"></i>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
                <div className="course__item white-bg mb-30 fix">
                  <div className="course__thumb w-img p-relative fix">
                    <Link href="/course-details">
                      <a>
                        <img
                          src="assets/img/course/course-3.jpg"
                          alt="img not found"
                        />
                      </a>
                    </Link>
                    <div className="course__tag">
                      <Link href="/course-details">
                        <a className="green">Development</a>
                      </Link>
                    </div>
                  </div>
                  <div className="course__content">
                    <div className="course__meta d-flex align-items-center justify-content-between">
                      <div className="course__lesson">
                        <span>
                          <i className="fas fa-book"></i>14 Lesson
                        </span>
                      </div>
                      <div className="course__rating">
                        <span>
                          <i className="fas fa-star"></i>3.5 (55)
                        </span>
                      </div>
                    </div>
                    <h3 className="course__title">
                      <Link href="/course-details">
                        <a>Strategy law and organization Foundation</a>
                      </Link>
                    </h3>
                    <div className="course__teacher d-flex align-items-center">
                      <div className="course__teacher-thumb mr-15">
                        <img
                          src="assets/img/course/teacher/teacher-3.jpg"
                          alt="img not found"
                        />
                      </div>
                      <h6>
                        <Link href="/instructor-details">
                          <a>Martin</a>
                        </Link>
                      </h6>
                    </div>
                  </div>
                  <div className="course__more d-flex justify-content-between align-items-center">
                    <div className="course__status d-flex align-items-center">
                      <span className="green">$46.00</span>
                      <span className="old-price">$68.00</span>
                    </div>
                    <div className="course__btn">
                      <Link href="/course-details">
                        <a className="link-btn">
                          Know Details
                          <i className="fas fa-arrow-right"></i>
                          <i className="fas fa-arrow-right"></i>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="row">
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
                <div className="course__item white-bg mb-30 fix">
                  <div className="course__thumb w-img p-relative fix">
                    <Link href="/course-details">
                      <a>
                        <img
                          src="assets/img/course/course-2.jpg"
                          alt="img not found"
                        />
                      </a>
                    </Link>
                    <div className="course__tag">
                      <Link href="/course-details">
                        <a className="sky-blue">Art & Design</a>
                      </Link>
                    </div>
                  </div>
                  <div className="course__content">
                    <div className="course__meta d-flex align-items-center justify-content-between">
                      <div className="course__lesson">
                        <span>
                          <i className="fas fa-book"></i>72 Lesson
                        </span>
                      </div>
                      <div className="course__rating">
                        <span>
                          <i className="fas fa-star"></i>4.5 (44)
                        </span>
                      </div>
                    </div>
                    <h3 className="course__title">
                      <Link href="/course-details">
                        <a>Fundamentals of music theory Learn new</a>
                      </Link>
                    </h3>
                    <div className="course__teacher d-flex align-items-center">
                      <div className="course__teacher-thumb mr-15">
                        <img
                          src="assets/img/course/teacher/teacher-2.jpg"
                          alt="img not found"
                        />
                      </div>
                      <h6>
                        <Link href="/instructor-details">
                          <a>Jhon Doe</a>
                        </Link>
                      </h6>
                    </div>
                  </div>
                  <div className="course__more d-flex justify-content-between align-items-center">
                    <div className="course__status d-flex align-items-center">
                      <span className="sky-blue">$32.00</span>
                      <span className="old-price">$68.00</span>
                    </div>
                    <div className="course__btn">
                      <Link href="/course-details">
                        <a className="link-btn">
                          Know Details
                          <i className="fas fa-arrow-right"></i>
                          <i className="fas fa-arrow-right"></i>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
                <div className="course__item white-bg mb-30 fix">
                  <div className="course__thumb w-img p-relative fix">
                    <Link href="/course-details">
                      <a>
                        <img
                          src="assets/img/course/course-3.jpg"
                          alt="img not found"
                        />
                      </a>
                    </Link>
                    <div className="course__tag">
                      <Link href="/course-details">
                        <a className="green">Development</a>
                      </Link>
                    </div>
                  </div>
                  <div className="course__content">
                    <div className="course__meta d-flex align-items-center justify-content-between">
                      <div className="course__lesson">
                        <span>
                          <i className="fas fa-book"></i>14 Lesson
                        </span>
                      </div>
                      <div className="course__rating">
                        <span>
                          <i className="fas fa-star"></i>3.5 (55)
                        </span>
                      </div>
                    </div>
                    <h3 className="course__title">
                      <Link href="/course-details">
                        <a>Strategy law and organization Foundation</a>
                      </Link>
                    </h3>
                    <div className="course__teacher d-flex align-items-center">
                      <div className="course__teacher-thumb mr-15">
                        <img
                          src="assets/img/course/teacher/teacher-3.jpg"
                          alt="img not found"
                        />
                      </div>
                      <h6>
                        <Link href="/instructor-details">
                          <a>Spider</a>
                        </Link>
                      </h6>
                    </div>
                  </div>
                  <div className="course__more d-flex justify-content-between align-items-center">
                    <div className="course__status d-flex align-items-center">
                      <span className="green">$46.00</span>
                      <span className="old-price">$68.00</span>
                    </div>
                    <div className="course__btn">
                      <Link href="/course-details">
                        <a className="link-btn">
                          Know Details
                          <i className="fas fa-arrow-right"></i>
                          <i className="fas fa-arrow-right"></i>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
                <div className="course__item white-bg mb-30 fix">
                  <div className="course__thumb w-img p-relative fix">
                    <Link href="/course-details">
                      <a>
                        <img
                          src="assets/img/course/course-4.jpg"
                          alt="img not found"
                        />
                      </a>
                    </Link>
                    <div className="course__tag">
                      <Link href="/course-details">
                        <a className="blue">Marketing</a>
                      </Link>
                    </div>
                  </div>
                  <div className="course__content">
                    <div className="course__meta d-flex align-items-center justify-content-between">
                      <div className="course__lesson">
                        <span>
                          <i className="fas fa-book"></i>22 Lesson
                        </span>
                      </div>
                      <div className="course__rating">
                        <span>
                          <i className="fas fa-star"></i>4.5 (42)
                        </span>
                      </div>
                    </div>
                    <h3 className="course__title">
                      <Link href="/course-details">
                        <a>The business Intelligence analyst Course 2022</a>
                      </Link>
                    </h3>
                    <div className="course__teacher d-flex align-items-center">
                      <div className="course__teacher-thumb mr-15">
                        <img
                          src="assets/img/course/teacher/teacher-4.jpg"
                          alt="img not found"
                        />
                      </div>
                      <h6>
                        <Link href="/instructor-details">
                          <a>Ross Taylor</a>
                        </Link>
                      </h6>
                    </div>
                  </div>
                  <div className="course__more d-flex justify-content-between align-items-center">
                    <div className="course__status d-flex align-items-center">
                      <span className="blue">$62.00</span>
                      <span className="old-price">$97.00</span>
                    </div>
                    <div className="course__btn">
                      <Link href="/course-details">
                        <a className="link-btn">
                          Know Details
                          <i className="fas fa-arrow-right"></i>
                          <i className="fas fa-arrow-right"></i>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
                <div className="course__item white-bg mb-30 fix">
                  <div className="course__thumb w-img p-relative fix">
                    <Link href="/course-details">
                      <a>
                        <img
                          src="assets/img/course/course-5.jpg"
                          alt="img not found"
                        />
                      </a>
                    </Link>
                    <div className="course__tag">
                      <Link href="/course-details">
                        <a className="orange">Audio & Music</a>
                      </Link>
                    </div>
                  </div>
                  <div className="course__content">
                    <div className="course__meta d-flex align-items-center justify-content-between">
                      <div className="course__lesson">
                        <span>
                          <i className="fas fa-book"></i>18 Lesson
                        </span>
                      </div>
                      <div className="course__rating">
                        <span>
                          <i className="fas fa-star"></i>4.5 (37)
                        </span>
                      </div>
                    </div>
                    <h3 className="course__title">
                      <Link href="/course-details">
                        <a>Build your media and Public presence</a>
                      </Link>
                    </h3>
                    <div className="course__teacher d-flex align-items-center">
                      <div className="course__teacher-thumb mr-15">
                        <img
                          src="assets/img/course/teacher/teacher-5.jpg"
                          alt="img not found"
                        />
                      </div>
                      <h6>
                        <Link href="/instructor-details">
                          <a>Mitchel Stark</a>
                        </Link>
                      </h6>
                    </div>
                  </div>
                  <div className="course__more d-flex justify-content-between align-items-center">
                    <div className="course__status d-flex align-items-center">
                      <span className="orange">$62.00</span>
                      <span className="old-price">$97.00</span>
                    </div>
                    <div className="course__btn">
                      <Link href="/course-details">
                        <a className="link-btn">
                          Know Details
                          <i className="fas fa-arrow-right"></i>
                          <i className="fas fa-arrow-right"></i>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
        </div>
      </Tabs>
    </section>
  );
};
