import React from "react";
import CourseBundle from "../../components/CourseGrid/CourseBundle";
import IndividualBar from "../../components/Sidebar/IndividualBar";
import HeaderDashboard from "../../components/Layout/Header/HeaderDashboard";
import DashMain from "../../components/Home/DashMain";
import DashArchive from "../../components/Home/DashArchive";
import Header from "../../components/Layout/Header/Header";
import BundleResource from "../../components/Home/BundleResource";
import NoSSR from "react-no-ssr";
import ManagerBar from "../../components/Sidebar/ManagerBar";
import DashboardBar from "../../components/Sidebar/DashboardBar";
import NewInDash from "../../components/Sidebar/BarDummy";
import { getToken, getUserType } from "../../axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import DashHeader from "../../components/Layout/Header/DasnboardHeader";


const bundlecourse = () => {

  history.pushState(null, null, 'no-back-course');
  
  // const [logedIn, setlogedIn] = useState(() => {
  //     return getUserType();
  //   });
  //   let routes = ["individual"]

  //   const router = useRouter();

  //   useEffect(() => {
  //     if (!routes.includes(logedIn)) {
  //       router.push("/sign-in");
  //     }
  //   }, []);
  // useEffect(() => {

  //   document.onkeydown = () => {
  //     return false;
  //   }

  //   window.addEventListener("contextmenu", e => e.preventDefault());

  // }, []);
  return (
    <>
      {/* {routes.includes(logedIn) && ( */}
      <React.Fragment>
        <main
          className="p-1"
          style={{
            backgroundImage: "linear-gradient(to right, #EDEEF3, #EDEEF3)",
          }}
        >
          <NoSSR>
            <DashHeader/>
          </NoSSR>
          <div
            className="container-fluid"
            style={{ borderRadius: "22px", marginTop: "120px" }}
          >
            <div className="row justify-content-md-center">
              <div
                className="col-sm-12 col-md-12 col-lg-2 p-0 sidebar-hidden"
                style={{ backgroundColor: "#212450" }}
              >
                {getUserType() == "individual" && <NewInDash />}
                {getUserType() == "manager" && <ManagerBar />}
                {getUserType() == "company" && <DashboardBar />}
              </div>
              <div className="col-sm col-md-12 col-lg-11 col-xl-9 bg-white">
                <BundleResource />
              </div>
            </div>
          </div>
        </main>
      </React.Fragment>
      {/* )}  */}
    </>
  );
};

export default bundlecourse;
