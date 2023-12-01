import React from 'react';
import Footer from '../components/Layout/Footer/Footer';
import CourseGridOnline from '../components/CourseGrid/CourseGridOnline';
import HeaderThree from '../components/Layout/Header/HeaderStyleThree';
import Header from '../components/Layout/Header/Header';
import HeaderOpaque from '../components/Layout/Header/HeaderOpaque';
import NoSSR from 'react-no-ssr';

class CourseOnline extends React.Component {

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
            <CourseGridOnline />
            <Footer />
            </React.Fragment>
        );
    }
}


export default CourseOnline;