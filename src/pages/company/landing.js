

import React from "react";
import CourseBundle from "../../components/CourseGrid/CourseBundle";
import BarD1 from "../../components/Sidebar/BarD1";
import HeadD1 from "../../components/Layout/Header/HeadD1";
import DashTest from "../../components/Home/DashTest";
import Header from "../../components/Layout/Header/Header";
import Footer from '../../components/Layout/Footer/Footer';
import Profilesmall from "../../components/Home/profilesmall";

class TestCourse extends React.Component {
    static getInitialProps({ store }) {}
    constructor(props) {
      super(props);
     
    }
  
  
    render(){    
        return(
            <React.Fragment>
                <main className="p-4" style={{backgroundImage: "linear-gradient(to right, #EDEEF3, #EDEEF3)", }}>
                 <Header/>
                 <div className="container-fluid bg-light " style={{borderRadius:'22px'}}> 
                  <div style={{marginTop:'120px'}} className="row">
                    <div className="col-0 col-md-1  vh-100" style={{background:"#EDEEF3",}}></div>
                 <div className="col-4 col-md-2 bg-white vh-100">
                   <BarD1/>
                   </div>
                <div className="col-7 col-md-8 ">
                {/* <DashTest/> */}
                <Profilesmall/>
             </div>
             <div className="col-0 col-md-1  vh-100" style={{background:"#EDEEF3"}}></div>
         </div>       
      </div>
      {/* <Footer/>   */}
    </main>
  </React.Fragment>
        )
    }
}

export default TestCourse