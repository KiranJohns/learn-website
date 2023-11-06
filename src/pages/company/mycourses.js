import React from "react";
import CourseBundle from "../../components/CourseGrid/CourseBundle";
import DashboardBar from "../../components/Sidebar/DashboardBar";
import HeaderDashboard from "../../components/Layout/Header/HeaderDashboard";
import DashMain from "../../components/Home/DashMain";
import DashCourse from "../../components/Home/DashCourse";
import Header from '../../components/Layout/Header/Header';
import NoSSR from 'react-no-ssr';



class myCourse extends React.Component{

    static getInitialProps({store}) {}
    constructor(props) {
        super(props);
    }
    render(){    
        return(
            <React.Fragment>
                <main  className="p-4 bg-light" style={{ }}>
                <NoSSR>
                 <Header/>
                 </NoSSR>
                 <div className="container-fluid " style={{borderRadius:'22px',marginTop:"120px"}}> 
                  <div className="row justify-content-md-center">
                   <div className="col-sm-2 col-md-auto bg-primary" >
                   <DashboardBar/>
                   </div>
                <div className="col-sm col-md-9  bg-white">
                    <DashCourse />
             </div>
         </div>       
      </div>
    </main>
  </React.Fragment>
        )
    }
}

export default myCourse







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