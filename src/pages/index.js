import React from 'react';
import Header from '../components/Layout/Header/Header';
import Footer from '../components/Layout/Footer/Footer';
import HomeMain from '../components/Home/HomeMain';
import NoSSR from 'react-no-ssr';

class Index extends React.Component {

    static getInitialProps({store}) {}

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
            <NoSSR>
            <Header />
            </NoSSR>
            <HomeMain />
            <Footer />
            </React.Fragment>
        );
    }
}


export default Index;

