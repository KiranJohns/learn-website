import React from 'react';
import Footer from '../components/Layout/Footer/Footer';
import CourseGridMandatory from '../components/CourseGrid/CourseGridMandatory';
import HeaderThree from '../components/Layout/Header/HeaderStyleThree';
import Header from '../components/Layout/Header/Header';
import HeaderOpaque from '../components/Layout/Header/HeaderOpaque';
import CourseGridChild from '../components/CourseGrid/CourseGridChild';


class CourseChild extends React.Component {

    static getInitialProps({store}) {}

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
            <HeaderOpaque />
            <CourseGridChild />
            <Footer />
            </React.Fragment>
        );
    }
}


export default CourseChild;