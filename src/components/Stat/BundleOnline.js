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
            In our “Online Care Course – Bundle Package”, Learning Connect
            offers 30+ CPD accredited online care courses, which staff can do at
            their own pace. All courses also linked to requirements for
            Regulated Qualifications Framework units.
          </p>
          <p>
            Company (Admin) can purchase as many as “Online Care Course – Bundle
            Package” they want. There is no expiry date on the “Online Care
            Course – Bundle Package” until unless it is assigned to the company
            user (Individual) Or Company Manager. For instance, you purchased
            500 “Online Care Course – Bundle Package” & assigned only 400
            “Online Care Course – Bundle Package”. Still, you have 100 “Online
            Care Course – Bundle Package” to assign anytime, anywhere. There is
            no time restriction.
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
