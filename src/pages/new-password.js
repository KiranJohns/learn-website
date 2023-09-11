import React from 'react';
import NewPassword from '../components/SignIn/NewPassword';
import HeaderFour from '../components/Layout/Header/HeaderStyleFour';
import Header from '../components/Layout/Header/Header';
import Footer from '../components/Layout/Footer/Footer';

class NewPass extends React.Component {

    static getInitialProps({store}) {}

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
            <Header/>
            <NewPassword/>
            <Footer />
            </React.Fragment>
        );
    }
}


export default NewPass;