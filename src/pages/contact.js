import React from 'react';
import ContactMain from '../components/Contact/ContactMain';
import HeaderThree from '../components/Layout/Header/HeaderStyleThree';
import FooterThree from '../components/Layout/Footer/FooterStyleThree';
import HeaderOpaque from '../components/Layout/Header/HeaderOpaque';
import Footer from '../components/Layout/Footer/Footer';
import Footer from '../components/Layout/Footer/Footer';
import NoSSR from 'react-no-ssr';
class Contact extends React.Component {

    static getInitialProps({store}) {}

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
             <NoSSR>
            <HeaderOpaque />
            </NoSSR>
            <ContactMain />
            <Footer />
            </React.Fragment>
        );
    }
}


export default Contact;

