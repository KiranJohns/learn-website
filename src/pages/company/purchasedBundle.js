import React from "react";
import CourseBundle from "../../components/CourseGrid/CourseBundle";
import DashboardBar from "../../components/Sidebar/DashboardBar";
import HeaderDashboard from "../../components/Layout/Header/HeaderDashboard";
import DashAssign from "../../components/Home/DashAssign";
import Header from "../../components/Layout/Header/Header";
import NoSSR from "react-no-ssr";
import { useState } from "react";
import { getUserType } from "../../axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import CompAssignBund from "../../components/Home/CompBundAssign";

function assignBundle() {
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
      {logedIn === "company" && (
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
                  <DashboardBar />
                </div>
                <div className="col-sm col-md-9  bg-white">
                  <CompAssignBund /> 
                </div>
              </div>
            </div>
          </main>
        </React.Fragment>
      )}
    </>
  );
}

export default assignBundle;
