import React from 'react';
import Footer from '../components/Layout/Footer/Footer';
import CourseGridMandatory from '../components/CourseGrid/CourseGridMandatory';
import HeaderThree from '../components/Layout/Header/HeaderStyleThree';
import Header from '../components/Layout/Header/Header';
import HeaderOpaque from '../components/Layout/Header/HeaderOpaque';


class CourseMandatory extends React.Component {

    static getInitialProps({store}) {}

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
            <HeaderOpaque />
            <CourseGridMandatory />
            <Footer />
            </React.Fragment>
        );
    }
}


export default CourseMandatory;