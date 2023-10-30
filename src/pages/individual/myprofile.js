import React from "react";
import CourseBundle from "../../components/CourseGrid/CourseBundle";
import DashboardBar from "../../components/Sidebar/DashboardBar";
import HeaderDashboard from "../../components/Layout/Header/HeaderDashboard";
import DashMain from "../../components/Home/DashMain";
import DashProfile from "../../components/Home/DashProfile";
import Header from '../../components/Layout/Header/Header';
import Footer from '../../components/Layout/Footer/Footer';
import IndividualBar from "../../components/Sidebar/IndividualBar";
import NoSSR from 'react-no-ssr';
class MyProfile extends React.Component{

    static getInitialProps({store}) {}
    constructor(props) {
        super(props);       
    }
    render(){    
        return(
            <React.Fragment>
                <main className="p-4" style={{backgroundImage: "linear-gradient(to right, #EDEEF3, #EDEEF3)" }}>
            <NoSSR>
                 <Header />
             </NoSSR>
                 <div className="container-fluid " style={{marginTop:"110px"}}> 
                  <div className="row justify-content-md-center">
                   <div className="col-sm-2 col-md-auto bg-white " >
                   <IndividualBar/>
                   </div>
                <div className="col-sm col-md-8 vh-100 bg-light" >
                    <DashProfile />
             </div>
         </div>       
      </div>
    </main>
  </React.Fragment>
        )
    }
}

export default MyProfile




// import React from "react";
// import CourseBundle from "../../components/CourseGrid/CourseBundle";
// import DashboardBar from "../../components/Sidebar/DashboardBar";
// import HeaderDashboard from "../../components/Layout/Header/HeaderDashboard";
// import DashMain from "../../components/Home/DashMain";
// import Accordion from 'react-bootstrap/Accordion';

// class CompanyDashboard extends React.Component {
//   static getInitialProps({ store }) {}
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return (
//       <React.Fragment>
//         <main className="p-4" style={{backgroundImage: "linear-gradient(to right, #ededed, #ededed)" }}>
//           <HeaderDashboard />  
//           <div className="container-fluid bg-light" style={{borderRadius:'25px'}}>
//             <div className="row" >
//               <div className="col-5 col-md-2 bg-white" style={{borderRadius:'25px'}}>
//                 <DashboardBar />
//               </div>
//               <div className="col-7 col-md-10 ">
//                 <DashMain />
//               </div>
//             </div>
//           </div>
//         </main>
//       </React.Fragment>
//     );
//   }
// }

// export default CompanyDashboard;