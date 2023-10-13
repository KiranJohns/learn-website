import React from "react";
import CourseBundle from "../../components/CourseGrid/CourseBundle";
import DashboardBar from "../../components/Sidebar/DashboardBar";
import HeaderDashboard from "../../components/Layout/Header/HeaderDashboard";
import DashMain from "../../components/Home/DashMain";
import DashArchive from "../../components/Home/DashArchive";
import Header from '../../components/Layout/Header/Header';

class archive extends React.Component{

    static getInitialProps({store}) {}
    constructor(props) {
        super(props);
    }
    render(){    
        return(
            <React.Fragment>
                <main className="p-4" style={{backgroundImage: "linear-gradient(to right, #EDEEF3, #EDEEF3)" }}>
                 <Header/>
                 <div className="container-fluid bg-light " style={{borderRadius:'22px',marginTop:"120px"}}> 
                  <div className="row">
                   <div className="col-5 col-md-2 bg-white " style={{borderRadius:'22px'}}>
                   <DashboardBar/>
                   </div>
                <div className="col-7 col-md-10">
                    
                    <DashArchive/>
             </div>
         </div>       
      </div>
    </main>
  </React.Fragment>
        )
    }
}

export default archive




