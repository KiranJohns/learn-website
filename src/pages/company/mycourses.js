import React, { useEffect, useState } from "react";
import CourseBundle from "../../components/CourseGrid/CourseBundle";
import DashboardBar from "../../components/Sidebar/DashboardBar";
import HeaderDashboard from "../../components/Layout/Header/HeaderDashboard";
import DashMain from "../../components/Home/DashMain";
import DashCourse from "../../components/Home/DashCourse";
import Header from "../../components/Layout/Header/Header";
import NoSSR from "react-no-ssr";
import { getUserType } from "../../axios";
import { useRouter } from "next/router";
import Spinner from 'react-bootstrap/Spinner';
import DashHeader from "../../components/Layout/Header/DasnboardHeader";


function myCourse() {
  const [loading, setLoading] = useState(true);
  const [logedIn, setlogedIn] = useState(() => {
    return getUserType();
  });

  const router = useRouter();

  useEffect(() => {
    // let timer = setTimeout(() => {
    //   setLoading(false);
    // }, 1700);
    if (logedIn !== "company") {
      router.push("/sign-in");
    }
    // return () => {
    //   clearTimeout(timer);
    // };
  }, []);

  return (
    <>
      {logedIn === "company" && (
        <>
          {/* <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: 'fixed',
              top: '0',
              left: '0',
              backgroundColor: 'white',
              zIndex: loading ? '1001': '-1'
            }}
          >
            <Spinner animation="grow" variant="primary" />
          </div> */}
          <React.Fragment>
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
                  <div className="col-sm col-md-12 col-lg-11 col-xl-9 bg-white">
                    <DashCourse />
                  </div>
                </div>
              </div>
            </main>
          </React.Fragment>
        </>
      )}
    </>
  );
}

export default myCourse;

// import React from "react";
// import CourseBundle from "../../components/CourseGrid/CourseBundle";
// import DashboardBar from "../../components/Sidebar/DashboardBar";
// import HeaderDashboard from "../../components/Layout/Header/HeaderDashboard";
// import DashCertificate from "../../components/Home/DashCertificate";

// class MyCertificate extends React.Component{

//     static getInitialProps({store}) {}
//     constructor(props) {
//         super(props);
//     }
//     render(){
//         return(
//             <React.Fragment>
//                 <main className="p-4" style={{backgroundImage: "linear-gradient(to right, #EDEEF3, #EDEEF3)" }}>
//                  <HeaderDashboard/>
//                  <div className="container-fluid bg-light " style={{borderRadius:'22px'}}>
//                   <div className="row">
//                    <div className="col-5 col-md-2 bg-white " style={{borderRadius:'22px'}}>
//                    <DashboardBar/>
//                    </div>
//                 <div className="col-7 col-md-10">
//                     <DashCertificate />
//              </div>
//          </div>
//       </div>
//     </main>
//   </React.Fragment>
//         )
//     }
// }

// export default MyCertificate
