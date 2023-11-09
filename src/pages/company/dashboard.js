import React from "react";
import CourseBundle from "../../components/CourseGrid/CourseBundle";
import DashboardBar from "../../components/Sidebar/DashboardBar";
import HeaderDashboard from "../../components/Layout/Header/HeaderDashboard";
import DashMain from "../../components/Home/DashMain";
import DashCourse from "../../components/Home/DashCourse";
import Header from "../../components/Layout/Header/Header";
import NoSSR from "react-no-ssr";
import DashTest from "../../components/Home/DashTest";
import { Auth } from "../auth";
import { useState } from "react";
import { getToken } from "../../axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

function dashboard() {
  const [logedIn, setlogedIn] = useState(() => {
    return getToken() ? true : false;
  });

  const router = useRouter();

  useEffect(() => {
    if (!logedIn) {
      router.push("/sign-in");
    }
  }, []);
  return (
    <>
    {logedIn && <React.Fragment>
      <main
        className="p-1"
        style={{
          backgroundImage: "linear-gradient(to left, #EDEEF3, #EDEEF3)",
        }}
      >
        <NoSSR>
          <Header />
        </NoSSR>
        <div
          className="container-fluid "
          style={{ borderRadius: "22px", marginTop: "120px" }}
        >
          <div className="row justify-content-md-center">
            <div
              className="col-sm-12 col-md-12 col-lg-2 p-0"
              style={{ backgroundColor: "#212450" }}
            >
              <DashboardBar />
            </div>
            <div className="col-sm col-md-9 bg-white">
              <DashTest />
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>}
    </>
  );
}

export default dashboard;
