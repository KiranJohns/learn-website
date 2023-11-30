import React from "react";
import CourseBundle from "../../components/CourseGrid/CourseBundle";

import ManageBar from "../../components/Sidebar/ManagerBar";
import HeaderDashboard from "../../components/Layout/Header/HeaderDashboard";
import DashMain from "../../components/Home/DashMain";
import DashCourse from "../../components/Home/DashCourse";
import Header from "../../components/Layout/Header/Header";
import ManageCreateU from "../../components/Home/ManageCUser";
import NoSSR from "react-no-ssr";
import DashTest from "../../components/Home/DashTest";
import { Auth } from "../auth";
import { useState } from "react";
import { getToken, getUserType } from "../../axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Sidebar from "../../components/Sidebar/SampleSidebar";

function createUser() {
  const [logedIn, setlogedIn] = useState(() => {
    return getUserType();
  });
  let routes = ["manager"]

  const router = useRouter();

  useEffect(() => {
    if (!routes.includes(logedIn)) {
      router.push("/sign-in");
    }
  }, []);
  return (
    <>
      {routes.includes(logedIn) && (
        <React.Fragment>
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
                  <ManageBar />
                </div>
                <div className="col-sm col-md-9 bg-white">
                  <ManageCreateU />
                </div>
              </div>
            </div>
          </main>
        </React.Fragment>
      )} 
    </>
  );
}

export default createUser;
