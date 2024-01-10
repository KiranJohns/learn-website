import React, { useEffect, useState } from "react";
import CourseBundle from "../../components/CourseGrid/CourseBundle";
import DashboardBar from "../../components/Sidebar/DashboardBar";
import HeaderDashboard from "../../components/Layout/Header/HeaderDashboard";
import DashMain from "../../components/Home/DashMain";
import DashCreate from "../../components/Home/DashCreate";
import Header from "../../components/Layout/Header/Header";
import NoSSR from "react-no-ssr";
import { getUserType } from "../../axios";
import { useRouter } from "next/router";
import DashHeader from "../../components/Layout/Header/DasnboardHeader";


function CompanyCreate() {
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
              <DashHeader />
            </NoSSR>
            <div className="container-fluid " style={{ marginTop: "120px" }}>
              <div className="row justify-content-md-center">
                <div
                  className="col-sm-12 col-md-12 col-lg-2 p-0 sidebar-hidden"
                  style={{ backgroundColor: "#212450" }}
                >
                  <DashboardBar />
                </div>
                <div className="col-sm col-md-12 col-lg-11 col-xl-9 bg-white">
                  <DashCreate />
                </div>
              </div>
            </div>
          </main>
        </React.Fragment>
      )}
    </>
  );
}

export default CompanyCreate;

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
