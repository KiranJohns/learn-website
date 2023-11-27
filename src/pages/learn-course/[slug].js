import React from "react";
import CourseBundle from "../../components/CourseGrid/CourseBundle";
import IndividualBar from "../../components/Sidebar/IndividualBar";
import HeaderDashboard from "../../components/Layout/Header/HeaderDashboard";
import DashArchive from "../../components/Home/DashArchive";
import Header from "../../components/Layout/Header/Header";
import DashIndividual from "../../components/Home/IndDashboard";
import NoSSR from "react-no-ssr";
import NewInDash from "../../components/Sidebar/BarDummy";
import { getToken, getUserType } from "../../axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import SingleCourse from "../../components/CourseDetails/SingleCourse";


function Learn() {
    const [logedIn, setlogedIn] = useState(() => {
      return getUserType();
    });
    let routes = ["individual"]
  
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
                backgroundImage: "linear-gradient(to right, #EDEEF3, #EDEEF3)",
              }}
            >
              <NoSSR>
                <Header />
              </NoSSR>
              <div
                className="container-fluid"
                style={{ borderRadius: "22px", marginTop: "120px" }}
              >
                <div className="row justify-content-md-center">
                  <div
                    className="col-sm-12 col-md-12 col-lg-2 p-0"
                    style={{ backgroundColor: "#212450" }}
                  >
                    <NewInDash />
                  </div>
                  <div className="col-sm col-md-9 bg-white">
                    <SingleCourse/>
                  </div>
                </div>
              </div>
            </main>
          </React.Fragment>
         )} 
      </>
    );
  }
  
  export default Learn;
  