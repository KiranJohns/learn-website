import React from 'react';
import Footer from '../components/Layout/Footer/Footer';
import CourseGridMain from '../components/CourseGrid/CourseGridMain';
import HeaderThree from '../components/Layout/Header/HeaderStyleThree';
import Header from '../components/Layout/Header/Header';
import HeaderOpaque from '../components/Layout/Header/HeaderOpaque';
import NoSSR from 'react-no-ssr';

class CourseGrid extends React.Component {

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
            <CourseGridMain />
            <Footer />
            </React.Fragment>
        );
    }
}


export default CourseGrid;
