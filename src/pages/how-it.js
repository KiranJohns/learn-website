import React from 'react';

import Footer from '../components/Layout/Footer/Footer';
import HowItWorks from '../components/Stat/HowItWorks';
import HeaderOpaque from '../components/Layout/Header/HeaderOpaque';

class howIt extends React.Component {
    render(){
        return(
       <React.Fragment>
        <HeaderOpaque/>
        <HowItWorks/>
        <Footer/>
       </React.Fragment>
        )
    }
}


export default howIt