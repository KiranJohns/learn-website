import React from "react";
import CourseBundle from "../../components/CourseGrid/CourseBundle";
import DashboardBar from "../../components/Sidebar/DashboardBar";
import HeaderDashboard from "../../components/Layout/Header/HeaderDashboard";
import DashCertificate from "../../components/Home/DashCertificate";
import Header from '../../components/Layout/Header/Header';
import NoSSR from 'react-no-ssr';

class MyCertificate extends React.Component{

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
                    <DashCertificate />
             </div>
         </div>       
      </div>
    </main>
  </React.Fragment>
        )
    }
}

export default MyCertificate




