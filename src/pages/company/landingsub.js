import React from 'react';
import HeaderOpaque from '../../components/Layout/Header/HeaderOpaque';
import Header from '../../components/Layout/Header/Header';
import Footer from '../../components/Layout/Footer/Footer';
import DashTest from '../../components/Home/DashTest';


class Lsub extends React.Component {

    static getInitialProps({store}) {}

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
            <Header />
            <div style={{marginTop:"90px"}}>
            <DashTest />
            </div>
            <Footer />
            </React.Fragment>
        );
    }
}


export default Lsub;