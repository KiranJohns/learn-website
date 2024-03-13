import React from 'react';
import Footer from '../components/Layout/Footer/Footer';
import CourseGridMandatory from '../components/CourseGrid/CourseGridMandatory';
import HeaderThree from '../components/Layout/Header/HeaderStyleThree';
import Header from '../components/Layout/Header/Header';
import HeaderOpaque from '../components/Layout/Header/HeaderOpaque';
import NoSSR from 'react-no-ssr';

class CourseMandatory extends React.Component {

    static getInitialProps({store}) {}

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
          <NoSSR>
            <HeaderOpaque pageTitle="Mandatory care courses"/>
            </NoSSR>
            <CourseGridMandatory />
            <Footer />
            </React.Fragment>
        );
    }
}


export default CourseMandatory;