import React from 'react';
import FooterThree from '../components/Layout/Footer/FooterStyleThree';
// import SignInMain from '../components/SignIn/SignInMain';
import HeaderAdmin from '../components/Layout/Header/HeaderAdmin';
import SignInAdmin from '../components/SignIn/SignAdmin';

class SignIn extends React.Component {

    static getInitialProps({store}) {}

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
            <HeaderAdmin/>
            <SignInAdmin />
            {/* <FooterThree /> */}
            </React.Fragment>
        );
    }
}


export default SignIn;