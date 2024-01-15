
import React from 'react';
import HeaderOpaque from '../components/Layout/Header/HeaderOpaque';
import Footer from '../components/Layout/Footer/Footer';
import Cookies from '../components/About/cookiesMain';
import NoSSR from 'react-no-ssr';

class CookiesPage extends React.Component {

    static getInitialProps({store}) {}

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
            <NoSSR>
            <HeaderOpaque/>
            </NoSSR>
            <Cookies />
            <div className='mt-10'>
            <Footer />
            </div>
    
            </React.Fragment>
        );
    }
}


export default CookiesPage;

