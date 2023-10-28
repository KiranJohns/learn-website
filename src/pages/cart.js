import React from 'react';
import HeaderOpaque from '../components/Layout/Header/HeaderOpaque';
import Footer from '../components/Layout/Footer/Footer';
import MyCart from '../components/MyCart/MyCartMain';

class Cart extends React.Component {

    static getInitialProps({store}) {}

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
            <HeaderOpaque />
            <MyCart />
            <Footer />
            </React.Fragment>
        );
    }
}


export default Cart;

