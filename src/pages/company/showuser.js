

import React from "react";
import CourseBundle from "../../components/CourseGrid/CourseBundle";
import DashboardBar from "../../components/Sidebar/DashboardBar";
import HeaderDashboard from "../../components/Layout/Header/HeaderDashboard";
import DashMain from "../../components/Home/DashMain";
import DashSUser from "../../components/Home/DashSUser";

class showUser extends React.Component {
    static getInitialProps({ store }) {}
    constructor(props) {
      super(props);
     
    }
  
  
    render(){    
        return(
            <React.Fragment>
                <main className="p-2"  style={{ backgroundImage: "linear-gradient(to right, #004b55 , wheat)" }}>
                 <HeaderDashboard />
                 <div className="container-fluid bg-light"> 
                  <div className="row">
                 <div className="col-5 col-md-2 bg-white vh-100 ">
                   <DashboardBar/>
                   </div>
                <div className="col-7 col-md-10">
                    
                    <DashSUser />
             </div>
         </div>       
      </div>
    </main>
  </React.Fragment>
        )
    }
}

export default showUser






// import React from "react";
// import CourseBundle from "../../components/CourseGrid/CourseBundle";
// import DashboardBar from "../../components/Sidebar/DashboardBar";
// import HeaderDashboard from "../../components/Layout/Header/HeaderDashboard";
// import DashMain from "../../components/Home/DashMain";
// import DashSUser from "../../components/Home/DashSUser";

// class showUser extends React.Component {
//     static getInitialProps({ store }) {}
//     constructor(props) {
//       super(props);
//       this.state = {
//         toggle: true, // Initialize toggle in the component state
//       };
//     }
  
//     toggle = () => {
//       this.setState((prevState) => ({ toggle: !prevState.toggle }));
//     };
//     render(){    
//         return(
//             <React.Fragment>
//                 <main className="p-2">
//                  <HeaderDashboard Toggle={this.toggle}/>
//                  <div className="container-fluid bg-light"> 
//                   <div className="row">
//                  {  this.state.toggle && <div className="col-5 col-md-2 bg-white vh-100 ">
//                    <DashboardBar/>
//                    </div>}
//                 <div className="col-7 col-md-10">
                    
//                     <DashSUser Toggle={this.toggle}/>
//              </div>
//          </div>       
//       </div>
//     </main>
//   </React.Fragment>
//         )
//     }
// }

// export default showUser