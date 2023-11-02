import React from 'react';
import FooterThree from '../components/Layout/Footer/FooterStyleThree';
import SignInMain from '../components/SignIn/SignInMain';
import HeaderFour from '../components/Layout/Header/HeaderStyleFour';
import Header from '../components/Layout/Header/Header';
import Footer from '../components/Layout/Footer/Footer';
import FooterPad from '../components/Layout/Footer/FooterLess';
import NoSSR from 'react-no-ssr';

class SignIn extends React.Component {

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
            <SignInMain />
            <FooterPad />
            </React.Fragment>
        );
    }
}


export default SignIn;