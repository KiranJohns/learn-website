import React from 'react';
import HeaderOpaque from '../components/Layout/Header/HeaderOpaque';
import Footer from '../components/Layout/Footer/Footer';
import MyCart from '../components/MyCart/MyCartMain';
import FooterPad from '../components/Layout/Footer/FooterLess';
import NoSSR from 'react-no-ssr';

class Cart extends React.Component {

    static getInitialProps({store}) {}

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
            <NoSSR>
            <HeaderOpaque pageTitle="Cart"/>
            </NoSSR>
            <MyCart />
            <Footer />
            </React.Fragment>
        );
    }
}


export default Cart;

