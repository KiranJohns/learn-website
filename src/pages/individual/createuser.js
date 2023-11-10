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

function CompanyDashboard() {
  //   static getInitialProps({ store }) {}
  //   constructor(props) {
  //     super(props);
  //   }
  const [logedIn, setlogedIn] = useState(() => {
    return getUserType();
  });

  const router = useRouter();

  useEffect(() => {
    if (logedIn !== "individual") {
      router.push("/sign-in");
    }
  }, []);
  return (
    <>
    {logedIn === "individual" && <React.Fragment>
      <main
        className="p-4"
        style={{
          backgroundImage: "linear-gradient(to right, #EDEEF3, #EDEEF3)",
        }}
      >
        <NoSSR>
          <Header />
        </NoSSR>
        <div className="container-fluid " style={{ marginTop: "120px" }}>
          <div className="row justify-content-md-center">
            <div className="col-sm-2 col-md-auto bg-white ">
              <DashboardBar />
            </div>
            <div className="col-sm col-md-8 vh-100 bg-light">
              <DashCreate />
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>}
    </>
  );
}

export default CompanyDashboard;

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
