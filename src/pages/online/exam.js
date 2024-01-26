import React from "react";


import Header from "../../components/Layout/Header/Header";
import OnlineExam from "../../components/Home/OnlineExam";
import NoSSR from "react-no-ssr";
import NewInDash from "../../components/Sidebar/BarDummy";
import ManageBar from "../../components/Sidebar/ManagerBar";
import DashboardBar from "../../components/Sidebar/DashboardBar";
import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getToken, getUserType } from "../../axios";
import DashHeader from "../../components/Layout/Header/DasnboardHeader";

function onlineExam() {

  const [logedIn, setlogedIn] = useState(() => {
    return getUserType();
  });
  let routes = ["individual", "manager", "company"];

  const router = useRouter();

  // window.history.
  // window.addEventListener('popstate', function (event) {
  //     event.preventDefault()
  // });

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
                <DashHeader />
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
                  {getUserType() == "individual" && <NewInDash />}
                  {getUserType() == "manager" && <ManageBar />}
                  {getUserType() == "company" && <DashboardBar />}
                </div>
                  <div className="col-sm col-md-12 col-lg-11 col-xl-9 bg-white">
                    <OnlineExam /> {/* for modal */}
                  </div>
                </div>
              </div>
            </main>
          </React.Fragment>
         )} 
      </>
    );
  }
  
  export default onlineExam;
  