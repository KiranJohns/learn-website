

import React from "react";
import CourseBundle from "../../components/CourseGrid/CourseBundle";
import DashboardBar from "../../components/Sidebar/DashboardBar";
import HeaderDashboard from "../../components/Layout/Header/HeaderDashboard";
import DashTest from "../../components/Home/DashTest";
import NoSSR from 'react-no-ssr';


class TestCourse extends React.Component {
  static getInitialProps({ store }) { }
  constructor(props) {
    super(props);

  }


  render() {
    return (
      <React.Fragment>
        <main className="p-4" style={{ backgroundImage: "linear-gradient(to right, #EDEEF3, #EDEEF3)" }}>
          <NoSSR>
            <HeaderDashboard />
          </NoSSR>
          <div className="container-fluid bg-light " style={{ borderRadius: '22px' }}>
            <div className="row">
              <div className="col-5 col-md-2 bg-white vh-100" style={{ borderRadius: '22px' }}>
                <DashboardBar />
              </div>
              <div className="col-7 col-md-10 ">
                <DashTest />

              </div>
            </div>
          </div>
        </main>
      </React.Fragment>
    )
  }
}

export default TestCourse

