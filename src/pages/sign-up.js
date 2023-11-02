import React from 'react';
import FooterThree from '../components/Layout/Footer/FooterStyleThree';
import HeaderFour from '../components/Layout/Header/HeaderStyleFour';
import SignUpMain from '../components/SignUp/SignUpMain';
import Header from '../components/Layout/Header/Header';
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
            <SignUpMain />
            <FooterPad />
            </React.Fragment>
        );
    }
}


export default SignIn;