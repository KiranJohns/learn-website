
import React from 'react';
import HeaderOpaque from '../components/Layout/Header/HeaderOpaque';
import Footer from '../components/Layout/Footer/Footer';
import Privacy from '../components/About/PrivacyMain';
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
            <HeaderOpaque pageTitle="Learn For Care Privacy and Policy" descr="Learn how we protect your data and privacy on Learn For Care"/>
            </NoSSR>
            <Privacy />
            <div className='mt-10'>
            <Footer />
            </div>
    
            </React.Fragment>
        );
    }
}


export default CookiesPage;
