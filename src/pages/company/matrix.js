import React from "react";
import CourseBundle from "../../components/CourseGrid/CourseBundle";
import DashboardBar from "../../components/Sidebar/DashboardBar";
import HeaderDashboard from "../../components/Layout/Header/HeaderDashboard";
import DashMain from "../../components/Home/DashMain";
import DashCourse from "../../components/Home/DashCourse";
import Header from "../../components/Layout/Header/Header";
import NoSSR from "react-no-ssr";
import DashTest from "../../components/Home/DashTest";
import DashMatrix from "../../components/Home/DashMatrix";

class matrix extends React.Component {
  static getInitialProps({ store }) {}
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <main
          className="p-4"
          style={{
            backgroundImage: "linear-gradient(to right, #EDEEF3, #EDEEF3)",
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
              <div className="col-sm-2 col-md-auto bg-white">
                <DashboardBar />
              </div>
              <div className="col-sm col-md-9  bg-light">
                <DashMatrix />
              </div>
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default matrix;
