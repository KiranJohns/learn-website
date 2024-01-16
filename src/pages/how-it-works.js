import React from 'react';

import Footer from '../components/Layout/Footer/Footer';
import HowItWorks from '../components/Stat/HowItWorks';
import HeaderOpaque from '../components/Layout/Header/HeaderOpaque';
import FooterPad from '../components/Layout/Footer/FooterLess';
import NoSSR from 'react-no-ssr';

class howIt extends React.Component {
    render(){
        return(
       <React.Fragment>
        <NoSSR>
        <HeaderOpaque/>
        </NoSSR>
        <HowItWorks/>
        <FooterPad/>
       </React.Fragment>
        )
    }
}


export default howIt