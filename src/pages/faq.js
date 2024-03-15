
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
            <HeaderOpaque pageTitle="Frequently asked questions by our customers" descr="Care courses online CPD Courses Sova training,Wellness Recovery Action Plan (WRAP), Care course, Online care course, care mandatory training, Sova,buccal"/>
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

