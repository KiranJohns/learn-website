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

const CourseSliderWithNoSSR = dynamic(
  () => import("../Elements/Slider/CourseSliderSection"),
  {
    ssr: false,
  }
);

import Link from "next/link";
import CourseSidebar from "./CourseSidebar";
import { useRouter } from "next/router";
function CourseDetailsMain() {
  const {
    query: { slug },
  } = useRouter();

  const [course, setCourse] = useState(() => {
    return products.find((item) => item.id == slug) || {};
  });

  return (
    <React.Fragment>
      <main>
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
                    {/* <div className="page__title-breadcrumb">                            
                                            <nav aria-label="breadcrumb">
                                                <ol className="breadcrumb">
                                                    <li className="breadcrumb-item"><Link href="/"><a>Home</a></Link></li>
                                                    <li className="breadcrumb-item"><Link href="/course-grid"><a>Courses</a></Link></li>
                                                    <li className="breadcrumb-item active" aria-current="page">The business Intelligence analyst Course 2022</li>
                                                </ol>
                                            </nav>
                                        </div> */}
                    {/* <span className="page__title-pre">Development</span> */}
                    <h5 className="page__title-3">{course.heading}</h5>
                  </div>
                  {/* <div className="course__meta-2 d-sm-flex mb-30">
                                    <div className="course__teacher-3 d-flex align-items-center mr-70 mb-30">
                                        <div className="course__teacher-thumb-3 mr-15">
                                            <img src="assets/img/course/teacher/teacher-1.jpg" alt="img not found"/>
                                        </div>
                                        <div className="course__teacher-info-3">
                                            <h5>Teacher</h5>
                                            <p><Link href="/instructor"><a>Elon Gated</a></Link></p>
                                        </div>
                                    </div>
                                    <div className="course__update mr-80 mb-30">
                                        <h5>Last Update:</h5>
                                        <p>July 24, 2022</p>
                                    </div>
                                    <div className="course__rating-2 mb-30">
                                        <h5>Review:</h5>
                                        <div className="course__rating-inner d-flex align-items-center">
                                            <ul>
                                                <li><a href="#"> <i className="fas fa-star"></i> </a></li>
                                                <li><a href="#"> <i className="fas fa-star"></i> </a></li>
                                                <li><a href="#"> <i className="fas fa-star"></i> </a></li>
                                                <li><a href="#"> <i className="fas fa-star"></i> </a></li>
                                                <li><a href="#"> <i className="fas fa-star"></i> </a></li>
                                            </ul>
                                            <p>4.5</p>
                                        </div>
                                    </div>
                                    </div> */}
                  <div className="course__img w-img mb-30">
                    <img src={course.image} alt="img not found" />
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
                            <p className=" mb-45">{course.description}</p>

                            {/* <div className="course__tag-2 mb-35 mt-35">
                                                        <i className="fas fa-tags"></i>
                                                        <Link href="/course-details"><a>Big data,</a></Link>
                                                        <Link href="/course-details"><a>Data analysis,</a></Link>
                                                        <Link href="/course-details"><a>Data modeling</a></Link>
                                                        </div> */}
                            <div className="course__description-list mb-45">
                              <h4>Who should attend?</h4>
                              <p className=" mb-45">
                                This online first-aid course is appropriate for
                                individuals and businesses who want to learn new
                                first-aid skills or refresh their existing
                                first-aid skills. No previous qualifications are
                                required to take this course as all the
                                essential first aid techniques are covered
                                throughout the training.
                              </p>
                            </div>
                            <div className="course__description-list mb-45">
                              <h4>What you will learn?</h4>
                              <ul>
                                <li>
                                  {" "}
                                  <i className="fas fa-check"></i> An
                                  Introduction to First Aid
                                </li>
                                <li>
                                  {" "}
                                  <i className="fas fa-check"></i> Roles and
                                  Responsibilities of the First Aider
                                </li>
                                <li>
                                  {" "}
                                  <i className="fas fa-check"></i> First Aid
                                  Equipment
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
              <div className="col-xxl-4 col-xl-4 col-lg-4">
                <CourseSidebar />
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
