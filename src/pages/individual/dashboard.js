import React from "react";
import CourseBundle from "../../components/CourseGrid/CourseBundle";
import IndividualBar from "../../components/Sidebar/IndividualBar";
import HeaderDashboard from "../../components/Layout/Header/HeaderDashboard";
import DashMain from "../../components/Home/DashMain";
import DashArchive from "../../components/Home/DashArchive";
import Header from '../../components/Layout/Header/Header';
import DashIndividual from "../../components/Home/IndDashboard";
import NoSSR from 'react-no-ssr';

class dummy extends React.Component{

    static getInitialProps({store}) {}
    constructor(props) {
        super(props);
    }
    render(){    
        return(
            <React.Fragment>
                      <main  className="p-4" style={{backgroundImage: "linear-gradient(to right, #EDEEF3, #EDEEF3)" }}>
                      <NoSSR>
                 <Header/>
                 </NoSSR>
                 <div className="container-fluid " style={{borderRadius:'22px',marginTop:"120px"}}> 
                  <div className="row justify-content-md-center">
                   <div className="col-sm-2 col-md-auto " style={{backgroundColor:'#212450'}}>
                   <IndividualBar/>
                   </div>
                <div className="col-sm col-md-9 bg-white" >
                    <DashIndividual/>
             </div>
         </div>       
      </div>
    </main>
  </React.Fragment>
        )
    }
}

export default dummy
