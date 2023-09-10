import React from "react";
import CourseBundle from "../../components/CourseGrid/CourseBundle";
import DashboardBar from "../../components/Sidebar/DashboardBar";
import HeaderDashboard from "../../components/Layout/Header/HeaderDashboard";
import DashMain from "../../components/Home/DashMain";


class CompanyDashboard extends React.Component{

    static getInitialProps({store}) {}
    constructor(props) {
        super(props);
    }
    render(){    
        return(
            <React.Fragment>
                <main className="p-2">
                 <HeaderDashboard/>
                 <div className="container-fluid bg-light"> 
                  <div className="row">
                   <div className="col-5 col-md-2 bg-white vh-100">
                   <DashboardBar/>
                   </div>
                <div className="col-7">
                    <DashMain />
             </div>
         </div>       
      </div>
    </main>
  </React.Fragment>
        )
    }
}

export default CompanyDashboard