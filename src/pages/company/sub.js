import React from "react";
import CourseBundle from "../../components/CourseGrid/CourseBundle";
import DashboardBar from "../../components/Sidebar/DashboardBar";
import HeaderDashboard from "../../components/Layout/Header/HeaderDashboard";
import DashMain from "../../components/Home/DashMain";
import Accordion from 'react-bootstrap/Accordion';
import Header from "../../components/Layout/Header/Header";
import Footer from '../../components/Layout/Footer/Footer';
import NoSSR from 'react-no-ssr';

class CompanyDashboard extends React.Component {
  static getInitialProps({ store }) {}
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <main className="p-4" style={{backgroundImage: "linear-gradient(to right, #EDEEF3, #EDEEF3)" }}>
        <NoSSR>
          <Header />  
          </NoSSR>
          <div className="container-fluid bg-light" style={{borderRadius:'22px',marginTop:'100px'}}>
            <div className="row" >
              <div className="col-5 col-md-2 bg-white" style={{borderRadius:'22px'}}>
                <NoSSR>
                <DashboardBar />
                </NoSSR>
              </div>
              <div className="col-7 col-md-10 ">
                <DashMain />
              </div>
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default CompanyDashboard;





