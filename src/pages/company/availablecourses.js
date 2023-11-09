import React from "react";
import CourseBundle from "../../components/CourseGrid/CourseBundle";
import DashboardBar from "../../components/Sidebar/DashboardBar";
import HeaderDashboard from "../../components/Layout/Header/HeaderDashboard";
import DashCAvail from "../../components/Home/DashCAvail";
import Header from "../../components/Layout/Header/Header";
import NoSSR from "react-no-ssr";
import { getToken } from "../../axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import { Auth } from "../auth";

function courseavailable() {
    const [logedIn, setlogedIn] = useState(() => {
        return getToken() ? true : false;
      });
    
      const router = useRouter();
    
      console.log(logedIn);
      useEffect(() => {
        if (!logedIn) {
          router.push("/sign-in");
        }
      }, []);

  return (
    <>
      {logedIn && <React.Fragment>
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
                <DashCAvail />
              </div>
            </div>
          </div>
        </main>
      </React.Fragment>}
    </>
  );
}

export default courseavailable;

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
