import React, { Component, useState } from "react";
import Link from "next/link";
import SingleCourseBundle from "../Elements/Tab/SingleCourseBundle";
import CourseCard from "../Elements/Tab/CourseCard";
import { useEffect } from "react";
import fetchData from "../../axios";
import BundleCard from "../Elements/Tab/BundleCard";
import SingleBundleCard from "../Elements/Tab/SingleBundleCard-bundle";
import { TabPanel, Tabs } from "react-tabs";
import { useLocation } from "react-router-dom";
import { useRouter } from "next/router";

function BundleChild({ name }) {
  const [fakeCount, setFakeCount] = useState(0);
  const [bundle, setBundle] = useState([]);
  const [course, setCourse] = useState([]);
  const route = useRouter()

  const makeRequest = fetchData()
  useEffect(() => {
    let bundleId = route?.query?.id ? route.query.id : "child care bundle";
    makeRequest("GET", `/bundle/get-bundle-courses/${bundleId}`)
      .then((res) => {
        console.log(res.data.response);
        setCourse(res.data.response.allCourses);
        setBundle(res.data.response.bundle);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])
  function handleClick() { }
  return (
    <div className="container mt-100">
      <div className="row">
        <div className="col-xxl-5  col-xl-4 col-lg-4 col-md-4 col-sm-0 text-center">
        <p style={{ marginBottom: "1rem", fontWeight:"700", fontSize:"1.6rem",  }}>Child Care Bundle</p>
       
          {/* <p style={{ textAlign: 'center' }}>
            Our user-friendly, online Learning Management System (LMS) is used to offer the Child Care Courses. It keeps track of and verifies the data required for each of the six criteria. Furthermore, we have developed workbooks that provide direction on what elements of each Child Care Courses requirement should be decided upon in the workplace. This approach is by far the most successful and economical way for your business to offer child care courses.
          </p> */}
          {
            bundle.map((item, index) => {
              return (
                <div key={index}>
                    <p style={{ textAlign: 'center' }}  
                    dangerouslySetInnerHTML={{
                                  __html: item?.description?.replace(
                                    /\n/g,
                                    "</br>"
                                  ),
                                }}>
                      
                    </p>
                </div>
              );
            })
          }

          {/* <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              className="course__more d-flex justify-content-around"
              style={{ width: "15rem" }}
            >
              <div className="course__status d-flex align-items-center">
                <span className="sky-blue mb-3" style={{ marginBottom: "1px" }}>
                  £12
                </span>
              </div>
              <span style={{ marginTop: "2px" }}>
                <div className="d-flex ml-1">
                  <button
                    className="cart-minus "
                    onClick={() =>
                      setFakeCount((prev) => {
                        if (prev <= 0) {
                          return 0;
                        }
                        return prev - 1;
                      })
                    }
                  >
                    <i className="fas fa-minus"></i>
                  </button>
                  <p className="p-1">{fakeCount}</p>
                  <button
                    className="cart-plus"
                    onClick={() => setFakeCount((prev) => prev + 1)}
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              </span>
              <span style={{ marginBottom: ".1rem" }}>
                <button
                  className="btn btn-primary btn-sm mb-2 d-flex justify-content-between align-items-center"
                  type="button"
                  style={{ outline: "none", border: "none" }}
                  onClick={() => handleClick()}
                >
                  Add
                </button>
              </span>
            </div>
          </div> */}
        </div>
        <div className="col-md-2"></div>
        {bundle[0] && <SingleBundleCard className="col-md-6" item={bundle[0]} />}

      </div>
      <section className="course__area pt-50 pb-60 grey-bg">
        <Tabs variant="enclosed" id="react-tabs-276">
          <div className="container">
            <div style={{ textAlign: "center" }}>
              <h5 style={{ fontSize: "30px" }}>Courses We Offer</h5>
            </div>
            <div className="row align-items-end">
              <div className="col-xxl-5 col-xl-6 col-lg-6">
                <div className="section__title-wrapper mb-60"></div>
              </div>
            </div>

            <TabPanel>
              <div className="row">
                {course &&
                  course.map((item) => {
                    return <CourseCard item={item} />;
                  })}
              </div>
            </TabPanel>
          </div>
        </Tabs>
      </section>
    </div>
  );
}

export default BundleChild;
