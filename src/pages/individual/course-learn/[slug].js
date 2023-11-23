import React, { useEffect } from "react";
import NewInDash from "../../../components/Sidebar/BarDummy";
import Header from "../../../components/Layout/Header/Header";
import NoSSR from "react-no-ssr";
import { useRouter } from "next/router";
import SingleCourse from "../../../components/CourseDetails/SingleCourse";
import fetchData from "../../../axios";
import { useState } from "react";

function LearnPage() {
  return (
    <main
      className="p-4"
      style={{ backgroundImage: "linear-gradient(to right, #EDEEF3, #EDEEF3)" }}
    >
      <NoSSR>
        <Header />
      </NoSSR>
      <div
        className="container-fluid "
        style={{ borderRadius: "22px", marginTop: "120px" }}
      >
        <div className="row justify-content-md-center">
          <div className="col-sm-12 col-md-12 col-lg-2 p-0" style={{ backgroundColor: "#212450" }}>
            <NewInDash />
          </div>
          <div className="col-sm col-md-9 bg-white">
      
            <SingleCourse  />
          
          </div>
        </div>
      </div>
    </main>
  );
}

export default LearnPage;
