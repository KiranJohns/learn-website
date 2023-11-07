import React from "react";
import DashboardBar from "../../../components/Sidebar/DashboardBar";
import Header from "../../../components/Layout/Header/Header";
import NoSSR from "react-no-ssr";
import { useRouter } from "next/router";
import SingleCourse from "../../../components/CourseDetails/SingleCourse";

function CourseDetails() {
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
          <div className="col-sm-2 col-md-auto bg-white">
            <DashboardBar />
          </div>
          <div className="col-sm col-md-9  bg-light">
            <SingleCourse />
          </div>
        </div>
      </div>
    </main>
  );
}

export default CourseDetails;
