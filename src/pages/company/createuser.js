import React from "react";
import CourseBundle from "../../components/CourseGrid/CourseBundle";
import DashboardBar from "../../components/Sidebar/DashboardBar";
import HeaderDashboard from "../../components/Layout/Header/HeaderDashboard";
import DashMain from "../../components/Home/DashMain";
import DashCreate from "../../components/Home/DashCreate";


class CompanyDashboard extends React.Component{

    static getInitialProps({store}) {}
    constructor(props) {
        super(props);
    }
    render(){    
        return(
            <React.Fragment>
                <main className="p-2"  style={{ backgroundImage: "linear-gradient(to right, #004b55 , wheat)" }}>
                 <HeaderDashboard/>
                 <div className="container-fluid bg-light"> 
                  <div className="row">
                   <div className="col-5 col-md-2 bg-white vh-100">
                   <DashboardBar/>
                   </div>
                <div className="col-7 col-md-10">
                    <DashCreate />
             </div>
         </div>       
      </div>
    </main>
  </React.Fragment>
        )
    }
}

export default CompanyDashboard