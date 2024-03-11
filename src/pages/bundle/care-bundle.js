import React from "react";
import HeaderOpaque from "../../components/Layout/Header/HeaderOpaque";
import Footer from "../../components/Layout/Footer/Footer";
import CourseBundle from "../../components/CourseGrid/CourseBundle";
import NoSSR from "react-no-ssr";
import CourseCareBundle from "../../components/CourseGrid/CourseCareBunble";

class CareBundle extends React.Component {
    static getInitialProps({store}) {}

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <React.Fragment>
            <NoSSR>
            <HeaderOpaque pageTitle="Care Bundle, Care course training, CPD approved courses" descr="CPD certified course, learning bundle, care companies, care certificate bundles, Online Care Course Bundle Package, child care, health care, mental health care"/>
            </NoSSR>
            <CourseCareBundle/>
            <Footer />
            </React.Fragment>
        );
    }
}

export default CareBundle;