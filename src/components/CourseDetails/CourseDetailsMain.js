import React, { Component, useState } from "react";
import Cta from "../Home/CtaSection";
import dynamic from "next/dynamic";
const Tabs = dynamic(
  import("react-tabs").then((mod) => mod.Tabs),
  { ssr: false }
); // disable ssr
import { Tab, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import sampleProducts from "./../../../sampleProduct.json";
import CourseAccordion from "../Elements/Accordion/CourseAccordion";
import products from "../../../sampleProduct.json";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";

const CourseSliderWithNoSSR = dynamic(
  () => import("../Elements/Slider/CourseSliderSection"),
  {
    ssr: false,
  }
);

import Link from "next/link";
import CourseSidebar from "./CourseSidebar";
import { useRouter } from "next/router";
import fetchData from "../../axios";
import store from "../../redux/store";
function CourseDetailsMain() {
  const { cart } = useSelector((state) => state.cart);
  console.log(cart);
  const {
    query: { slug },
  } = useRouter();

  function getCartItem() {
    makeRequest("GET", "/cart/get")
      .then((res) => {
        store.dispatch({
          type: "SET_CART",
          payload: JSON.stringify(res.data.response),
        });
      })
      .catch((err) => {
        if (err?.data?.errors[0].message === "please login") {
          store.dispatch({
            type: "SET_CART",
          });
        }
      });
  }

  function addToCart() {
    const data = new FormData();
    data.append("course", JSON.stringify([{ count: 1, id: slug }]));
    makeRequest("POST", "/cart/add", data)
      .then((res) => {
        getCartItem();
        console.log(res.data);
      })
      .catch((err) => {
        if (err?.data?.errors[0]?.message === "please login") {
          console.log("hi");
          if (Array.isArray(cart)) {
            if (cart?.find((item) => item.id == slug)) {
              return toast.warn("already added to the cart");
            }
          }
          store.dispatch({
            type: "ADD_TO_CART",
            payload: {
              course: {
                ...course,
                item_type: "course",
              },
              count: 1,
            },
          });
        }
      });
  }

  const makeRequest = fetchData();
  const [course, setCourse] = useState(() => {
    makeRequest("GET", `/course/get-single-course/${slug}`)
      .then((res) => {
        setCourse(res.data.response[0]);
        console.log(res.data.response[0]);
      })
      .catch((err) => {
        console.log(err);
      });
    return products.find((item) => item.id == slug) || {};
  });

  return (
    <React.Fragment>
      <main>
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
        {/* course tab-start */}
        <section className="page__title-area pt-120 pb-90">
          <div className="page__title-shape">
            <img
              className="page-title-shape-5 d-none d-sm-block"
              src="/assets/img/page-title/page-title-shape-1.png"
              alt="img not found"
            />
            <img
              className="page-title-shape-6"
              src="/assets/img/page-title/page-title-shape-6.png"
              alt="img not found"
            />
            <img
              className="page-title-shape-7"
              src="/assets/img/page-title/page-title-shape-4.png"
              alt="img not found"
            />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-xxl-8 col-xl-8 col-lg-8">
                <div className="course__wrapper">
                  <div className="page__title-content mb-25">
                    <h5 className="page__title-3">{course?.name}</h5>
                  </div>
                  <div className="course__img w-img mb-30">
                    <img src={course?.thumbnail} alt="img not found" />
                  </div>
                  <Tabs>
                    <div className="course__tab-2 mb-45">
                      <ul
                        className="navs nav-tabss"
                        id="courseTab"
                        role="tablist"
                      ></ul>
                    </div>
                    <div className="course__tab-content mb-95">
                      <div className="tab-contents">
                        <TabPanel>
                          <div className="course__description mb-95">
                            <h3>Introduction</h3>
                            <p className=" mb-45">{course?.description}</p>
                            <div className="course__description-list mb-45">
                              <h4>Who should attend?</h4>
                              <ul
                                className=" mb-45"
                                style={{ listStyle: "initial" }}
                              >
                                {JSON.parse(
                                  course?.who_should_attend || "[]"
                                ).map((item) => (
                                  <li>item</li>
                                ))}
                              </ul>
                            </div>
                            <div className="course__description-list mb-45">
                              <h4>What you will learn?</h4>
                              <ul>
                                <li>
                                  {" "}
                                  <i className="fas fa-check"></i>
                                  An Introduction to First Aid
                                </li>
                              </ul>
                            </div>

                            <div className="course__description-list mb-45">
                              <h4>Course Duration</h4>
                              <ul>
                                <li>
                                  The online care course needs a minimum of one
                                  hour to complete. This can be a guide to the
                                  educational hours needed, and it depends on
                                  how quickly an individual can understand the
                                  course. The training is online. It may be
                                  displayed over multiple sessions or done in
                                  one session.
                                </li>
                                <li>
                                  Learners will have access to the present
                                  course for up to nine months from the date of
                                  joining. There's no pressure to completer the
                                  course in a short time.
                                </li>
                              </ul>
                            </div>

                            <div className="course__description-list mb-45">
                              <h4>Assessment</h4>
                              <p>
                                Mandatory care course - First aid awareness
                                online assessment is taken on completion of the
                                training material. You will complete a multiple
                                choice answer exam with a pass mark of 80%. The
                                answers are marked automatically so you will
                                know whether you have passed. If you don't pass,
                                don't worry! You can take the test thirty (30)
                                times. However, you need to purchase the same
                                course again when you use all thirty (30)
                                attempts.
                              </p>
                            </div>

                            <div className="course__description-list mb-45">
                              <h4>Certificate</h4>
                              <p>
                                Our online social care courses are accredited by
                                the Continuing Professional Development (CPD)
                                and are nationally recognised. Once you have
                                completed your assessment, you will be awarded
                                an accredited certificate in PDF format, which
                                is immediately available. Hard copies of the
                                certificate are available for an additional fee.
                                All evidence of learning and certification will
                                remain in our system for your future reference.
                              </p>
                            </div>
                          </div>
                        </TabPanel>
                        {/* <TabPanel>
                                                    <CourseAccordion />
                                                </TabPanel> */}
                      </div>
                    </div>
                  </Tabs>
                </div>
              </div>
              <div  className="col-xxl-4 col-xl-4 col-lg-4 ">
                <CourseSidebar  addToCart={addToCart} />
              </div>
            </div>
          </div>
        </section>
        {/* course tab-end */}

        {/* cta-start */}
        <Cta />
        {/* cta-end */}
      </main>
    </React.Fragment>
  );
}

export default CourseDetailsMain;
