
import React from 'react';
import HeaderOpaque from '../components/Layout/Header/HeaderOpaque';
import Footer from '../components/Layout/Footer/Footer';
import Terms from '../components/About/TermsMain';
import NoSSR from 'react-no-ssr';

class TermsPage extends React.Component {

    static getInitialProps({store}) {}

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
            <NoSSR>
            <HeaderOpaque key="Conditions Terms Complaint learnforcare"/>
            </NoSSR>
            <Terms />
            <div className='mt-10'>
            <Footer />
            </div>
    
            </React.Fragment>
        );
    }
}


export default TermsPage;
