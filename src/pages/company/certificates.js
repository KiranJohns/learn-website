import React, { useEffect, useState } from "react";
import CourseBundle from "../../components/CourseGrid/CourseBundle";
import DashboardBar from "../../components/Sidebar/DashboardBar";
import HeaderDashboard from "../../components/Layout/Header/HeaderDashboard";
import DashCertificate from "../../components/Home/DashCertificate";
import Header from "../../components/Layout/Header/Header";
import NoSSR from "react-no-ssr";
import { getUserType } from "../../axios";
import { useRouter } from "next/router";
import DashHeader from "../../components/Layout/Header/DasnboardHeader";

function MyCertificate() {
  const [logedIn, setlogedIn] = useState(() => {
    return getUserType();
  });

  const router = useRouter();

  useEffect(() => {
    if (logedIn !== "company") {
      router.push("/sign-in");
    }
  }, []);
  return (
    <>
    {logedIn === "company" && <React.Fragment>
      <main
        className="p-1"
        style={{
          backgroundImage: "linear-gradient(to left, #EDEEF3, #EDEEF3)",
        }}
      >
          <NoSSR>
              <DashHeader/>
            </NoSSR>
        <div
          className="container-fluid "
          style={{ borderRadius: "22px", marginTop: "120px" }}
        >
          <div className="row justify-content-md-center">
            <div
              className="col-sm-12 col-md-12 col-lg-2 p-0 sidebar-hidden"
              style={{ backgroundColor: "#212450" }}
            >
              <DashboardBar />
            </div>
            <div className="col-sm col-md-12 col-lg-11 col-xl-9  bg-white">
              <DashCertificate />
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
    }</>
  );
}

export default MyCertificate;
