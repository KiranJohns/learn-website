import React from 'react';
import ContactMain from '../components/Contact/ContactMain';
import HeaderThree from '../components/Layout/Header/HeaderStyleThree';
import FooterThree from '../components/Layout/Footer/FooterStyleThree';
import HeaderOpaque from '../components/Layout/Header/HeaderOpaque';
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
            <HeaderOpaque pageTitle="Contact Us: Learn For Care" descr="Get in touch with us for any inquiries, feedback, or assistance you may need. Our dedicated team is here to help address your questions."/>
            </NoSSR>
            <ContactMain />
            <Footer />
            </React.Fragment>
        );
    }
}


export default Contact;

