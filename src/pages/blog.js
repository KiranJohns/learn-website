import React from 'react';
import HeaderThree from '../components/Layout/Header/HeaderStyleThree';
import FooterThree from '../components/Layout/Footer/FooterStyleThree';
import BlogMain from '../components/Blog/BlogMain';
import HeaderOpaque from '../components/Layout/Header/HeaderOpaque';

class Blog extends React.Component {

    static getInitialProps({store}) {}

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
            <HeaderOpaque />
            <BlogMain />
            <FooterThree />
            </React.Fragment>
        );
    }
}


export default Blog;

