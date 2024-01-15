
import React from 'react';
import HeaderOpaque from '../components/Layout/Header/HeaderOpaque';
import Footer from '../components/Layout/Footer/Footer';
import Faq from '../components/About/faqMain';
import NoSSR from 'react-no-ssr';

class FaqPage extends React.Component {

    static getInitialProps({store}) {}

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
            <NoSSR>
            <HeaderOpaque/>
            </NoSSR>
            <Faq />
            <div className='mt-10'>
            <Footer />
            </div>
    
            </React.Fragment>
        );
    }
}


export default FaqPage;

