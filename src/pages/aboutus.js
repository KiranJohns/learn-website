import React from 'react';
import HeaderOpaque from '../components/Layout/Header/HeaderOpaque';
import Footer from '../components/Layout/Footer/Footer';
import AboutMain from '../components/About/AboutMain';
import NoSSR from 'react-no-ssr';

class AboutPage extends React.Component {

    static getInitialProps({store}) {}

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
            <NoSSR>
            <HeaderOpaque pageTitle="Dementia care courses,online care course, Care certificate courses"/>
            </NoSSR>
            <AboutMain />
            <Footer />
            </React.Fragment>
        );
    }
}


export default AboutPage;

