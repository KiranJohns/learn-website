import React from 'react';
import Header from '../components/Layout/Header/Header';
import FooterThree from '../components/Layout/Footer/FooterStyleThree';
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
            <Header/>
            </NoSSR>
            <AboutMain />
            <FooterThree />
            </React.Fragment>
        );
    }
}


export default AboutPage;

