import React from 'react';
import Header from '../components/Layout/Header/Header';
import Footer from '../components/Layout/Footer/Footer';
import HeaderOpaque from '../components/Layout/Header/HeaderOpaque';
import NoSSR from 'react-no-ssr';
import SucessLayout from '../components/Common/sucessLayout';


class Success extends React.Component {

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
          <SucessLayout/>
         
            </React.Fragment>
        );
    }
}


export default Success;