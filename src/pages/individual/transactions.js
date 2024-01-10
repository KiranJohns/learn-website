import React, { useEffect, useState } from "react";
import CourseBundle from "../../components/CourseGrid/CourseBundle";
import DashboardBar from "../../components/Sidebar/DashboardBar";
import HeaderDashboard from "../../components/Layout/Header/HeaderDashboard";
import DashMain from "../../components/Home/DashMain";
import Transaction from "../../components/Home/IndTransaction";
import Header from "../../components/Layout/Header/Header";
import IndividualBar from "../../components/Sidebar/IndividualBar";
import NoSSR from "react-no-ssr";
import NewInDash from "../../components/Sidebar/BarDummy";
import { getUserType } from "../../axios";
import { useRouter } from "next/router";
import DashHeader from "../../components/Layout/Header/DasnboardHeader";

function transaction() {
  const [logedIn, setlogedIn] = useState(() => {
    return getUserType();
  });
  let routes = ["individual", "sub_user"]

  const router = useRouter();

  useEffect(() => {
    if (!routes.includes(logedIn)) {
      router.push("/sign-in");
    }
  }, []);
  return (
    <>
      {routes.includes(logedIn)&& <React.Fragment>
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
            className="container-fluid "
            style={{ borderRadius: "22px", marginTop: "120px" }}
          >
            <div className="row justify-content-md-center">
              <div
                className="col-sm-12 col-md-12 col-lg-2 p-0 sidebar-hidden"
                style={{ backgroundColor: "#212450" }}
              >
                <NewInDash />
              </div>
              <div className="col-sm col-md-12 col-lg-11 col-xl-9  bg-white">
                <Transaction />
              </div>
            </div>
          </div>
        </main>
      </React.Fragment>}
    </>
  );
}

export default transaction;
