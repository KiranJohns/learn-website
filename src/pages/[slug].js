import React from 'react';
import ErrorMain from '../components/Error/ErrorMain';
import Footer from '../components/Layout/Footer/Footer';
import Header from '../components/Layout/Header/Header';


class Error extends React.Component {

    static getInitialProps({store}) {}

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
            <Header />
            <ErrorMain />
            <Footer />
            </React.Fragment>
        );
    }
}


export default Error;