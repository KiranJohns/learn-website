import React from "react";
import CourseBundle from "../../components/CourseGrid/CourseBundle";
import DashboardBar from "../../components/Sidebar/DashboardBar";
import HeaderDashboard from "../../components/Layout/Header/HeaderDashboard";
import DashProfile from "../../components/HomeThree/DashProfile"

class CompanyDashboard extends React.Component {
  static getInitialProps({ store }) {}
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <main className="p-2" style={{ backgroundImage: "linear-gradient(to right, #004b55 , wheat)" }}>
          <HeaderDashboard />  
          <div className="container-fluid bg-light" >
            <div className="row">
              <div className="col-5 col-md-2  bg-white"style={{}}>
                <DashboardBar />
              </div>
              <div className="col-7 col-md-10">
                <DashProfile />
              </div>
            </div>
          </div>
        </main>
    
    );
  }
}

export default CompanyDashboard;
