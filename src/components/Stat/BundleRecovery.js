import React, { Component, useState } from "react";
import Link from "next/link";
import SingleCourseBundle from "../Elements/Tab/SingleCourseBundle";
import CourseCard from "../Elements/Tab/CourseCard";
import { useEffect } from "react";
import fetchData from "../../axios";
import BundleCard from "../Elements/Tab/BundleCard";
import SingleBundleCard from "../Elements/Tab/SingleBundleCard";

function BundleRecover({ name }) {
  const [fakeCount, setFakeCount] = useState(0);
  const [bundle, setBundle] = useState({});
  const makeRequest = fetchData()
  useEffect(() => {
    makeRequest("GET","/bundle/get-all-bundles").then(res => {
      console.log(res);
      setBundle(res.data.response.filter(bundle => bundle.name==name)[0])
    }).catch(err => {
      console.log(err);
    })
  },[])
  function handleClick() {}
  return (
    <div className="container mt-100">
      <div className="row">
        <div className="col-xxl-5  col-xl-4 col-lg-4 col-md-4 col-sm-0 text-center">
          <h1 style={{ marginBottom: "1rem" }}>Recovery Care Bundle</h1>
          <h1></h1>
          <p style={{textAlign:"center"}}>
          The Recovery Care Courses are delivered through our simple to use, 
          online Learning Management System (LMS) that records and evidences the information needed for 
          every of the two standards. In addition, we've created workbooks which offer guidance on what 
          aspects of every Recovery Care Courses standard ought to be determined within the workplace. 
          This is far and away the foremost efficient and value effective methodology to deliver the Recovery Care 
          Courses in your organisation.
          </p>
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
        {bundle && <SingleBundleCard className="col-md-6" item={bundle} />}
    
      </div>
    </div>
  );
}

export default BundleRecover;