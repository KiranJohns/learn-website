import React from 'react';
import Footer from '../components/Layout/Footer/Footer';
import NoSSR from 'react-no-ssr';
import HeaderThree from '../components/Layout/Header/HeaderStyleThree';
import Header from '../components/Layout/Header/Header';
import HeaderOpaque from '../components/Layout/Header/HeaderOpaque';
import CourseGridSpecialised from '../components/CourseGrid/CourseGridSpecialised';


class CourseSpecial extends React.Component {

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
            <CourseGridSpecialised />
            <Footer />
            </React.Fragment>
        );
    }
}


export default CourseSpecial;