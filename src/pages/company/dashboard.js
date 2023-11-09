import React from "react";
import CourseBundle from "../../components/CourseGrid/CourseBundle";
import DashboardBar from "../../components/Sidebar/DashboardBar";
import HeaderDashboard from "../../components/Layout/Header/HeaderDashboard";
import DashMain from "../../components/Home/DashMain";
import DashCourse from "../../components/Home/DashCourse";
import Header from "../../components/Layout/Header/Header";
import NoSSR from "react-no-ssr";
import DashTest from "../../components/Home/DashTest";
import { Auth } from "../auth";

class dashboard extends React.Component {
  static getInitialProps({ store }) {}
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Auth>
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
                <DashTest />
              </div>
            </div>
          </div>
        </main>
      </Auth>
    );
  }
}

export default dashboard;
