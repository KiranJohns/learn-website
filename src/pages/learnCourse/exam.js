import React from "react";

import NewInDash from "../../components/Sidebar/BarDummy";
import Header from "../../components/Layout/Header/Header";
import NewExam from "../../components/Home/NewExam";
import NoSSR from "react-no-ssr";
import NewInDash from "../../components/Sidebar/BarDummy";
import ManageBar from "../../components/Sidebar/ManagerBar";
import DashboardBar from "../../components/Sidebar/DashboardBar";
import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getToken, getUserType } from "../../axios";

function exam() {
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
                    <NewExam/>
                  </div>
                </div>
              </div>
            </main>
          </React.Fragment>
        )}
      </>
    );
  }
  
  export default exam;
  