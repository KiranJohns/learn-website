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

function BundleOnline({ name }) {
  const [fakeCount, setFakeCount] = useState(0);
  const [bundle, setBundle] = useState({});
  const [course, setCourse] = useState([]);
  const makeRequest = fetchData();
  const route = useRouter()

  useEffect(() => {
    let bundleId = route?.query?.id ? route.query.id : "online care bundle";
    makeRequest("GET", `/bundle/get-bundle-courses/${bundleId}`)
      .then((res) => {
        console.log(res.data.response);
        setCourse(res.data.response.allCourses);
        setBundle(res.data.response.bundle);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  function handleClick() {}
  return (
    <div className="container mt-100">
      <div className="row">
        <div className="col-xxl-5  col-xl-4 col-lg-4 col-md-4 col-sm-0 text-center">
          <h1 style={{ marginBottom: "1rem" }}>Online Care Bundle</h1>
          <h1></h1>
          <p>
          Employees may complete more than thirty CPD-accredited online care courses at their
speed with Learn for Care "Online Care Course – Bundle Package." The prerequisites for
the units of the Regulated Qualifications Framework are also connected to all courses.
          </p>
          <p>
          The "Online Care Course - Bundle Package" may be purchased by Company (Admin) in any
quantity. The "Online Care Course - Bundle Package" has no expiration date unless the
individual or company manager is designated as the recipient. Consider the scenario where
you bought 500 "Online Care Course - Bundle Package" but were only given 400.
Nevertheless, you may delegate your 100 "Online Care Course - Bundle Package" at any
time, any place. There&#39;s no time limit.
          </p>
          <p>
          The "Online Care Course - Bundle Package"; will be available to staff for a maximum of nine
months after the date of assignment. During this period, there is no deadline for completing
the course.
          </p>
        </div>
        <div className="col-md-2"></div>

        {bundle[0] && (
          <SingleBundleCard className="col-md-6 " item={bundle[0]} />
        )}
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

export default BundleOnline;
