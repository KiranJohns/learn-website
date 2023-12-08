import React from "react";

import Header from "../../components/Layout/Header/Header";
import NewResult from "../../components/Home/NewResult";
import NoSSR from "react-no-ssr";
import NewInDash from "../../components/Sidebar/BarDummy";
import ManageBar from "../../components/Sidebar/ManagerBar";
import DashboardBar from "../../components/Sidebar/DashboardBar";
import AttemptsExam from "../../components/Home/AttemptsExam";
import { getToken, getUserType } from "../../axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";

function result() {
  const [logedIn, setlogedIn] = useState(() => {
    return getUserType();
  });
  let routes = ["individual", "manager", "company"];

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
                  {getUserType() == "individual" && <NewInDash />}
                  {getUserType() == "manager" && <ManageBar />}
                  {getUserType() == "company" && <DashboardBar />}
                </div>
                  <div className="col-sm col-md-9 bg-white">
                    <NewResult/>
                  </div>
                </div>
              </div>
            </main>
          </React.Fragment>
        )} 
      </>
    );
  }
  
  export default result;
  