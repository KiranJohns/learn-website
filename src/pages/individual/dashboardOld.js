import React from 'react';
import HeaderOpaque from '../../components/Layout/Header/HeaderOpaque';
import Header from '../../components/Layout/Header/Header';
import Footer from '../../components/Layout/Footer/Footer';
import DashTest from '../../components/Home/DashTest';
import DashIndividual from '../../components/Home/IndDashboard';
import NoSSR from 'react-no-ssr';

class Lsub extends React.Component {

    static getInitialProps({store}) {}

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
        <NoSSR>
            <Header />
        </NoSSR>
            <div style={{marginTop:"120px", marginBottom:"60px"}}>
            <DashIndividual/>
            </div>
            <Footer />
            </React.Fragment>
        );
    }
}


export default Lsub;