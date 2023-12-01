import React, { Component, useState } from "react";
import Link from "next/link";
import SingleCourseBundle from "../Elements/Tab/SingleCourseBundle";
import CourseCard from "../Elements/Tab/CourseCard";
import { useEffect } from "react";
import fetchData from "../../axios";
import BundleCard from "../Elements/Tab/BundleCard";

function BundleOnline({ name }) {
  const [fakeCount, setFakeCount] = useState(0);
  const [bundle, setBundle] = useState({});
  const makeRequest = fetchData()
  useEffect(() => {
    makeRequest("GET","/bundle/get-all-bundles").then(res => {
      console.log(res , name);
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
          <h1 style={{ marginBottom: "1rem" }}>Online Care Course Bundle Package</h1>
          <h1></h1>
          <p>
          In our “Online Care Course – Bundle Package”, Learning Connect offers 30+ 
          CPD accredited online care courses, which staff can do at their own pace. 
          All courses also linked to requirements for Regulated Qualifications Framework units.
          </p>
          <p>
          Company (Admin) can purchase as many as “Online Care Course – Bundle Package” they want. 
          There is no expiry date on the “Online Care Course – Bundle Package” until unless it is assigned to the company user (Individual) 
          Or Company Manager. For instance, you purchased 500 “Online Care Course – Bundle Package” & assigned only 400 “Online Care Course – 
          Bundle Package”. Still, you have 100 “Online Care Course – Bundle Package” to assign anytime, anywhere. There is no time restriction.
          </p>
       
        
        </div>
         <div className="col-md-2"></div>

        {bundle && <BundleCard className="col-md-6 " item={bundle} />}
    
      </div>
    </div>
  );
}

export default BundleOnline;