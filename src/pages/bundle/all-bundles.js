import React from "react";
import HeaderOpaque from "../../components/Layout/Header/HeaderOpaque";
import Footer from "../../components/Layout/Footer/Footer";
import CourseBundle from "../../components/CourseGrid/CourseBundle";
import NoSSR from "react-no-ssr";

class BundleAll extends React.Component {
    static getInitialProps({store}) {}

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <React.Fragment>
            <NoSSR>
            <HeaderOpaque pageTitle="CPD approved, Healthcare courses, mandatory training, buccal, Sova"/>
            </NoSSR>
            <CourseBundle/>
            <Footer />
            </React.Fragment>
        );
    }
}

export default BundleAll;