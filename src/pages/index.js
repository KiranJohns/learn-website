import React from 'react';
import Header from '../components/Layout/Header/Header';
import Footer from '../components/Layout/Footer/Footer';
import HomeMain from '../components/Home/HomeMain';
import HeaderOpaque from '../components/Layout/Header/HeaderOpaque';
import NoSSR from 'react-no-ssr';
import dynamic from 'next/dynamic';


class Index extends React.Component {

    static getInitialProps({store}) {}

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
            <NoSSR>
            <Header pageTitle="Learn for Care CQC Complaint online courses wrap training" descr="CQC Complaint Care courses. CPD Courses Paediatric First Aid, Wellness Recovery Action Plan (WRAP), Mental Capacity Act and DoLS"/>
            </NoSSR>        
            <HomeMain />
            <Footer />
            </React.Fragment>
        );
    }
}


export default Index;

